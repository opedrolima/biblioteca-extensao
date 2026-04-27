from typing import Generic, TypeVar, Type
from sqlalchemy.orm import Session

# Define um tipo genérico
T = TypeVar('T')

class BaseRepository(Generic[T]):
    def __init__(self, model: Type[T], db: Session):
        self.model = model
        self.db = db

    def create(self, entity: T) -> T:
        self.db.add(entity)
        self.db.commit()
        self.db.refresh(entity)
        return entity

    def update(self, entity: T) -> T:
        self.db.commit()
        self.db.refresh(entity)
        return entity

    def delete(self, entity_id: int) -> None:
        entity = self.db.query(self.model).get(entity_id)
        if entity:
            self.db.delete(entity)
            self.db.commit()
