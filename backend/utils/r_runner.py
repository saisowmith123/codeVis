from .base_runner import BaseRunner
import re

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
        # if "plotly" in code:
        #     code += (
        #         '\nlibrary(htmlwidgets)'
        #         f'\nsaveWidget(if (exists("fig")) fig else p, "{output_path}")'
        #     )


        
        if "plotly" in code and "saveWidget" not in code:
            match = re.search(r'(\w+)\s*<-\s*ggplotly\(', code)
            plot_var = match.group(1) if match else "p"
            code += f'\nlibrary(htmlwidgets)\nsaveWidget({plot_var}, "{output_path}")'

        elif "ggplot" in code and "ggsave" not in code:
            code += f'\nggsave("{output_path}")'


        elif "rgl" in code and "rglwidget" in code:
            code += f'\nlibrary(htmlwidgets)\nsaveWidget(rglwidget(), "{output_path}")'

        return code
