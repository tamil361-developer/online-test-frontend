import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Admin.css";

function excel_week_qst() {
  const date = new Date().toLocaleDateString();
  const today = new Date()
    .toISOString()
    .slice(0, 10)
    .split("-")
    .reverse()
    .join("");

  const { sub } = useParams();

  const page_navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState({
    qst_id: "",
    qst: "",
    op_a: "",
    op_b: "",
    op_c: "",
    op_d: "",
    ans: "",
    qst_paper_code: today + sub,
  });
  // console.log(question);
  // //  get qst
  const fetchQuestions = async () => {
    const res = await fetch(`http://127.0.0.1:8000/${sub}_week/`);
    const data = await res.json();
    if (data) {
    }
    setQuestions(data);
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  // qst submit
  const handleChange = (e) => {
    setQuestion({ ...question, [e.target.name]: e.target.value.toUpperCase() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://127.0.0.1:8000/${sub}_week/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(question),
    });

    const data = await response.json();
    alert(data.message || "Error adding question");
    fetchQuestions();
  };

  // delete qst
  const deleteQuestion = async (id) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      const response = await fetch(
        `http://127.0.0.1:8000/${sub}_week_delete/${id}/`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();
      alert(data.message || data.error);
      fetchQuestions(); // refresh list
    }
  };

  // delete all questions
  function delete_all_questions(subject) {
    if (window.confirm("Are you sure you want to delete all questions?")) {
      fetch("http://127.0.0.1:8000/all_week_qst_delete/" + subject + "/", {
        method: "DELETE",
      })  
        .then((response) => response.json())
        .then((data) => {
          alert(data.message || data.error);
          fetchQuestions(); // refresh list
        }); 
    }
  }


  return (
    <>
      <div className="aw container-fluid pt-lg-5  bg-light">
        <h3 className=" aw_head text-center fw-bold mb-4 ">IDM TECHPARK</h3>
        <h4 className="aw_head text-center fw-bold">{date}</h4>
        <div className="aw_container container rounded-4 shadow-lg pt-3 pt-lg-4  bg-light ">
          <h3 className="aw_head fw-bold   mt-4 mb-4 text-warning">{sub.toUpperCase()} </h3>
          <h4 className=" aw_head mb-4 fw-bold ">Add New Question</h4>
          <form onSubmit={handleSubmit} className="bg-light">
            <div className="mb-3">
              <label className="form-label fw-bold">Question Paper Code </label>
              <input
                value={today + sub}
                type="text"
                name="qst_paper_code"
                className="form-control fw-bold"
                readOnly
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Question ID</label>
              <input
                type="text"
                name="qst_id"
                className="form-control"
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Question</label>
              <textarea
                name="qst"
                className="form-control"
                rows="3"
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="mb-3">
              <label className="form-label">Option A</label>
              <input
                type="text"
                name="op_a"
                className="form-control"
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Option B</label>
              <input
                type="text"
                name="op_b"
                className="form-control"
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Option C</label>
              <input
                type="text"
                name="op_c"
                className="form-control"
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Option D</label>
              <input
                type="text"
                name="op_d"
                className="form-control"
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Answer</label>
              <input
                type="text"
                name="ans"
                className="form-control"
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="btn btn-primary mb-3 mt-2">
              Add Question
            </button>
          </form>
        </div>

        {/* qst */}
        <div className="container mt-5 aw_container rounded-4 shadow-lg">
          <div className="row">
            <h3 className="mb-3 fw-bold pt-4 pb-4 col-6 ">All Questions</h3>
            <div className="col-6 text-end pt-4 pb-4">
              <button className="btn btn-danger " onClick={()=>delete_all_questions(sub)}> Clear All Questions</button>
            </div>
          </div>
          <table className=" table shadow-4   table-bordered table-hover">
            <thead className="">
              <tr className=" ">
                <th>Question Paper Code</th>
                <th>Question</th>
                <th>Answer</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {questions.length > 0 ? (
                questions.map((q) => (
                  <tr key={q.id}>
                    <td>{q.qst_paper_code}</td>
                    <td>{q.qst}</td>
                    <td>{q.ans}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteQuestion(q.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    No questions found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default excel_week_qst;

// function QuestionList() {
//   const [questions, setQuestions] = useState([]);

//   const fetchQuestions = async () => {
//     const res = await fetch("http://127.0.0.1:8000/questions/");
//     const data = await res.json();
//     setQuestions(data);
//   };

//   const deleteQuestion = async (id) => {
//     if (window.confirm("Are you sure you want to delete this question?")) {
//       const response = await fetch(
//         `http://127.0.0.1:8000/delete_question/${id}/`,
//         {
//           method: "DELETE",
//         }
//       );

//       const data = await response.json();
//       alert(data.message || data.error);
//       fetchQuestions(); // refresh list
//     }
//   };

//   useEffect(() => {
//     fetchQuestions();
//   }, []);

//   return (
//     <div className="container mt-4">
//       <h3 className="mb-3">All Questions</h3>
//       <table className="table table-striped table-bordered table-hover">
//         <thead className="table-dark">
//           <tr>
//             <th>ID</th>
//             <th>Question ID</th>
//             <th>Question</th>
//             <th>Answer</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {questions.length > 0 ? (
//             questions.map((q) => (
//               <tr key={q.id}>
//                 <td>{q.id}</td>
//                 <td>{q.qst_id}</td>
//                 <td>{q.qst}</td>
//                 <td>{q.ans}</td>
//                 <td>
//                   <button
//                     className="btn btn-danger btn-sm"
//                     onClick={() => deleteQuestion(q.id)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="5" className="text-center">
//                 No questions found
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default QuestionList;
