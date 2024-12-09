import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="h-screen p-6 items-center gap-40 flex ">
      {/* left part */}
      <div className=" flex flex-col w-1/2 p-10 gap-7 ">
        <div className="  text-5xl   ">
          Build your AI App. Amaze your Audience.
        </div>
        <div className=" text-2xl ">
          Create a branded web-app that provides personalized AI-powered tools
          for helping your audience on their journey. No technical skills
          required.
        </div>

        <Link to={"/dashboard"}>
          <button className=" bg-slate-700 px-5 py-4 hover:cursor-pointer hover:bg-slate-800 w-32   rounded-md ">
            Get Started
          </button>
        </Link>
      </div>
      {/* right part */}
      <div>
        <img
          className=" w-[31.25rem] border rounded-lg border-primary shadow-md  "
          src="kenThomp.webp"
        />
      </div>
    </div>
  );
}

export default HomePage;
