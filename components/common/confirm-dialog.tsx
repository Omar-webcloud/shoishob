'use client';

import React from 'react';
import { Trash2, RotateCcw, CheckCircle2, X } from 'lucide-react';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText: string;
  cancelText?: string;
  variant?: 'danger' | 'primary';
  isSuccess?: boolean;
  successMessage?: string;
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText,
  cancelText = 'বাতিল করুন',
  variant = 'danger',
  isSuccess = false,
  successMessage = 'সফলভাবে সম্পন্ন হয়েছে!',
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  const isDanger = variant === 'danger';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border-2 border-[#2E6F40]/20 animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        {!isSuccess && (
          <button
            onClick={onClose}
            type="button"
            className="absolute top-4 right-4 p-2 rounded-full bg-black/5 hover:bg-black/10 text-[#253D2C] transition-colors cursor-pointer"
            aria-label="বন্ধ করুন"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {isSuccess ? (
          <div className="py-4 text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-green-100 text-green-700 mx-auto flex items-center justify-center animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-[#253D2C]">
              {successMessage}
            </h3>
            <p className="text-xs sm:text-sm text-[#253D2C]/75">
              হোমপেজে নিয়ে যাওয়া হচ্ছে...
            </p>
          </div>
        ) : (
          <div className="text-center space-y-4">
            {/* Icon */}
            <div
              className={`w-14 h-14 rounded-2xl mx-auto flex items-center justify-center shadow-xs ${
                isDanger
                  ? 'bg-red-100 text-red-600 border border-red-200'
                  : 'bg-[#CFFFD6] text-[#2E6F40] border border-[#2E6F40]/20'
              }`}
            >
              {isDanger ? (
                <Trash2 className="w-7 h-7" />
              ) : (
                <RotateCcw className="w-7 h-7" />
              )}
            </div>

            {/* Title & Description */}
            <div>
              <h3 className="text-xl font-extrabold text-[#253D2C]">
                {title}
              </h3>
              <p className="text-xs sm:text-sm text-[#253D2C]/80 mt-1.5 leading-relaxed">
                {description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
              <button
                type="button"
                onClick={onConfirm}
                className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm shadow-md transition-all cursor-pointer ${
                  isDanger
                    ? 'bg-red-600 hover:bg-red-700 text-white shadow-red-600/20 hover:shadow-red-600/30'
                    : 'bg-[#2E6F40] hover:bg-[#253D2C] text-white shadow-[#2E6F40]/20 hover:shadow-[#2E6F40]/30'
                }`}
              >
                {confirmText}
              </button>

              <button
                type="button"
                onClick={onClose}
                className="py-3 px-5 rounded-xl border border-black/15 text-[#253D2C] font-semibold text-sm hover:bg-black/5 transition-colors cursor-pointer"
              >
                {cancelText}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
