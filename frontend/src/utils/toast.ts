export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
  title?: string;
}

type ToastListener = (toast: Toast) => void;

class ToastManager {
  private listeners: ToastListener[] = [];

  subscribe(listener: ToastListener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  show(type: ToastType, message: string, title?: string) {
    const toast: Toast = {
      id: Date.now().toString(),
      type,
      message,
      title
    };
    
    this.listeners.forEach(listener => listener(toast));
  }

  success(message: string, title?: string) {
    this.show('success', message, title);
  }

  error(message: string, title?: string) {
    this.show('error', message, title);
  }

  info(message: string, title?: string) {
    this.show('info', message, title);
  }

  warning(message: string, title?: string) {
    this.show('warning', message, title);
  }
}

export const toastManager = new ToastManager(); 