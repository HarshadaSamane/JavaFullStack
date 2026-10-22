import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(
            "http://localhost:8080/auth/register",
            {
                name: name,
                email: email,
                password: password
            }
        )
            .then((response) => {
                console.log(response.data);

                setMessage("Registration Successful!");

                setTimeout(() => {
                    navigate("/");
                }, 2000);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#F8F7F2] px-4 py-10">
            <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl sm:p-10">

                <h1 className="mb-2 text-center text-3xl font-bold text-[#243B2F]">
                    Create Account
                </h1>

                <p className="mb-8 text-center text-sm text-gray-500">
                    Start your journey and keep your travel memories alive.
                </p>

                {message && (
                    <p className="mb-5 rounded-xl bg-green-50 px-4 py-3 text-center text-sm font-medium text-[#355C43]">
                        {message}
                    </p>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label className="mb-2 block text-sm font-medium text-[#243B2F]">
                            Full Name
                        </label>

                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your full name"
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#355C43] focus:ring-2 focus:ring-[#355C43]/20"
                        />
                    </div>

                    <div className="mb-5">
                        <label className="mb-2 block text-sm font-medium text-[#243B2F]">
                            Email
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Create a password"
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#355C43] focus:ring-2 focus:ring-[#355C43]/20"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-xl bg-[#355C43] px-4 py-3 font-semibold text-white transition hover:bg-[#284733] focus:outline-none focus:ring-2 focus:ring-[#355C43] focus:ring-offset-2"
                    >
                        Create Account
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <button
                        type="button"
                        onClick={() => navigate("/login")}
                        className="font-semibold text-[#355C43] transition hover:text-[#284733] hover:underline"
                    >
                        Login
                    </button>
                </p>
            </div>
        </div>
    );
}

export default Register;