import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center space-x-2", className)}>
      {/* Stylized S (green icon) */}
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-tr from-blue-500 via-blue-400 to-blue-600 text-white font-extrabold text-xl shadow-md">
        S
      </div>

      {/* Text + Motto */}
      <div className="flex flex-col leading-tight">
        <span className="text-xl font-bold text-black dark:text-white">
          Shanto
        </span>
        <span className="text-xs text-gray-600 dark:text-gray-300 tracking-wide">
          Code. Create. Innovate.
        </span>
      </div>
    </div>
  );
}
