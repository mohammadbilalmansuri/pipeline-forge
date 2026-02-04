import { getNodeConfig } from "@/config";
import { useDebouncedField } from "@/hooks";
import { NodeField, TextArea } from "../ui";
import { BaseNode } from "../canvas";

const TextNode = ({ id, data, selected }) => {
  const { label, Icon } = getNodeConfig("text");

  const [handleTextChange, textValue] = useDebouncedField(
    id,
    "text",
    data.text,
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
      variableFields={["text"]}
    >
      <NodeField label="Text">
        <TextArea
          value={textValue || ""}
          onChange={handleTextChange}
          placeholder="Enter text (write {{variable_name}} for variables)"
        />
      </NodeField>
    </BaseNode>
  );
};

export default TextNode;
