import React, { useState, useCallback } from "react";
import {
  ReactFlow,
  Background,
  MiniMap,
  Controls,
  Panel,
  ReactFlowProvider,
  useReactFlow,
} from "@xyflow/react";
import MessageNode from "../NodeTypes/MessageNode";
import "@xyflow/react/dist/style.css";

const initialNodes = [
  {
    id: "1",
    type: "messageNode",
    position: { x: 0, y: 0 },
    data: {
      label: "Message Node 1",
      message: "This is the first message",
    },
    isConnectable: true,
    isDraggable: true,
  },
  {
    id: "2",
    type: "messageNode",
    position: { x: 0, y: 150 },
    data: {
      label: "Message Node 2",
      message: "This is the second message",
    },
  },
];

// Define the node types
const nodeTypes = {
  messageNode: MessageNode,
};

const BackgroundType = {
  dots: "Dots",
  lines: "Lines",
  cross: "Cross",
};

const Flow = () => {
  const [nodes, setNodes] = useState(initialNodes);
  const [variant, setvariant] = useState("dots");
  const [showMiniMap, setShowMiniMap] = useState(true);
  const reactFlowInstance = useReactFlow();

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = event.currentTarget.getBoundingClientRect();
      const type = event.dataTransfer.getData("Node");

      // Check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      // Get the drop position relative to the viewport
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      // Create a new node
      const newNode = {
        id: `${type}_${nodes.length + 1}`,
        type,
        position,
        data: {
          label: `${type} ${nodes.length + 1}`,
          message: `This is a new ${type}`,
        },
        isConnectable: true,
        isDraggable: true,
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [nodes, reactFlowInstance]
  );

  const BackgroundButtons = () => {
    return (
      <div className="flex gap-2">
        {Object.entries(BackgroundType).map(([type, value]) => (
          <button
            key={type}
            onClick={() => setvariant(type)}
            className="flex justify-center items-center bg-[#1B3C53] text-white rounded-md p-2"
          >
            {value}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="w-screen h-screen text-black">
      <ReactFlow
        nodes={nodes}
        nodeTypes={nodeTypes}
        onDragOver={onDragOver}
        onDrop={onDrop}
        fitView
      >
        <Panel position="top-left"> <BackgroundButtons/> </Panel>
        <Background variant={variant} />
        {showMiniMap && <MiniMap />}
        <Controls />
      </ReactFlow>
    </div>
  );
};

const ReactFlowArea = () => {
  return (
    <ReactFlowProvider>
      <Flow />
    </ReactFlowProvider>
  );
};

export default ReactFlowArea;
