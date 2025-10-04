"use client";

import { toast } from "sonner";
import { AlertTriangle } from "lucide-react";

export const confirmDeleteToast = (onConfirm: () => void) => {
  toast.custom(
    (id) => (
      <div className="flex flex-col gap-3 bg-white border border-gray-200 p-5 rounded-xl shadow-lg max-w-sm w-full backdrop-blur-sm">
        {/* Icon & Message */}
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-red-600" />
          </div>
          <div className="flex-1 pt-0.5">
            <h3 className="text-base font-semibold text-gray-900 mb-1">
              Delete it?
            </h3>
            <p className="text-sm text-gray-600">
              This action cannot be undone. It will be permanently removed.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 justify-end mt-1">
          <button
            className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 active:scale-95 transition-all duration-200"
            onClick={() => toast.dismiss(id)}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 active:scale-95 transition-all duration-200 shadow-sm"
            onClick={() => {
              toast.dismiss(id);
              onConfirm();
            }}
          >
            Delete
          </button>
        </div>
      </div>
    ),
    { position: "top-center", duration: Infinity }
  );
};
