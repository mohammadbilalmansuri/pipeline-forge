import { cn } from "@/utils";

const NodeField = ({ label, className, children }) => (
  <div className={cn("flex flex-col gap-0.5", className)}>
    {label && (
      <label className="w-full text-left text-sm font-medium text-gray-700 pl-px">
        {label}
      </label>
    )}
    {children}
  </div>
);

export default NodeField;
