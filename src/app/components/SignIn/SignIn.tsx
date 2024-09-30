import { useState } from "react";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [linkSent, setLinkSent] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const result = await signIn("email", {
      redirect: false,
      email,
    });

    setLoading(false);

    if (result?.error) {
      setError(result.error);
    } else {
      // Show a success message or redirect user
      toast.success("Check your email for a sign-in link");
      // Show message with resend button
      setLinkSent(true);
    }
  };

  return (
    <div className="flex items-center justify-center  ">
      <div className="bg-white p-12 pt-12 pb-12 rounded-md shadow-md w-full max-w-md  bg-opacity-20 backdrop-blur-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">
          SIGN IN or SIGN UP
        </h2>
        <p className="text-center mb-4">
          Login to an existing account or create one using the form below.
        </p>
        <hr />
        <form onSubmit={handleSubmit}>
          {linkSent ? (
            <>
              <div className="mb-4 mt-4">
                <div className="block text-white mb-2">
                  Check your email for a sign-in link
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-darkBlue text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
              >
                {"RESEND"}
              </button>
            </>
          ) : (
            <>
              <div className="mb-4 mt-4">
                <label htmlFor="email" className="block text-white mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 text-black border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              {error && <div className="mb-4 text-red-500">{error}</div>}
              <button
                type="submit"
                className="w-full bg-darkBlue text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
                disabled={loading}
              >
                {loading ? "Sending..." : "SIGN IN or SIGN UP"}
              </button>
            </>
          )}
        </form>
        {/* <p className="text-center mt-4">
          <a href="/forgot-password" className="text-blue-500 hover:underline">
            Forgot password?
          </a>
        </p> */}
      </div>
    </div>
  );
}
