from fastapi import HTTPException, status


class NotFoundException(HTTPException):
    def __init__(self, mensagem: str = "Recurso não encontrado"):
        super().__init__(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=mensagem
        )


class BadRequestException(HTTPException):
    def __init__(self, mensagem: str = "Requisição inválida"):
        super().__init__(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=mensagem
        )