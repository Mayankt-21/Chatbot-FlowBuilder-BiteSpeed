import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppContextProvider } from "./contexts/AppContext";
import Home from "./Pages/Home"

function App() {
  return (
    <AppContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </AppContextProvider>
  );
}

export default App;
