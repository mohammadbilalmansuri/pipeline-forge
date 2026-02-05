import { useRef } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Panel,
  ReactFlowProvider,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";
import { getNodeInitialData } from "@/config";
import {
  useNodes,
  useEdges,
  useAddNode,
  useOnNodesChange,
  useOnEdgesChange,
  useOnConnect,
} from "@/stores";
import { NODE_TYPES } from "../nodes";
import CustomEdge from "./CustomEdge";
import SavedStatusBadge from "./SavedStatusBadge";

const EDGE_TYPES = {
  custom: CustomEdge,
};

const SNAP_GRID = [20, 20];
const PRO_OPTIONS = { hideAttribution: true };
const CONNECTION_LINE_STYLE = {
  stroke: "var(--color-indigo-500)",
  strokeDasharray: "6 6",
};
const DEFAULT_EDGE_OPTIONS = { type: "custom", animated: true };
const DEFAULT_VIEWPORT = { x: 0, y: 0, zoom: 0.85 };

const isValidConnection = (connection) =>
  connection.source !== connection.target;

const CanvasContent = () => {
  const wrapperRef = useRef(null);
  const reactFlowInstance = useReactFlow();

  const nodes = useNodes();
  const edges = useEdges();
  const addNode = useAddNode();
  const onNodesChange = useOnNodesChange();
  const onEdgesChange = useOnEdgesChange();
  const onConnect = useOnConnect();

  const onDrop = (event) => {
    event.preventDefault();

    const reactFlowBounds = wrapperRef.current?.getBoundingClientRect();
    if (!reactFlowBounds) return;

    const dataStr = event.dataTransfer.getData("application/reactflow");
    if (!dataStr) return;

    try {
      const { nodeType } = JSON.parse(dataStr);
      if (!nodeType) return;

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      addNode({
        type: nodeType,
        position,
        data: getNodeInitialData(nodeType),
      });
    } catch {}
  };

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  return (
    <main className="flex-1 h-full" ref={wrapperRef}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        isValidConnection={isValidConnection}
        nodeTypes={NODE_TYPES}
        edgeTypes={EDGE_TYPES}
        proOptions={PRO_OPTIONS}
        snapToGrid
        snapGrid={SNAP_GRID}
        minZoom={0.25}
        maxZoom={3}
        defaultViewport={DEFAULT_VIEWPORT}
        panOnScroll
        zoomOnScroll={false}
        zoomOnPinch
        defaultEdgeOptions={DEFAULT_EDGE_OPTIONS}
        connectionLineStyle={CONNECTION_LINE_STYLE}
        deleteKeyCode={["Delete"]}
      >
        <Background variant="dots" size={2} gap={20} color="#d1d5dc" />
        <Controls showZoom showFitView showInteractive position="bottom-left" />
        <MiniMap pannable zoomable position="bottom-right" />
        <Panel position="top-right">
          <SavedStatusBadge />
        </Panel>
      </ReactFlow>
    </main>
  );
};

const Canvas = () => (
  <ReactFlowProvider>
    <CanvasContent />
  </ReactFlowProvider>
);

export default Canvas;
