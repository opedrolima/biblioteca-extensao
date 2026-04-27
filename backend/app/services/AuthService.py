import hashlib

from sqlalchemy.orm import Session
from fastapi import HTTPException, status

from app.models.auth_user import AuthUserModel
from app.schemas.auth import RegisterRequest, LoginRequest


class AuthService:
    def __init__(self, db: Session):
        self.db = db

    def _hash_password(self, password: str) -> str:
        return hashlib.sha256(password.encode()).hexdigest()

    def register(self, data: RegisterRequest) -> AuthUserModel:
        # Verificar se username já existe
        existing = self.db.query(AuthUserModel).filter(
            AuthUserModel.username == data.username
        ).first()
        if existing:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Username já está em uso"
            )

        # Verificar se email já existe
        existing_email = self.db.query(AuthUserModel).filter(
            AuthUserModel.email == data.email
        ).first()
        if existing_email:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Email já está em uso"
            )

        user = AuthUserModel(
            username=data.username,
            email=data.email,
            password_hash=self._hash_password(data.password),
        )
        self.db.add(user)
        self.db.commit()
        self.db.refresh(user)
        return user

    def login(self, data: LoginRequest) -> AuthUserModel:
        user = self.db.query(AuthUserModel).filter(
            AuthUserModel.username == data.username
        ).first()

        if not user or user.password_hash != self._hash_password(data.password):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Credenciais inválidas"
            )

        return user
