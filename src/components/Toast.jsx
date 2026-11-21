import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export function ToastContainer() {
  const { toasts, dismissToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div
      role="region"
      aria-label="Notifications"
      className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none"
    >
      <div aria-live="polite" className="flex flex-col gap-2 w-full">
        {toasts.map((toast) => {
          const isSuccess = toast.type === 'success';
          const isWarning = toast.type === 'warning';

          return (
            <div
              key={toast.id}
              role="status"
              className="pointer-events-auto flex items-center justify-between gap-3 p-3.5 bg-bg-surface/95 backdrop-blur border border-line-subtle shadow-floating rounded transition-all transform animate-in fade-in slide-in-from-bottom-2 duration-200"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                {isSuccess && <CheckCircle2 className="w-4 h-4 text-success shrink-0" />}
                {isWarning && <AlertCircle className="w-4 h-4 text-warning shrink-0" />}
                {!isSuccess && !isWarning && <Info className="w-4 h-4 text-accent shrink-0" />}
                <p className="text-xs font-sans text-text-primary leading-snug break-words">
                  {toast.message}
                </p>
              </div>
              <button
                type="button"
                onClick={() => dismissToast(toast.id)}
                className="text-text-tertiary hover:text-text-primary p-1 -mr-1 rounded hover:bg-bg-overlay transition-colors"
                aria-label="Dismiss notification"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
