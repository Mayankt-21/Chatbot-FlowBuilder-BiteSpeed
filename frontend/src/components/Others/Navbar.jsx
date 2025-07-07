import { RefreshCw } from "lucide-react";
import { useAppContext } from "../../contexts/AppContext";
import { useCallback } from "react";
import toast, { Toaster } from "react-hot-toast";

const Navbar = () => {
  const { nodes, edges } = useAppContext();

  const saveFlow = useCallback(() => {
    // Check if any node has a target edge not set
    if(nodes.length === 1) {
      toast.success("Flow Saved Successfully");
      return;
    }
    const nodesWithoutTarget = nodes.filter(node => {
      // Check if this node has any outgoing edges (as source)
      const hasOutgoingEdge = edges.some(edge => edge.source === node.id);
      return !hasOutgoingEdge;
    });

    if (nodesWithoutTarget.length > 1) {
      toast.error(`Cannot save flow with more than one Nodes without target edges: [${nodesWithoutTarget.map(node => node.id)}]`);
      return;
    }

    // If validation passes, proceed with save
    toast.success("Flow Saved Successfully");
  }, [nodes, edges]);

  return (
    <div className="relative">
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#F9F3EF',
            color: '#000',
            border: '2px solid #1B3C53',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '400',
          },
          error: {
            duration: 4500,
            background: '#F9F3EF',
            color: '#000',
            border: '2px solid #1B3C53',
            borderRadius: '8px',
          },
          success: {
            background: '#F9F3EF',
            color: '#000',
            border: '2px solid #1B3C53',
            borderRadius: '8px',
          },
        }}
      />
      <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
        <h1 className="text-2xl font-bold">ChatBot Flow Builder</h1>
        <button
          onClick={saveFlow}
          className="flex justify-center gap-2 items-center bg-white text-gray-800 font-semibold text-lg rounded-md px-2 py-2 ml-4 hover:bg-[#456882] hover:text-white transition-colors"
        >
          <RefreshCw size={18}/> Save
        </button>
      </div>
    </div>
  );
};  

export default Navbar;