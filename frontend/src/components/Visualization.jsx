import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { Label } from "@/components/ui/label";

const Visualization = ({ visualizationData, loading }) => {
  const url = visualizationData?.url;
  const isImage = url?.endsWith(".png");

  return (
    <div className="flex flex-col gap-2">
      <Label className="text-md font-medium">Visualization Result</Label>

      <Card className="w-full">
        <CardContent className="p-6 space-y-4">
          <div className="flex justify-between items-center">
            {url && (
              <Button variant="link" className="text-sm" asChild>
                <a href={url} target="_blank" rel="noopener noreferrer">
                  Open in new tab <ExternalLink className="ml-1 w-4 h-4" />
                </a>
              </Button>
            )}
          </div>

          <div className="w-full h-[500px] rounded-md border flex items-center justify-center bg-white">
            {loading ? (
              <Skeleton className="w-full h-full" />
            ) : url ? (
              isImage ? (
                <img
                  src={url}
                  alt="Visualization"
                  className="max-h-full max-w-full object-contain"
                />
              ) : (
                <iframe
                  src={url}
                  title="Visualization"
                  className="w-full h-full border-none"
                  sandbox="allow-scripts"
                />
              )
            ) : (
              <div className="text-gray-500 text-sm">
                No visualization available. Submit your code to generate one.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Visualization;
