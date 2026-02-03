import { Position } from "reactflow";
import { CircleX } from "lucide-react";
import { ID_VALIDATION_REGEX } from "@/config";
import { useAddEdgeFromVariable, useRemoveNode } from "@/stores";
import { useDebouncedField, useConfirm } from "@/hooks";
import { cn, extractVariables } from "@/utils";
import NodeHandle from "./NodeHandle";
import VariableBadges from "./VariableBadges";

const BaseNode = ({
  id,
  data,
  title,
  Icon,
  children,
  hasInput = true,
  hasOutput = true,
  variableFields = [],
  selected,
  className,
}) => {
  const addEdgeFromVariable = useAddEdgeFromVariable();
  const removeNode = useRemoveNode();

  const [handleIdChange, localId] = useDebouncedField(
    id,
    "id",
    id,
    300,
    (value) => value === "" || ID_VALIDATION_REGEX.test(value),
  );
  const [confirmDelete, handleDelete] = useConfirm(() => removeNode(id));

  const handleContentBlur = () => {
    if (variableFields.length === 0) return;

    const allVariables = new Set();

    for (const field of variableFields) {
      const value = data[field];
      if (value && typeof value === "string") {
        for (const v of extractVariables(value)) {
          allVariables.add(v);
        }
      }
    }

    const targetHandle = `${id}-input`;
    for (const variable of allVariables) {
      addEdgeFromVariable(variable, id, targetHandle);
    }
  };

  return (
    <div
      className={cn(
        "bg-white flex flex-col gap-1.5 rounded-lg shadow-lg min-w-60 max-w-100 relative border-1.5 transition-all p-1.25 pb-2.5",
        selected
          ? "border-indigo-500"
          : "border-gray-200 hover:border-gray-300",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-5 p-1.25 rounded-md border bg-indigo-50 border-indigo-100">
        <h3 className="flex items-center gap-1.25">
          {Icon && <Icon className="size-4 text-indigo-500 shrink-0" />}
          <span className="font-semibold text-sm leading-none">{title}</span>
        </h3>
        <button
          onClick={handleDelete}
          className={cn(
            "nodrag cursor-pointer transition-colors",
            confirmDelete ? "text-red-500" : "text-gray-500 hover:text-red-500",
          )}
        >
          <CircleX className="size-4" />
        </button>
      </div>

      <input
        type="text"
        value={localId}
        onChange={handleIdChange}
        className="flex-1 bg-gray-50 border border-gray-100 rounded px-2 py-0.5 text-center text-xs text-gray-900 focus:outline-none focus:border-indigo-300 nodrag placeholder:text-gray-500"
        placeholder="node_id"
      />

      <div className="px-1.5 nodrag" onBlur={handleContentBlur}>
        {children}
      </div>

      <VariableBadges data={data} variableFields={variableFields} />

      {hasOutput && (
        <NodeHandle
          type="source"
          position={Position.Right}
          id={`${id}-output`}
        />
      )}
      {hasInput && (
        <NodeHandle type="target" position={Position.Left} id={`${id}-input`} />
      )}
    </div>
  );
};

export default BaseNode;
