import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../stylesheets/User.css";
import { LuLogOut } from "react-icons/lu";
import { TbDeviceDesktopAnalytics } from "react-icons/tb";
import { IoLogoReact } from "react-icons/io5";
import { FaNodeJs } from "react-icons/fa6";
import { IoLogoPython } from "react-icons/io";
import { FaJava } from "react-icons/fa";
import { FaTachographDigital } from "react-icons/fa6";
import { Si365Datascience } from "react-icons/si";

function User() {
  const page_navigate = useNavigate();
  // logout function
  const handleLogout = () => {
    localStorage.removeItem("userid");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("std_id");
    page_navigate("/");
  };
  function page_nav(page) {
    localStorage.setItem("sub_name", page);
    page_navigate(page);
  }
  return (
    <>
      <div className="container-fluid ">
        <div className="user_head shadow-lg row pb-4 sticky-top">
          <div className="col-12 col-lg-6 mt-4  text-start text-warning user_text">
            <h3 className="ms-md-4 fw-bold">
              Student Name : {localStorage.getItem("username")}
            </h3>
            <h4 className="ms-md-4 fw-bold">
              Student Id : {localStorage.getItem("std_id")}
            </h4>
          </div>
          <div className="col-12 col-md-6 mt-lg-5 text-end">
            <button
              variant="danger"
              onClick={handleLogout}
              className="btn btn-warning me-lg-5 "
            >
              <span>
                <LuLogOut className="me-2" />
              </span>
              Logout
            </button>
          </div>
        </div>

        <div className="row  user_head text-white sub_text">
          <div className="col-12 col-lg-6 scrl">
            <div className=" col-12 col-lg-10 mt-3">
              <div className="test p-4  rounded-4 m-lg-4 ">
                <h2 className="mt-4">
                  {" "}
                  <span>
                    <TbDeviceDesktopAnalytics className="me-1 mb-1 mb-1 text-info" />
                  </span>
                  Data Analysis
                </h2>
                <button
                  className="btn btn_color mt-3"
                  onClick={() => page_nav("/dataanalysis")}
                >
                  Go to Test
                </button>
              </div>
            </div>
            <div className=" col-12 col-lg-10 mt-3">
              <div className="test p-4  rounded-4 m-lg-4 ">
                <h2 className="mt-4">
                  <span>
                    <IoLogoReact className="me-1 mb-1 mb-1 text-info" />
                  </span>
                  Front_End
                </h2>
                <button className="btn btn_color mt-3">Go to Test</button>
              </div>
            </div>
            <div className=" col-12 col-lg-10 mt-3">
              <div className="test p-4  rounded-4 m-lg-4 ">
                <h2 className="mt-4">
                  <span>
                    <FaNodeJs className="me-1 mb-1 mb-1 text-info" />
                  </span>
                  Mear Back_End
                </h2>
                <button className="btn btn_color  mt-3">Go to Test</button>
              </div>
            </div>
            <div className=" col-12 col-lg-10 mt-3">
              <div className="test p-4  rounded-4 m-lg-4 ">
                <h2 className="mt-4">
                  <span>
                    <IoLogoPython className="me-1 mb-1 mb-1 text-info" />
                  </span>
                  Python Back_End
                </h2>
                <button className="btn btn_color mt-3">Go to Test</button>
              </div>
            </div>
            <div className=" col-12 col-lg-10 mt-3">
              <div className="test p-4  rounded-4 m-lg-4 ">
                <h2 className="mt-4">
                  <span>
                    <FaJava className="me-1 mb-4 text-info" />
                  </span>
                  Java Back_end
                </h2>
                <button className="btn btn_color mt-3">Go to Test</button>
              </div>
            </div>
            <div className=" col-12 col-lg-10 mt-3">
              <div className="test p-4  rounded-4 m-lg-4 ">
                <h2 className="mt-4">
                  <span>
                    <FaTachographDigital className="me-1 mb-1 mb-1 text-info" />
                  </span>
                  Digital Marketting
                </h2>
                <button className="btn btn_color">Go to Test</button>
              </div>
            </div>
            <div className=" col-12 col-lg-10 mt-3">
              <div className="test p-4  rounded-4 m-lg-4 ">
                <h2 className="mt-4">
                  <span>
                    <Si365Datascience className="me-1 mb-1 mb-1 text-info" />
                  </span>
                  Data Science
                </h2>
                <button className="btn btn_color mt-3">Go to Test</button>
              </div>
            </div>
          </div>

          {/* Right side fixed */}
          {/* <div
            className="col-6 position-sticky top-0"
            style={{
              height: "100vh",
            }}
          >
            <div className="ps-lg-5 in rounded mt-4 pb-4 ">
              <h2 className="pt-3 pb-5 text-warning">Instructions</h2>
              <p>1. Each topic includes a 100-mark test.</p>
              <p>
                2. A weekly mock test will also be conducted for each topic.
              </p>
              <p>3. The 100-mark test duration is 1 hour.</p>
              <p>4. The weekly test duration is 2 hours.</p>
              <p>
                5. During the test, if you switch to another tab more than once,
                your exam will be automatically submitted.
              </p>
              <p>6. Once the test is submitted, you cannot retake the exam.</p>
              <p>
                7. After submission, your marks will be automatically sent to
                your registered email address.
              </p>
              <p>
                8. All test scores are securely stored. During placement
                evaluations, your academic performance will be reviewed, and the
                institute will offer placement support according to your
                results.
              </p>
              <p>
                9. If you have any questions or concerns regarding the test,
                please consult your trainer for clarification.
              </p>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}

export default User;
