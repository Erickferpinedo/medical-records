# main.py
from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from database import async_session, engine, get_db      
import crud, models, schemas
from sqlalchemy.orm import selectinload
from contextlib import asynccontextmanager
import logging
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from utils import get_password_hash, verify_password, create_access_token, decode_access_token, ACCESS_TOKEN_EXPIRE_MINUTES
from datetime import timedelta
from database import engine
from fastapi.middleware.cors import CORSMiddleware
from model import medicine_ai,predict
from tensorflow.keras.models import Sequential
from schemas import MedRequest
@asynccontextmanager
async def lifespan(app: FastAPI):
    
    # Startup: Create database tables
    async with engine.begin() as conn:
        await conn.run_sync(models.Base.metadata.create_all)
    
    # You can add more startup tasks here if needed
    
    yield  # Application is running
    
    # Shutdown: Close database connections or perform cleanup
    # If you have any cleanup tasks, add them here
    # Example:
    # await engine.dispose()

# Initialize FastAPI with the lifespan event handlers
app = FastAPI(lifespan=lifespan)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow any origin
    allow_credentials=True,  # If you need to allow credentials (cookies/auth)
    allow_methods=["*"],  # Allow all methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Allow all headers
)
# logger information
logger = logging.getLogger("fastapi_logger")

logger.setLevel(logging.INFO)
console_handler = logging.StreamHandler()
file_handler = logging.FileHandler("app.log")

formatter = logging.Formatter("%(asctime)s - %(name)s - %(levelname)s - %(message)s")
console_handler.setFormatter(formatter)
file_handler.setFormatter(formatter)

logger.addHandler(console_handler)
logger.addHandler(file_handler)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


ai_model = medicine_ai()




async def get_current_user(token: str = Depends(oauth2_scheme), db: AsyncSession = Depends(get_db)) -> schemas.Users:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    payload = decode_access_token(token)
    if payload is None:
        raise credentials_exception
    user_id: int = payload.get("sub")
    if user_id is None:
        raise credentials_exception
    user = await crud.get_user(db, user_id)
    if user is None:
        raise credentials_exception
    return user

@app.post("/users/medicalhistory", response_model=schemas.MedicalHistory)
async def add_medical_history( 
    medical_history: schemas.MedicalHistoryCreate, 
    db: AsyncSession = Depends(get_db), 
    current_user: schemas.Users = Depends(get_current_user)  # Authenticated user
):
    """
    Endpoint to add a medical history entry for a specific user.
    Only the authenticated user or authorized roles (e.g., health officials) can add medical history.
    """

    # Ensure that the current user is either the same as the user_id or has an authorized role
    
    # Proceed with adding medical history
    response = await crud.add_medical_history(db, user_id=current_user.id, medical_history_data=medical_history)
    return response

@app.post("/token", response_model=schemas.Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: AsyncSession = Depends(get_db)):
    """
    Endpoint to authenticate user and return a JWT token.
    """
    user = await crud.get_user_by_email(db, form_data.username)
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    if not verify_password(form_data.password, user.password):
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.id},  # 'sub' is a standard claim for subject
        expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/users/", response_model=schemas.Users)
async def create_user(user: schemas.UsersCreate, db: AsyncSession = Depends(get_db)):
    logger.info("Creating user")
  
    try:
        existing_user = await crud.get_user_by_email(db, email=user.email)
    except Exception as e:
        print(f"--------------{e}")

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    response = await crud.create_user(db, user=user)
    return response

@app.get("/users/{user_id}", response_model=schemas.Users)
async def read_user(user_id: int, current_user: models.Users = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    
    user = await crud.get_user(db, user_id=user_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return user

@app.post("/medications/", response_model=schemas.Medication)
async def add_medications( medications: schemas.MedicationCreate, db: AsyncSession = Depends(get_db)):
   
    user = await crud.add_medications(db, medications=medications)
    return user


@app.post("/users/{user_id}/conditions/", response_model=schemas.Users)
async def add_conditions(user_id: int, conditions: List[str], db: AsyncSession = Depends(get_db)):
 
    user = await crud.add_conditions(db, user_id=user_id, conditions=conditions)
    return user

@app.get("/users/{user_id}/conditions/", response_model=List[str])
async def get_conditions(user_id: int, db: AsyncSession = Depends(get_db)):
    conditions = crud.get_conditions(db, user_id)
    return conditions

@app.post("/ai")
async def get_predictions(request: MedRequest):
    med = request.med  # Accessing the "med" field from the body
    response = predict(ai_model, med)
    return response
