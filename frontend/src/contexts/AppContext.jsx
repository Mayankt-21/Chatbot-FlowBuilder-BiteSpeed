import { createContext, useContext, useState } from 'react';

// Create contexts
export const AppContext = createContext();

// Custom hook for using the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
};

// Provider component
export const AppContextProvider = ({ children }) => {
  // Sidebar state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sidebarWidth] = useState(300); // Fixed width in pixels
  const [nodes, setNodes] = useState([]);

  // Active pane state
  const [activePane, setActivePane] = useState('nodes');

  // Selected node state
  const [selectedNode, setSelectedNode] = useState(null);

  // Settings state
  const [settings, setSettings] = useState({
    showMiniMap: true,
    backgroundType: 'dots',
    // Add more settings as needed
  });

  // Node operations
  const updateNodeMessage = (nodeId, newMessage) => {
    // Update nodes state
    setNodes(prevNodes => prevNodes.map(node => {
      if (node.id === nodeId) {
        return {
          ...node,
          data: {
            ...node.data,
            message: newMessage
          }
        };
      }
      return node;
    }));

    // Update selected node if it's the one being modified
    setSelectedNode(prev => {
      if (prev?.id === nodeId) {
        return {
          ...prev,
          data: {
            ...prev.data,
            message: newMessage
          }
        };
      }
      return prev;
    });
  };

  const addNode = (newNode) => {
    setNodes(prevNodes => [...prevNodes, newNode]);
  };

  const deleteNode = (nodeId) => {
    setNodes(prevNodes => prevNodes.filter(node => node.id !== nodeId));
    // Clear selected node if it was deleted
    if (selectedNode?.id === nodeId) {
      setSelectedNode(null);
    }
  };

  const updateNodes = (updatedNodes) => {
    setNodes(updatedNodes);
  };

  const value = {
    // Sidebar
    isSidebarOpen,
    setIsSidebarOpen,
    sidebarWidth,
    
    // Active Pane
    activePane,
    setActivePane,
    
    // Node
    selectedNode,
    setSelectedNode,
    
    // Settings
    settings,
    setSettings,

    // Nodes and Node Operations
    nodes,
    setNodes,
    updateNodeMessage,
    addNode,
    deleteNode,
    updateNodes,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};