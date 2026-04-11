from app.models.usuario import Usuario


class UsuarioRepository:

    def __init__(self, db):
        self.db = db

    def criar(self, usuario):
        self.db.add(usuario)
        self.db.commit()
        self.db.refresh(usuario)
        return usuario

    def listar(self):
        return self.db.query(Usuario).all()

    def buscar_por_id(self, usuario_id):
        return self.db.query(Usuario).filter(Usuario.id == usuario_id).first()

    def buscar_por_email(self, email):
        return self.db.query(Usuario).filter(Usuario.email == email).first()

    def atualizar(self, usuario):
        self.db.commit()
        self.db.refresh(usuario)
        return usuario

    def deletar(self, usuario):
        self.db.delete(usuario)
        self.db.commit()