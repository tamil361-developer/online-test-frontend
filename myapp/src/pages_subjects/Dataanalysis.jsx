import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../stylesheets/User.css";

import { IoMdArrowRoundBack } from "react-icons/io";
import { LuLogOut } from "react-icons/lu";
import { AiFillFileExcel } from "react-icons/ai";
import { PiMicrosoftPowerpointLogoFill } from "react-icons/pi";
import { SiTableau } from "react-icons/si";
import { SiMysql } from "react-icons/si";
import { FaPython } from "react-icons/fa";
import { FcStatistics } from "react-icons/fc";

function User() {
  // mark result for disable buttons
  const [results, setResults] = useState();
  // page navigate
  const page_navigate = useNavigate();
  // qst data state
  const [datas, setDatas] = useState([]);

  //*start student marks api call
  const da = {
    std_id: localStorage.getItem("std_id"),
    pyq1: "py1",
    pyq2: "py2",
    pyq3: "py3",
    pyq4: "py4",
    pyq5: "py5",
    pyq6: "py6",
  };

  useEffect(() => {
    get_marks();
  }, []);

  async function get_marks() {
    const response = await fetch("https://online-test-backend-1-lycf.onrender.com/get_marks/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(da),
    });
    const res = await response.json();
    setResults(res.result);
    // console.log("ressss", res.result);
  }
  // * end student mark api call


  // question page redirect with question id
  function question_page(questionid) {
    localStorage.setItem("questionid", questionid);
    page_navigate("/question");
  }

  // logout function
  const handleLogout = () => {
    localStorage.removeItem("userid");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("std_id");
    page_navigate("/login");
  };

  // back page
  function back() {
    page_navigate("/user");
  }

  return (
    <>
      <div className="user_container container-fluid ">
        <div className="user_head row pb-4 sticky-top shadow-lg">
          <div className="col-12 col-lg-6 mt-4  text-start text-warning user_text">
            <h2 className="ms-md-4 fw-bold">
              Student Name : {localStorage.getItem("username")}
            </h2>
            <h4 className="ms-md-4 fw-bold">
              Student Id : {localStorage.getItem("std_id")}
            </h4>
          </div>
          <div className="col-12 col-md-6 mt-lg-5 text-end">
            <button className="btn btn-primary me-3 " onClick={back}>
              <span>
                <IoMdArrowRoundBack className="me-1 mb-1" />
              </span>
              Back
            </button>
            <button
              variant="danger"
              onClick={handleLogout}
              className="btn btn-warning me-lg-5 "
            >
              <span>
                <LuLogOut className="me-2 mb-1" />
              </span>
              Logout
            </button>
          </div>
        </div>
        <div className="row text-white ">
          <div>
            <h2 className="fw-bold mt-3 text-center  sub_text">
              DATA ANALYSIS TEST
            </h2>
            <div className="text-center">
              <a href="/dataanalysis_week" className="btn btn-warning mt-4 ">
                Go to Weekly Test
              </a>
            </div>
          </div>
          <div className=" col-12 col-md-6 col-lg-4 mt-3 mt-lg-3">
            <div className="test p-4 rounded-4 m-lg-4 sub_text">
              <h1 className="mt-4">
                <span>
                  <AiFillFileExcel className="me-1 mb-1 mb-1 text-info" />
                </span>
                Excel
              </h1>
              <button
                className="btn btn_color mt-2"
                onClick={() => question_page("py1")}
                disabled={results?.some((item) => item.qst_id === "py1")}
              >
                {results?.some((item) => item.qst_id === "py1")
                  ? "Already Submitted"
                  : "Write Test"}
              </button>
            </div>
          </div>
          <div className=" col-12 col-md-6 col-lg-4 mt-3">
            <div className="test p-4  rounded-4 m-lg-4 sub_text">
              <h1 className="mt-4">
                <span>
                  <PiMicrosoftPowerpointLogoFill className="me-1 mb-1 mb-1 text-info" />
                </span>
                Power Bi
              </h1>
              <button
                className="btn btn_color mt-2"
                onClick={() => question_page("py2")}
                disabled={
                  results?.some((item) => item.qst_id === "py2") ||
                  !results?.some((item) => item.qst_id === "py1")
                }
              >
                {results?.some((item) => item.qst_id === "py2")
                  ? "Already Submitted"
                  : "Write Test"}
              </button>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4 mt-3">
            <div className="test p-4 rounded-4 m-lg-4 sub_text">
              <h1 className="mt-4 ">
                <span>
                  <SiTableau className="me-1 mb-1 mb-1 text-info" />
                </span>
                Tableau
              </h1>
              <button
                className="btn btn_color mt-2"
                onClick={() => question_page("py3")}
                disabled={
                  results?.some((item) => item.qst_id === "py3") ||
                  !results?.some((item) => item.qst_id === "py2")
                }
              >
                {results?.some((item) => item.qst_id === "py3")
                  ? "Already Submitted"
                  : "Write Test"}
              </button>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4 mt-3">
            <div className="test p-4   rounded-4 m-lg-4 sub_text">
              <h1 className="mt-4 ">
                <span>
                  <SiMysql className="me-1 mb-1 mb-1 text-info" />
                </span>
                Sql
              </h1>
              <button
                className="btn btn_color mt-2 mt-3"
                onClick={() => question_page("py4")}
                disabled={
                  results?.some((item) => item.qst_id === "py4") ||
                  !results?.some((item) => item.qst_id === "py3")
                }
              >
                {results?.some((item) => item.qst_id === "py4")
                  ? "Already Submitted"
                  : "Write Test"}
              </button>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4 mt-3">
            <div className="test p-4  rounded-4 m-lg-4 sub_text">
              <h1 className="mt-4 ">
                {" "}
                <span>
                  <FaPython className="me-1 mb-1 mb-1 text-info" />
                </span>
                Python
              </h1>
              <button
                className="btn btn_color mt-2"
                onClick={() => question_page("py5")}
                disabled={
                  results?.some((item) => item.qst_id === "py5") ||
                  !results?.some((item) => item.qst_id === "py4")
                }
              >
                {results?.some((item) => item.qst_id === "py5")
                  ? "Already Submitted"
                  : "Write Test"}
              </button>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4 mt-3 mb-md-5">
            <div className="test p-4  rounded-4 m-lg-4 sub_text">
              <h1 className="mt-4 ">
                <span>
                  <FcStatistics className="me-1 mb-1 mb-1 text-info" />
                </span>
                Statistics
              </h1>
              <button
                className="btn btn_color mt-2"
                onClick={() => question_page("py6")}
                disabled={
                  results?.some((item) => item.qst_id === "py6") ||
                  !results?.some((item) => item.qst_id === "py5")
                }
              >
                {results?.some((item) => item.qst_id === "py6")
                  ? "Already Submitted"
                  : "Write Test"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default User;
