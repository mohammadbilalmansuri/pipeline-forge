import { Plus, CircleX } from "lucide-react";
import { cn } from "@/utils";
import TextInput from "./TextInput";

const KeyValueEditor = ({
  value = [],
  onChange,
  keyPlaceholder = "Key",
  valuePlaceholder = "Value",
  className,
}) => {
  const handleAdd = () => {
    onChange([...value, { key: "", value: "" }]);
  };

  const handleRemove = (index) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const handleChange = (index, field, newValue) => {
    const updated = value.map((item, i) =>
      i === index ? { ...item, [field]: newValue } : item,
    );
    onChange(updated);
  };

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {value.map((item, index) => (
        <div key={index} className="flex items-center gap-1.5">
          <TextInput
            value={item.key}
            onChange={(e) => handleChange(index, "key", e.target.value)}
            placeholder={keyPlaceholder}
            className="text-xs py-1"
          />
          <TextInput
            value={item.value}
            onChange={(e) => handleChange(index, "value", e.target.value)}
            placeholder={valuePlaceholder}
            className="text-xs py-1"
          />
          <button
            onClick={() => handleRemove(index)}
            className="text-gray-500 hover:text-red-500 transition-colors"
            type="button"
          >
            <CircleX className="size-3.5" />
          </button>
        </div>
      ))}

      <button
        onClick={handleAdd}
        className="border flex items-center justify-center gap-1 py-1 text-xs rounded-md transition-colors cursor-pointer bg-indigo-50 text-indigo-500 hover:bg-indigo-100 border-indigo-100"
        type="button"
      >
        <Plus className="size-3.5" />
        Add
      </button>
    </div>
  );
};

export default KeyValueEditor;
