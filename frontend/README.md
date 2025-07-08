# Chatbot Flow Builder - Frontend

A modern React-based frontend application for building and managing chatbot conversation flows using a visual drag-and-drop interface.

**Live Demo**: [https://chatbot-flow-builder-bite-speed.vercel.app/](https://chatbot-flow-builder-bite-speed.vercel.app/)

## 🚀 Features

- **Visual Flow Builder**: Drag-and-drop interface for creating chatbot conversation flows
- **Node-based System**: Modular node system for different types of conversation elements
- **Real-time Preview**: See your chatbot flow as you build it
- **Responsive Design**: Modern UI with Tailwind CSS styling
- **Collapsible Sidebar**: Toggle between nodes and settings panels
- **Context Management**: Centralized state management with React Context

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks and functional components
- **Vite** - Fast build tool and development server
- **@xyflow/react** - Powerful flow chart and diagram library
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **React Hot Toast** - Toast notifications
- **React Resizable Panels** - Resizable panel components


## 📁 Project Structure

```
src/
├── components/
│   ├── NodeTypes/
│   │   └── MessageNode.jsx          # Message node component
│   ├── Others/
│   │   └── Navbar.jsx               # Navigation bar
│   ├── ReactFlow/
│   │   └── ReactFlowArea.jsx        # Main flow builder area
│   └── Sidebars/
│       ├── NodesPane.jsx            # Available nodes panel
│       └── SettingsPane.jsx         # Node settings panel
├── contexts/
│   └── AppContext.jsx               # Global application state
├── Pages/
│   └── Home.jsx                     # Main application page
├── App.jsx                          # Root application component
└── main.jsx                         # Application entry point
```

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Chatbot-FlowBuilder-BiteSpeed/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application


## 🎯 Usage

### Building a Chatbot Flow

1. **Add Nodes**: Use the Nodes panel to drag different conversation elements onto the canvas
2. **Connect Nodes**: Click and drag from node handles to create connections between elements
3. **Configure Settings**: Select any node and use the Settings panel to customize its behavior, edit messages, or remove edges
4. **Preview Flow**: Your changes are reflected in real-time on the canvas

### Interface Overview

- **Main Canvas**: The central area where you build your chatbot flow
- **Nodes Panel**: Contains available node types that can be added to your flow
- **Settings Panel**: Configure properties and behavior of selected nodes
- **Collapsible Sidebar**: Toggle between nodes and settings with the arrow button

## 🎨 Customization

### Styling
The application uses Tailwind CSS for styling. You can customize the appearance by modifying the CSS classes in the components.

### Adding New Node Types
To add new node types:
1. Create a new component in `src/components/NodeTypes/`
2. Register the node type in the flow configuration
3. Add it to the NodesPane component

## 🔧 Development

### State Management
The application uses React Context for global state management. The main context is defined in `src/contexts/AppContext.jsx`.

## 📦 Build and Deployment


### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

### Deployment
- **Vercel**: Connecting Github repository for automatic deployments


---

**Built with ❤️ using React and modern web technologies**

**This README was generated with the help of AI**
