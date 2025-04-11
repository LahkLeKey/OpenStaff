/**
 * MIT License
 * Copyright (c) 2025 OpenStaff
 * Source: https://github.com/LahkLeKey/OpenStaff
 */

type ToastOptions = { title: string; description?: string };

export const toast = (options: ToastOptions) => {
  const event = new CustomEvent("show-toast", { detail: options });
  window.dispatchEvent(event);
};
