from .python_runner import PythonRunner
from .r_runner import RRunner


def get_runner(language: str, code: str, file_id: str):
    if language == "python":
        return PythonRunner(code, file_id)
    elif language == "r":
        return RRunner(code, file_id)
    else:
        raise ValueError(f"Unsupported language: {language}")
