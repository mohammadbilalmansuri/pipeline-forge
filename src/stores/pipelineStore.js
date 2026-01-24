import { create } from "zustand";
import { persist } from "zustand/middleware";

const INITIAL_STATE = { nodes: [], edges: [], nodeIdCounters: {} };

const usePipelineStore = create(
  persist(
    (set, get) => ({
      ...INITIAL_STATE,

      addNode: ({ type, position, data }) => {
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
        set((state) => ({
          nodes: state.nodes.filter((node) => node.id !== nodeId),
          edges: state.edges.filter(
            (edge) => edge.source !== nodeId && edge.target !== nodeId,
          ),
        }));
      },

      updateNodeField: (nodeId, fieldName, fieldValue) => {
        set((state) => ({
          nodes: state.nodes.map((node) =>
            node.id === nodeId
              ? { ...node, data: { ...node.data, [fieldName]: fieldValue } }
              : node,
          ),
        }));
      },

      removeEdge: (edgeId) => {
        set((state) => ({
          edges: state.edges.filter((edge) => edge.id !== edgeId),
        }));
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

export const useClearPipeline = () =>
  usePipelineStore((state) => state.clearPipeline);
