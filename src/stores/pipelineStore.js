import { create } from "zustand";
import { persist } from "zustand/middleware";
import { addEdge, applyNodeChanges, applyEdgeChanges } from "reactflow";

const INITIAL_STATE = { nodes: [], edges: [], nodeIdCounters: {} };

const createEdgeObject = ({
  id,
  source,
  sourceHandle,
  target,
  targetHandle,
}) => ({ id, source, sourceHandle, target, targetHandle });

const usePipelineStore = create(
  persist(
    (set, get) => ({
      ...INITIAL_STATE,

      addNode: ({ type, position, data }) => {
        if (!type || !position) return;
        set((state) => {
          const newCount = (state.nodeIdCounters[type] || 0) + 1;
          const newNode = { id: `${type}_${newCount}`, type, position, data };
          return {
            nodes: [...state.nodes, newNode],
            nodeIdCounters: { ...state.nodeIdCounters, [type]: newCount },
          };
        });
      },

      removeNode: (nodeId) => {
        if (!nodeId) return;
        set((state) => ({
          nodes: state.nodes.filter((node) => node.id !== nodeId),
          edges: state.edges.filter(
            (edge) => edge.source !== nodeId && edge.target !== nodeId,
          ),
        }));
      },

      updateNodeField: (nodeId, fieldName, fieldValue) => {
        if (!nodeId || !fieldName) return;
        set((state) => ({
          nodes: state.nodes.map((node) =>
            node.id === nodeId
              ? { ...node, data: { ...node.data, [fieldName]: fieldValue } }
              : node,
          ),
        }));
      },

      removeEdge: (edgeId) => {
        if (!edgeId) return;
        set((state) => ({
          edges: state.edges.filter((edge) => edge.id !== edgeId),
        }));
      },

      addEdgeFromVariable: (sourceNodeId, targetNodeId, targetHandle) => {
        if (!sourceNodeId || !targetNodeId || !targetHandle) return;
        if (sourceNodeId === targetNodeId) return;

        const { nodes, edges } = get();
        const sourceNode = nodes.find((n) => n.id === sourceNodeId);

        if (!sourceNode) return;

        const sourceHandle = `${sourceNode.id}-output`;

        const edgeExists = edges.some(
          (edge) =>
            edge.source === sourceNode.id &&
            edge.target === targetNodeId &&
            edge.sourceHandle === sourceHandle &&
            edge.targetHandle === targetHandle,
        );

        if (edgeExists) return;

        const newEdge = createEdgeObject({
          id: `e-${sourceNode.id}-${targetNodeId}-${Date.now()}`,
          source: sourceNode.id,
          sourceHandle,
          target: targetNodeId,
          targetHandle,
        });

        set({ edges: [...edges, newEdge] });
      },

      onNodesChange: (changes) => {
        if (!changes?.length) return;
        set({ nodes: applyNodeChanges(changes, get().nodes) });
      },

      onEdgesChange: (changes) => {
        if (!changes?.length) return;
        set({ edges: applyEdgeChanges(changes, get().edges) });
      },

      onConnect: (connection) => {
        if (!connection?.source || !connection?.target) return;
        if (connection.source === connection.target) return;

        const newEdge = createEdgeObject({
          ...connection,
          id: `e-${connection.source}-${connection.target}-${Date.now()}`,
        });
        set({ edges: addEdge(newEdge, get().edges) });
      },

      clearPipeline: () => set({ ...INITIAL_STATE }),
    }),
    {
      name: "pipeline-storage",
      partialize: ({ nodes, edges, nodeIdCounters }) => ({
        nodes,
        edges,
        nodeIdCounters,
      }),
    },
  ),
);

export const useNodes = () => usePipelineStore((state) => state.nodes);
export const useEdges = () => usePipelineStore((state) => state.edges);

export const useAddNode = () => usePipelineStore((state) => state.addNode);
export const useRemoveNode = () =>
  usePipelineStore((state) => state.removeNode);
export const useUpdateNodeField = () =>
  usePipelineStore((state) => state.updateNodeField);

export const useRemoveEdge = () =>
  usePipelineStore((state) => state.removeEdge);
export const useAddEdgeFromVariable = () =>
  usePipelineStore((state) => state.addEdgeFromVariable);

export const useOnNodesChange = () =>
  usePipelineStore((state) => state.onNodesChange);
export const useOnEdgesChange = () =>
  usePipelineStore((state) => state.onEdgesChange);
export const useOnConnect = () => usePipelineStore((state) => state.onConnect);

export const useClearPipeline = () =>
  usePipelineStore((state) => state.clearPipeline);
