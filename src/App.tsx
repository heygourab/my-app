import { HomePage } from "./views/home/HomePage";
import { RecommendationPage } from "./views/recommendation/RecommendationPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/recommendation/:type/:id/*"
          element={<RecommendationPage />}
        />
        <Route
          path="*"
          element={<div className="text-red-400">404 not found </div>}
        />
      </Routes>
    </Router>
  );
}

export default App;
