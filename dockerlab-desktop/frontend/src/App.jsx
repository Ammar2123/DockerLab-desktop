import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import StudentPortal from "./pages/Student/StudentPortal";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/student" element={<StudentPortal />} />
      </Routes>
    </Router>
  );
}

export default App;
