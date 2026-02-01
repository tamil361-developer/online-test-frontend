import { useEffect, useState } from "react";
import "../stylesheets/Question.css";
import { useNavigate } from "react-router-dom";

function Question() {
  const page_navigate = useNavigate();
  // question id
  const questionid = localStorage.getItem("questionid");
  // start count state
  const [count, setCount] = useState(0);

  // test count function
  // useEffect(() => {
  //   setTimeout(() => {
  //     add();
  //   }, 1000);
  // });
  // function add() {
  //   if (count > 1) {
  //     setCount((previousState) => {
  //       return previousState - 1;
  //     });
  //   } else {
  //     page_navigate("/test");
  //   }
  // }

  function nav_page(){
    page_navigate("/test")
  }

  return (
    <>
      <div className="count_container  text-white p-2 p-lg-5">
        <div className="count_inner_container text-center fw-bold p-5 rounded-5 ">
          <h1 className="text-dark fw-bold">
            Data Analysis Test : {questionid}
          </h1>
          <button className="btn btn-primary mt-3" onClick={nav_page}>Start Test</button>
        </div>

        <div className="ps-lg-5 ins rounded mt-4 pb-4 p-2 text-dark fw-bold">
          <h2 className="pt-3 pb-5 text-dark fw-bold">Instructions</h2>
          <p>1. Each topic includes a 100-mark test.</p>
          <p>2. A weekly mock test will also be conducted for each topic.</p>
          <p>3. The 100-mark test duration is 1 hour.</p>
          <p>4. The weekly test duration is 2 hours.</p>
          <p>
            5. During the test, if you switch to another tab more than once,
            your exam will be automatically submitted.
          </p>
          <p>6. Once the test is submitted, you cannot retake the exam.</p>
          <p>
            7. After submission, your marks will be automatically sent to your
            registered email address.
          </p>
          <p>
            8. All test scores are securely stored. During placement
            evaluations, your academic performance will be reviewed, and the
            institute will offer placement support according to your results.
          </p>
          <p>
            9. If you have any questions or concerns regarding the test, please
            consult your trainer for clarification.
          </p>
        </div>
      </div>
    </>
  );
}
export default Question;

/* <div className="container-fluid ">
        <div className="row">
          <div className="col-12">
            {questions &&
              questions.map((items) => (
                <div>
                  <h2>{items.qst}</h2>
                  <input type="radio" value="a" />
                  <label>{items.op_a}</label>
                  <br />
                  <input type="radio" value="b" />
                  <label>{items.op_b}</label>
                  <br />
                  <input type="radio" value="c" />
                  <label>{items.op_c}</label>
                  <br />
                  <input type="radio" value="d" />
                  <label>{items.op_d}</label>
                  <br />
                </div>
              ))}
          </div>
        </div>
      </div> */
