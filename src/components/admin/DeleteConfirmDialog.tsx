"use client";

interface DeleteConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

export default function DeleteConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
}: DeleteConfirmDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/30" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-xl max-w-md w-full mx-4 p-6">
        <h3 className="font-label font-semibold text-lg text-[#1a1c1a] mb-2">
          {title}
        </h3>
        <p className="text-sm text-[#1a1c1a]/70 font-body mb-6">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-label font-medium rounded-lg border border-[#e0ddd8] text-[#1a1c1a]/70 hover:bg-[#faf9f6] transition-colors"
          >
            Abbrechen
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2 text-sm font-label font-medium rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
          >
            Loschen
          </button>
        </div>
      </div>
    </div>
  );
}
