import { useEffect } from 'react';
import { CheckCircle, X, AlertCircle, AlertTriangle, Info } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  onClose: () => void;
  duration?: number;
}

export function Toast({ message, type = 'success', onClose, duration = 4000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const config = {
    success: {
      icon: CheckCircle,
      bgColor: 'bg-coffee-brown',
      textColor: 'text-white',
    },
    error: {
      icon: AlertCircle,
      bgColor: 'bg-red-500',
      textColor: 'text-white',
    },
    warning: {
      icon: AlertTriangle,
      bgColor: 'bg-warm-amber',
      textColor: 'text-white',
    },
    info: {
      icon: Info,
      bgColor: 'bg-medium-roast',
      textColor: 'text-white',
    },
  };

  const { icon: IconComponent, bgColor, textColor } = config[type];

  return (
    <div className="fixed top-6 right-6 z-[9999] animate-slide-up">
      <div className={`${bgColor} ${textColor} px-6 py-4 rounded-xl shadow-2xl border-2 border-white/20 flex items-center space-x-3 max-w-md backdrop-blur-sm`}>
        <IconComponent size={24} className="flex-shrink-0" />
        <p className="font-medium">{message}</p>
        <button
          onClick={onClose}
          className="p-1 hover:bg-white/20 rounded-full transition-colors duration-200 flex-shrink-0"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
}