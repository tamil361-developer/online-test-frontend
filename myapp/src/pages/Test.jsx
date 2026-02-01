import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../stylesheets/Test.css";

function Test() {

  

  // start full screen mode
  useEffect(() => {
    const enterFullscreen = () => {
      const elem = document.documentElement;

      if (elem.requestFullscreen) elem.requestFullscreen();
      else if (elem.webkitRequestFullscreen) elem.webkitRequestFullscreen();
      else if (elem.msRequestFullscreen) elem.msRequestFullscreen();
    };

    // Enter fullscreen when component mounts
    enterFullscreen();

    const handleFullscreenChange = () => {
      if (
        !document.fullscreenElement &&
        !document.webkitFullscreenElement &&
        !document.msFullscreenElement
      ) {
        // Call API / auto-submit / navigate
        fetch("/api/submit-exam", { method: "POST", credentials: "include" });  
        submit_ans();
        // redirect to end page
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("msfullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "msfullscreenchange",
        handleFullscreenChange
      );
    };
  }, []);
  // end full screen mode


  const [warnings, setWarnings] = useState(0);
    // start tap controll
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setWarnings((prev) => prev + 1);
        submit_ans();
        // alert(
        //   ` Don't switched tabs! More than ${
        //     2 - warnings
        //   } times  Exam page will bw  closed automaticaly`
        // );

        // Optional: Auto-end exam after 3 warnings
        // if (warnings + 1 >= 1) { 
        //   submit_ans();
        // }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [warnings]);
  // end tap controll

// next button disable state
const [next, setNext] = useState(false);


  const std_name = localStorage.getItem("username");
  const std_id = localStorage.getItem("std_id");
  const qst_id = localStorage.getItem("questionid");
  const user_email = localStorage.getItem("email");
  const sub_name = localStorage.getItem("sub_name");

  const [dis, setDis] = useState(false);
  const [min, setMin] = useState(60);
  const [hr, setHr] = useState(60);

  //  FIX – run submit when hr == 0
  useEffect(() => {
    if (hr === 0) submit_ans();
  }, [hr]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (min > 0) setMin((prev) => prev - 1);
      else {
        setMin(60);
        setHr((prev) => prev - 1);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [min]);

  const page_navigate = useNavigate();

  //  FIX – initialize with empty array
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  //  DATA FETCH – no change
  useEffect(() => {
    if (!qst_id) return;

    fetch(`https://online-test-backend-1-lycf.onrender.com/${qst_id}/`)
      .then((res) => res.json())
      .then((data) => {
        // shuffle questions
        const shuffled = data.sort(() => Math.random() - 0.5);

        // take first 100
        const selected = shuffled.slice(0, 100);
        setQuestions(selected);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [qst_id]);

  //  ANSWERS
  const [answer, setAnswer] = useState({});
  // console.log(answer);
  const datas = { qst_modelid: qst_id, answer: answer, email: user_email };

  function ans_onchange(e) {
    const key = e.target.name;
    const value = e.target.value;
    setAnswer((prev) => ({ ...prev, [key]: value }));
  }

  // NEXT QUESTION
  function nextQuestion() {
    if (index < questions.length - 1) setIndex(index + 1);
  }

  // SUBMIT ANSWERS
  async function submit_ans() {
    setDis(true);
    setNext(true);

    const response = await fetch("https://online-test-backend-1-lycf.onrender.com/ans_check/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datas),
    });

    const res = await response.json();

    await fetch("https://online-test-backend-1-lycf.onrender.com/add_ansto_db/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify([
        {
          qst_id: qst_id,
          std_id: std_id,
          std_name: std_name,
          mark: res.mark,
          act: 1,
        },
      ]),
    });

    localStorage.removeItem("questionid");
    
    alert("Your Test Submited Successfully");
    page_navigate(sub_name);
  }

  //  THESE MUST BE AFTER ALL HOOKS
  // if (loading) return <h2>Loading...</h2>;
  if (!questions.length) return <h2>No Questions Found</h2>;

  const current = questions[index];



  // start stop refresh, right-click
  // useEffect(() => {
  //   name = "flexRadioDefault";
  //   const disableRefresh = (e) => {
  //     if (e.key === "F5" || (e.ctrlKey && e.key === "r")) e.preventDefault();
  //   };
  //   const disableContextMenu = (e) => e.preventDefault();

  //   document.addEventListener("keydown", disableRefresh);
  //   document.addEventListener("contextmenu", disableContextMenu);

  //   return () => {
  //     document.removeEventListener("keydown", disableRefresh);
  //     document.removeEventListener("contextmenu", disableContextMenu);
  //   };
  // }, []);
  // end stop refresh, right-click

  return (
    <>
      <div className="con container-fluid  ">
        <div className="test_head row p-3   sticky-top shadow">
          <div className="col-7 text-start">
            <h1 className="fw-bold">Data Analysis Test</h1>
          </div>

          <div className="col-5 text-end">
            <button
              className="btn btn-warning mt-2"
              onClick={submit_ans}
              disabled={dis}
            >
              Submit Test
            </button>
            <div className="mt-3 me-4">
              <h3>
                {hr}:{min < 10 ? "0" + min : min}
              </h3>
            </div>
          </div>
        </div>

        <div className="qst row mt-4 pt-md-5  ">
          <div className="col-12 mt-md-2 ">
            <div className="mb-4 p-3 border shadow-lg mt-3 rounded p-5  ">
              <h3 className="mb-5">{current.qst}</h3>

              {["A", "B", "C", "D"].map((opt) => (
                <div className="form-check" key={opt}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name={current.qst_id}
                    value={opt}
                    checked={answer[current.qst_id] === opt}
                    onChange={ans_onchange}
                  />
                  <label className="form-check-label">
                    {current[`op_${opt.toLowerCase()}`]}
                  </label>
                </div>
              ))}

              <br />

              {index + 1 < questions.length ? (
                <button disabled={next} className="btn btn-primary mt-2" onClick={nextQuestion}>
                  Next
                </button>
              ) : (
                <button className="btn btn-success" onClick={submit_ans}>
                  Submit Test
                </button>
              )}

              <p className="mt-4">
                {index + 1} / {questions.length}
              </p>
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
}

export default Test;

// full view questions code

// import { useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import "../stylesheets/Test.css";
// function Test() {
//   // submit button didable
//   const [dis, setDis] = useState(false);

//   const [min, setMin] = useState(60);
//   const [hr, setHr] = useState(60);

//   if (hr === 0) {
//     submit_ans();
//   }

//   useEffect(() => {
//     setTimeout(() => {
//       countmin();
//     }, 1000);
//   }, [min]);

//   function countmin() {
//     if (min > 0) {
//       setMin((ps) => ps - 1);
//     } else {
//       setMin(60);
//       setHr((ps) => ps - 1);
//     }
//   }

//   // page navigate
//   const page_navigate = useNavigate();
//   // qustion api state
//   const [questions, setQuestions] = useState();

//   const [showqst, setShowqst] = useState();
//   if (questions) {

//     // setShowqst(questions)
//   }
//   // start question api call
//   useEffect(() => {
//     fetch(`http://127.0.0.1:8000/${qst_id}/`)
//       .then((response) => response.json())
//       .then((data) =>
//          setQuestions(data)
//     );
//   }, []);
//   // end question api call

//   // tap controll state
//   const [warnings, setWarnings] = useState(0);
//   // get username and user id from localstorage
//   const std_name = localStorage.getItem("username");
//   const std_id = localStorage.getItem("userid");
//   const qst_id = localStorage.getItem("questionid");
//   const user_email = localStorage.getItem("email");
//   const sub_name = localStorage.getItem("sub_name");

//   // get ans state
//   const [answer, setAnswer] = useState({});
//   console.log(answer);
//   const datas = { qst_modelid: qst_id, answer: answer, email: user_email };

//   // navigate to user page
//   function user_page() {
//     localStorage.removeItem("questionid");
//     page_navigate("/user");
//   }

//   //ans onchange handler
//   function ans_onchange(e) {
//     const name = e.target.name;
//     const value = e.target.value;
//     setAnswer((previousState) => {
//       return { ...previousState, [name]: value };
//     });
//   }

//   // check ans and submit  from backend
//   async function submit_ans() {
//     setDis(true);
//     // console.log(answer);
//     const response = await fetch("http://127.0.0.1:8000/ans_check/", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(datas),
//     });
//     const res = await response.json();
//     // console.log(res.std_ans);
//     // console.log("mark", res.std_ans);

//     // data save from the db
//     const mark_response = await fetch("http://127.0.0.1:8000/add_ansto_db/", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify([
//         {
//           qst_id: qst_id,
//           std_id: std_id,
//           std_name: std_name,
//           mark: res.mark,
//           act: 1,
//           // email:user_email
//         },
//       ]),
//     });
//     // markss=mark_response.json()
//     // console.log(markss.email)

//     localStorage.removeItem("questionid");
//     alert("Your Test Submited Successfully");
//     page_navigate(sub_name);
//   }

// // start tap controll
// useEffect(() => {
//   const handleVisibilityChange = () => {
//     if (document.hidden) {
//       setWarnings((prev) => prev + 1);
//       // alert(
//       //   ` Don't switched tabs! More than ${
//       //     2 - warnings
//       //   } times  Exam page will bw  closed automaticaly`
//       // );

//       // Optional: Auto-end exam after 3 warnings
//       if (warnings + 1 >= 2) {
//         alert(" Exam ended due to multiple tab switches!");
//         submit_ans();

//         page_navigate("/user");
//         // redirect to end page
//       }
//     }
//   };

//   document.addEventListener("visibilitychange", handleVisibilityChange);

//   return () => {
//     document.removeEventListener("visibilitychange", handleVisibilityChange);
//   };
// }, [warnings]);
// // end tap controll

// // start stop refresh, right-click
// useEffect(() => {
//   name = "flexRadioDefault";
//   const disableRefresh = (e) => {
//     if (e.key === "F5" || (e.ctrlKey && e.key === "r")) e.preventDefault();
//   };
//   const disableContextMenu = (e) => e.preventDefault();

//   document.addEventListener("keydown", disableRefresh);
//   document.addEventListener("contextmenu", disableContextMenu);

//   return () => {
//     document.removeEventListener("keydown", disableRefresh);
//     document.removeEventListener("contextmenu", disableContextMenu);
//   };
// }, []);
// // end stop refresh, right-click

// // start full screen mode
// useEffect(() => {
//   const enterFullscreen = () => {
//     const elem = document.documentElement;

//     if (elem.requestFullscreen) elem.requestFullscreen();
//     else if (elem.webkitRequestFullscreen) elem.webkitRequestFullscreen();
//     else if (elem.msRequestFullscreen) elem.msRequestFullscreen();
//   };

//   // Enter fullscreen when component mounts
//   enterFullscreen();

//   const handleFullscreenChange = () => {
//     if (
//       !document.fullscreenElement &&
//       !document.webkitFullscreenElement &&
//       !document.msFullscreenElement
//     ) {
//       // Call API / auto-submit / navigate
//       fetch("/api/submit-exam", { method: "POST", credentials: "include" });

//       alert("You exited fullscreen. Exam terminated.");
//       submit_ans();
//       page_navigate("/user");
//       // redirect to end page
//     }
//   };

//   document.addEventListener("fullscreenchange", handleFullscreenChange);
//   document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
//   document.addEventListener("msfullscreenchange", handleFullscreenChange);

//   return () => {
//     document.removeEventListener("fullscreenchange", handleFullscreenChange);
//     document.removeEventListener(
//       "webkitfullscreenchange",
//       handleFullscreenChange
//     );
//     document.removeEventListener(
//       "msfullscreenchange",
//       handleFullscreenChange
//     );
//   };
// }, []);
// // end full screen mode

//   return (
//     <>
//       <div className="con container-fluid ">
//         <div className="test_head row p-md-3 sticky-top shadow">
//           <div className="col-7 text-start">
//             <h1 className="fw-bold">Data Analysis Test</h1>
//           </div>
//           <div className="col-5 text-end">
//             <button
//               className="btn btn-warning mt-2"
//               onClick={submit_ans}
//               disabled={dis}
//             >
//               Submit Test
//             </button>
//             <div>
//               <h3>
//                 {hr}:{min}
//               </h3>
//             </div>
//           </div>
//         </div>
//         <div className="qst row mt-3">
//           <div className="col-12">
//             {questions &&
//               questions.map((items) => (
//                 <div key={items.qst_id}>
//                   <div className="form-check">
//                     <div className="mb-4 p-3 border shadow-lg mt-3 rounded">
//                       <h5 className="mb-3">{items.qst}</h5>

//                       <div className="form-check">
//                         <input
//                           className="form-check-input"
//                           type="radio"
//                           name={items.qst_id}
//                           id={`q${items.qst_id}a`}
//                           value="A"
//                           onChange={(e) => {
//                             ans_onchange(e);
//                           }}
//                         />
//                         <label className="form-check-label" htmlFor="q1a">
//                           {items.op_a}
//                         </label>
//                       </div>

//                       <div className="form-check">
//                         <input
//                           className="form-check-input"
//                           type="radio"
//                           name={items.qst_id}
//                           id={`q${items.qst_id}b`}
//                           value="B"
//                           onChange={(e) => {
//                             ans_onchange(e);
//                           }}
//                         />
//                         <label className="form-check-label" htmlFor="q1b">
//                           {items.op_b}
//                         </label>
//                       </div>

//                       <div className="form-check">
//                         <input
//                           className="form-check-input"
//                           type="radio"
//                           name={items.qst_id}
//                           id={`q${items.qst_id}c`}
//                           value="C"
//                           onChange={(e) => {
//                             ans_onchange(e);
//                           }}
//                         />
//                         <label className="form-check-label" htmlFor="q1c">
//                           {items.op_c}
//                         </label>
//                       </div>

//                       <div className="form-check">
//                         <input
//                           className="form-check-input"
//                           type="radio"
//                           name={items.qst_id}
//                           id={`q${items.qst_id}d`}
//                           value="D"
//                           onChange={(e) => {
//                             ans_onchange(e);
//                           }}
//                         />
//                         <label className="form-check-label" htmlFor="q1d">
//                           {items.op_d}
//                         </label>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
// export default Test;
