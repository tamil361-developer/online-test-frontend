import { useState } from "react";
import { useNavigate } from "react-router";
import "../stylesheets/Login.css"

function Login() {
  // page navigate
  const page_navigate = useNavigate();
  // onchange state
  const [logindetails, setLogindetails] = useState({});

  //Reset pass fun
  function resetpass(){
    page_navigate("/resetpassword")
  } 

  // page redirect
  function page_navigate_fun() {
    page_navigate("/");
  }

  //*start onchange update the state  
  function handleChange(e) {
    const { name, value } = e.target;
    setLogindetails((previousState) => {
      return { ...previousState, [name]: value };
    });
  }
  //*end onchange update the state  

  // *start login api call
  async function loginUser(e) {
    e.preventDefault();
    const response = await fetch("https://online-test-backend-1-lycf.onrender.com/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(logindetails),
    });
    const res = await response.json();
    if (res.message === "Login successful") {
      localStorage.setItem("userid", res.userid);
      localStorage.setItem("username", res.username);
      localStorage.setItem("email",res.email)
      localStorage.setItem("std_id",res.std_id)
      page_navigate("/user");
    } else {
      alert(res.message);
    }
    // console.log(res.userid);
  }
  // *end login api call

  return (
    <>
      <div className="login_container container-fluid d-flex justify-content-center align-items-center vh-100 ">
        <div className="login_row row text-white text-center fw-bold rounded-4 border shadow-lg p-5">
          <div className="col-12">
            <h1 className="text-warning mb-4">Login</h1>
            <form action="" onSubmit={loginUser}>
              <div className="">
                <label htmlFor="" className="mt-2">
                  User Name
                </label>
                <br />
                <input
                  type="text"
                  name="username"
                  id="username"
                  onChange={handleChange}
                  required
                  className="form-control"
                />
                <br />
                {/* <label htmlFor="" className="mt-2">Email</label><br/><input type="email" name="email" id="email"  onChange={handleChange}/><br/> */}
                <label htmlFor="" className="mt-2">
                  Password
                </label>
                <br />
                <input
                  type="password"
                  name="password"
                  id="password"
                  onChange={handleChange}
                  required
                  className="form-control"
                />
                <br />
                {/* <label htmlFor="" className="mt-2">Confirm Password</label><br/><input type="password" name="Confirm_password" id="Confirm password" onChange={handleChange}/><br/> */}
                <input type="submit" className="mt-2 mb-3 btn btn-primary" />
              </div>
            </form>
            <a
              href="/"
              className="mt-2 mb-5"
            >
              Click...Go to Register
            </a>
            <br />
            <a className=" mt-5 text-danger" onClick={resetpass}>Reset Password</a>
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;
