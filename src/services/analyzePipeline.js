export default function analyzePipeline(nodes, edges) {
  const nodeCount = nodes.length;
  if (nodeCount === 0) return { nodeCount: 0, edgeCount: 0, isDag: true };

  const nodeIds = nodes.map((n) => n.id);
  const nodeSet = new Set(nodeIds);

  const adjacencyList = new Map();
  const inDegree = new Map();

  for (const id of nodeIds) {
    adjacencyList.set(id, []);
    inDegree.set(id, 0);
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
  for (const [id, degree] of inDegree) {
    if (degree === 0) queue.push(id);
  }

  let processedCount = 0;
  let head = 0;

  while (head < queue.length) {
    const current = queue[head++];
    processedCount++;

    for (const neighbor of adjacencyList.get(current)) {
      const newDegree = inDegree.get(neighbor) - 1;
      inDegree.set(neighbor, newDegree);
      if (newDegree === 0) queue.push(neighbor);
    }
  }

  return {
    nodeCount,
    edgeCount: validEdgeCount,
    isDag: processedCount === nodeCount,
  };
}
