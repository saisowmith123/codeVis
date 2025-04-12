import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "./components/ui/spinner";
import toast, { Toaster } from "react-hot-toast";
import LanguageSelector from "./components/LanguageSelector";
import CodeEditor from "./components/CodeEditor";
import Visualization from "./components/Visualization";
import apiService from "./services/api";
import { saveCode, getSavedCode } from "./services/localStorage";
import { PlayCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Label } from "@/components/ui/label";
import { Info } from "lucide-react";

const App = () => {
  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState(() => getSavedCode("python"));
  const [loading, setLoading] = useState(false);
  const [visualization, setVisualization] = useState(null);

  useEffect(() => {
    setCode(getSavedCode(language));
  }, [language]);

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    saveCode(language, newCode);
  };

  const handleGenerateVisualization = async () => {
    if (!code.trim()) {
      toast.error("Please enter some code before generating a visualization.");
      return;
    }

    setLoading(true);
    try {
      const result = await apiService.generateVisualization(language, code);
      setVisualization(result);
      toast.success("Visualization generated successfully!");
    } catch (error) {
      toast.error(
        error.response?.data?.detail || "Failed to generate visualization."
      );
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <header className="pb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">VisuCode</h1>
          <p className="text-gray-600">
            Generate visualizations from Python or R code
          </p>
        </header>

        <div className="flex flex-col gap-8">
          <div className="relative w-full flex flex-col gap-2">
            <div className="flex justify-between items-end">
              <div className="flex items-center gap-2">
                <Label className="text-md font-medium">Code Editor</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="w-4 h-4 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent className="text-xs max-w-xs">
                      Use <strong>matplotlib</strong> or <strong>plotly</strong>{" "}
                      in Python.
                      <br />
                      Use <strong>ggplot2</strong>, <strong>plotly</strong>, or{" "}
                      <strong>rgl</strong> in R.
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <LanguageSelector
                selectedLanguage={language}
                onLanguageChange={setLanguage}
              />
            </div>

            <CodeEditor
              language={language}
              code={code}
              onChange={handleCodeChange}
            />

            <div className="absolute bottom-4 right-4 z-10">
              <Button
                onClick={handleGenerateVisualization}
                size="sm"
                className="rounded-sm"
                disabled={loading}
              >
                {loading ? (
                  <>
                    Generating
                    <Spinner className="mr-2" />
                  </>
                ) : (
                  <>
                    Generate Visualization
                    <PlayCircle className="w-5 h-5" />
                  </>
                )}
              </Button>
            </div>
          </div>

          <div>
            <Visualization
              visualizationData={visualization}
              loading={loading}
            />
          </div>
        </div>
      </div>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            duration: 3000,
            style: {
              background: "#22c55e", // Green background for success
            },
          },
          error: {
            duration: 4000,
            style: {
              background: "#ef4444", // Red background for errors
            },
          },
        }}
      />
    </div>
  );
};

export default App;
