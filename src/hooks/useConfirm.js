import { useState, useEffect } from "react";

const useConfirm = (onConfirm, initialState = false, timeout = 3000) => {
  const [confirm, setConfirm] = useState(initialState);

  useEffect(() => {
    if (!confirm) return;
    const timer = setTimeout(() => setConfirm(false), timeout);
    return () => clearTimeout(timer);
  }, [confirm, timeout]);

  const handleAction = (e) => {
    if (e) e.stopPropagation();

    if (!confirm) {
      setConfirm(true);
      return;
    }

    setConfirm(false);
    onConfirm();
  };

  return [confirm, handleAction];
};

export default useConfirm;
