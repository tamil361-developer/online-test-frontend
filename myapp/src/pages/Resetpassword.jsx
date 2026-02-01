import { useState } from "react";
import { useNavigate } from "react-router";
import "../stylesheets/Resetpassword.css";

function Resetpassword() {
  const page_navigate = useNavigate();

  const [otp, setOtp] = useState();

  const [reset_details, setReset_details] = useState({type: "Reset Password"});

  function onchange_handle(e) {
    const name = e.target.name;
    const value = e.target.value;
    setReset_details((ps) => {
      return { ...ps, [name]: value };
    });
  }

  // get otp api call
  async function get_otp(e) {
    e.preventDefault();
    try {
      const res = await fetch("http://127.0.0.1:8000/get_otp/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reset_details), // must contain email
      });

      const data = await res.json();
      setOtp(data.otp);
      alert("OTP send your email acount... successfully");
    } catch (error) {
      console.error("Error while sending OTP:", error);
    }
  }

  //   reset api call
  async function reset_pass(e) {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/reset_pass/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: reset_details.email,
          password: reset_details.password,
        }),
      });

      const res = await response.json();
      console.log("Response:", res);

      if (response.ok) {
        alert(res.message || "Password reset successfully!");
        page_navigate("/login");
      } else {
        alert(res.error || "Password reset failed!");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong! Please try again.");
    }
  }

  return (
    <>
      <div className="reset_container container-fluid d-flex justify-content-center align-items-center vh-100 text-center">
        <div className="reset_row row rounded-4 p-5">
          <div className=" col-12 fw-bold text-white ">
            <h3>Reset Password</h3>
            <form action="">
              <label htmlFor=" " className="mt-3">
                Email
              </label>
              <input
                type="text"
                name="email"
                id="email"
                className="form-control mt-1 "
                onChange={(e) => onchange_handle(e)}
              />
              <div className="mt-4 mb-4">
                <button
                  className="btn btn-warning"
                  onClick={(e) => get_otp(e)}
                  disabled={reset_details.email ? false : true}
                >
                  Get OTP
                </button>
                <br />
                <input
                  type="text"
                  name="otp"
                  id="otp"
                  className="form-control mt-2 "
                  placeholder="Enter OTP"
                  onChange={(e) => onchange_handle(e)}
                />
              </div>
              <label htmlFor="">Password</label>
              <input
                type="text"
                name="password"
                id="password"
                className="form-control mt-2 "
                onChange={(e) => onchange_handle(e)}
              />
              <label htmlFor="">Confirm_password</label>
              <input
                type="text"
                name="confirm_password"
                id="confirm_password"
                className="form-control mt-2 "
                onChange={(e) => onchange_handle(e)}
              />
              <button
                className="btn btn-primary mt-4 mb-4"
                onClick={(e) => reset_pass(e)}
              >
                Reset
              </button>
              <br />
              <a className=" mt-4 mb-4" href="/login">
                Back to Login{" "}
              </a>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Resetpassword;
