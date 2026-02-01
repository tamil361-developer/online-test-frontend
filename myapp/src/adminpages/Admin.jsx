import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Admin() {
  const page_navigate = useNavigate();
  const [user, setUser] = useState({ userid: "", password: "" });

  function handleChange(e) {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  const admin_id = "idm2026";
  const r_password = "idm";

  function submit_fun(e) {
    e.preventDefault();
    if (user.userid === admin_id && user.password === r_password) {
      localStorage.setItem("admin_id", admin_id);
      page_navigate("/admin_test");
    } else {
      alert("enter correct user and pass");
    }
  }
  return (
    <>
      <div className="admin_container container-fluid d-flex justify-content-center align-items-center vh-100">
        <div className="admin_row text-white text-center fw-bold rounded-4 border shadow-lg p-5  ">
          <div className="col-12">
            <h1 className="text-warning mb-4">Admins Only</h1>
            <form onSubmit={submit_fun}>
              <div>
                <label htmlFor="userid" className="mt-2">
                  User Id
                </label>
                <input
                  type="text"
                  name="userid"
                  id="userid"
                  value={user.userid}
                  onChange={handleChange}
                  required
                  className="form-control"
                />

                <label htmlFor="password" className="mt-3">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={user.password}
                  onChange={handleChange}
                  required
                  className="form-control"
                />

                <input
                  type="submit"
                  className="btn btn-primary mt-3"
                  value="Login"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Admin;
