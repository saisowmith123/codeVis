from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from utils.executor import run_code
import uuid

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/static", StaticFiles(directory="static"), name="static")


class CodeRequest(BaseModel):
    language: str  # "python" or "r"
    code: str


@app.post("/generate")
async def generate_visualization(payload: CodeRequest):
    file_id = str(uuid.uuid4())
    result = run_code(payload.language, payload.code, file_id)
    if result["success"]:
        return {"url": f"/static/{result['file_name']}"}
    else:
        return {"error": result["error"]}
