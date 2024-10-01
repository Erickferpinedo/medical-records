from enum import Enum

class UserRole(str, Enum):
    HEALTH_OFFICIAL = "health_official"
    PATIENT = "patient"
    ADMIN = "admin"