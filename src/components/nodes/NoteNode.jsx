import { getNodeConfig } from "@/config";
import { useDebouncedField } from "@/hooks";
import { NodeField, TextArea } from "../ui";
import { BaseNode } from "../canvas";

const NoteNode = ({ id, data, selected }) => {
  const { label, Icon } = getNodeConfig("note");

  const [handleNoteChange, noteValue] = useDebouncedField(
    id,
    "note",
    data.note,
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
      variableFields={["note"]}
    >
      <NodeField label="Note">
        <TextArea
          value={noteValue || ""}
          onChange={handleNoteChange}
          placeholder="Enter note (write {{variable_name}} for variables)"
          minRows={5}
        />
      </NodeField>
    </BaseNode>
  );
};

export default NoteNode;
