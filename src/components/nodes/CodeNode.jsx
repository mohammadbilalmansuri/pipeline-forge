import { getNodeConfig } from "@/config";
import { useDebouncedField } from "@/hooks";
import { NodeField, Select, TextArea } from "../ui";
import { BaseNode } from "../canvas";

const CodeNode = ({ id, data, selected }) => {
  const {
    Icon,
    label,
    options: { languages },
  } = getNodeConfig("code");

  const [handleLanguageChange, languageValue] = useDebouncedField(
    id,
    "language",
    data.language,
  );
  const [handleCodeChange, codeValue] = useDebouncedField(
    id,
    "code",
    data.code,
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
      variableFields={["code"]}
      className="min-w-72"
    >
      <div className="flex flex-col gap-2.5">
        <NodeField label="Language">
          <Select
            value={languageValue || "python"}
            onChange={handleLanguageChange}
            options={languages}
          />
        </NodeField>

        <NodeField label="Code">
          <TextArea
            value={codeValue || ""}
            onChange={handleCodeChange}
            placeholder="Enter code (write {{variable_name}} for variables)"
            minRows={5}
            className="font-mono text-xs"
          />
        </NodeField>
      </div>
    </BaseNode>
  );
};

export default CodeNode;
