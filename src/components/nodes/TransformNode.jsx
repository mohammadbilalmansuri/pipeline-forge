import { getNodeConfig } from "@/config";
import { useDebouncedField } from "@/hooks";
import { NodeField, Select, TextArea } from "../ui";
import { BaseNode } from "../canvas";

const TransformNode = ({ id, data, selected }) => {
  const {
    label,
    Icon,
    options: { formats },
  } = getNodeConfig("transform");

  const [handleInputFormatChange, inputFormat] = useDebouncedField(
    id,
    "inputFormat",
    data.inputFormat,
  );
  const [handleTransformRulesChange, transformRules] = useDebouncedField(
    id,
    "transformRules",
    data.transformRules,
  );

  return (
    <BaseNode
      id={id}
      data={data}
      title={label}
      Icon={Icon}
      selected={selected}
      hasInput={true}
      hasOutput={true}
      supportsVariables={true}
      variableFields={["transformRules"]}
    >
      <div className="flex flex-col gap-2.5">
        <NodeField label="Input Format">
          <Select
            value={inputFormat || "json"}
            onChange={handleInputFormatChange}
            options={formats}
          />
        </NodeField>

        <NodeField label="Transformation Rules">
          <TextArea
            value={transformRules || ""}
            onChange={handleTransformRulesChange}
            placeholder="Define transformation rules..."
          />
        </NodeField>
      </div>
    </BaseNode>
  );
};

export default TransformNode;
