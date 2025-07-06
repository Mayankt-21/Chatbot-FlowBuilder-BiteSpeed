import { useState } from "react";
import ReactFlowArea from "../components/ReactFlow/ReactFlowArea";
import NodesPane from "../components/Sidebars/NodesPane";
import SettingsPane from "../components/Sidebars/SettingsPane";
import Navbar from "../components/Others/Navbar";
import { ArrowRight, ArrowLeft } from "lucide-react";

const SIDEBAR_WIDTH = 300; // Fixed width in pixels

const Home = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [activePane, setActivePane] = useState("nodes");

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        {/* Main Content */}
        <div 
          className="relative flex-1 transition-[margin] duration-300 ease-in-out"
          style={{ marginRight: isOpen ? `${SIDEBAR_WIDTH}px` : 0 }}
        >
          <ReactFlowArea />
        </div>

        {/* Sidebar */}
        <div 
          className="fixed right-0 h-[calc(100vh-64px)] flex bg-white shadow-lg transition-transform duration-300 ease-in-out"
          style={{ 
            width: `${SIDEBAR_WIDTH}px`,
            transform: `translateX(${isOpen ? 0 : SIDEBAR_WIDTH}px)`
          }}
        >
          {/* Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="absolute left-0 top-1/2 -translate-x-full -translate-y-1/2 bg-[#1B3C53] text-white p-2 rounded-l-md hover:bg-gray-700 cursor-pointer transition-colors"
          >
            {isOpen ? <ArrowRight size={20} /> : <ArrowLeft size={20} />}
          </button>

          {/* Sidebar Content */}
          <div className="flex-1 overflow-auto">
            <div className="flex gap-2 p-3 bg-gray-100 border-b">
              <button
                onClick={() => setActivePane("nodes")}
                className={`px-3 py-1.5 rounded ${
                  activePane === "nodes" 
                    ? "bg-[#1B3C53] text-white" 
                    : "bg-white hover:bg-gray-50"
                }`}
              >
                Nodes
              </button>
              <button
                onClick={() => setActivePane("settings")}
                className={`px-3 py-1.5 rounded ${
                  activePane === "settings" 
                    ? "bg-[#1B3C53] text-white" 
                    : "bg-white hover:bg-gray-50"
                }`}
              >
                Settings
              </button>
            </div>
            
            <div className="p-4">
              {activePane === "settings" ? <SettingsPane /> : <NodesPane />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
