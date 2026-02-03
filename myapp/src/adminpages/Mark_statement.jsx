import { useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function Mark_statement() {
  const [std_id, setStd_id] = useState();
  const [marks, setMarks] = useState([]);

  function show_mark() {
    fetch("https://online-test-backend-1-lycf.onrender.com/get_week_mark_statement/" + std_id + "/", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => setMarks(data));
  }

  // Export any JSON to Excel
  const exportToExcel = (data, fileName, std_name) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const file = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(
      file,
      "id:" + std_id + " name:" + std_name + " " + fileName + ".xlsx"
    );
  };

  function logout() {
    localStorage.removeItem("admin_id");
    page_navigate("/admin");
  }

  return (
    <div>
      <div className="container">
        <div className="row mt-3">
          <div>
            <h2 className="text-center mt-4">Student Marks Statement</h2>
          </div>
        </div>

        <div className="row ">
          <div className="text-end">
            <button className="btn btn-primary " onClick={logout}>logout</button>
          </div>
        </div>

        {/* Input */}
        <div className="row mt-3">
          <div className="col-12">
            <label className="fw-bold">Student Id</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setStd_id(e.target.value)}
            />
            <button className="btn btn-primary mt-3" onClick={show_mark}>
              Show Marks
            </button>
          </div>
        </div>

        <div className="row mt-3">
          {/* WEEK TEST */}
          <div className="col-12 col-md-6 p-3 bg-light">
            <h4 className="text-center fw-bold mb-3">Week Test Marks</h4>

            {/* Download button */}
            <button
              className="btn btn-success mb-2"
              onClick={() =>
                exportToExcel(
                  marks.week_test || [],
                  "Week_Test_Marks",
                  marks.week_test[0].std_name
                )
              }
            >
              Download Week Test Excel
            </button>

            <table className="table shadow-lg">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Question Paper Code</th>
                  <th>Mark</th>
                </tr>
              </thead>
              <tbody>
                {marks.week_test &&
                  marks.week_test.map((mark) => (
                    <tr key={mark.qst_paper_code}>
                      <td>{mark.std_name}</td>
                      <td>{mark.qst_paper_code}</td>
                      <td>{mark.mark}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {/* FULL TEST */}
          <div className="col-12 col-md-6 p-3 bg-light">
            <h4 className="text-center fw-bold mb-3">Full Test Marks</h4>

            {/* Download button */}
            <button
              className="btn btn-success mb-2"
              onClick={() =>
                exportToExcel(
                  marks.full_test || [],
                  "Full_Test_Marks",
                  marks.full_test[0].std_name
                )
              }
            >
              Download Full Test Excel
            </button>

            <table className="table shadow-lg">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Question Paper Code</th>
                  <th>Mark</th>
                </tr>
              </thead>
              <tbody>
                {marks.full_test &&
                  marks.full_test.map((mark) => (
                    <tr key={mark.qst_id}>
                      <td>{mark.std_name}</td>
                      <td>
                        {(() => {
                          if (mark.qst_id === "py1") {
                            return "Excel";
                          } else if (mark.qst_id === "py2") {
                            return "powerbi";
                          } else if (mark.qst_id === "py3") {
                            return "tableau";
                          } else if (mark.qst_id === "py4") {
                            return "sql";
                          } else if (mark.qst_id === "py5") {
                            return "Python";
                          } else if (mark.qst_id === "py6") {
                            return "statistics";
                          }
                        })()}
                      </td>
                      <td>{mark.mark}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mark_statement;

// import { useEffect, useState } from "react";

// function Mark_statement() {

//   const[std_id,setStd_id]=useState()
//   const [marks, setMarks] = useState([]);
//   console.log(marks.week_test);

//   function show_mark() {
//     fetch("http://127.0.0.1:8000/get_week_mark_statement/"+std_id+"/", {
//       method: "POST",
//     })
//       .then((res) => res.json())
//       .then((data) => setMarks(data));
//   }

//   return (
//     <div>
//       <div className="container">
//         <div className="row">
//           <div className="">
//             <h2 className="text-center mt-4">Student Marks Statement</h2>
//           </div>
//         </div>
//         <div className="row">
//           <div className="col-12">
//             <div>
//               <label htmlFor="">Student Id</label>
//               <input type="text" className="form-control" onChange={(e)=>setStd_id(e.target.value)} />
//               <button className="btn btn-primary mt-3" onClick={show_mark}>
//                 Show Marks
//               </button>
//             </div>
//           </div>
//         </div>

//         <div className="row mt-3">
//           <div className="col-12  col-md-6 p-3 bg-light ">
//             <h4 className="text-center fw-bold mb-3">Week Test Marks </h4>
//             <table className="table shadow-lg ">
//               <thead>
//                 <tr>
//                   <th>Question Paper Code</th>
//                   <th>Mark</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {marks.week_test &&
//                   marks.week_test.map((mark) => (
//                     <tr key={mark.qst_paper_code}>
//                       <td>{mark.qst_paper_code}</td>
//                       <td>{mark.mark}</td>
//                     </tr>
//                   ))}
//               </tbody>
//             </table>
//           </div>

//           <div className="col-12  col-md-6 p-3   bg-light">
//             <h4 className="text-center fw-bold mb-3">Full Test Marks </h4>
//             <table className="table shadow-lg">
//               <thead>
//                 <tr>
//                   <th>Question Paper Code</th>
//                   <th>Mark</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {marks.week_test &&
//                   marks.week_test.map((mark) => (
//                     <tr key={mark.qst_paper_code}>
//                       <td>{mark.qst_paper_code}</td>
//                       <td>{mark.mark}</td>
//                     </tr>
//                   ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// export default Mark_statement;
