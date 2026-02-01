import { useNavigate } from "react-router";

function Admin_test() {
  const page_navigate = useNavigate();
  function nav_fun(sub) {
    page_navigate(`/admin_week_qst/${sub}`);
  }
  function std_marks() {
    page_navigate("/Mark_statement");
  }

  function logout() {
    localStorage.removeItem("admin_id");
    page_navigate("/admin");
  }
  return (
    <>
      <div className="at container-fluid bg-light ">
        <div className="at_heat row sticky-top p-2 shadow">
          <h2 className="  fw-bold mt-4  text-center ">IDM TECHPARK</h2>
        </div>
        <div className="row mt-4">
          <div className="col-12 text-end">
            <button className="btn btn-success " onClick={std_marks}>
              Students Marks
            </button>
            <button className="btn btn-danger ms-3 " onClick={logout}>
              logout
            </button>
          </div>
        </div>
        <div className="row text-white  ">
          <div className=" col-12 col-md-6 col-lg-4 mt-3 mt-lg-3 ">
            <div className="sub p-4 rounded-4 m-lg-4 shadow-lg ">
              <h3 className="mt-4  fw-bold ">Dada Anaysis</h3>
              <div className="row justify-content-center mt-4">
                <button
                  onClick={() => nav_fun("excel")}
                  className="btn btn_co col-5 col-md-5 m-2"
                >
                  Excel
                </button>
                <button
                  onClick={() => nav_fun("powerbi")}
                  className="btn btn_co  col-5 col-md-5 m-2"
                >
                  Powerbi
                </button>
                <button
                  onClick={() => nav_fun("tableau")}
                  className="btn btn_co  col-5 col-md-5 m-2"
                >
                  Tableau
                </button>
                <button
                  onClick={() => nav_fun("sql")}
                  className="btn btn_co  col-5 col-md-5 m-2"
                >
                  Sql
                </button>
                <button
                  onClick={() => nav_fun("python")}
                  className="btn btn_co  col-5 col-md-5 m-2"
                >
                  Python
                </button>
                <button
                  onClick={() => nav_fun("statistics")}
                  className="btn btn_co  col-5 col-md-5 m-2"
                >
                  Statistics
                </button>
              </div>
            </div>
          </div>

          <div className=" col-12 col-md-6 col-lg-4 mt-3 mt-lg-3 ">
            <div className="sub p-4 rounded-4 m-lg-4 shadow-lg">
              <h3 className="mt-4 fw-bold">Front_End</h3>
              <div className="row justify-content-center mt-4">
                <button className=" btn btn_co  col-5 col-md-5 m-2">
                  Html
                </button>
                <button className=" btn btn_co  col-5 col-md-5 m-2">
                  Css
                </button>
                <button className=" btn btn_co  col-5 col-md-5 m-2">
                  Java Script
                </button>
                <button className=" btn btn_co  col-5 col-md-5 m-2">
                  Bootstrap
                </button>
                <button className=" btn btn_co  col-5 col-md-5 m-2">
                  React Js
                </button>
              </div>
            </div>
          </div>

          <div className=" col-12 col-md-6 col-lg-4 mt-3 mt-lg-3">
            <div className="sub p-4 rounded-4 m-lg-4 shadow-lg">
              <h3 className="mt-4 fw-bold">Python Back_end</h3>
              <div className="row justify-content-center mt-4">
                <button className="btn btn_co  col-5 col-md-5 m-2">
                  Python
                </button>
                <button className="btn btn_co  col-5 col-md-5 m-2">
                  Django
                </button>
                <button className="btn btn_co  col-5 col-md-5 m-2">
                  Sql
                </button>
              </div>
            </div>
          </div>

          <div className=" col-12 col-md-6 col-lg-4 mt-3 mt-lg-3 ">
            <div className="sub p-4 rounded-4 m-lg-4 shadow-lg">
              <h3 className="mt-4 fw-bold">Mearn Back_End</h3>
              <div className="row justify-content-center mt-4">
                <button className="btn btn_co  col-5 col-md-5 m-2">
                  Node Js
                </button>
                <button className="btn btn_co  col-5 col-md-5 m-2">
                  Express
                </button>
                <button className="btn btn_co  col-5 col-md-5 m-2">
                  MongoDB
                </button>
              </div>
            </div>
          </div>

          <div className=" col-12 col-md-6 col-lg-4 mt-3 mt-lg-3">
            <div className="sub p-4 rounded-4 m-lg-4 shadow-lg">
              <h3 className="mt-4 fw-bold">Java Back_End</h3>
              <div className="row justify-content-center mt-4">
                <button className="btn btn_co  col-5 col-md-5 m-2">
                  Java
                </button>
                <button className="btn btn_co  col-5 col-md-5 m-2">
                  Spring Boot
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Admin_test;
