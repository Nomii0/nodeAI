// import React from "react";
// import { useState } from "react";
// import model from "../lib/gemini";

// function NewPrompt() {
//   const [question, setQuestion] = useState("");
//   const [answer, setAnswer] = useState("");

//   const add = async (text) => {
//     setQuestion(text);
//     const result = await model.generateContent(text);
//     const response = await result.response;
//     setAnswer(response.text);
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const text = e.target.text.value;
//     if (!text) return;
//     add(text);
//   };

//   return (
//     <div className=" flex justify-center">
//       <form
//         onSubmit={handleSubmit}
//         className="flex bg-slate-700 p-4 items-center justify-between rounded min-w-[40rem]  "
//       >
//         <input
//           type="text"
//           id="text"
//           className=" bg-slate-700 outline-none w-[30rem] "
//           placeholder="Ask me anything....."
//         />
//         <button>
//           <img
//             className="w-6 bg-slate-300 p-1 rounded-full "
//             src="/arrow.png"
//           />
//         </button>
//       </form>
//     </div>
//   );
// }

// export default NewPrompt;
