import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import mimeDb from "mime-db";
import { useEffect, useState } from "react";

interface FilePreviewProps {
  blob: Blob | null;
}

export const FilePreview = ({ blob }: FilePreviewProps) => {
  const [url, setUrl] = useState<string | null>(null);
  const [textContent, setTextContent] = useState<string | null>(null);
  const [jsonContent, setJsonContent] = useState<any>(null);
  const [mimeLabel, setMimeLabel] = useState<string>("");

  useEffect(() => {
    if (!blob) return;

    const objectUrl = URL.createObjectURL(blob);
    setUrl(objectUrl);

    const mime = blob.type;
    const mimeInfo = mimeDb[mime];
    if (mimeInfo) {
      const extension = mimeInfo.extensions?.[0]?.toUpperCase();
      setMimeLabel(extension || mime);
    } else {
      setMimeLabel(mime || "Unknown");
    }

    // Load text or JSON content
    if (mime.startsWith("text/") || mime === "application/json" || mime === "application/xml") {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        if (mime === "application/json") {
          try {
            const parsed = JSON.parse(result);
            setJsonContent(parsed);
          } catch {
            setTextContent("⚠️ Invalid JSON format.");
          }
        } else {
          setTextContent(result);
        }
      };
      reader.readAsText(blob);
    }

    return () => {
      URL.revokeObjectURL(objectUrl);
      setTextContent(null);
      setJsonContent(null);
      setMimeLabel("");
    };
  }, [blob]);

  if (!blob || !url) return null;

  const type = blob.type;
  const sizeInKB = (blob.size / 1024).toFixed(1);

  const renderTextBlock = (content: string) => (
    <ScrollArea className="max-h-64 rounded border p-4 bg-muted text-sm overflow-auto">
      <pre className="whitespace-pre-wrap break-words">{content}</pre>
    </ScrollArea>
  );

  return (
    <Card className="mt-4">
      <CardContent className="pt-4 space-y-4">
        <div className="text-xs text-muted-foreground font-mono tracking-wide">
          MIME: <span className="text-foreground">{type}</span> {mimeLabel && `(${mimeLabel})`} •{" "}
          {sizeInKB} KB
        </div>

        {/* PREVIEW TYPES */}
        {type.startsWith("image/") && (
          <img src={url} alt="Image preview" className="max-w-full max-h-96 rounded border" />
        )}

        {type.startsWith("video/") && (
          <video src={url} controls className="w-full max-h-96 rounded border" />
        )}

        {type.startsWith("audio/") && <audio src={url} controls className="w-full mt-2" />}

        {type === "application/pdf" && (
          <embed
            src={url}
            type="application/pdf"
            width="100%"
            height="600px"
            className="rounded border"
          />
        )}

        {/* RAW TEXT */}
        {textContent && type !== "application/json" && renderTextBlock(textContent)}

        {/* JSON BLOCK */}
        {jsonContent && renderTextBlock(JSON.stringify(jsonContent, null, 2))}

        {/* FALLBACK */}
        {typeof type === "string" &&
          !type?.toString().match(/^(image|video|audio|application\/pdf|text|application\/json)/) &&
          !textContent &&
          !jsonContent && (
            <Alert className="bg-muted border">
              <AlertDescription>
                This file type cannot be previewed. You can download it below:
              </AlertDescription>
              <Button asChild variant="link" className="mt-2 px-0">
                <a href={url} download="file">
                  Download File
                </a>
              </Button>
            </Alert>
          )}
      </CardContent>
    </Card>
  );
};
