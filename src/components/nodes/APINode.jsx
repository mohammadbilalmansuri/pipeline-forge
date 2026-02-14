import { getNodeConfig } from "@/config";
import { useDebouncedField } from "@/hooks";
import { useUpdateNodeField } from "@/stores";
import { NodeField, TextInput, Select, TextArea, KeyValueEditor } from "../ui";
import { BaseNode } from "../canvas";

const APINode = ({ id, data, selected }) => {
  const {
    Icon,
    label,
    options: { methods },
  } = getNodeConfig("api");

  const updateNodeField = useUpdateNodeField();

  const handleHeadersChange = (headers) => {
    updateNodeField(id, "headers", headers);
  };

  const handleParamsChange = (params) => {
    updateNodeField(id, "queryParams", params);
  };

  const [handleMethodChange, methodValue] = useDebouncedField(
    id,
    "method",
    data.method,
  );

  const [handleEndpointChange, endpointValue] = useDebouncedField(
    id,
    "endpoint",
    data.endpoint,
  );
  const [handleBodyChange, bodyValue] = useDebouncedField(
    id,
    "body",
    data.body,
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
      variableFields={["endpoint", "body"]}
      className="min-w-72"
    >
      <div className="flex flex-col gap-2.5">
        <div className="flex gap-2">
          <NodeField label="Method" className="w-24">
            <Select
              value={methodValue || "GET"}
              onChange={handleMethodChange}
              options={methods}
            />
          </NodeField>

          <NodeField label="Endpoint" className="flex-1">
            <TextInput
              value={endpointValue || ""}
              onChange={handleEndpointChange}
              placeholder="https://api.example.com"
            />
          </NodeField>
        </div>

        <NodeField label="Headers">
          <KeyValueEditor
            value={data.headers || []}
            onChange={handleHeadersChange}
            keyPlaceholder="Header"
            valuePlaceholder="Value"
          />
        </NodeField>

        <NodeField label="Query Params">
          <KeyValueEditor
            value={data.queryParams || []}
            onChange={handleParamsChange}
            keyPlaceholder="Param"
            valuePlaceholder="Value"
          />
        </NodeField>

        <NodeField label="Body">
          <TextArea
            value={bodyValue || ""}
            onChange={handleBodyChange}
            placeholder='{"key": "{{variable}}"}'
          />
        </NodeField>
      </div>
    </BaseNode>
  );
};

export default APINode;
