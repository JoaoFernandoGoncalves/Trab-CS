from sqlalchemy import Boolean, Column, Date, ForeignKey, Integer, String
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
    data = Column(Date, nullable=False)
    refeicao = Column(String(30), nullable=False)
    opcao1 = Column(String(100), nullable=True)
    opcao2 = Column(String(100), nullable=True)
    opcao3 = Column(String(100), nullable=True)
    opcao4 = Column(String(100), nullable=True)
    opcao5 = Column(String(100), nullable=True)