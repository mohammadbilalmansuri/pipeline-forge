import { cn } from "@/utils";
import useAutoResize from "@/hooks/useAutoResize";

const TextArea = ({
  value,
  onChange,
  onBlur,
  placeholder,
  className,
  minRows = 4,
  maxRows = 10,
  ...props
}) => {
  const { ref, resize } = useAutoResize(value, minRows, maxRows);

  const handleChange = (e) => {
    onChange?.(e);
    requestAnimationFrame(resize);
  };

  const handleInput = () => {
    requestAnimationFrame(resize);
  };

  return (
    <textarea
      ref={ref}
      value={value}
      onChange={handleChange}
      onInput={handleInput}
      onBlur={onBlur}
      placeholder={placeholder}
      rows={minRows}
      className={cn("input resize-none", className)}
      {...props}
    />
  );
};

export default TextArea;
