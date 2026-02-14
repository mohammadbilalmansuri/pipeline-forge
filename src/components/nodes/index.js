import APINode from "./APINode";
import CodeNode from "./CodeNode";
import DelayNode from "./DelayNode";
import InputNode from "./InputNode";
import KnowledgeBaseNode from "./KnowledgeBaseNode";
import LLMNode from "./LLMNode";
import NoteNode from "./NoteNode";
import OutputNode from "./OutputNode";
import TextNode from "./TextNode";
import TransformNode from "./TransformNode";

export const NODE_TYPES = {
  api: APINode,
  code: CodeNode,
  delay: DelayNode,
  input: InputNode,
  knowledgeBase: KnowledgeBaseNode,
  llm: LLMNode,
  note: NoteNode,
  output: OutputNode,
  text: TextNode,
  transform: TransformNode,
};
