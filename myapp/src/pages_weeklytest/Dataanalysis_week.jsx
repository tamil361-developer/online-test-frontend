import { useNavigate } from "react-router-dom";
import "../stylesheets/User.css";
import { useEffect, useState } from "react";


import { IoMdArrowRoundBack } from "react-icons/io";
import { LuLogOut } from "react-icons/lu";
import { AiFillFileExcel } from "react-icons/ai";
import { PiMicrosoftPowerpointLogoFill } from "react-icons/pi";
import { SiTableau } from "react-icons/si";
import { SiMysql } from "react-icons/si";
import { FaPython } from "react-icons/fa";
import { FcStatistics } from "react-icons/fc";

function dataanalysis_week() {

  // const std_id = localStorage.getItem("std_id");
  const page_navigate = useNavigate();

  const [qst_paper_code, setQst_paper_code] = useState({
    std_id:localStorage.getItem("std_id"),
    excel_week: "",
    powerbi_week: "",
    tableau_week: "",
    sql_week: "",
    python_week: "",
    statistics_week: "",
  });

  console.log("qst_paper_code", qst_paper_code);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/excel_week/")
      .then((response) => response.json())
      .then((data1) => {
        if (data1.length > 0) {
          setQst_paper_code((ps) => {
            return { ...ps, excel_week: data1[0].qst_paper_code };
          });
        }
      });

    fetch("http://127.0.0.1:8000/powerbi_week/")
      .then((response2) => response2.json())
      .then((data2) => {
        if (data2.length > 0) {
          setQst_paper_code((ps) => {
            return { ...ps, powerbi_week: data2[0].qst_paper_code };
          });
        }
      });

    fetch("http://127.0.0.1:8000/tableau_week/")
      .then((response3) => response3.json())
      .then((data3) => {
        if (data3.length > 0) {
          setQst_paper_code((ps) => {
            return { ...ps, tableau_week: data3[0].qst_paper_code };
          });
        }
      });

    fetch("http://127.0.0.1:8000/sql_week/")
      .then((response4) => response4.json())
      .then((data4) => {
        if (data4.length > 0) {
          setQst_paper_code((ps) => {
            return { ...ps, sql_week: data4[0].qst_paper_code };
          });
        }
      });

    fetch("http://127.0.0.1:8000/python_week/")
      .then((response5) => response5.json())
      .then((data5) => {
        if (data5.length > 0) {
          setQst_paper_code((ps) => {
            return { ...ps, python_week: data5[0].qst_paper_code };
          });
        }
      });

    fetch("http://127.0.0.1:8000/statistics_week/")
      .then((response6) => response6.json())
      .then((data6) => {
        if (data6.length > 0) {
          setQst_paper_code((ps) => {
            return { ...ps, statistics_week: data6[0].qst_paper_code };
          });
        }
      });
  }, []);

  // logout function
  const handleLogout = () => {
    localStorage.removeItem("userid");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("std_id");
    page_navigate("/login");
  };

  // navigate to question page
  function question_page(questionid) {
    localStorage.setItem("questionid", questionid);
    page_navigate("/week_test");
  }

  //*start student marks api call
  const [results, setResults] = useState([]);
  useEffect(() => {
    get_marks();
  }, [qst_paper_code]);

  async function get_marks() {
    const response = await fetch("http://127.0.0.1:8000/get_week_marks/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(qst_paper_code),
    });
    const res = await response.json();
    setResults(res.result);
    // console.log("ressss", res.result);
  }
  // * end student mark api call

  // go to back page
  function back() {
    page_navigate("/dataanalysis");
  }

  console.log(results)
  console.log("hii")
  return (
    <>
      <div className="user_container container-fluid ">
        <div className="user_head  row  sticky-top">
          <div className="col-12 col-lg-6 mt-3  shadow-lg  text-start text-white user_text">
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
        <div className="row text-white mt-5 pb-5 ">
          <h1 className="text-white user_text text-center fw-bold">
            Weekly Tests
          </h1>
          <div className=" col-12 col-md-6 col-lg-4 mt-3 mt-lg-3">
            <div className="test p-4 rounded-4 m-lg-4 ">
              <h1 className="mt-4 fw-bold">
                <span>
                  <AiFillFileExcel className="me-1 mb-1 mb-1 text-info" />
                </span>
                Excel
              </h1>
              <button
                onClick={() => question_page("excel_week")}
                className="btn btn_color mt-4"
                // disabled={results.some(result => result.qst_paper_code === qst_paper_code.excel_week && result.mark !== null)}
                disabled={results.find(
                  (result) =>
                    result.qst_paper_code === qst_paper_code.excel_week &&
                    result.mark !== null
                )}
              >
                {results.find(
                  (result) =>
                    result.qst_paper_code === qst_paper_code.excel_week &&
                    result.mark !== null
                )
                  ? "Test Completed"
                  : "Write Test"}
              </button>
            </div>
          </div>
          <div className=" col-12 col-md-6 col-lg-4 mt-3 mt-lg-3">
            <div className="test p-4 rounded-4 m-lg-4 ">
              <h1 className="mt-4 fw-bold">
                <span>
                  <PiMicrosoftPowerpointLogoFill className="me-1 mb-1 mb-1 text-info" />
                </span>
                Power Bi
              </h1>
              <button
                onClick={() => question_page("powerbi_week")}
                className="btn btn_color mt-4"
                disabled={results.find(
                  (result) =>
                    result.qst_paper_code === qst_paper_code.powerbi_week &&
                    result.mark !== null
                )}
              >
                {results.find(
                  (result) =>
                    result.qst_paper_code === qst_paper_code.powerbi_week &&
                    result.mark !== null
                )
                  ? "Test Completed"
                  : "Write Test"}
              </button>
            </div>
          </div>
          <div className=" col-12 col-md-6 col-lg-4 mt-3 mt-lg-3">
            <div className="test p-4 rounded-4 m-lg-4 ">
              <h1 className="mt-4 fw-bold">
                <span>
                  <SiTableau className="me-1 mb-1 mb-1 text-info" />
                </span>
                Tableau
              </h1>

              <button
                onClick={() => question_page("tableau_week")}
                className="btn btn_color mt-4"
                disabled={results.find(
                  (result) =>
                    result.qst_paper_code === qst_paper_code.tableau_week &&
                    result.mark !== null
                )}
              >
                {results.find(
                  (result) =>
                    result.qst_paper_code === qst_paper_code.tableau_week &&
                    result.mark !== null
                )
                  ? "Test Completed"
                  : "Write Test"}
              </button>
            </div>
          </div>
          <div className=" col-12 col-md-6 col-lg-4 mt-3 mt-lg-3">
            <div className="test p-4 rounded-4 m-lg-4 ">
              <h1 className="mt-4 fw-bold">
                <span>
                  <SiMysql className="me-1 mb-1 mb-1 text-info" />
                </span>
                Sql
              </h1>
              <button
                onClick={() => question_page("sql_week")}
                className="btn btn_color mt-4"
                disabled={results.find(
                  (result) =>
                    result.qst_paper_code === qst_paper_code.sql_week &&
                    result.mark !== null
                )}
              >
                {results.find(
                  (result) =>
                    result.qst_paper_code === qst_paper_code.sql_week &&
                    result.mark !== null
                )
                  ? "Test Completed"
                  : "Write Test"}
              </button>
            </div>
          </div>
          <div className=" col-12 col-md-6 col-lg-4 mt-3 mt-lg-3">
            <div className="test p-4 rounded-4 m-lg-4 ">
              <h1 className="mt-4 fw-bold">
                <span>
                  <FaPython className="me-1 mb-1 mb-1 text-info" />
                </span>
                Python
              </h1>
              <button
                onClick={() => question_page("python_week")}
                className="btn btn_color mt-4"
                disabled={results.find(
                  (result) =>
                    result.qst_paper_code === qst_paper_code.python_week &&
                    result.mark !== null
                )}
              >
                {results.find(
                  (result) =>
                    result.qst_paper_code === qst_paper_code.python_week &&
                    result.mark !== null
                )
                  ? "Test Completed"
                  : "Write Test"}
              </button>
            </div>
          </div>
          <div className=" col-12 col-md-6 col-lg-4 mt-3 mt-lg-3 ">
            <div className="test p-4 rounded-4 m-lg-4 ">
              <h1 className="mt-4 fw-bold">
                <span>
                  <FcStatistics className="me-1 mb-1 mb-1 text-info" />
                </span>
                Statistics
              </h1>
              <button
                onClick={() => question_page("statistics_week")}
                className="btn btn_color mt-4"
                disabled={results.find(
                  (result) =>
                    result.qst_paper_code === qst_paper_code.statistics_week &&
                    result.mark !== null
                )}
              >
                {results.find(
                  (result) =>
                    result.qst_paper_code === qst_paper_code.statistics_week &&
                    result.mark !== null
                )
                  ? "Test Completed"
                  : "Write Test"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default dataanalysis_week;
