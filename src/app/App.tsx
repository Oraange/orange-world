import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { LoadingProvider, useLoading } from "./contexts/LoadingContext";
import { LoadingOverlay } from "./components/LoadingOverlay";
import HomePage from "./pages/HomePage";
import TodoPage from "./pages/TodoPage";
import PortfolioPage from "./pages/PortfolioPage";
import GamesPage from "./pages/GamesPage";

function AppContent() {
  const { isLoading, loadingMessage } = useLoading();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="relative">
        {isLoading && <LoadingOverlay message={loadingMessage} />}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/todo" element={<TodoPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/games" element={<GamesPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <LoadingProvider>
        <AppContent />
      </LoadingProvider>
    </Router>
  );
}
