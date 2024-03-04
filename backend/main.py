from fastapi import FastAPI, HTTPException, status, Depends
from pydantic import BaseModel
from typing import Annotated
import models
from database import engine, SessionLocal
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware


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
  qtd_tickets: int

class AdminBase(BaseModel):
  nome: str
  senha: str

def get_db():
  db = SessionLocal()
  try:
    yield db
  finally:
    db.close()

db_dependency = Annotated[Session, Depends(get_db)]

@app.post("/usuario", status_code=status.HTTP_201_CREATED)
async def create_user(user: UsuarioBase, db: db_dependency):
  db_user = models.Usuario(**user.model_dump())
  db.add(db_user)
  db.commit()

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