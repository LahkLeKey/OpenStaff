import localforage from "localforage";
import { useState } from "react";
import { streamBlobDownload, streamBlobUpload } from "../utils/stream";

localforage.config({
  name: "AppStorage",
  storeName: "blob_files",
});

export const useBlobStorage = () => {
  const [progress, setProgress] = useState<number>(0);

  const uploadFile = async (key: string, file: File) => {
    setProgress(0);
    await streamBlobUpload(key, file, setProgress);
  };

  const downloadFile = async (key: string): Promise<Blob | null> => {
    setProgress(0);
    return await streamBlobDownload(key, setProgress);
  };

  const deleteFile = async (key: string) => {
    await localforage.removeItem(key);
  };

  const getAllKeys = async (): Promise<string[]> => {
    return await localforage.keys();
  };

  return {
    uploadFile,
    downloadFile,
    deleteFile,
    getAllKeys,
    progress,
  };
};
