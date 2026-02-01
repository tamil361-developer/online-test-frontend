import { useState } from "react";
import { useNavigate } from "react-router";
import "../stylesheets/Register.css";

function Register() {
  const page_navigate = useNavigate();
  const [registerdetails, setRegisterdetails] = useState({type:"Registration"});
  const [otp, setOtp] = useState();
  // page redirect
  function page_navigate_fun() {
    page_navigate("/login");
  }

  // *start onchange update the state
  function handleChange(e) {
    const { name, value } = e.target;
    setRegisterdetails((previousState) => {
      return { ...previousState, [name]: value };
    });
  }
  // *end onchange update the state

  // *start register api call
  async function registerapicall(e) {
    if (parseInt(otp) === parseInt(registerdetails.otp)) {
      e.preventDefault();

      try {
        const response = await fetch("http://127.0.0.1:8000/register/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(registerdetails),
        });

        const res = await response.json();

        if (response.ok) {
          alert(res.message || "Registered successfully!");
          // setRedirect(true);
          page_navigate("/login");
        } else {
          // Show backend error directly
          alert(res.error || "Registration failed");
        }
      } catch (err) {
        alert("Username already exists");
      }
    }
    else{
      alert("Invalid OTP...Enter correct OTP")
    }
  }

  // get otp api call
  async function get_otp() {
    try {
      const res = await fetch("http://127.0.0.1:8000/get_otp/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerdetails), // must contain email
      });

      const data = await res.json();
      alert("OTP send your email acount... successfully");
      setOtp(data.otp); // store the otp in state if needed
    } catch (error) {
      console.error("Error while sending OTP:", error);
    }
  }

  return (
    <>
      <div className="register_container container-fluid  d-flex justify-content-center align-items-center  fw-bold  ">
        <div className="register_row row border p-5  rounded-4  shadow-lg text-white  ">
          <div className="col text-center ">
            <h1 className="">Register</h1>
            <form action="" onSubmit={registerapicall} className="mt-4 ">
              <div className="">
                <label htmlFor="" className=" ">
                  Student Id
                </label>
                <br />
                <input
                  type="text"
                  name="first_name"
                  id="first_name"
                  // placeholder={inputdata.username}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
                <br />
                <label htmlFor="" className=" ">
                  Student Name
                </label>
                <br />
                <input
                  type="text"
                  name="username"
                  id="username"
                  // placeholder={inputdata.username}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
                <br />
                <label htmlFor="" className="">
                  Email
                </label>
                <br />
                <input
                  type="email"
                  name="email"
                  id="email"
                  // placeholder={inputdata.email}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
                <br />
                <label htmlFor="" className="">
                  Password
                </label>
                <br />
                <input
                  type="password"
                  name="password"
                  id="password"
                  // placeholder={inputdata.password}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
                <br />
                <label htmlFor="" className="">
                  Confirm Password
                </label>
                <br />
                <input
                  type="password"
                  name="Confirm_password"
                  id="Confirm_password"
                  // placeholder={inputdata.Confirm_password}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
                <br />
                <div className="d-flex justify-content-center align-items-center">
                  <label htmlFor="" className="">
                    Enter OTP
                  </label>
                  <br />
                  <input
                    type="password"
                    name="otp"
                    id="otp"
                    // placeholder={inputdata.Confirm_password}
                    onChange={handleChange}
                    required
                    className="form-control"
                  />
                  <button className="btn btn-warning" onClick={get_otp}
                  disabled={registerdetails["email"] ?false :true}
                  >
                    Get OTP
                  </button>
                </div>
                <br />
                {/* submit */}
                <input
                  type="submit"
                  value="Register"
                  className="mt-2 btn btn-primary mb-3"
                />
              </div>
            </form>
            <a href= '/login' className="">
              Click..Go to Login Page
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
export default Register;
