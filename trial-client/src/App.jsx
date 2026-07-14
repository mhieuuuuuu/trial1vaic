import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AIAssistantPage from "./pages/AIAssistantPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/ai-assistant" element={<AIAssistantPage />} />
    </Routes>
  );
}
