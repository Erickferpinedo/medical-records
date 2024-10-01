from sqlalchemy import Column, Integer, String, ForeignKey, Enum, Table
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.dialects.postgresql import ARRAY, DATE
from sqlalchemy.orm import relationship
from enums import UserRole 
Base = declarative_base()

user_medication_association = Table(
    'user_medication',  # Name of the association table
    Base.metadata,
    Column('user_id', Integer, ForeignKey('users.id', ondelete='CASCADE'), primary_key=True),
    Column('medication_id', Integer, ForeignKey('medication.id', ondelete='CASCADE'), primary_key=True)
)

class Users(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    first_name = Column(String, index=True)
    last_name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    conditions = Column(ARRAY(String), nullable=True)  # New array column
    password = Column(String, index = True)
    role = Column(Enum(UserRole), nullable=False, default=UserRole.PATIENT)

    medications = relationship(
        "Medication",
        secondary=user_medication_association,
        back_populates="users"
    )

class Medication(Base):
    __tablename__ = 'medication'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    dosage = Column(String)
    side_effects = Column(ARRAY(String), nullable=True)

    users = relationship(
        "Users",
        secondary=user_medication_association,
        back_populates="medications"
    )

class MedicalHistory(Base):
    __tablename__= "medicalhistory"
    id = Column(Integer, primary_key=True, index=True)
    date = Column(DATE, nullable=False)  # Date of the medical history event
    details = Column(String, nullable=True) 
    user_id = Column(Integer, ForeignKey('users.id', ondelete='CASCADE'))
    user = relationship("Users", back_populates="medical_history")