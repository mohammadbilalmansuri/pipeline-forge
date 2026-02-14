import { useEffect, useRef, useState } from "react";
import { CheckCircle } from "lucide-react";
import { useNodes, useEdges } from "@/stores";

const SavedStatusBadge = () => {
  const nodes = useNodes();
  const edges = useEdges();
  const [show, setShow] = useState(false);

  const hideTimerRef = useRef(null);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setShow(true);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      hideTimerRef.current = setTimeout(() => setShow(false), 3000);
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [nodes, edges]);

  if (!show) return null;

  return (
    <div className="flex items-center gap-1 px-2 py-1.5 rounded-lg shadow-sm bg-green-50 border border-green-200 text-green-600">
      <CheckCircle className="size-4" />
      <span className="text-xs font-medium">Saved</span>
    </div>
  );
};

export default SavedStatusBadge;
