import React from 'react';
import { MessageSquare } from "lucide-react";

const NodesPane = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('Node', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="px-1 py-2 bg-white border-r border-gray-200">
        <div
          className="flex flex-row items-center justify-center gap-2 w-min h-min px-2 py-2 bg-[#456882] hover:bg-[#324B5A] text-white border-2 border-[#1B3C53] rounded-md cursor-move transition-all duration-300 ease-in-out"
          onDragStart={(event) => onDragStart(event, 'messageNode')}
          draggable
        >
          <MessageSquare size={16}/>
          <span className=" text-m font-semibold"> Message </span>
        </div>
        
        <span className="text-sm font-semibold text-gray-500 flex justify-center items-center mt-50 rounded-md border-dashed border-2 border-gray-200 mx-5 p-3"> More Nodes To be Added Soon ... </span>
      </div>
  );
};

export default NodesPane;
