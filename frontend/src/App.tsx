import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import ImageUploadPage from "./components/ImageUploadPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/upload" element={<ImageUploadPage />} />
      </Routes>
    </Router>
  );
}

export default App;
