import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const Visualization = ({ visualizationData, loading }) => {
  const [visualizationUrl, setVisualizationUrl] = useState("");

  useEffect(() => {
    if (visualizationData) {
      if (visualizationData.type === "image") {
        setVisualizationUrl(visualizationData.data);
      } else if (visualizationData.type === "html") {
        const htmlContent = visualizationData.data;
        const blob = new Blob([htmlContent], { type: "text/html" });
        const url = URL.createObjectURL(blob);
        setVisualizationUrl(url);

        return () => URL.revokeObjectURL(url);
      }
    }
  }, [visualizationData]);

  return (
    <Card className="w-full mt-4">
      <CardContent className="p-6">
        <div className="flex flex-col items-center">
          <h3 className="text-lg font-medium mb-4">Visualization Result</h3>
          <div className="w-full h-[500px] border rounded-md overflow-hidden">
            {loading ? (
              <div className="w-full h-full flex items-center justify-center">
                <Skeleton className="w-full h-full" />
              </div>
            ) : visualizationUrl ? (
              <iframe
                src={visualizationUrl}
                title="Visualization"
                className="w-full h-full border-none"
                sandbox="allow-scripts"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                No visualization available. Generate one by submitting your
                code.
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Visualization;
