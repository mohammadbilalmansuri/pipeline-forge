import { useState, useEffect, useRef } from "react";
import { useUpdateNodeField } from "@/stores";

const useDebouncedField = (
  nodeId,
  fieldName,
  initialValue,
  delay = 300,
  valueValidator = () => true,
) => {
  const updateNodeField = useUpdateNodeField();
  const [localValue, setLocalValue] = useState(initialValue);
  const timeoutRef = useRef(null);

  useEffect(() => {
    setLocalValue(initialValue);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [initialValue]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    if (!valueValidator(newValue)) return;
    setLocalValue(newValue);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      updateNodeField(nodeId, fieldName, newValue);
    }, delay);
  };

  return [handleChange, localValue, setLocalValue];
};

export default useDebouncedField;
