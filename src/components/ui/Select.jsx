import { cn } from "@/utils";

const Select = ({
  value,
  onChange,
  options = [],
  placeholder,
  className,
  ...props
}) => (
  <select
    value={value}
    onChange={onChange}
    className={cn("input h-8 pl-1 cursor-pointer", className)}
    {...props}
  >
    {placeholder && (
      <option value="" disabled>
        {placeholder}
      </option>
    )}
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);

export default Select;
