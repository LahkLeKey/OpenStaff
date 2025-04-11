"use client";

import { FilePreview } from "@/components/core/Blob/components/FilePreview";
import { useBlobStorage } from "@/components/core/Blob/hooks/useBlobStorage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Dialog, DialogClose, DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import { Progress } from "@radix-ui/react-progress";
import { useCallback, useState } from "react";
import { Button } from "react-day-picker";
import { Label } from "recharts";

export default function Blob() {
  const { uploadFile, downloadFile, deleteFile, getAllKeys, progress } = useBlobStorage();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewBlob, setPreviewBlob] = useState<Blob | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [storedKeys, setStoredKeys] = useState<string[]>([]);

  const handleUpload = async () => {
    for (const file of selectedFiles) {
      await uploadFile(file.name, file);
    }
    setSelectedFiles([]);
    setStoredKeys(await getAllKeys());
  };

  const handleDownload = async (key: string) => {
    const blob = await downloadFile(key);
    setPreviewBlob(blob);
    setPreviewOpen(true);
  };

  const handleDelete = async (key: string) => {
    await deleteFile(key);
    setStoredKeys(await getAllKeys());
    setPreviewBlob(null);
  };

  const loadStored = async () => {
    const keys = await getAllKeys();
    setStoredKeys(keys);
  };

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    setSelectedFiles(files);
  }, []);

  return (
    <main className="p-6 space-y-6 max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">📦 Blob Storage Demo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div
            onDrop={onDrop}
            onDragOver={(e) => e.preventDefault()}
            className="w-full p-6 border-2 border-dashed border-gray-300 rounded bg-muted text-center"
          >
            <Label className="block mb-2">Drag and drop files here</Label>
            <Input
              type="file"
              multiple
              onChange={(e) => setSelectedFiles(Array.from(e.target.files ?? []))}
            />
          </div>

          {selectedFiles.length > 0 && (
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">
                {selectedFiles.length} file(s) selected
              </div>
              <Button onClick={handleUpload}>Upload</Button>
              {progress > 0 && <Progress value={progress} className="h-2" />}
            </div>
          )}

          <div>
            <Button onClick={loadStored}>Load Stored Files</Button>

            <ul className="mt-4 space-y-2">
              {storedKeys.map((key) => (
                <li key={key} className="flex items-center justify-between border p-2 rounded">
                  <span className="truncate max-w-xs">{key}</span>
                  <div className="flex gap-2">
                    <Button onClick={() => handleDownload(key)}>Preview</Button>
                    <Button onClick={() => handleDelete(key)}>Delete</Button>
                  </div>
                </li>
              ))}
            </ul>

            {progress > 0 && <Progress value={progress} className="h-2 mt-2" />}
          </div>
        </CardContent>
      </Card>

      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>File Preview</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <FilePreview blob={previewBlob} />
          </div>
          <DialogClose asChild>
            <Button className="mt-4">Close</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </main>
  );
}
