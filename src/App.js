import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "./Components/Navbar.jsx";
import Home from "./Pages/Home.jsx";
import Footer from "./Components/Footer.jsx";
import Analyzer from "./Pages/Analyzer";
import { AuthProvider } from "./Context/AuthContext";
import Chat from "./Pages/Chat";
import Diagnoser from "./Pages/Diagnoser.jsx";
function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/analyzer" element={<Analyzer />}></Route>
            <Route path="/community" element={<Chat />}></Route>
            <Route path="/diagnose" element={<Diagnoser />}></Route>

            <Route path="/" element={<Home />} />
          </Routes>
          <Footer />
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
