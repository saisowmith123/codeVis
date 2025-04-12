import re
from .base_runner import BaseRunner


class PythonRunner(BaseRunner):
    def get_docker_image(self):
        return "visucode-python"

    def get_output_filename(self):
        if any(lib in self.code for lib in ["plotly", "bokeh", "mpld3"]):
            return f"{self.file_id}.html"
        return f"{self.file_id}.png"

    def preprocess_code(self):
        output_path = f"/app/output/{self.get_output_filename()}"
        processed = self.code

        if "matplotlib" in self.code and "plt.show()" in self.code:
            processed = processed.replace(
                "plt.show()", f"plt.savefig('{output_path}')")

        if "plotly" in processed and "write_html" not in processed:
            processed += f"\nfig.write_html('{output_path}')"

        return processed
