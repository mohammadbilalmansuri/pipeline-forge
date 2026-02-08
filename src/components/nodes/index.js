import InputNode from "./InputNode";
import TextNode from "./TextNode";
import CodeNode from "./CodeNode";
import DelayNode from "./DelayNode";
import NoteNode from "./NoteNode";

export const NODE_TYPES = {
  input: InputNode,
  text: TextNode,
  code: CodeNode,
  delay: DelayNode,
  note: NoteNode,
};
