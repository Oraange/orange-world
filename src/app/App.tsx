import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import HomePage from "./pages/HomePage";
import TodoPage from "./pages/TodoPage";
import PortfolioPage from "./pages/PortfolioPage";
import GamesPage from "./pages/GamesPage";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/todo" element={<TodoPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/games" element={<GamesPage />} />
        </Routes>
      </div>
    </Router>
  );
}
