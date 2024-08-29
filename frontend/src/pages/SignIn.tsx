import axios from "axios";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../providers/userProvider";

const SignIn = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUser } = useUser();

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    try {
      setLoading(true);
      const responce = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/signin`,
        {
          password,
          email,
        }
      );
      if (responce.status === 201) {
        setUser(responce.data.user);
        navigate("/");
      }
      if (responce.status === 200) {
        setError(responce.data.message);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="border p-5 flex flex-col gap-8  min-w-[300px] md:min-w-[400px] rounded-md shadow-sm">
        <div className="flex flex-col">
          <p className="text-2xl font-semibold">Sign In</p>
          <p className="text-gray-600 text-sm">Sign in to your account</p>
        </div>
        <hr />
        <form onSubmit={handleSignIn} className="flex flex-col gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email"
            className="p-2 border rounded-md"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
            className="p-2 border rounded-md"
          />
          <button
            type="submit"
            className="w-full hover:bg-gray-900 bg-gray-950 text-white text-center uppercase p-2 rounded-md mt-2"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <AiOutlineLoading3Quarters className="animate-spin h-5 w-5 text-center" />
              </div>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
        <div className="text-gray-500 text-sm">
          <p>
            Have account?{" "}
            <Link
              to={"/signup"}
              className="text-black font-bold cursor-pointer"
            >
              sign up
            </Link>
          </p>
        </div>
      </div>
      <p className="text-red-500 text-sm">{error}</p>
    </div>
  );
};

export default SignIn;
