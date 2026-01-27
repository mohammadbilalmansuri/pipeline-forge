import { CircleX } from "lucide-react";
import { cn } from "@/utils";

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidthClassName = "max-w-md",
  extraClassName = "",
  className = "",
}) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose?.();
  };

  return (
    <div
      className={
        "fixed inset-0 z-50 flex bg-black/50 items-center justify-center"
      }
      onClick={handleBackdropClick}
    >
      <div
        className={cn(
          "bg-white rounded-xl shadow-xl w-full mx-4 overflow-hidden p-2.5",
          maxWidthClassName,
          extraClassName,
        )}
      >
        {title && (
          <div className="w-full relative flex items-center justify-between p-3 rounded-lg border bg-indigo-50 border-indigo-100">
            <h2 className="text-lg font-semibold text-gray-900 leading-none">
              {title}
            </h2>

            <button
              onClick={onClose}
              className="text-gray-500 hover:text-red-500 transition-colors cursor-pointer"
            >
              <CircleX className="size-5" />
            </button>
          </div>
        )}

        <div className={cn("w-full relative px-2.5 pt-5 pb-3", className)}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
