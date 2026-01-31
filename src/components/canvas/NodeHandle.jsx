import { Handle } from "reactflow";

const NodeHandle = ({ type, position, id }) => (
  <Handle
    type={type}
    position={position}
    id={id}
    style={{
      width: 10,
      height: 10,
      transform: "translateY(-50%)",
      left: position === "left" ? -5 : undefined,
      right: position === "right" ? -5 : undefined,
      backgroundColor: "var(--color-indigo-500)",
      border: "2px solid white",
      borderRadius: "50%",
      outline: "1.5px solid var(--color-indigo-500)",
    }}
  />
);

export default NodeHandle;
