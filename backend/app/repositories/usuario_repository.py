from sqlalchemy.orm import Session
from app.models.usuario import UsuarioModel
from app.repositories import BaseRepository

class UsuarioRepository(BaseRepository[UsuarioModel]):
    def __init__(self, db: Session):
        super().__init__(UsuarioModel, db)

    def get_by_cpf(self, cpf: str) -> UsuarioModel | None:
        return self.db.query(self.model).filter(self.model.cpf == cpf).first()

    def get_ativos(self) -> list[UsuarioModel]:
        # No seu model o campo é 'status', no DER é 'ativo'
        return self.db.query(self.model).filter(self.model.status == True).all()