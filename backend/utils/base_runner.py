from abc import ABC, abstractmethod


class BaseRunner(ABC):
    def __init__(self, code: str, file_id: str):
        self.code = code
        self.file_id = file_id

    @abstractmethod
    def get_docker_image(self) -> str:
        pass

    @abstractmethod
    def get_output_filename(self) -> str:
        pass

    @abstractmethod
    def preprocess_code(self) -> str:
        pass
