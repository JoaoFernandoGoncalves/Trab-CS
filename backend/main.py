from datetime import datetime, timedelta
from fastapi.security import OAuth2PasswordBearer
from jose import jwt
import os
from fastapi import FastAPI, Form, HTTPException, status, Depends
from pydantic import BaseModel, ValidationError
from typing import Annotated, Any, Optional, Union
import sqlalchemy
import models
from database import engine, SessionLocal
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from email_validator import validate_email, EmailNotValidError
import re
from enum import Enum
from pydantic import BaseModel
from fastapi import APIRouter

app = FastAPI()
origins = ["http://localhost:5173"]

models.Base.metadata.create_all(bind=engine)

app.add_middleware(
  CORSMiddleware, 
  allow_origins=origins, 
  allow_credentials=True, 
  allow_methods=["*"], 
  allow_headers=["*"],
)


class UsuarioBase(BaseModel):
  nome: str
  email: str
  senha: str
  cpf : str
  qtd_tickets: int

class AdminBase(BaseModel):
  nome: str
  senha: str

class TokenPayload(BaseModel):
    sub: Optional[int] = None

def get_db():
  db = SessionLocal()
  try:
    yield db
  finally:
    db.close()

reusable_oauth2 = OAuth2PasswordBearer(
    tokenUrl="/login"
)

db_dependency = Annotated[Session, Depends(get_db)]

SECRET_KEY = os.getenv('k1Wn@`Ou9I#3', 'SECRET_KEY')
JWT_ALGORITHM = os.getenv('JWT_ALGORITHM', 'HS512')
ACCESS_TOKEN_EXPIRE_HOURS = 24

async def get_usuario_logado(
    token: str,
    db: Session = Depends(get_db)
) -> models.Usuario:
    try:
        payload = jwt.decode(
            token, SECRET_KEY, algorithms=[JWT_ALGORITHM]
        )
        token_data = TokenPayload(**payload)
    except (jwt.JWTError, ValidationError):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Could not validate credentials",
        )
    user = db.query(models.Usuario).filter(models.Usuario.id == token_data.sub).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

def criar_token_jwt(subject: Union[str, Any]) -> str:
    expire = datetime.utcnow() + timedelta(
        hours=ACCESS_TOKEN_EXPIRE_HOURS
    )
    to_encode = {"exp": expire, "sub": str(subject)}
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm="HS512")
    return encoded_jwt

def is_valid_email(email):
    try:
        validate_email(email)
        return True
    except EmailNotValidError:
        return False
    
def is_uem_email(email):
    # Verificar se o email possui o domínio da UEM
    return email.endswith("@uem.br")

def is_valid_email(email):
    # Verificar se o email é válido
    try:
        validate_email(email)
        return True
    except EmailNotValidError:
        return False

def is_valid_cpf(cpf):
    # Verificar se o CPF é válido
    cpf = re.sub('[^0-9]', '', cpf)
    if len(cpf) != 11:
        return False
    if cpf == cpf[0] * 11:
        return False
    # Verifica se CPF é válido
    cpf = list(map(int, cpf))
    for i in range(9, 11):
        v = sum((cpf[j] * ((i + 1) - j) for j in range(i))) % 11
        if v < 2:
            v = 0
        else:
            v = 11 - v
        if cpf[i] != v:
            return False
    return True

def verifica_integracao_usuario(email, cpf):
    if is_uem_email(email):
        if is_valid_email(email):
            return "Usuário integrado pela UEM"
        else:
            return "E-mail da UEM inválido"
    elif is_valid_cpf(cpf):
        return "Usuário integrado por CPF válido"
    else:
        return "E-mail e CPF inválidos"
    
@app.put("/usuario/{user_id}", status_code=status.HTTP_200_OK)
async def update_user(user_id: int, user_data: UsuarioBase, db: Session = Depends(get_db)):
    db_user = db.query(models.Usuario).filter(models.Usuario.id == user_id).first()
    if db_user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Usuário não encontrado")
    
    # Verificar quais campos foram alterados e atualizar apenas eles
    if user_data.nome != "string":
        db_user.nome = user_data.nome
    if user_data.email != "string":
         if not is_valid_email(user_data.email):
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="E-mail inválido")
         else:
            db_user.email = user_data.email
    if user_data.senha != "string":
        db_user.senha = user_data.senha
    if user_data.qtd_tickets != "0":
        db_user.qtd_tickets = user_data.qtd_tickets
    if user_data.cpf != "string":
        if not is_valid_cpf(user_data.cpf):
           raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="CPF inválido")
        else:
           db_user.cpf = user_data.cpf
    
    db.commit()
    return db_user

# Endpoint para deletar um usuário pelo ID
@app.delete("/usuario/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_user(user_id: int, db: Session = Depends(get_db)):
    db_user = db.query(models.Usuario).filter(models.Usuario.id == user_id).first()
    if db_user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    db.delete(db_user)
    db.commit()
    return None  # Retornar None explicitamente para um código de status 204

@app.post("/usuario", status_code=status.HTTP_201_CREATED)
async def create_user(user: UsuarioBase, db: db_dependency):
    if (user.nome == '' or user.email == '' or user.senha == '' or user.cpf == ''):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Campos não preenchidos")
    
    if not is_valid_email(user.email):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email inválido")
    
    if not is_valid_cpf(user.cpf):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="CPF inválido")
    else:
        try:
            db_user = models.Usuario(**user.model_dump())
            db.add(db_user)
            db.commit()
        except sqlalchemy.exc.IntegrityError as e:
            if 'nome' in str(e.orig):
                raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Usuário já cadastrado")
            elif 'email' in str(e.orig):
                raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Email já cadastrado")
            elif 'cpf' in str(e.orig):
                raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="CPF já cadastrado")
            else:
                raise

@app.get("/usuario_id/{user_id}", status_code=status.HTTP_200_OK)
async def read_user(user_id: int, db: db_dependency):
  user = db.query(models.Usuario).filter(models.Usuario.id == user_id).first()
  if user is None:
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
  return user

@app.get("/usuario_email/{user_email}", status_code=status.HTTP_200_OK)
async def read_user(user_email: str, db: db_dependency):
  user = db.query(models.Usuario).filter(models.Usuario.email == user_email).first()
  if user is None:
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
  return user

@app.get("/usuario_cpf/{user_cpf}", status_code=status.HTTP_200_OK)
async def read_user(user_cpf: str, db: db_dependency):
  user = db.query(models.Usuario).filter(models.Usuario.cpf == user_cpf).first()
  if user is None:
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
  return user

@app.get("/usuario_nome/{user_nome}", status_code=status.HTTP_200_OK)
async def read_user(user_nome: str, db: db_dependency):
  user = db.query(models.Usuario).filter(models.Usuario.nome == user_nome).first()
  if user is None:
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
  return user

@app.post("/admin", status_code=status.HTTP_201_CREATED)
async def create_admin(admin: AdminBase, db: db_dependency):
  db_admin = models.Admin(**admin.model_dump())
  db.add(db_admin)
  db.commit()

@app.get("/admin/{admin_id}", status_code=status.HTTP_200_OK)
async def read_user(admin_id: int, db: db_dependency):
  admin = db.query(models.Admin).filter(models.Admin.id == admin_id).first()
  if admin is None:
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Admin not found")
  return admin

# Endpoint para deletar um administrador pelo ID
@app.delete("/admin/{admin_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_admin(admin_id: int, db: db_dependency):
    db_admin = db.query(models.Admin).filter(models.Admin.id == admin_id).first()
    if db_admin is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Admin not found")
    db.delete(db_admin)
    db.commit()
    return None  # Retornar None explicitamente para um código de status 204

class MetodoPagamento(str, Enum):
    cartao_credito = "cartao_credito"
    cartao_debito = "cartao_debito"
    pix = "pix"
    boleto = "boleto"

class CompraTicket(BaseModel):
    user_id: int
    quantidade: int
    metodo_pagamento: MetodoPagamento

router = APIRouter()

@router.get("/user/loggedin/{token}", status_code=status.HTTP_200_OK)
async def get_logged_in_user(
    token: str,
    db: Session = Depends(get_db)
):
    return await get_usuario_logado(token, db)

@router.post("/login", status_code=status.HTTP_200_OK)
async def login(username: str = Form(...), password: str = Form(...), db: Session = Depends(get_db)):
    try:
        user = None
        if is_valid_email(username):
            user = db.query(models.Usuario).filter(models.Usuario.email == username).first()
        else:
            user = db.query(models.Usuario).filter(models.Usuario.nome == username).first()
        if not user or user.senha != password:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Email ou nome de usuário incorretos")
        return {
            "access_token": criar_token_jwt(user.id),
            "token_type": "bearer",
        }
    except Exception as e:
        raise e

@router.post("/compra-ticket", status_code=status.HTTP_201_CREATED)
async def compra_ticket(compra: CompraTicket, db: Session = Depends(get_db)):
    try:
        # Verifique se o usuário existe
        user = db.query(models.Usuario).filter(models.Usuario.id == compra.user_id).first()
        if user is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Usuário não encontrado")

        # Verificar o valor do ticket na configuração
        configuracao = db.query(models.Configuracao).first()
        if configuracao is None:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Configuração não encontrada")
        
        valor_ticket = configuracao.ticket_valor
        valor_total = compra.quantidade * valor_ticket

        # Verifique se o método de pagamento é válido
        if compra.metodo_pagamento not in [mp.value for mp in MetodoPagamento]:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Método de pagamento inválido")

        # Processar o pagamento (simulação)
        # Aqui você pode implementar a integração com gateways de pagamento ou outros sistemas de pagamento
        # Neste exemplo, apenas simularemos o processamento do pagamento
        # Suponha que o pagamento sempre seja bem-sucedido
        # Após o processamento bem-sucedido, atualize a quantidade de tickets do usuário
        user.qtd_tickets += compra.quantidade
        db.commit()

        return {"message": f"{compra.quantidade} tickets comprados com sucesso. Valor total: R$ {valor_total:.2f}"}
    except Exception as e:
        db.rollback()  # Reverta as alterações no banco de dados em caso de exceção
        raise e

@router.post("/alterar-valor-ticket", status_code=status.HTTP_200_OK)
async def alterar_valor_ticket(novo_valor: float, db: Session = Depends(get_db)):
    try:
        if novo_valor <= 0:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="O valor do ticket deve ser maior que zero")
        
        # Atualizar o valor do ticket no banco de dados
        configuracao = db.query(models.Configuracao).first()
        if configuracao is None:
            configuracao = models.Configuracao(ticket_valor=novo_valor)
            db.add(configuracao)
        else:
            configuracao.ticket_valor = novo_valor

        db.commit()

        return {"message": f"O valor do ticket foi alterado para R$ {novo_valor:.2f}"}
    except Exception as e:
        db.rollback()  # Reverta as alterações no banco de dados em caso de exceção
        raise e
    

# Registrar o roteador no aplicativo FastAPI
app.include_router(router)