# crud.py

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload
from typing import List, Optional
import models, schemas
from fastapi.exceptions import HTTPException
from fastapi import status
from utils import get_password_hash



async def get_user_by_email(db: AsyncSession, email: str) -> Optional[models.Users]:
    try:
        result = await db.execute(
            select(models.Users).where(models.Users.email == email)
        )
    except Exception as e:
        raise Exception(e)
    
    return result.scalar_one_or_none()

async def create_user(db: AsyncSession, user: schemas.UsersCreate) -> models.Users:
    hashed_pw = get_password_hash(user.password)
    db_user = models.Users (
        first_name=user.first_name,
        last_name=user.last_name,
        email=user.email,
        password = hashed_pw,
        conditions=user.conditions
    )
    if user.medications:
        for med in user.medications:
            db_med = models.Medication(
                name=med.name,
                dosage=med.dosage,
                side_effects=med.side_effects
            )
            db_user.medications.append(db_med)
        
    try:
        db.add(db_user)
    except Exception as e:
        print(f"adding issue ----------------------------{e}")
    try:
        await db.commit()
    except Exception as e:
        print(f"comitting issue----------------------------{e}")
    try:
        await db.refresh(db_user)
    except Exception as e:
        print(f"refreshing issue ----------------------------")
    return db_user

async def get_user(db: AsyncSession, user_id: int) -> Optional[models.Users]:
    result = await db.execute(
        select(models.Users)
        .where(models.Users.id == user_id)
    )
    return result.scalar_one_or_none()

async def get_users(db: AsyncSession, skip: int = 0, limit: int = 100) -> List[models.Users]:
    result = await db.execute(
        select(models.Users)
        .offset(skip)
        .limit(limit)
    )
    return result.scalars().all()

async def add_medications(db: AsyncSession, medications: schemas.MedicationCreate) -> models.Medication:

    db_medication = models.Medication(
        name=medications.name,
        side_effects=medications.side_effects,
    )
    db.add(db_medication)
    await db.commit()
    return db_medication

async def add_conditions(db: AsyncSession, user_id: int, conditions: List[str]) -> models.Users:
    db_user = await get_user(db, user_id)
    if db_user:
        if db_user.conditions:
            db_user.conditions.extend(conditions)
        else:
            db_user.conditions = conditions
        await db.commit()
        await db.refresh(db_user)
    return db_user

async def get_conditions(db: AsyncSession, user_id: int) -> List[str]:
    db_user = await get_user(db, user_id)
    if db_user:
        return db_user.conditions or []
    else:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
async def add_medical_history(db: AsyncSession, user_id: int, medical_history_data: schemas.MedicalHistoryCreate) -> models.MedicalHistory:
    # Get the user by id
    result = await db.execute(select(models.Users).where(models.Users.id == user_id))
    user = result.scalar_one_or_none()

    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    # Create the medical history entry
    medical_history = models.MedicalHistory(
        date=medical_history_data.date,
        details=medical_history_data.details,
        user_id=user_id  # Link this medical history to the user
    )

    db.add(medical_history)
    await db.commit()
    await db.refresh(medical_history)
    
    return medical_history



