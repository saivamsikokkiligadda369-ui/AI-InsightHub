from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)

from sqlalchemy.orm import Session

from app.database import get_db
from app.models.user import User
from app.schemas.auth import (
    RegisterSchema,
    LoginSchema,
    RefreshSchema
)

from app.security import (
    hash_password,
    verify_password,
    create_access_token,
    create_refresh_token,
    verify_token,
    get_current_user
)

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)

@router.post("/register")
def register(
    data: RegisterSchema,
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(
        User.email == data.email
    ).first()

    if user:
        raise HTTPException(
            400,
            "Email exists"
        )

    new_user = User(
        email=data.email,
        password=hash_password(
            data.password
        )
    )

    db.add(new_user)
    db.commit()

    return {
        "message": "Registered"
    }

@router.post("/login")
def login(
    data: LoginSchema,
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(
        User.email == data.email
    ).first()

    if not user:
        raise HTTPException(
            401,
            "Invalid credentials"
        )

    if not verify_password(
        data.password,
        user.password
    ):
        raise HTTPException(
            401,
            "Invalid credentials"
        )

    return {
        "access_token":
            create_access_token(
                {"sub": user.email}
            ),
        "refresh_token":
            create_refresh_token(
                {"sub": user.email}
            )
    }

@router.post("/refresh")
def refresh(
    data: RefreshSchema
):
    payload = verify_token(
        data.refresh_token
    )

    return {
        "access_token":
            create_access_token(
                {"sub":
                 payload["sub"]}
            )
    }

@router.get("/me")
def me(
    user=Depends(
        get_current_user
    )
):
    return {
        "email": user
    }