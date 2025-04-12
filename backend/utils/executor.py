import subprocess
import os


def run_code(language, code, file_id):
    os.makedirs("static", exist_ok=True)
    ext = "py" if language == "python" else "r"
    code_filename = f"/tmp/{file_id}.{ext}"
    output_filename = f"{file_id}.html"  # expected output in static

    with open(code_filename, "w") as f:
        f.write(code)

    try:
        docker_image = "visucode-python" if language == "python" else "visucode-r"

        subprocess.run([
            "docker", "run", "--rm",
            "-v", f"{os.path.abspath('static')}:/app/output",
            "-v", f"{code_filename}:/app/script.{ext}",
            docker_image
        ], check=True)

        return {"success": True, "file_name": output_filename}

    except subprocess.CalledProcessError as e:
        return {"success": False, "error": str(e)}
