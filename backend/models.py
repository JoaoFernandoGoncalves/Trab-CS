from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
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