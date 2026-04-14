from sqlalchemy.orm import Session
from app.models.emprestimo import EmprestimoModel
from app.repositories import BaseRepository
from datetime import date

class EmprestimoRepository(BaseRepository[EmprestimoModel]):
    def __init__(self, db: Session):
        super().__init__(EmprestimoModel, db)

    def get_atrasados(self) -> list[EmprestimoModel]:
        return self.db.query(self.model).filter(
            self.model.data_devolucao == None,
            self.model.data_prevista < date.today()
        ).all()

    def registrar_devolucao(self, emprestimo_id: int):
        emprestimo = self.get_by_id(emprestimo_id)
        if emprestimo:
            emprestimo.data_devolucao = date.today()
            self.db.commit()
            return emprestimo
        return None