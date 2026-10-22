import axios from "axios";
import { useState } from "react";

function CreatePost() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {

        e.preventDefault();

        if (!title.trim() || !description.trim() || !location.trim()) {
            setError("Please fill in all fields.");
            setMessage("");
            return;
        }

        setLoading(true);
        setMessage("");
        setError("");

        const token = localStorage.getItem("token");

        axios.post(
            "http://localhost:8080/posts/current-user",
            {
                title,
                description,
                location
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
            .then((response) => {
                setMessage("Post created successfully!");
                setError("");

                setTitle("");
                setDescription("");
                setLocation("");

                console.log(response.data);
            })

            .catch((error) => {
                console.log("Create post error:", error);
                console.log("Backend response:", error.response?.data);
                console.log("HTTP status:", error.response?.status);

                setMessage("");
                setError(
                    typeof error.response?.data === "string"
                        ? error.response.data
                        : error.response?.data?.message ||
                        "Unable to create your post. Please try again."
                );
            })
            .finally(() => {
                setLoading(false);
            });

    };

    return (
        <div className="min-h-screen bg-[#F8F7F2] px-4 py-10 text-[#243B2F] flex flex-col items-center justify-center">

            <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-lg sm:p-8">

                <h1 className="mb-2 text-center text-3xl font-bold">
                    Create Post
                </h1>

                <p className="mb-6 text-center text-sm text-gray-500">
                    Share your travel experience with others.
                </p>

                {message && (
                    <p
                        role="status"
                        className="mb-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-800"
                    >
                        {message}
                    </p>
                )}

                {error && (
                    <p
                        role="alert"
                        className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
                    >
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit}>

                    <div className="mb-5">
                        <label
                            htmlFor="title"
                            className="mb-2 block text-sm font-semibold text-[#243B2F]"
                        >
                            Title
                        </label>

                        <input
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g., My Weekend in Mahabaleshwar"
                            required
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-[#243B2F] outline-none transition focus:border-[#355C43] focus:ring-2 focus:ring-[#355C43]/20"
                        />
                    </div>


                    <div className="mb-5">
                        <label htmlFor="description" className="mb-2 block text-sm font-semibold text-[#243B2F]" >
                            Description
                        </label>
                        <textarea id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Tell us about your experience, the places you visited, and your favourite memories..."
                            rows={5}
                            required
                            className="w-full resize-y rounded-xl border border-gray-300 px-4 py-3 text-[#243B2F] outline-none transition placeholder:text-gray-400 focus:border-[#355C43] focus:ring-2 focus:ring-[#355C43]/20" />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="location" className="mb-2 block text-sm font-semibold text-[#243B2F]" >
                            Location
                        </label>
                        <input id="location"
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="e.g., Mahabaleshwar, Maharashtra"
                            required
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-[#243B2F] outline-none transition focus:border-[#355C43] focus:ring-2 focus:ring-[#355C43]/20" />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-xl bg-[#355C43] px-5 py-3 font-semibold text-white transition duration-200 hover:bg-[#284733] focus:outline-none focus:ring-2 focus:ring-[#355C43] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                        {loading ? "Creating Post..." : "Create Post"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CreatePost;

