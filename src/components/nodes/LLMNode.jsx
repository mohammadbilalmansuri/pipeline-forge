import { getNodeConfig } from "@/config";
import { useDebouncedField } from "@/hooks";
import { NodeField, TextArea, Select } from "../ui";
import { BaseNode } from "../canvas";

const LLMNode = ({ id, data, selected }) => {
  const {
    label,
    Icon,
    options: { models },
  } = getNodeConfig("llm");

  const [handleModelChange, modelValue] = useDebouncedField(
    id,
    "model",
    data.model,
  );
  const [handleSystemPromptChange, systemPromptValue] = useDebouncedField(
    id,
    "systemPrompt",
    data.systemPrompt,
  );
  const [handleUserPromptChange, userPromptValue] = useDebouncedField(
    id,
    "userPrompt",
    data.userPrompt,
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
      variableFields={["systemPrompt", "userPrompt"]}
    >
      <div className="flex flex-col gap-2.5">
        <NodeField label="Model">
          <Select
            value={modelValue || "gpt-5"}
            onChange={handleModelChange}
            options={models}
          />
        </NodeField>

        <NodeField label="System Prompt">
          <TextArea
            value={systemPromptValue || ""}
            onChange={handleSystemPromptChange}
            placeholder="You are a helpful assistant..."
          />
        </NodeField>

        <NodeField label="User Prompt">
          <TextArea
            value={userPromptValue || ""}
            onChange={handleUserPromptChange}
            placeholder="Enter prompt or use {{variable}}"
          />
        </NodeField>
      </div>
    </BaseNode>
  );
};

export default LLMNode;
