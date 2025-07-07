import ReactFlowArea from "../components/ReactFlow/ReactFlowArea";
import NodesPane from "../components/Sidebars/NodesPane";
import SettingsPane from "../components/Sidebars/SettingsPane";
import Navbar from "../components/Others/Navbar";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { ReactFlowProvider } from "@xyflow/react";
import { useAppContext } from "../contexts/AppContext";

const Home = () => {

  const sidebarWidth = 300;
  const {
    isSidebarOpen,
    setIsSidebarOpen,
    activePane,
    setActivePane
  } = useAppContext();


  return (
    <ReactFlowProvider>
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="flex flex-1 overflow-hidden">
          {/* Main Content */}
          <div 
            className="relative flex-1 transition-[margin] duration-300 ease-in-out"
            style={{ marginRight: isSidebarOpen ? `${sidebarWidth}px` : 0 }}
          >
            <ReactFlowArea />
          </div>

          {/* Sidebar */}
          <div 
            className="fixed right-0 h-[calc(100vh-64px)] flex bg-white shadow-lg transition-transform duration-300 ease-in-out"
            style={{ 
              width: `${sidebarWidth}px`,
              transform: `translateX(${isSidebarOpen ? 0 : sidebarWidth}px)`
            }}
          >
            {/* Toggle Button */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="absolute left-0 top-1/2 -translate-x-full -translate-y-1/2 bg-[#1B3C53] text-white p-2 rounded-l-md hover:bg-gray-700 cursor-pointer transition-colors"
            >
              {isSidebarOpen === true ? <ArrowRight size={20} /> : <ArrowLeft size={20} />}
            </button>

            {/* Sidebar Content */}
            <div className="flex-1 h-full flex flex-col mt-2">
              {/* Sticky Pane Buttons */}
              <div className="flex gap-2 p-3 bg-stone-200 rounded-md border-b sticky top-0 z-10">
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
              
              {/* Scrollable Content Area */}
              <div className="flex-1 overflow-y-auto">
                {activePane === "settings" ? <SettingsPane/> : <NodesPane />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ReactFlowProvider>
  );
};

export default Home;
