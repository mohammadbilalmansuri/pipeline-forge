import { getNodeConfig } from "@/config";
import { useDebouncedField } from "@/hooks";
import { NodeField, Select } from "../ui";
import { BaseNode } from "../canvas";

const InputNode = ({ id, data, selected }) => {
  const {
    label,
    Icon,
    options: { inputTypes },
  } = getNodeConfig("input");

  const [handleInputTypeChange, inputTypeValue] = useDebouncedField(
    id,
    "inputType",
    data.inputType,
  );

  return (
    <BaseNode
      id={id}
      data={data}
      title={label}
      Icon={Icon}
      selected={selected}
      hasInput={false}
      hasOutput={true}
      supportsVariables={false}
    >
      <NodeField label="Type">
        <Select
          value={inputTypeValue || "text"}
          onChange={handleInputTypeChange}
          options={inputTypes}
        />
      </NodeField>
    </BaseNode>
  );
};

export default InputNode;
