from app.models.exemplar import Exemplar
from app.repositories.exemplar_repository import ExemplarRepository
from app.core.exceptions import NotFoundException


class ExemplarService:

    def __init__(self, db_session):
        self.repository = ExemplarRepository(db_session)

    def criar(self, dados):
        exemplar = Exemplar(**dados.dict())
        return self.repository.criar(exemplar)

    def listar(self):
        return self.repository.listar()

    def buscar_por_id(self, exemplar_id):
        exemplar = self.repository.buscar_por_id(exemplar_id)

        if not exemplar:
            raise NotFoundException("Exemplar não encontrado")

        return exemplar