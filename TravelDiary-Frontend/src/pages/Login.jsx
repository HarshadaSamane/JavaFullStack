import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";


function Login() {


    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        setLoading(true);
        setError("");

        axios.post(
            "http://localhost:8080/auth/login", {
            email,
            password
        }
        )
            .then((response) => {
                localStorage.setItem("token", response.data);

                const token = localStorage.getItem("token");

                navigate("/dashboard");

                axios.get(
                    "http://localhost:8080/auth/me",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )
                    .then((response) => {
                        console.log(response.data);
                    });
            })
            .catch((error) => {
                console.log(error);
                setError("Invalid email or password. Please try again.");
            })
            .finally(() => {
                setLoading(false);
            });

    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#F8F7F2] px-4 py-10">

            <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl sm:p-10">

                {/* Link for Back to Home */}
                <div className="mb-6">
                    <Link
                        to="/"
                        className="text-sm font-medium text-[#355C43] transition hover:text-[#284733] hover:underline"
                    >
                        ← Back to Home
                    </Link>
                </div>

                <h1 className="mb-2 text-center text-3xl font-bold text-[#243B2F]">
                    Welcome Back
                </h1>

                <p className="mb-8 text-center text-sm text-gray-500">
                    Sign in to continue your travel journey.
                </p>

                <form onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label className="mb-2 block text-sm font-medium text-[#243B2F]">
                            Email
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setError("");
                            }}
                            placeholder="Enter your email"
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#355C43] focus:ring-2 focus:ring-[#355C43]/20"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="mb-2 block text-sm font-medium text-[#243B2F]">
                            Password
                        </label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setError("");
                            }}
                            placeholder="Enter your passsword"
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#355C43] focus:ring-2 focus:ring-[#355C43]/20"
                        />
                    </div>

                    {error && (
                        <p className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-xl bg-[#355C43] px-4 py-3 font-semibold text-white transition hover:bg-[#284733] focus:outline-none focus:ring-2 focus:ring-[#355C43] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-600">
                    Don't have an account? {" "}
                    <Link
                        to="/register"
                        className="font-semibold text-[#355C43] transition hover:text-[#284733] hover:underline"
                    >
                        Register
                    </Link>
                </p>

            </div>
        </div>
    );
}

export default Login;