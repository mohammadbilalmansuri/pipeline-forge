import { useEffect, useState, useRef } from "react";
import { CheckCircle } from "lucide-react";
import { useNodes, useEdges } from "@/stores";

const SavedStatusBadge = () => {
  const nodes = useNodes();
  const edges = useEdges();
  const [show, setShow] = useState(false);
  const isFirstRender = useRef(true);
  const prevStateRef = useRef({
    nodeCount: nodes.length,
    edgeCount: edges.length,
  });

  useEffect(() => {
    const currentState = { nodeCount: nodes.length, edgeCount: edges.length };
    const hasChanged =
      prevStateRef.current.nodeCount !== currentState.nodeCount ||
      prevStateRef.current.edgeCount !== currentState.edgeCount;

    prevStateRef.current = currentState;

    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (!hasChanged || (nodes.length === 0 && edges.length === 0)) return;

    setShow(true);
    const hideTimer = setTimeout(() => setShow(false), 2000);

    return () => clearTimeout(hideTimer);
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
