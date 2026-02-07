import { NUMBER_REGEX, getNodeConfig } from "@/config";
import { useDebouncedField } from "@/hooks";
import { NodeField, TextInput } from "../ui";
import BaseNode from "../canvas/BaseNode";

const DelayNode = ({ id, data, selected }) => {
  const { label, Icon } = getNodeConfig("delay");

  const [handleDelayChange, delayValue] = useDebouncedField(
    id,
    "delay",
    data.delay,
    300,
    (newValue) => newValue === "" || NUMBER_REGEX.test(newValue),
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
      <NodeField label="Delay">
        <TextInput
          type="text"
          inputMode="decimal"
          value={delayValue}
          onChange={handleDelayChange}
          placeholder="Enter delay in seconds"
        />
      </NodeField>
    </BaseNode>
  );
};

export default DelayNode;
