import localforage from "localforage";

export const streamBlobUpload = async (
  key: string,
  file: File,
  onProgress: (p: number) => void,
) => {
  const chunkSize = 1024 * 100;
  const reader = file.stream().getReader();
  const chunks: Uint8Array[] = [];
  let loaded = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    loaded += value?.length ?? 0;
    onProgress(Math.floor((loaded / file.size) * 100));
    chunks.push(value!);
  }

  const blob = new Blob(chunks, { type: file.type });
  await localforage.setItem(key, blob);
};

export const streamBlobDownload = async (
  key: string,
  onProgress: (p: number) => void,
): Promise<Blob | null> => {
  const blob = await localforage.getItem<Blob>(key);
  if (!blob) return null;

  const size = blob.size;
  const reader = blob.stream().getReader();
  let loaded = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    loaded += value?.length ?? 0;
    onProgress(Math.floor((loaded / size) * 100));
  }

  return blob;
};
