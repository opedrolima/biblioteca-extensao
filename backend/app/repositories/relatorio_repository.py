from sqlalchemy.orm import Session
from sqlalchemy import func
from app.models.emprestimo import EmprestimoModel
from app.models.livro import LivroModel
from app.models.exemplar import ExemplarModel

class RelatorioRepository:
    def __init__(self, db: Session):
        self.db = db

    def livros_mais_emprestados(self):
        return self.db.query(
            LivroModel.titulo, 
            func.count(EmprestimoModel.id).label('total')
        ).join(ExemplarModel, LivroModel.id == ExemplarModel.id_livro)\
         .join(EmprestimoModel, ExemplarModel.id_exemplar == EmprestimoModel.id_exemplar)\
         .group_by(LivroModel.titulo)\
         .order_by(func.count(EmprestimoModel.id).desc()).all()