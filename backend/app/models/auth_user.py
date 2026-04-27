from sqlalchemy import Column, Integer, String
from app.core.database import Base


class AuthUserModel(Base):
    __tablename__ = "auth_user"

    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String(100), unique=True, nullable=False)
    email = Column(String(200), unique=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
