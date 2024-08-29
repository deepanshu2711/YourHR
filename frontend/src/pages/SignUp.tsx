import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="border p-5 flex flex-col gap-8 md: min-w-[400px] rounded-md shadow-sm">
        <div className="flex flex-col">
          <p className="text-2xl font-semibold">Sign Up</p>
          <p className="text-gray-600 text-sm">Sign in to your account</p>
        </div>
        <hr />
        <form className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Email"
            className="p-2 border rounded-md"
          />
          <input
            type="text"
            placeholder="Full Name"
            className="p-2 border rounded-md"
          />
          <input
            type="password"
            placeholder="Password"
            className="p-2 border rounded-md"
          />
          <button className="w-full hover:bg-gray-900 bg-gray-950 text-white text-center uppercase p-2 rounded-md mt-2">
            Sign Up
          </button>
        </form>
        <div className="text-gray-500 text-sm">
          <p>
            Have account?{" "}
            <Link
              to={"/signin"}
              className="text-black font-bold cursor-pointer"
            >
              sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
