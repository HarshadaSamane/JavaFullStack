import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function EditPost() {
    const { id } = useParams();
    const navigate = useNavigate();

    // Form state
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");

    // Loading and error states
    const [fetching, setFetching] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Fetch the existing post data
    useEffect(() => {
        const token = localStorage.getItem("token");

        setFetching(true);
        setError("");

        axios.get("http://localhost:8080/posts/my-posts", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                const post = response.data.find(
                    (post) => post.id === Number(id)
                );

                if (post) {
                    setTitle(post.title ?? "");
                    setDescription(post.description ?? "");
                    setLocation(post.location ?? "");
                } else {
                    setError("Travel story not found.");
                }
            })
            .catch((error) => {
                console.error("Error fetching post:", error);
                setError(
                    "Unable to load your travel story. Please try again."
                );
            })
            .finally(() => {
                setFetching(false);
            });
    }, [id]);

    // Update the post
    const handleUpdate = () => {
        const trimmedTitle = title.trim();
        const trimmedDescription = description.trim();
        const trimmedLocation = location.trim();

        if (!trimmedTitle || !trimmedDescription || !trimmedLocation) {
            setError("Please fill in all fields before updating your post.");
            return;
        }

        const token = localStorage.getItem("token");

        setLoading(true);
        setError("");

        axios.put(
            `http://localhost:8080/posts/${id}`,
            {
                title: trimmedTitle,
                description: trimmedDescription,
                location: trimmedLocation
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
            .then(() => {
                navigate("/my-posts");
            })
            .catch((error) => {
                console.error("Error updating post:", error);
                setError(
                    "Unable to update your travel story. Please try again."
                );
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className="min-h-screen bg-[#F8F7F2] px-4 py-10 text-[#243B2F] sm:px-8">
            <div className="mx-auto max-w-3xl">

                {/* Page Heading */}
                <div className="mb-8">
                    <h1 className="mb-2 text-3xl font-bold sm:text-4xl">
                        Edit Your Travel Story
                    </h1>

                    <p className="text-sm text-gray-600 sm:text-base">
                        Update the details of your travel experience.
                    </p>
                </div>

                {/* Form Card */}
                <div className="rounded-3xl border border-[#E8E9E2] bg-white p-6 shadow-sm sm:p-8">

                    {/* Card Heading */}
                    <div className="mb-6 border-b border-gray-100 pb-5">
                        <h2 className="mb-1 text-xl font-bold text-[#243B2F]">
                            Story Details
                        </h2>

                        <p className="text-sm text-gray-500">
                            Make changes to your title, description, or location.
                        </p>
                    </div>

                    {/* Loading, Error, or Form */}
                    {fetching ? (
                        <div
                            role="status"
                            className="py-10 text-center"
                        >
                            <p className="text-lg font-medium text-[#355C43]">
                                Loading your travel story...
                            </p>
                        </div>
                    ) : error && !title && !description && !location ? (
                        <div>
                            <div
                                role="alert"
                                className="rounded-xl border border-red-200 bg-red-50 px-4 py-3"
                            >
                                <p className="text-sm font-medium text-red-700">
                                    {error}
                                </p>
                            </div>

                            <div className="mt-6 flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => navigate("/my-posts")}
                                    className="rounded-xl border border-gray-200 px-6 py-3 font-semibold text-[#355C43] transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#355C43] focus:ring-offset-2"
                                >
                                    Back to My Posts
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* Update Error Message */}
                            {error && (
                                <div
                                    role="alert"
                                    className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3"
                                >
                                    <p className="text-sm font-medium text-red-700">
                                        {error}
                                    </p>
                                </div>
                            )}

                            {/* Title Field */}
                            <div className="space-y-6">
                                <div>
                                    <label
                                        htmlFor="title"
                                        className="mb-2 block text-sm font-semibold text-[#243B2F]"
                                    >
                                        Story Title
                                    </label>

                                    <input
                                        id="title"
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="Enter your travel story title"
                                        required
                                        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-[#243B2F] outline-none transition focus:border-[#355C43] focus:ring-2 focus:ring-[#355C43]/20"
                                    />
                                </div>

                                {/* Description Field */}
                                <div>
                                    <label
                                        htmlFor="description"
                                        className="mb-2 block text-sm font-semibold text-[#243B2F]"
                                    >
                                        Story Description
                                    </label>

                                    <textarea
                                        id="description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Describe your travel experience..."
                                        rows={6}
                                        required
                                        className="w-full resize-y rounded-xl border border-gray-200 bg-white px-4 py-3 text-[#243B2F] outline-none transition focus:border-[#355C43] focus:ring-2 focus:ring-[#355C43]/20"
                                    />
                                </div>

                                {/* Location Field */}
                                <div>
                                    <label
                                        htmlFor="location"
                                        className="mb-2 block text-sm font-semibold text-[#243B2F]"
                                    >
                                        Travel Location
                                    </label>

                                    <input
                                        id="location"
                                        type="text"
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                        placeholder="Enter the place you visited"
                                        required
                                        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-[#243B2F] outline-none transition focus:border-[#355C43] focus:ring-2 focus:ring-[#355C43]/20"
                                    />
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="mt-8 flex flex-col gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:justify-end">

                                <button
                                    type="button"
                                    onClick={() => navigate("/my-posts")}
                                    disabled={loading}
                                    className="rounded-xl border border-gray-200 px-6 py-3 font-semibold text-[#355C43] transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#355C43] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="button"
                                    onClick={handleUpdate}
                                    disabled={loading}
                                    className="rounded-xl bg-[#355C43] px-6 py-3 font-semibold text-white transition duration-200 hover:bg-[#284733] focus:outline-none focus:ring-2 focus:ring-[#355C43] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {loading ? "Updating Post..." : "Update Post"}
                                </button>

                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default EditPost;
