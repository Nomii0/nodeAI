import { SignIn } from "@clerk/clerk-react";

function SignInPage() {
  return (
    <div className=" h-screen w-screen flex items-center justify-center  ">
      <SignIn
        path="/sign-in"
        signUpUrl="/sign-up"
        forceRedirectUrl={"/dashboard"}
      />
    </div>
  );
}

export default SignInPage;
