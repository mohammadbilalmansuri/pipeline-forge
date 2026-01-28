import { useState } from "react";
import { getNodesForToolbar } from "@/config";
import { analyzePipeline } from "@/services";
import { useNodes, useEdges } from "@/stores";
import { Button } from "../ui";
import { PipelineResultModal, ClearConfirmModal } from "../modals";
import DraggableNode from "./DraggableNode";

const nodeTypes = getNodesForToolbar();

const Toolbar = () => {
  const nodes = useNodes();
  const edges = useEdges();

  const [isClearModalOpen, setIsClearModalOpen] = useState(false);
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);

  const hasNodes = nodes.length > 0;

  const handleClearCanvas = () => {
    if (!hasNodes) return;
    setIsClearModalOpen(true);
  };

  const analysisResult = isResultModalOpen
    ? analyzePipeline(nodes, edges)
    : null;

  const handleAnalyzePipeline = () => setIsResultModalOpen(true);
  const handleCloseClearModal = () => setIsClearModalOpen(false);
  const handleCloseResultModal = () => setIsResultModalOpen(false);

  return (
    <>
      <header className="w-full flex items-center justify-between gap-5 p-2.5 bg-white border-b-1.5 border-gray-200 z-40">
        <nav className="flex items-center gap-2.5 flex-wrap">
          {nodeTypes.map((node) => (
            <DraggableNode
              key={node.type}
              type={node.type}
              label={node.label}
              Icon={node.Icon}
            />
          ))}
        </nav>

        <div className="flex items-center gap-2.5 shrink-0 lg:relative absolute lg:bottom-auto lg:right-auto bottom-3 right-3">
          <Button
            variant="secondary"
            onClick={handleClearCanvas}
            disabled={!hasNodes}
          >
            Clear
          </Button>

          <Button variant="primary" onClick={handleAnalyzePipeline}>
            Analyze Pipeline
          </Button>
        </div>
      </header>

      <ClearConfirmModal
        isOpen={isClearModalOpen}
        onClose={handleCloseClearModal}
      />

      <PipelineResultModal
        isOpen={isResultModalOpen}
        onClose={handleCloseResultModal}
        result={analysisResult}
      />
    </>
  );
};

export default Toolbar;
