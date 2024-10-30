// toast.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toasts: { message: string; type: 'success' | 'error' | 'info' }[] = [];

  show(message: string, type: 'success' | 'error' | 'info' = 'info') {
    this.toasts.push({ message, type });
    setTimeout(() => this.removeToast(), 3000); // Auto-dismiss after 3 seconds
  }

  private removeToast() {
    this.toasts.shift(); // Remove the oldest toast
  }
}
