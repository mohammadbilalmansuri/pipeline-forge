import InputNode from "./InputNode";
import TextNode from "./TextNode";
import CodeNode from "./CodeNode";
import DelayNode from "./DelayNode";
import NoteNode from "./NoteNode";
import OutputNode from "./OutputNode";
import LLMNode from "./LLMNode";

export const NODE_TYPES = {
  input: InputNode,
  text: TextNode,
  code: CodeNode,
  delay: DelayNode,
  note: NoteNode,
  output: OutputNode,
  llm: LLMNode,
};
