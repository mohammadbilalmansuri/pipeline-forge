const DraggableNode = ({ type, label, Icon }) => {
  const onDragStart = (event) => {
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify({ nodeType: type }),
    );
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      draggable
      onDragStart={onDragStart}
      className={
        "flex items-center gap-1 px-2 h-10 rounded-md cursor-grab active:cursor-grabbing border text-sm font-medium bg-gray-100 border-gray-200 text-gray-900 hover:bg-gray-200 hover:border-gray-300 active:scale-95 transition-all"
      }
    >
      {Icon && <Icon className="h-5 text-indigo-500" />}
      <span className="leading-none">{label}</span>
    </div>
  );
};

export default DraggableNode;
