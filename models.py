from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Date
from database import Base
from sqlalchemy import Float



class Usuario(Base):
  __tablename__ = 'usuarios'
  id = Column(Integer, primary_key=True, index=True, autoincrement=True)
  nome = Column(String(50), unique=True)
  email = Column(String(50), unique=True)
  senha = Column(String(30))
  cpf = Column(String(14), unique=True)
  qtd_tickets = Column(Integer)

class Admin(Base):
  __tablename__ = 'admins'
  id = Column(Integer, primary_key=True, index=True, autoincrement=True)
  nome = Column(String(50), unique=True)
  senha = Column(String(30))

class Configuracao(Base):
    __tablename__ = "configuracoes"

    id = Column(Integer, primary_key=True, index=True)
    ticket_valor = Column(Float, default=5.0)  # Valor padrão do ticket (em reais)

class Cardapio(Base):
    __tablename__ = 'cardapios'
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    dia_semana = Column(String(20), nullable=False)
    data = Column(Date, nullable=False)  # Alterado o tipo do campo para Date
    refeicao = Column(String(10), nullable=False)  # 'almoco' ou 'janta'
    prato_principal = Column(String(100), nullable=False)
    arroz_feijao = Column(String(100), nullable=False)
    salada = Column(String(100), nullable=False)
    fruta = Column(String(100), nullable=False)
    vegetariano = Column(String(100), nullable=True)  # Opcao Vegetariana