import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function MyPosts() {

    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");

        axios.get(
            "http://localhost:8080/posts/my-posts",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
            .then((response) => {
                setPosts(response.data);
                setError("");
            })
            .catch((error) => {
                console.log("Error loading posts:", error);
                setError("Unable to load your travel stories. Please try again.");
            })
            .finally(() => {
                setLoading(false);
            });

    }, []);


    const handleDelete = (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this travel story? This action cannot be undone.");

        if (!confirmed) {
            return;
        }

        const token = localStorage.getItem("token");

        axios.delete(
            `http://localhost:8080/posts/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
            .then((response) => {
                console.log(response.data);

                setPosts((currentPosts) =>
                    currentPosts.filter((post) => post.id !== id)
                );
            })
            .catch((error) => {
                console.log(error);
                window.alert("Unable to delete the post. Please try again.");
            });
    };

    return (
        <div className="min-h-screen bg-[#F8F7F2] px-4 py-8 text-[#243B2F] sm:px-8">
            <div className="mx-auto max-w-6xl">

                <div className="mb-8">
                    <h1 className="mb-2 text-3xl font-bold sm:text-4xl">
                        My Travel Stories
                    </h1>

                    <p className="text-sm text-gray-600 sm:text-base">
                        Manage the travel experiences you've shared.
                    </p>
                </div>

                {loading ? (
                    <div
                        role="status"
                        className="rounded-2xl bg-white px-6 py-12 text-center shadow-sm"
                    >
                        <p className="text-lg font-medium text-[#355C43]">
                            Loading your travel stories...
                        </p>
                    </div>
                ) : error ? (
                    <div
                        role="alert"
                        className="rounded-2xl border border-red-200 bg-red-50 px-6 py-8 text-center"
                    >
                        <p className="mb-4 font-medium text-red-700">
                            {error}
                        </p>

                        <button
                            type="button"
                            onClick={() => window.location.reload()}
                            className="rounded-xl bg-[#355C43] px-5 py-3 font-semibold text-white transition hover:bg-[#284733]"
                        >
                            Try Again
                        </button>
                    </div>
                ) : posts.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-12 text-center">
                        <p className="mb-4 text-4xl" aria-hidden="true">
                            🧭
                        </p>

                        <h2 className="mb-2 text-xl font-bold text-[#243B2F]">
                            No travel stories yet
                        </h2>

                        <p className="mb-6 text-sm text-gray-500">
                            Your adventures will appear here once you share your first story.
                        </p>

                        <button
                            type="button"
                            onClick={() => navigate("/create-post")}
                            className="rounded-xl bg-[#355C43] px-5 py-3 font-semibold text-white transition hover:bg-[#284733] focus:outline-none focus:ring-2 focus:ring-[#355C43] focus:ring-offset-2"
                        >
                            Create Your First Post
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {posts.map((post) => (
                            <article
                                key={post.id}
                                className="overflow-hidden rounded-3xl border border-[#E8E9E2] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                            >
                                {/* Card header */}
                                <div className="relative flex min-h-40 flex-col items-center justify-center bg-gradient-to-br from-[#DCE8D8] via-[#B8CFB2] to-[#789477] p-6 text-center">
                                    <span className="mb-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#355C43]">
                                        My Travel Story
                                    </span>

                                    <h2 className="break-words text-2xl font-bold text-[#243B2F]">
                                        {post.title}
                                    </h2>

                                    <span className="absolute right-4 top-4 text-3xl" aria-hidden="true">
                                        🌿
                                    </span>
                                </div>

                                {/* Card content */}
                                <div className="p-6">
                                    <p className="mb-5 whitespace-pre-wrap break-words leading-7 text-gray-600">
                                        {post.description}
                                    </p>

                                    <div className="mb-5 border-t border-gray-100 pt-4">
                                        <span className="inline-flex items-center gap-2 rounded-full bg-[#F3F5EF] px-3 py-2 text-sm font-medium text-[#355C43]">
                                            <span aria-hidden="true">📍</span>
                                            {post.location}
                                        </span>
                                    </div>

                                    {/* Action buttons */}
                                    <div className="flex flex-col gap-3 sm:flex-row">
                                        <button
                                            type="button"
                                            onClick={() => navigate(`/edit-post/${post.id}`)}
                                            className="flex-1 rounded-xl bg-[#355C43] px-4 py-3 font-semibold text-white transition hover:bg-[#284733] focus:outline-none focus:ring-2 focus:ring-[#355C43] focus:ring-offset-2"
                                        >
                                            Edit Post
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => handleDelete(post.id)}
                                            className="flex-1 rounded-xl border border-red-200 px-4 py-3 font-semibold text-red-700 transition hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                        >
                                            Delete Post
                                        </button>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
}

export default MyPosts;