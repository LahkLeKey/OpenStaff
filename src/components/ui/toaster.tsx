import React, { useEffect, useState } from "react";

type ToastOptions = { title: string; description?: string };

export function Toaster() {
  const [toast, setToast] = useState<ToastOptions | null>(null);

  useEffect(() => {
    const handler = (e: any) => {
      setToast(e.detail);
      setTimeout(() => setToast(null), 3000);
    };
    window.addEventListener("show-toast", handler);
    return () => window.removeEventListener("show-toast", handler);
  }, []);

  if (!toast) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-black text-white px-4 py-2 rounded shadow-lg z-50">
      <div className="font-bold">{toast.title}</div>
      {toast.description && <div className="text-sm">{toast.description}</div>}
    </div>
  );
}
