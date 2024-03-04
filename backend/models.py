from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from database import Base

class Usuario(Base):
  __tablename__ = 'usuarios'
  id = Column(Integer, primary_key=True, index=True, autoincrement=True)
  nome = Column(String(50), unique=True)
  email = Column(String(50), unique=True)
  senha = Column(String(30))
  qtd_tickets = Column(Integer)

class Admin(Base):
  __tablename__ = 'admins'
  id = Column(Integer, primary_key=True, index=True, autoincrement=True)
  nome = Column(String(50), unique=True)
  senha = Column(String(30))