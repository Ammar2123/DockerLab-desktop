import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import StudentPortal from "./pages/Student/StudentPortal";
import StudentDocs from "./pages/Student/DocsManager";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/a" element={<AdminDashboard />} />
        <Route path="/" element={<StudentDocs />} />
      </Routes>
    </Router>
  );
}

export default App;
