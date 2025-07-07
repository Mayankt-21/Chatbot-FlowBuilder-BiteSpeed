import React, { useCallback, useEffect } from "react";
import {
  ReactFlow,
  Background,
  MiniMap,
  Controls,
  Panel,
  useReactFlow,
  addEdge,
  MarkerType,
} from "@xyflow/react";
import MessageNode from "../NodeTypes/MessageNode";
import { useAppContext } from "../../contexts/AppContext";
import "@xyflow/react/dist/style.css";

const initialNodes = [
  {
    id: "initialNode1",
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
    id: "initialNode2",
    type: "messageNode",
    position: { x: 0, y: 150 },
    data: {
      label: "Message Node 2",
      message: "This is the second message",
    },
  },
];

const initialEdges = [];

// Define the node types
const nodeTypes = {
  messageNode: MessageNode,
};

const defaultEdgeOptions = {
  animated: true,
  type: 'smoothstep',
  style: { stroke: '#1B3C53' },
  markerEnd: {
    type: MarkerType.ArrowClosed,
    color: '#1B3C53',
  },
};

const BackgroundType = {
  dots: "Dots",
  lines: "Lines",
  cross: "Cross",
};

const ReactFlowArea = () => {
  const reactFlowInstance = useReactFlow();
  
  const { 
    settings, 
    setSettings,
    selectedNode,
    setSelectedNode,
    nodes,
    setNodes,
    addNode,
    deleteNode,
    updateNodes
  } = useAppContext();

  const [edges, setEdges] = React.useState(initialEdges);
  const [reactFlowNodes, setReactFlowNodes] = React.useState(nodes);

  // Sync React Flow nodes with context nodes
  useEffect(() => {
    setReactFlowNodes(nodes);
  }, [nodes]);

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

      addNode(newNode);
    },
    [nodes, reactFlowInstance, addNode]
  );

  const onConnect = useCallback(
    (params) => {
      const newEdge = {
        ...params,
        id: `edge-${edges.length + 1}`,
        type: 'smoothstep',
        animated: true,
        style: { stroke: '#1B3C53' },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: '#1B3C53',
        },
      };
      setEdges((eds) => addEdge(newEdge, eds));
    },
    [edges]
  );

  const onNodeClick = useCallback((event, node) => {
    setSelectedNode(node);
    setSettings(prev => ({ ...prev, activePane: 'settings' }));
  }, [setSelectedNode, setSettings]);

  // Handle node movement
  const onNodeDrag = useCallback((event, node, nodes) => {
    // Dispatch node movement event for real-time tracking
    const moveEvent = new CustomEvent('nodeDragging', {
      detail: {
        nodeId: node.id,
        position: node.position,
        nodes: nodes
      }
    });
    window.dispatchEvent(moveEvent);
  }, []);

  const onNodeDragStop = useCallback((event, node) => {
    // Update node positions after drag
    updateNodes(nodes.map((n) => {
      if (n.id === node.id) {
        return {
          ...n,
          position: node.position,
        };
      }
      return n;
    }));
  }, [nodes, updateNodes]);

  const onNodesDelete = useCallback(
    (nodesToDelete) => {
      // Remove connected edges when nodes are deleted
      setEdges((eds) =>
        eds.filter(
          (edge) =>
            !nodesToDelete.some(
              (node) => node.id === edge.source || node.id === edge.target
            )
        )
      );
      
      // Delete nodes from context
      nodesToDelete.forEach(node => deleteNode(node.id));
    },
    [deleteNode]
  );

  // Get current flow state
  const getFlowState = useCallback(() => {
    if (reactFlowInstance) {
      const flowState = reactFlowInstance.toObject();
      console.log('Current Flow State:', flowState);
      return flowState;
    }
  }, [reactFlowInstance]);

  const BackgroundButtons = () => {
    return (
      <div className="flex gap-2">
        {Object.entries(BackgroundType).map(([type, value]) => (
          <button
            key={type}
            onClick={() => setSettings(prev => ({ ...prev, backgroundType: type }))}
            className={`flex justify-center items-center ${
              settings.backgroundType === type ? 'bg-[#324B5A]' : 'bg-[#1B3C53]'
            } text-white rounded-md p-2`}
          >
            {value}
          </button>
        ))}
        <button
          onClick={getFlowState}
          className="flex justify-center items-center bg-green-600 text-white rounded-md p-2 ml-4"
        >
          View Flow State
        </button>
      </div>
    );
  };

  // Add event listeners for node movement tracking
  useEffect(() => {
    const logNodeMovement = (event) => {
      console.log('Node Movement:', event.detail);
    };

    window.addEventListener('nodeDragging', logNodeMovement);
    window.addEventListener('nodeDragComplete', logNodeMovement);

    return () => {
      window.removeEventListener('nodeDragging', logNodeMovement);
      window.removeEventListener('nodeDragComplete', logNodeMovement);
    };
  }, []);

  return (
    <div className="w-full h-full text-black">
      <ReactFlow
        nodes={reactFlowNodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onConnect={onConnect}
        onNodeDrag={onNodeDrag}
        onNodeDragStop={onNodeDragStop}
        onNodesDelete={onNodesDelete}
        onNodeClick={onNodeClick}
        defaultEdgeOptions={defaultEdgeOptions}
        fitView
        snapToGrid
        snapGrid={[15, 15]}
        deleteKeyCode={['Backspace', 'Delete']}
        multiSelectionKeyCode={['Control', 'Meta']}
        selectionOnDrag={true}
        selectNodesOnDrag={true}
        panOnDrag={[0, 1]}
        className="transition-all duration-300 ease-in-out"
      >
        <Panel position="top-left">
          <BackgroundButtons/>
        </Panel>
        <Background variant={settings.backgroundType} />
        {settings.showMiniMap && <MiniMap />}
        <Controls/>
      </ReactFlow>
    </div>
  );
};

export default ReactFlowArea;