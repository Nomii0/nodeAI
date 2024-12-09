import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

function ChatList() {
  const { isPending, error, data } = useQuery({
    queryKey: ["chatList"],
    queryFn: () =>
      fetch(`http://localhost:3000/api/userchats`, {
        credentials: "include",
      }).then((res) => res.json()),
  });
  if (error) {
    console.log(error);
  }

  return (
    <div className="w-1/3 h-[100%]  relative flex flex-col justify-evenly ">
      <div className=" ml-2 ">Dashboard</div>
      <div className=" text-lg px-5">
        <div className="my-2 ">create a new chat</div>
        <div className="mb-2">explore Node AI</div>
        <div className="mb-5">contact</div>
        <hr className=" border border-gray-700 " />
      </div>
      {/* Chat list */}
      <div>
        <div className=" mx-2 ">Recent Chat</div>
        <div className=" max-h-[26rem] text-md py-3 mb-3 flex flex-col overflow-y-scroll px-5  ">
          {isPending ? (
            <div>loading.....</div>
          ) : error ? (
            <div>something went wrong</div>
          ) : (
            data?.map((chat) => {
              return (
                <Link
                  to={`/dashboard/chat/${chat?._id}`}
                  key={chat?._id}
                  className=" hover:bg-slate-600 hover:cursor-pointer py-2 px-2 hover:rounded-md  "
                >
                  {chat?.chats[0]?.title}
                </Link>
              );
            })
          )}
        </div>
      </div>
      <hr className=" border border-gray-700 " />
      {/* Bottom upgrade */}
      <div className="flex  gap-4 items-center  border-gray-500 ml-5 pl-2 px-3  w-[80%]">
        {/* logo */}
        <div className=" text-3xl ">AI</div>
        <div>
          Upgrade to Node AI Pro
          <div className="text-sm text-gray-500 ">
            Get unlimited access to all features{" "}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatList;
