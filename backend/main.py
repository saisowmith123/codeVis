import os
import subprocess
from fastapi import FastAPI
from pydantic import BaseModel
from utils.factory import get_runner
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class CodeRequest(BaseModel):
    language: str
    code: str


@app.post("/generate")
async def generate_visualization(req: CodeRequest):
    file_id = os.urandom(6).hex()
    os.makedirs("static", exist_ok=True)
    ext = "py" if req.language == "python" else "r"

    try:
        runner = get_runner(req.language, req.code, file_id)
        processed_code = runner.preprocess_code()
        code_path = f"/tmp/{file_id}.{ext}"

        with open(code_path, "w") as f:
            f.write(processed_code)

        # subprocess.run([
        #     "docker", "run", "--rm",
        #     "-v", f"{os.path.abspath('static')}:/app/output",
        #     "-v", f"{code_path}:/app/script.{ext}",
        #     runner.get_docker_image()
        # ], check=True)

        if req.language == "python":
            subprocess.run(["python", code_path], check=True)
        else:
            subprocess.run(["Rscript", code_path], check=True)


        return {"url": f"http://localhost:8000/static/{runner.get_output_filename()}"}

    except subprocess.CalledProcessError as e:
        return {"error": f"Execution failed: {e}"}

    except Exception as e:
        return {"error": str(e)}
