import { getNodeConfig } from "@/config";
import { useDebouncedField } from "@/hooks";
import { NodeField, Select, TextArea } from "../ui";
import { BaseNode } from "../canvas";

const OutputNode = ({ id, data, selected }) => {
  const {
    label,
    Icon,
    options: { outputTypes },
  } = getNodeConfig("output");

  const [handleOutputTypeChange, outputType] = useDebouncedField(
    id,
    "outputType",
    data.outputType,
  );
  const [handleOutputValueChange, outputValue] = useDebouncedField(
    id,
    "outputValue",
    data.outputValue,
  );

  return (
    <BaseNode
      id={id}
      data={data}
      title={label}
      Icon={Icon}
      selected={selected}
      hasInput={true}
      hasOutput={false}
      supportsVariables={true}
      variableFields={["outputValue"]}
    >
      <div className="flex flex-col gap-2.5">
        <NodeField label="Type">
          <Select
            value={outputType || "text"}
            onChange={handleOutputTypeChange}
            options={outputTypes}
          />
        </NodeField>

        <NodeField label="Output">
          <TextArea
            value={outputValue || ""}
            onChange={handleOutputValueChange}
            placeholder="Enter output (write {{variable_name}} for variables)"
          />
        </NodeField>
      </div>
    </BaseNode>
  );
};

export default OutputNode;
