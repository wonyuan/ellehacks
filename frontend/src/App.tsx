import Home from "@pages/Home";
import NotFound from "@pages/NotFound";
import Onboarding from "@pages/Onboarding";
import Chat from "@pages/Chat";
import Results from "@pages/Results";
import Evaluation from "@pages/Evaluation";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/results" element={<Results />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/evaluation" element={<Evaluation />} />
      </Routes>
    </Router>
  );
};

export default App;
