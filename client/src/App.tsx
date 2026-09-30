import { Routes, Route, Navigate } from "react-router";
import LandingPage from "@/pages/LandingPage";
import ConverterPage from "@/pages/ConvertPage";
import HowItWorksPage from "./pages/HowItWorksPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/convert" element={<ConverterPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
      <Route path="/how-it-works" element={<HowItWorksPage />} />
    </Routes>
  );
}
