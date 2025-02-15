import Home from "@pages/Home";
import NotFound from "@pages/NotFound";
import Onboarding from "@pages/Onboarding";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/onboarding" element={<Onboarding />} />
      </Routes>
    </Router>
  );
};

export default App;
