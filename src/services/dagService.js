export function isDAG(nodeIds, edges) {
  if (!nodeIds.length) return true;

  const adjacencyList = new Map();
  const inDegree = new Map();

  for (const nodeId of nodeIds) {
    adjacencyList.set(nodeId, []);
    inDegree.set(nodeId, 0);
  }

  for (const [source, target] of edges) {
    if (inDegree.has(source) && inDegree.has(target)) {
      adjacencyList.get(source).push(target);
      inDegree.set(target, inDegree.get(target) + 1);
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

  return processedCount === nodeIds.length;
}
