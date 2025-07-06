import React, { useState } from "react";
import { ReactFlow, Background, MiniMap, Controls, Panel } from "@xyflow/react";
import MessageNode from "../NodeElements/MessageNode";
import "@xyflow/react/dist/style.css";

const initialNodes = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
  { id: "2", position: { x: 0, y: 100 }, data: { label: "2" } },
];

const ReactFlowArea = () => {
  const [variant, setvariant] = useState("dots");
  const [showMiniMap, setShowMiniMap] = useState(true);
  return (
    <>
      <div className="w-full h-full text-black">
        <ReactFlow nodes={initialNodes} fitView>
          <Background variant={variant} />
          {showMiniMap && <MiniMap />}
          <Controls />
        </ReactFlow>
      </div>
    </>
  );
};

export default ReactFlowArea;
