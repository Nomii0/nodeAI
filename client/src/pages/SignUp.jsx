import { SignUp } from "@clerk/clerk-react";

function SignUpPage() {
  return (
    <div className=" h-screen w-screen flex items-center justify-center  ">
      <SignUp path="/sign-up" signInUrl="/sign-in" />
    </div>
  );
}

export default SignUpPage;
