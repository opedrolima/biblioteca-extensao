from datetime import datetime, timedelta
from app.models.emprestimo import Emprestimo
from app.repositories.emprestimo_repository import EmprestimoRepository
from app.repositories.exemplar_repository import ExemplarRepository
from app.repositories.usuario_repository import UsuarioRepository
from app.core.exceptions import NotFoundException, BadRequestException


class EmprestimoService:

    def __init__(self, db_session):
        self.repository = EmprestimoRepository(db_session)
        self.exemplar_repository = ExemplarRepository(db_session)
        self.usuario_repository = UsuarioRepository(db_session)

    def criar(self, dados):
        exemplar = self.exemplar_repository.buscar_por_id(dados.exemplar_id)
        usuario = self.usuario_repository.buscar_por_id(dados.usuario_id)

        if not exemplar:
            raise NotFoundException("Exemplar não encontrado")

        if not usuario:
            raise NotFoundException("Usuário não encontrado")

        if not exemplar.disponivel:
            raise BadRequestException("Exemplar indisponível")

        exemplar.disponivel = False

        emprestimo = Emprestimo(
            exemplar_id=dados.exemplar_id,
            usuario_id=dados.usuario_id,
            data_emprestimo=datetime.utcnow(),
            data_devolucao_prevista=datetime.utcnow() + timedelta(days=7)
        )

        return self.repository.criar(emprestimo)

    def devolver(self, emprestimo_id):
        emprestimo = self.repository.buscar_por_id(emprestimo_id)

        if not emprestimo:
            raise NotFoundException("Empréstimo não encontrado")

        exemplar = self.exemplar_repository.buscar_por_id(emprestimo.exemplar_id)

        exemplar.disponivel = True
        emprestimo.data_devolucao_real = datetime.utcnow()

        return self.repository.atualizar(emprestimo)