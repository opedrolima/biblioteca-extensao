from app.models.livro import Livro
from app.repositories.livro_repository import LivroRepository
from app.core.exceptions import NotFoundException, BadRequestException


class LivroService:

    def __init__(self, db_session):
        self.repository = LivroRepository(db_session)

    def criar(self, dados):
        if self.repository.buscar_por_titulo(dados.titulo):
            raise BadRequestException("Livro já cadastrado")

        livro = Livro(**dados.dict())
        return self.repository.criar(livro)

    def listar(self):
        return self.repository.listar()

    def buscar_por_id(self, livro_id):
        livro = self.repository.buscar_por_id(livro_id)

        if not livro:
            raise NotFoundException("Livro não encontrado")

        return livro

    def atualizar(self, livro_id, dados):
        livro = self.buscar_por_id(livro_id)

        for campo, valor in dados.dict(exclude_unset=True).items():
            setattr(livro, campo, valor)

        return self.repository.atualizar(livro)

    def deletar(self, livro_id):
        livro = self.buscar_por_id(livro_id)
        self.repository.deletar(livro)