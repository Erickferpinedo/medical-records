# schemas.py
from enums import UserRole 
from typing import List, Optional
from pydantic import BaseModel, EmailStr, Field
from datetime import date

class MedicationBase(BaseModel):
    name: str
    dosage: Optional[str] = None
    side_effects: Optional[List[str]]

class MedicationCreate(MedicationBase):
    pass

class Medication(MedicationBase):
    id: int

    class Config:
        orm_mode = True

class UsersBase(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    conditions: Optional[List[str]] = None  
    role: Optional[UserRole] = UserRole.PATIENT

class UsersCreate(UsersBase):
    password: str
    medications: Optional[List[MedicationCreate]] = None

class Users(UsersBase):
    id: int

    class Config:
        orm_mode = True

class MedicationRead(BaseModel):
    id: int
    name: str
    dosage: Optional[str] = None
    side_effects: Optional[List[str]]


class UsersRead(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: EmailStr
    conditions: Optional[List[str]] = []
    role: UserRole  # Assuming roles like 'patient' or 'health_official'
    medications: List[MedicationRead] = []

# Medical History schemas
class MedicalHistoryBase(BaseModel):
    date: date  # Date of the medical event
    details: Optional[str] = None  # Additional details about the event


class MedicalHistoryCreate(MedicalHistoryBase):
    pass  # Inherits fields from MedicalHistoryBase


class MedicalHistory(MedicalHistoryBase):
    id: int

    class Config:
        orm_mode = True


class MedicalHistoryRead(BaseModel):
    id: int
    date: date
    details: Optional[str] = None
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    user_id: Optional[int] = None

class MedRequest(BaseModel):
    med: str