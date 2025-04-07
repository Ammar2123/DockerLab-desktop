import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AdminHome from "./pages/AdminHome";
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminDocs from "./pages/Admin/AdminDocuments";
import StudentPortal from "./pages/Student/StudentPortal";
import StudentDocs from "./pages/Student/DocsManager";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/student" element={<StudentPortal />} />
        <Route path="/student/docs" element={<StudentDocs />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/home" element={<AdminHome />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/docs" element={<AdminDocs />} />
      </Routes>
    </Router>
  );
}

export default App;
