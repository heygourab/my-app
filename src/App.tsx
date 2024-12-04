import { HomePage } from "./views/home/HomePage";
import { RecommendationPage } from "./views/recommendation/RecommendationPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recommendation/:id" element={<RecommendationPage />} />
      </Routes>
    </Router>
  );
}

export default App;
