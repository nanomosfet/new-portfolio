from sqlalchemy import Column, ForeignKey, BigInteger, Integer, String, DateTime, Boolean
from sqlalchemy.orm import relationship
from datetime import datetime
from server.database import Base

class Domain(Base):
    __tablename__ = 'domain'
    id = Column(Integer, primary_key=True)
    domain_name = Column(String(250), nullable=False, unique=True)
    grade = Column(String(80))
    last_updated = Column(BigInteger)
    status = Column(String(80))
    active = Column(Boolean)

    @property
    def serialize(self):
        return {
            'id': self.id,
            'domain_name': self.domain_name,
            'grade': self.grade,
            'last_updated': self.last_updated,
            'status': self.status,
            'active': self.active,
        }