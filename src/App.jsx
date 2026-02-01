import { Toolbar } from "./components/toolbar";
import { Canvas } from "./components/canvas";

export default function App() {
  return (
    <div className="w-full h-dvh relative p-2">
      <div className="size-full relative flex flex-col border-1.5 border-gray-200 rounded-lg overflow-hidden">
        <Toolbar />
        <Canvas />
      </div>
    </div>
  );
}
