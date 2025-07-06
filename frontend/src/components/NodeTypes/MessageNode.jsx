import React, { useState } from "react";
import { Handle, Position, useReactFlow } from "@xyflow/react";
import { MessageSquare } from "lucide-react";

const MessageNode = ({ id, data }) => {
  const { getEdges } = useReactFlow();

  const isValidSourceConnection = (connection) => {
    const edges = getEdges();
    const hasSourceConnection = edges.some(edge => edge.source === id);
    return !hasSourceConnection;
  };

  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
        style={{ width: "10px", height: "10px", background: "#FF6347" }}
      />
      <div className="flex flex-col rounded-md w-[200px] h-full bg-[#F9F3EF] border-2 border-[#1B3C53] gap-1">
        <div className="flex bg-[#456882] rounded-x-md text-gray-100 text-m border-b-2 border-[#1B3C53] justify-start items-center px-2 py-1 gap-1">
          <MessageSquare size={16} className="text-gray-100" />
          <span> Message </span>
        </div>
        <div className="flex flex-wrap px-2 py-3 text-sm rounded-b-md">
          {data.message}
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        isValidConnection={isValidSourceConnection}
        style={{ width: "10px", height: "10px", background: "#32CD32" }}
      />
    </>
  );
};

export default MessageNode;
