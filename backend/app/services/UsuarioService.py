from app.models.usuario import Usuario
from app.repositories.usuario_repository import UsuarioRepository
from app.core.exceptions import NotFoundException, BadRequestException


class UsuarioService:

    def __init__(self, db_session):
        self.repository = UsuarioRepository(db_session)

    def criar(self, dados):
        if self.repository.buscar_por_email(dados.email):
            raise BadRequestException("Email já cadastrado")

        usuario = Usuario(**dados.dict())
        return self.repository.criar(usuario)

    def listar(self):
        return self.repository.listar()

    def buscar_por_id(self, usuario_id):
        usuario = self.repository.buscar_por_id(usuario_id)

        if not usuario:
            raise NotFoundException("Usuário não encontrado")

        return usuario

    def atualizar(self, usuario_id, dados):
        usuario = self.buscar_por_id(usuario_id)

        for campo, valor in dados.dict(exclude_unset=True).items():
            setattr(usuario, campo, valor)

        return self.repository.atualizar(usuario)

    def deletar(self, usuario_id):
        usuario = self.buscar_por_id(usuario_id)
        self.repository.deletar(usuario)