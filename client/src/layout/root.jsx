import Header from "../components/Header";
import { Outlet } from "react-router-dom";

function Root() {
  return (
    <div className=" min-h-full bg-primary text-white    ">
      <Header />
      <Outlet />
    </div>
  );
}

export default Root;
