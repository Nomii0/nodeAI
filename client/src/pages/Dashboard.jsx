import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ChatList from "../components/ChatList";
import ChatSection from "../components/ChatSection";

function Dashboard() {
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoaded && !userId) {
      navigate("/sign-in");
    }
  }, [isLoaded, userId, navigate]);

  if (!isLoaded) return "Loading....";

  //--------------- jsx
  return (
    <div className=" bg-primary overflow-hidden justify-between flex  h-screen">
      {/* menu bar */}
      {/* chat list sidebar */}
      <ChatList />

      {/* chat area */}
      <ChatSection />
      <div></div>
    </div>
  );
}

export default Dashboard;
