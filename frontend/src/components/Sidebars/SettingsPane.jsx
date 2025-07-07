import React, { useEffect } from "react";
import { useAppContext } from "../../contexts/AppContext";
import { MessageSquare } from "lucide-react";
import { useReactFlow } from "@xyflow/react";
import { ArrowLeftRight } from "lucide-react";

const SettingsPane = () => {
  const {
    settings,
    setSettings,
    selectedNode,
    setSelectedNode,
    nodes,
    setNodes
  } = useAppContext();

  const { getEdges, getNodes } = useReactFlow();

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
      setNodes(prevNodes => prevNodes.map(node => {
        if (node.id === selectedNode.id) {
          return {
            ...node,
            data: {
              ...node.data,
              message: selectedNode.data.message
            }
          };
        }
        return node;
      }));
    }
  };

  const getNodeConnections = () => {
    if (!selectedNode || !getEdges()) return { connectedNodes: [] };

    const connectedEdges = getEdges().filter(
      (edge) =>
        edge.source === selectedNode.id || edge.target === selectedNode.id
    );

    // Get unique connected nodes
    const connectedNodeIds = new Set(
      connectedEdges.flatMap((edge) => [edge.source, edge.target])
    );
    // Remove the selected node's ID
    connectedNodeIds.delete(selectedNode.id);

    // Get the actual node objects
    const connectedNodes = Array.from(connectedNodeIds)
      .map((id) => getNodes().find((n) => n.id === id))
      .filter(Boolean);

    return { connectedNodes };
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
              className="w-4 h-4"
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
          <div className="flex bg-[#456882] text-gray-100 text-m border-b-2 border-[#1B3C53] justify-start items-center px-2 py-1 gap-1">
            <MessageSquare size={16} className="text-gray-100" />
            <span className="font-semibold">Node Settings</span>
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

            {/* Node Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Node Type
              </label>
              <div className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-sm text-gray-600">
                {selectedNode.type}
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
              <button
                className="bg-[#456882] text-gray-100 text-m border-2 border-[#1B3C53] rounded-md px-2 py-1"
                onClick={handleSaveNode}
              >
                Save
              </button>
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
                  {getNodeConnections().connectedNodes.length > 0 ? (
                    getNodeConnections().connectedNodes.map((node) => (
                      <div
                        key={node.id}
                        className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-sm text-gray-600"
                      >
                        {getNodeLabel(node)}
                      </div>
                    ))
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
