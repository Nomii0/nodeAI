import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className=" py-5 flex justify-between px-10 ">
      {/* Logo */}
      <h2>
        <Link to={"/"} className=" text-[#ffffff] text-2xl font-bold ">
          NODE AI
        </Link>
      </h2>
      {/* User */}
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
}

export default Header;
