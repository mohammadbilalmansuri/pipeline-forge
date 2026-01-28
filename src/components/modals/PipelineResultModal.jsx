import { CheckCircle, AlertCircle } from "lucide-react";
import { cn } from "@/utils";
import Modal from "./Modal";

const PipelineResultModal = ({ isOpen, onClose, result }) => {
  if (!result) return null;

  const { nodeCount, edgeCount, isDag } = result;
  const isEmpty = nodeCount === 0;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Pipeline Analysis"
      className="flex flex-col gap-5"
    >
      {isEmpty ? (
        <div className="bg-gray-50 border border-gray-100 rounded-lg p-3 flex items-center gap-3">
          <AlertCircle className="size-6 text-gray-600 shrink-0" />
          <div className="flex flex-col gap-0.5">
            <div className="font-semibold text-gray-900">No Nodes Found</div>
            <div className="text-sm text-gray-600">
              Add some nodes to the canvas to analyze the pipeline.
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-5">
            <div className="bg-gray-50 rounded-lg p-5 text-center border border-gray-100 flex flex-col items-center gap-1">
              <div className="text-3xl font-bold">{nodeCount}</div>
              <h4 className="font-medium text-md">Nodes</h4>
            </div>

            <div className="bg-gray-50 rounded-lg p-5 text-center border border-gray-100 flex flex-col items-center gap-1">
              <div className="text-3xl font-bold">{edgeCount}</div>
              <h4 className="font-medium text-md">Edges</h4>
            </div>
          </div>

          <div
            className={cn(
              "rounded-lg p-3 flex items-center gap-3 border",
              isDag
                ? "bg-emerald-50 border-emerald-100"
                : "bg-amber-50 border-amber-100",
            )}
          >
            {isDag ? (
              <CheckCircle className="size-6 text-emerald-500 shrink-0" />
            ) : (
              <AlertCircle className="size-6 text-amber-500 shrink-0" />
            )}

            <div className="flex flex-col gap-0.5">
              <div
                className={cn(
                  "font-semibold",
                  isDag ? "text-emerald-700" : "text-amber-700",
                )}
              >
                {isDag ? "Valid DAG" : "Not a DAG"}
              </div>
              <div
                className={cn(
                  "text-sm",
                  isDag ? "text-emerald-600" : "text-amber-600",
                )}
              >
                {isDag
                  ? "No cycles detected - pipeline is valid"
                  : "Cycles detected - please check your connections"}
              </div>
            </div>
          </div>
        </>
      )}
    </Modal>
  );
};

export default PipelineResultModal;
