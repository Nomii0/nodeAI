import ChatList from "../components/ChatList";
import Markdown from "react-markdown";
import { useRef, useEffect, useState } from "react";
import model from "../lib/gemini";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
// import NewPrompt from "../components/NewPrompt";

function Chat() {
  // chat input form code
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  // const [data, setData] = useState("");
  const path = useLocation().pathname;
  const chatId = path.split("/").pop();

  // useEffect(() => {
  //   fetch(`http://localhost:3000/api/chats/${chatId}`, {
  //     credentials: "include",
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setData(data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  // console.log(data);

  // const { isPending, error, data } = useQuery({
  //   queryKey: ["message", chatId],
  //   queryFn: () =>
  //     fetch(`http://localhost:3000/api/chats/${chatId}`, {
  //       credentials: "include",
  //     }).then((res) => {
  //       if (!res.ok) {
  //         throw new Error(`HTTP error! status: ${res.status}`);
  //       }
  //       res.json();
  //     }),
  // });
  // console.log(data);

  // if (error) {
  //   console.log("error in chat section api", error);
  // }

  const { isPending, error, data } = useQuery({
    queryKey: ["message", chatId],
    queryFn: () =>
      fetch(`http://localhost:3000/api/chats/${chatId}`, {
        credentials: "include",
      }).then((res) => res.json()),
  });
  if (error) {
    console.log(error);
  }

  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [{ text: "Hello" }],
      },
      {
        role: "model",
        parts: [{ text: "Great to meet you. What would you like to know?" }],
      },
    ],
  });

  const add = async (text) => {
    setQuestion(text);
    const result = await chat.sendMessageStream(text);
    let accumulatetext = "";
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      console.log(chunkText);
      accumulatetext += chunkText;
      setAnswer(accumulatetext);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = e.target.text.value;
    if (!text) return;
    add(text);
  };

  // Chat screen code
  const enRef = useRef(null);
  useEffect(() => {
    enRef.current.scrollIntoView({ behavior: "smooth" });
  }, [question, answer]);

  return (
    <div className=" h-screen flex  relative ">
      {/* wrapper */}
      <ChatList />
      <div className="h-full w-full flex flex-col  overflow-y-scroll p-8 bg-slate-800">
        {/* chat */}
        <div className=" flex  flex-col p-5 max-h-[%90]  bg-slate-800 space-y-3 ">
          {/* Message */}
          {/* Message from User*/}
          {isPending ? (
            <div>loading</div>
          ) : error ? (
            <div>someThing went wrong</div>
          ) : (
            data?.history?.map((message, i) => {
              return message?.role === "user" ? (
                <div
                  key={i}
                  className="p-2  self-end max-w-[50%] bg-slate-600 rounded-md "
                >
                  {message.parts[0].text}
                </div>
              ) : (
                <div className=" p-2 max-w-[50%]  gap-1  bg-slate-600 rounded-md">
                  <Markdown>{answer}</Markdown>
                </div>
              );
            })
          )}
        </div>
        <div className=" mb-14 "></div>
        <div ref={enRef}></div>
      </div>
      {/* end chat padding */}
      {/* chat input form */}
      <div className="min-h-[%20] absolute bottom-1 left-[40%] ">
        <div className=" flex justify-center">
          <form
            onSubmit={handleSubmit}
            className="flex bg-slate-700 p-4 items-center justify-between rounded min-w-[40rem]  "
          >
            <input
              type="text"
              id="text"
              className=" bg-slate-700 outline-none w-[30rem] "
              placeholder="Ask me anything....."
            />
            <button>
              <img
                className="w-6 bg-slate-300 p-1 rounded-full "
                src="/arrow.png"
              />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Chat;
