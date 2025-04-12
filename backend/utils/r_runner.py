from .base_runner import BaseRunner


class RRunner(BaseRunner):
    def get_docker_image(self):
        return "visucode-r"

    def get_output_filename(self):
        if "plotly" in self.code or "rgl" in self.code:
            return f"{self.file_id}.html"
        return f"{self.file_id}.png"

    def preprocess_code(self):
        output_path = f"/app/output/{self.get_output_filename()}"
        code = self.code

        if "ggplot" in code and "ggsave" not in code:
            code += f'\nggsave("{output_path}")'

        elif "plotly" in code and "saveWidget" not in code:
            code += f'\nlibrary(htmlwidgets)\nsaveWidget(p, "{output_path}")'

        elif "rgl" in code and "rglwidget" in code:
            code += f'\nlibrary(htmlwidgets)\nsaveWidget(rglwidget(), "{output_path}")'

        return code
