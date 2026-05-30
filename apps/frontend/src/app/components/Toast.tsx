"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconCheck, IconX, IconInfoCircle } from "@tabler/icons-react";

export type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
  message: string;
  type: ToastType;
  isVisible: boolean;
  onClose: () => void;
}

export default function Toast({ message, type, isVisible, onClose }: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  const icons = {
    success: <IconCheck className="text-green-400" size={20} />,
    error: <IconX className="text-red-400" size={20} />,
    info: <IconInfoCircle className="text-brand-cyan" size={20} />
  };

  const borderColors = {
    success: 'border-green-500/30',
    error: 'border-red-500/30',
    info: 'border-brand-cyan/30'
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <div className={`flex items-center gap-3 px-4 py-3 bg-surface-container-high border ${borderColors[type]} rounded-xl shadow-2xl backdrop-blur-lg`}>
            {icons[type]}
            <p className="text-sm font-medium text-white">{message}</p>
            <button 
              onClick={onClose}
              className="ml-4 text-on-surface-variant hover:text-white transition-colors"
            >
              <IconX size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
