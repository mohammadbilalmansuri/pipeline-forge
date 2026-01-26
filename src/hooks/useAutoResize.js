import { useRef, useEffect } from "react";

const useAutoResize = (value, minRows = 4, maxRows = 10) => {
  const textareaRef = useRef(null);

  const resize = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "auto";

    const computedStyle = window.getComputedStyle(textarea);
    const lineHeight = parseInt(computedStyle.lineHeight) || 20;
    const minHeight = lineHeight * minRows;
    const maxHeight = lineHeight * maxRows;
    const scrollHeight = textarea.scrollHeight;
    const newHeight = Math.min(Math.max(scrollHeight, minHeight), maxHeight);

    textarea.style.height = `${newHeight}px`;
    textarea.style.overflowY = scrollHeight > maxHeight ? "auto" : "hidden";
  };

  useEffect(() => {
    resize();
  }, [value, minRows, maxRows]);

  return { ref: textareaRef, resize };
};

export default useAutoResize;
