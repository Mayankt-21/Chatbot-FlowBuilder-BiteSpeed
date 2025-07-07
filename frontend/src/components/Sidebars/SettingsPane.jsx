import React, { useEffect } from "react";
import { useAppContext } from "../../contexts/AppContext";
import { MessageSquare, Trash2, Save } from "lucide-react";
import { useReactFlow } from "@xyflow/react";
import { ArrowLeftRight } from "lucide-react";
import toast from "react-hot-toast";

const SettingsPane = () => {
  const {
    settings,
    setSettings,
    selectedNode,
    setSelectedNode,
    nodes,
    setNodes,
    edges,
    removeEdge,
    deleteNode,
  } = useAppContext();

  const { getNodes } = useReactFlow();

  const handleShowMiniMapToggle = () => {
    setSettings((prev) => ({
      ...prev,
      showMiniMap: !prev.showMiniMap,
    }));
  };

  const handleNodeMessageChange = (e) => {
    if (selectedNode) {
      setSelectedNode((prev) => ({
        ...prev,
        data: {
          ...prev.data,
          message: e.target.value,
        },
      }));
    }
  };

  const handleSaveNode = () => {
    if (selectedNode) {
      setNodes((prevNodes) =>
        prevNodes.map((node) => {
          if (node.id === selectedNode.id) {
            return {
              ...node,
              data: {
                ...node.data,
                message: selectedNode.data.message,
              },
            };
          }
          return node;
        })
      );
      toast.success("Node Message Updated Successfully");
    }
  };

  // Delete the node and update context/UI
  const handleDeleteNode = () => {
    if (selectedNode) {
      deleteNode(selectedNode.id);
      toast.success("Node Deleted Successfully");
    }
  };

  // Get all edges connected to the selected node
  const getConnectedEdges = () => {
    if (!selectedNode || !edges) return [];
    return edges.filter(
      (edge) =>
        edge.source === selectedNode.id || edge.target === selectedNode.id
    );
  };

  // Delete a specific edge by id using context
  const handleDeleteEdgeById = (edgeId) => {
    removeEdge(edgeId);
    toast.success("Edge Deleted Successfully");
  };

  const getNodeLabel = (node) => {
    return node ? `${node.type} (${node.id})` : "Unknown Node";
  };

  return (
    <div className="flex flex-col gap-4 p-2">
      {/* Global Settings */}
      <div className="border-2 border-[#1B3C53] rounded-md overflow-hidden">
        <div className="flex bg-[#456882] text-gray-100 text-m border-b-2 border-[#1B3C53] justify-start items-center px-2 py-1 gap-1">
          <span className="font-semibold">Global Settings</span>
        </div>
        <div className="p-3 bg-[#F9F3EF]">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="showMiniMap"
              checked={settings.showMiniMap}
              onChange={handleShowMiniMapToggle}
              className="w-4 h-4 cursor-pointer"

            />
            <label htmlFor="showMiniMap" className="text-sm">
              Show Mini Map
            </label>
          </div>
        </div>
      </div>

      {/* Node Settings */}
      {selectedNode ? (
        <div className="border-2 border-[#1B3C53] rounded-md overflow-hidden">
          <div className="flex bg-[#456882] text-gray-100 text-m border-b-2 border-[#1B3C53] justify-between items-center px-2 py-1">
            <div className="flex items-center gap-1">
              <MessageSquare size={16} className="text-gray-100" />
              <span className="font-semibold">
                {selectedNode.type
                  .slice(0, 1)
                  .toUpperCase() + selectedNode.type.slice(1,-4) + " " + selectedNode.type.slice(-4)} 
                Settings
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-3 p-3 bg-[#F9F3EF]">
            {/* Node ID */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Node ID
              </label>
              <div className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-sm text-gray-600">
                {selectedNode.id}
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                value={selectedNode.data.message}
                onChange={handleNodeMessageChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md min-h-[100px] text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3C53] focus:border-transparent"
                placeholder="Enter node message..."
              />
              <div className="flex flex-row items-center justify-start gap-3 mt-3">
                <button
                  className="flex flex-row items-center gap-1 bg-[#456882] text-gray-100 border-2 border-[#1B3C53] rounded-md px-3 py-1.5 hover:bg-[#1B3C53] transition-colors"
                  onClick={handleSaveNode}
                >
                  <Save size={16} className="mr-1" /> Save
                </button>
                <button
                  className="flex flex-row items-center gap-1 bg-[#FF6347] text-gray-100 border-2 border-[#1B3C53] rounded-md px-3 py-1.5 hover:bg-[#d13c1a] transition-colors"
                  onClick={handleDeleteNode}
                  title="Delete Node"
                >
                  <Trash2 size={16} className="mr-1" /> Delete
                </button>
              </div>
            </div>

            {/* Connected Nodes Information */}
            <div className="border-t-2 border-[#1B3C53] pt-3 mt-2">
              <div className="flex items-center gap-2 mb-2">
                <ArrowLeftRight size={16} className="text-[#1B3C53]" />
                <label className="text-sm font-medium text-gray-700">
                  Connected Nodes
                </label>
              </div>

              <div>
                <div className="space-y-1">
                  {getConnectedEdges().length > 0 ? (
                    getConnectedEdges().map((edge) => {
                      // Find the other node in the edge
                      const otherNodeId =
                        edge.source === selectedNode.id
                          ? edge.target
                          : edge.source;
                      const otherNode = getNodes().find(
                        (n) => n.id === otherNodeId
                      );
                      return (
                        <div key={edge.id} className="flex items-center gap-2">
                          <div className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-sm text-gray-600">
                            {getNodeLabel(otherNode)}
                          </div>
                          <button
                            className="text-red-500"
                            onClick={() => handleDeleteEdgeById(edge.id)}
                            title="Delete Edge"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      );
                    })
                  ) : (
                    <div className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-sm text-gray-500 italic">
                      No connected nodes
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Position Information */}
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4 p-2 justify-center items-center h-full border-2 border-dashed border-stone-600 rounded-md overflow-hidden">
          <div className="text-m text-stone-400">
            Select a node to Edit its Details
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPane;
