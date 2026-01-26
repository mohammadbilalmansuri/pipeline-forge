export default function analyzePipeline(nodes, edges) {
  const nodeIds = nodes.map((node) => node.id);
  const nodeCount = nodeIds.length;

  if (nodeCount === 0) return { nodeCount: 0, edgeCount: 0, isDag: true };

  const nodeSet = new Set(nodeIds);
  const adjacencyList = new Map();
  const inDegree = new Map();

  for (const nodeId of nodeIds) {
    adjacencyList.set(nodeId, []);
    inDegree.set(nodeId, 0);
  }

  let validEdgeCount = 0;
  for (const { source, target } of edges) {
    if (nodeSet.has(source) && nodeSet.has(target)) {
      adjacencyList.get(source).push(target);
      inDegree.set(target, inDegree.get(target) + 1);
      validEdgeCount++;
    }
  }

  const queue = [];
  for (const [nodeId, degree] of inDegree) {
    if (degree === 0) queue.push(nodeId);
  }

  let processedCount = 0;

  while (queue.length > 0) {
    const currentNode = queue.shift();
    processedCount++;

    for (const neighbor of adjacencyList.get(currentNode)) {
      const newDegree = inDegree.get(neighbor) - 1;
      inDegree.set(neighbor, newDegree);

      if (newDegree === 0) {
        queue.push(neighbor);
      }
    }
  }

  return {
    nodeCount,
    edgeCount: validEdgeCount,
    isDag: processedCount === nodeCount,
  };
}
