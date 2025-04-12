type ToastOptions = { title: string; description?: string };

export const toast = (options: ToastOptions) => {
  const event = new CustomEvent("show-toast", { detail: options });
  window.dispatchEvent(event);
};
