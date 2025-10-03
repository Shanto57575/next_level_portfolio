"use client";

import { toast } from "sonner";

export const confirmDeleteToast = (onConfirm: () => void) => {
  toast.custom(
    (id) => (
      <div className="flex flex-col gap-2 bg-black text-white p-4 rounded shadow-md">
        <span>Are you sure you want to delete this blog?</span>
        <div className="flex gap-2 justify-center mt-2">
          <button
            className="px-3 py-1 bg-gray-300 text-black rounded hover:bg-gray-400 text-sm"
            onClick={() => toast.dismiss(id)}
          >
            Cancel
          </button>
          <button
            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
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
