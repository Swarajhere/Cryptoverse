import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import CryptoDetails from "./components/CryptoDetails";

function App1() {
  return (
    // <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/crypto/:uuid" element={<CryptoDetails />} />
      </Routes>
    // </Router>
  );
}

export default App1;
