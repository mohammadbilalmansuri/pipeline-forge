import { cn } from "@/utils";

const TextInput = ({
  value,
  onChange,
  onBlur,
  placeholder,
  type = "text",
  className,
  ...props
}) => (
  <input
    type={type}
    value={value}
    onChange={onChange}
    onBlur={onBlur}
    placeholder={placeholder}
    className={cn("input h-8", className)}
    {...props}
  />
);

export default TextInput;
