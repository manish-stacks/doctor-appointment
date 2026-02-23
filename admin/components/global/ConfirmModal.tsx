import { AlertTriangle, Info, Trash2 } from "lucide-react";
import { useEffect } from "react";

const variants = {
  delete: {
    icon: <Trash2 className="h-6 w-6" />,
    bg: "bg-red-100",
    text: "text-red-600",
  },
  info: {
    icon: <Info className="h-6 w-6" />,
    bg: "bg-blue-100",
    text: "text-blue-600",
  },
  warning: {
    icon: <AlertTriangle className="h-6 w-6" />,
    bg: "bg-yellow-100",
    text: "text-yellow-600",
  },
};

type Variant = keyof typeof variants;
export function ConfirmModal({
  variant = "delete",
  title = "Delete item?",
  description = "This action cannot be undone. This will permanently remove the item.",
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
  onCancel,
  onConfirm,
}: {
  variant?: Variant;
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onCancel]);

  const current = variants[variant];
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onCancel}
      role="dialog"
      aria-modal="true"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl animate-in fade-in zoom-in"
      >
        {/* Icon */}
        <div
          className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full ${current.bg} ${current.text}`}
        >
          {current.icon}
        </div>


        {/* Content */}
        <h3 className="text-lg font-semibold text-gray-900 text-center">
          {title}
        </h3>

        <p className="mt-2 text-sm text-gray-600 text-center">
          {description}
        </p>

        {/* Actions */}
        <div className="mt-6 flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
          >
            {cancelLabel}
          </button>
          {/* ${current.bg} ${current.text} */}
          <button
            onClick={onConfirm}
            className={`flex-1 rounded-lg ${current.bg} px-4 py-2 text-sm font-medium ${current.text} hover:${current.bg} transition focus:ring-2 focus:ring-red-500`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
