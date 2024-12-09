import { useAuth } from "@clerk/clerk-react";

function ChatSection() {
  const { userId } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = e.target.text.value;
    if (!text) return;

    await fetch("http://localhost:3000/api/chats", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });
  };

  return (
    <div className=" bg-slate-900 w-full overflow-hidden  ">
      {/* Big Logo Section */}
      <div className=" absolute top-38 right-64    ">
        <span className="  tablet:text-[3rem] laptop:text-[9.5rem] text-[#02a18c4b] ">
          NODE
        </span>
        <span className="  tablet:text-[3rem] laptop:text-[9.5rem] text-[#02a18c4b] ">
          AI
        </span>
      </div>
      {/* Links Section */}
      <div className=" flex flex-col gap-28 items-center h-full justify-center ">
        <div className="flex gap-10 justify-center  items-center ">
          <div className=" border p-4 w-40 rounded-md border-gray-600   ">
            <img className=" w-14 " src="chat.png" />
            Start a new chat
          </div>
          <div className="border p-4 w-40 rounded-md border-gray-600">
            <img className=" w-14 " src="code.png" />
            code for me
          </div>
          <div className="border p-4 w-40 rounded-md border-gray-600">
            <img className=" w-14 " src="image.png" />
            Analyze Images
          </div>
        </div>
        {/* Chat Section */}
        <div>
          <form
            onSubmit={handleSubmit}
            className=" cursor-pointer rounded-xl bg-slate-600 text-white  p-4 flex item-center"
          >
            <input
              type="text"
              name="text"
              className=" w-[38rem] outline-none  bg-slate-600 text-white "
              placeholder="Ask me anything...."
            />
            <button className="">
              <img
                className=" w-6 box-border p-1  rounded-full bg-slate-400   "
                src="arrow.png"
              />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChatSection;
