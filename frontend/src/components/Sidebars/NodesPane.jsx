import React from 'react';

const NodesPane = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('Node', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="px-4 py-2 bg-white border-r border-gray-200">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Nodes</h3>
        <div
          className="px-4 py-2 mb-2 bg-white border-2 border-stone-400 rounded-md cursor-move"
          onDragStart={(event) => onDragStart(event, 'messageNode')}
          draggable
        >
          Message Node
        </div>
      </div>
    </div>
  );
};

export default NodesPane;
