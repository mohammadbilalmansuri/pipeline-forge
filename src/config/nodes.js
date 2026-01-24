import {
  Brain,
  Code,
  Download,
  FileText,
  GitCompareArrows,
  Globe,
  LogIn,
  LogOut,
  MessageSquareText,
  Timer,
} from "lucide-react";

const NODES_CONFIG = new Map([
  [
    "input",
    {
      type: "input",
      label: "Input",
      Icon: LogIn,
      initialData: { inputType: "text" },
      options: {
        inputTypes: [
          { value: "text", label: "Text" },
          { value: "file", label: "File" },
        ],
      },
    },
  ],
  [
    "output",
    {
      type: "output",
      label: "Output",
      Icon: LogOut,
      initialData: { outputType: "text", outputValue: "" },
      options: {
        outputTypes: [
          { value: "text", label: "Text" },
          { value: "file", label: "File" },
        ],
      },
    },
  ],
  [
    "text",
    {
      type: "text",
      label: "Text",
      Icon: FileText,
      initialData: { text: "" },
      options: {},
    },
  ],
  [
    "llm",
    {
      type: "llm",
      label: "LLM",
      Icon: Brain,
      initialData: {
        model: "gpt-5.2",
        systemPrompt: "",
        userPrompt: "",
      },
      options: {
        models: [
          { value: "gpt-5.2", label: "GPT-5.2" },
          { value: "gpt-5.2-codex", label: "GPT-5.2 Codex" },
          { value: "opus-4.5", label: "Opus 4.5" },
          { value: "sonnet-4.5", label: "Sonnet 4.5" },
          { value: "gemini-3-flash", label: "Gemini 3 Flash" },
          { value: "gemini-3-pro", label: "Gemini 3 Pro" },
        ],
      },
    },
  ],
  [
    "api",
    {
      type: "api",
      label: "API",
      Icon: Globe,
      initialData: {
        method: "GET",
        endpoint: "",
        headers: [],
        queryParams: [],
        body: "",
      },
      options: {
        methods: [
          { value: "GET", label: "GET" },
          { value: "POST", label: "POST" },
          { value: "PUT", label: "PUT" },
          { value: "DELETE", label: "DELETE" },
          { value: "PATCH", label: "PATCH" },
        ],
      },
    },
  ],
  [
    "code",
    {
      type: "code",
      label: "Code",
      Icon: Code,
      initialData: { language: "python", code: "" },
      options: {
        languages: [
          { value: "python", label: "Python" },
          { value: "javascript", label: "JavaScript" },
          { value: "typescript", label: "TypeScript" },
          { value: "ruby", label: "Ruby" },
          { value: "go", label: "Go" },
          { value: "rust", label: "Rust" },
          { value: "java", label: "Java" },
          { value: "cpp", label: "C++" },
          { value: "php", label: "PHP" },
          { value: "sql", label: "SQL" },
        ],
      },
    },
  ],
  [
    "knowledgeBase",
    {
      type: "knowledgeBase",
      label: "Knowledge Base",
      Icon: Download,
      initialData: { kbType: "vector_db", description: "" },
      options: {
        kbTypes: [
          { value: "vector_db", label: "Vector DB" },
          { value: "faq", label: "FAQ" },
          { value: "document_store", label: "Document Store" },
          { value: "graph_db", label: "Graph Database" },
          { value: "search_index", label: "Search Index" },
        ],
      },
    },
  ],
  [
    "note",
    {
      type: "note",
      label: "Note",
      Icon: MessageSquareText,
      initialData: { note: "" },
      options: {},
    },
  ],
  [
    "delay",
    {
      type: "delay",
      label: "Delay",
      Icon: Timer,
      initialData: { delay: "" },
      options: {},
    },
  ],
  [
    "transform",
    {
      type: "transform",
      label: "Transform",
      Icon: GitCompareArrows,
      initialData: { inputFormat: "json", transformRules: "" },
      options: {
        formats: [
          { value: "json", label: "JSON" },
          { value: "xml", label: "XML" },
          { value: "csv", label: "CSV" },
          { value: "yaml", label: "YAML" },
          { value: "text", label: "Plain Text" },
        ],
      },
    },
  ],
]);

export const getNodeConfig = (type) => {
  const config = NODES_CONFIG.get(type);
  return config ? { ...config } : null;
};

export const getNodesForToolbar = () => {
  return Array.from(NODES_CONFIG.values(), ({ type, label, Icon }) => ({
    type,
    label,
    Icon,
  }));
};

export const getNodeInitialData = (type) => {
  const config = NODES_CONFIG.get(type);
  return config?.initialData ? { ...config.initialData } : {};
};
