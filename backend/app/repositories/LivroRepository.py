from app.models.livro import Livro


class LivroRepository:

    def __init__(self, db):
        self.db = db

    def criar(self, livro):
        self.db.add(livro)
        self.db.commit()
        self.db.refresh(livro)
        return livro

    def listar(self):
        return self.db.query(Livro).all()

    def buscar_por_id(self, livro_id):
        return self.db.query(Livro).filter(Livro.id == livro_id).first()

    def buscar_por_titulo(self, titulo):
        return self.db.query(Livro).filter(Livro.titulo == titulo).first()

    def atualizar(self, livro):
        self.db.commit()
        self.db.refresh(livro)
        return livro

    def deletar(self, livro):
        self.db.delete(livro)
        self.db.commit()