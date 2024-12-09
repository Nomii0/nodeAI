import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Dashboard from "../pages/Dashboard";

function DashboardLayout() {
  return (
    <div>
      <Header />
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardLayout;
