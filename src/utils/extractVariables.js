import { VARIABLE_REGEX } from "@/config";

const extractVariables = (text) => {
  if (!text || typeof text !== "string") return [];

  const regex = new RegExp(VARIABLE_REGEX.source, "g");
  const uniqueVariables = new Set();

  let match;
  while ((match = regex.exec(text)) !== null) {
    if (match[1]) uniqueVariables.add(match[1]);
  }

  return Array.from(uniqueVariables);
};

export default extractVariables;
