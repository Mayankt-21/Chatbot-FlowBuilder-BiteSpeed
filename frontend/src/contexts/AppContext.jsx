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

  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};