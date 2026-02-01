import { Navigate } from "react-router";

function Admin_protection({ children }) {
  const admin_id = localStorage.getItem("admin_id");
  if (!admin_id) {
    return <Navigate to="/admin" replace />;
  } else {
    return children;
  }
}

export default Admin_protection;
