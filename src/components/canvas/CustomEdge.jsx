import {
  BaseEdge,
  EdgeLabelRenderer,
  getBezierPath,
  useReactFlow,
} from "reactflow";
import { CircleX } from "lucide-react";
import { useConfirm } from "@/hooks";
import { cn } from "@/utils";

const CustomEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  selected,
}) => {
  const { setEdges } = useReactFlow();

  const [confirmDelete, handleDelete] = useConfirm(() => {
    setEdges((edges) => edges.filter((edge) => edge.id !== id));
  });

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const edgeStyle = {
    stroke: confirmDelete ? "var(--color-red-500)" : "var(--color-indigo-500)",
    strokeWidth: selected ? 1.5 : 1,
  };

  const buttonStyle = {
    transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
    zIndex: selected ? 3 : 2,
  };

  return (
    <>
      <BaseEdge path={edgePath} style={edgeStyle} />

      <EdgeLabelRenderer>
        <button
          onClick={handleDelete}
          className={cn(
            "absolute pointer-events-auto nodrag nopan rounded-full flex items-center justify-center cursor-pointer transition-colors bg-white",
            confirmDelete
              ? "text-red-500"
              : "text-indigo-500 hover:text-red-500",
          )}
          style={buttonStyle}
        >
          <CircleX className="size-4" />
        </button>
      </EdgeLabelRenderer>
    </>
  );
};

export default CustomEdge;
