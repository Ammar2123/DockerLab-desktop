import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

// Pages
import Home from "./pages/Home";
import AdminHome from "./pages/AdminHome";
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminDocs from "./pages/Admin/AdminDocuments";
import StudentPortal from "./pages/Student/StudentPortal";
import StudentDocs from "./pages/Student/DocsManager";
import Semesters from "./pages/Semesters";
import SemesterImages from "./pages/SemesterImages";

function App() {
  const [auth, setAuth] = useState(false);

  // 🔐 Protects routes - redirects if not logged in
  const PrivateRoute = ({ element }) => {
    return auth ? element : <Navigate to="/admin/login" />;
  };

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/student" element={<StudentPortal />} />
        <Route path="/student/docs" element={<StudentDocs />} />
        <Route path="/semesters" element={<Semesters />} />
        <Route path="/semester/:semNumber" element={<SemesterImages />} />

        {/* Admin Auth Routes */}
        <Route path="/admin/login" element={<AdminLogin setAuth={setAuth} />} />

        {/* Protected Admin Routes */}
        <Route path="/admin/home" element={<PrivateRoute element={<AdminHome setAuth={setAuth} />} />} />
        <Route path="/admin/dashboard" element={<PrivateRoute element={<AdminDashboard />} />} />
        <Route path="/admin/docs" element={<PrivateRoute element={<AdminDocs />} />} />
      </Routes>
    </Router>
  );
}

export default App;
