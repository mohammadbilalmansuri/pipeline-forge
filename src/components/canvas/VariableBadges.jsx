import { extractVariables } from "@/utils";

const VariableBadges = ({ data, variableFields = [] }) => {
  if (variableFields.length === 0) return null;

  const allVariables = new Set();
  for (const field of variableFields) {
    const value = data?.[field];
    if (value && typeof value === "string") {
      for (const v of extractVariables(value)) {
        allVariables.add(v);
      }
    }
  }
  const detectedVariables = Array.from(allVariables);

  if (detectedVariables.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1.5 px-1.5">
      {detectedVariables.map((variable) => (
        <span
          key={variable}
          className="px-1 py-0.75 bg-indigo-50 text-indigo-500 text-2xs font-medium rounded leading-none"
        >
          {variable}
        </span>
      ))}
    </div>
  );
};

export default VariableBadges;
