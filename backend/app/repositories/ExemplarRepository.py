from app.models.exemplar import Exemplar


class ExemplarRepository:

    def __init__(self, db):
        self.db = db

    def criar(self, exemplar):
        self.db.add(exemplar)
        self.db.commit()
        self.db.refresh(exemplar)
        return exemplar

    def listar(self):
        return self.db.query(Exemplar).all()

    def buscar_por_id(self, exemplar_id):
        return self.db.query(Exemplar).filter(Exemplar.id == exemplar_id).first()