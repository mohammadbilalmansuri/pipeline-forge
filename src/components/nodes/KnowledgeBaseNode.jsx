import { getNodeConfig } from "@/config";
import { useDebouncedField } from "@/hooks";
import { NodeField, TextArea, Select } from "../ui";
import { BaseNode } from "../canvas";

const KnowledgeBaseNode = ({ id, data, selected }) => {
  const {
    label,
    Icon,
    options: { kbTypes },
  } = getNodeConfig("knowledgeBase");

  const [handleKbTypeChange, kbTypeValue] = useDebouncedField(
    id,
    "kbType",
    data.kbType,
  );

  const [handleDescriptionChange, descriptionValue] = useDebouncedField(
    id,
    "description",
    data.description,
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
      supportsVariables={false}
    >
      <div className="flex flex-col gap-2.5">
        <NodeField label="KB Type">
          <Select
            value={kbTypeValue || "vector_db"}
            onChange={handleKbTypeChange}
            options={kbTypes}
          />
        </NodeField>

        <NodeField label="Description">
          <TextArea
            value={descriptionValue || ""}
            onChange={handleDescriptionChange}
            placeholder="Describe this knowledge base..."
          />
        </NodeField>
      </div>
    </BaseNode>
  );
};

export default KnowledgeBaseNode;
