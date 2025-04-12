import os
import subprocess
from fastapi import FastAPI
from pydantic import BaseModel
from utils.runner.factory import get_runner
from fastapi.staticfiles import StaticFiles

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")


class CodeRequest(BaseModel):
    language: str
    code: str


@app.post("/generate")
async def generate_visualization(req: CodeRequest):
    file_id = os.urandom(6).hex()
    os.makedirs("static", exist_ok=True)

    try:
        runner = get_runner(req.language, req.code, file_id)
        processed_code = runner.preprocess_code()
        code_path = f"/tmp/{file_id}.{req.language}"

        with open(code_path, "w") as f:
            f.write(processed_code)

        subprocess.run([
            "docker", "run", "--rm",
            "-v", f"{os.path.abspath('static')}:/app/output",
            "-v", f"{code_path}:/app/script.{req.language}",
            runner.get_docker_image()
        ], check=True)

        return {"url": f"/static/{runner.get_output_filename()}"}

    except subprocess.CalledProcessError as e:
        return {"error": f"Execution failed: {e}"}

    except Exception as e:
        return {"error": str(e)}
