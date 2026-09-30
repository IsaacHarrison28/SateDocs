import { Routes, Route, Navigate } from "react-router";
import LandingPage from "@/pages/LandingPage";
import ConverterPage from "@/pages/ConvertPage";
import HowItWorksPage from "./pages/HowItWorksPage";
import { ErrorRedirect } from "./components/ErrorRedirects";

export default function App() {
  return (
    <ErrorRedirect>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/convert" element={<ConverterPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
      </Routes>
    </ErrorRedirect>
  );
}
