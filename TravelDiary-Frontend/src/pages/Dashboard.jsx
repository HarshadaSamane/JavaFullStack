import { useState, useEffect } from "react";
import axios from "axios";

function Dashboard() {
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [location, setLocation] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadAllPosts();

        const token = localStorage.getItem("token");

        axios.get("http://localhost:8080/auth/me", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                setUser(response.data);
            })
            .catch((error) => {
                console.log("Error loading user:", error);
            });
    }, []);

    const handleSearch = () => {
        const searchLocation = location.trim();

        if (!searchLocation) {
            setError("Please enter a location to search.");
            return;
        }

        const token = localStorage.getItem("token");

        setLoading(true);
        setError("");

        axios.get(
            `http://localhost:8080/posts/location/${encodeURIComponent(searchLocation)}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
            .then((response) => {
                setPosts(response.data);
            })
            .catch((error) => {
                console.log("Error searching posts:", error);
                setError("Unable to search travel stories. Please try again.");
                setPosts([]);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const loadAllPosts = () => {
        setLocation("");
        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");

        axios.get("http://localhost:8080/posts", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                setPosts(response.data);
            })
            .catch((error) => {
                console.log("Error loading posts:", error);
                setError("Unable to load travel stories. Please try again.");
                setPosts([]);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleLike = (id) => {
        const token = localStorage.getItem("token");

        axios.put(
            `http://localhost:8080/posts/${id}/like`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
            .then((response) => {
                setPosts((currentPosts) =>
                    currentPosts.map((post) =>
                        post.id === id ? response.data : post
                    )
                );
            })
            .catch((error) => {
                console.log("Error liking post:", error);
            });
    };

    return (
        <main className="min-h-screen bg-[#F8F7F2] px-4 py-8 text-[#243B2F] sm:px-8">
            <div className="mx-auto max-w-6xl">

                {/* Welcome section */}
                {user && (
                    <section className="mb-10">
                        <h1 className="mb-2 text-3xl font-bold sm:text-4xl">
                            Welcome back, {user.name}!
                        </h1>

                        <p className="mb-6 text-gray-600">
                            Ready to explore new places and share your travel stories?
                        </p>
                    </section>
                )}

                {/* Search section */}
                <section className="mb-8">
                    <div className="mb-5">
                        <h2 className="mb-2 text-2xl font-bold sm:text-3xl">
                            Explore Travel Stories
                        </h2>

                        <p className="text-sm text-gray-600 sm:text-base">
                            Discover places and experiences shared by fellow travellers.
                        </p>
                    </div>

                    <form
                        className="flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:p-5"
                        onSubmit={(event) => {
                            event.preventDefault();
                            handleSearch();
                        }}
                    >
                        <input
                            type="text"
                            placeholder="Search by location..."
                            value={location}
                            onChange={(event) => setLocation(event.target.value)}
                            className="min-w-0 flex-1 rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#355C43] focus:ring-2 focus:ring-[#355C43]/20"
                        />

                        <div className="flex gap-3">
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 rounded-xl bg-[#355C43] px-5 py-3 font-semibold text-white transition hover:bg-[#284733] disabled:cursor-not-allowed disabled:opacity-70 sm:flex-none"
                            >
                                Search
                            </button>

                            <button
                                type="button"
                                onClick={loadAllPosts}
                                disabled={loading}
                                className="flex-1 rounded-xl border border-[#355C43] px-5 py-3 font-semibold text-[#355C43] transition hover:bg-[#F8F7F2] disabled:cursor-not-allowed disabled:opacity-70 sm:flex-none"
                            >
                                Reset
                            </button>
                        </div>
                    </form>
                </section>

                {/* Error state */}
                {error && (
                    <div
                        role="alert"
                        className="mb-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700"
                    >
                        <p className="mb-3">{error}</p>

                        <button
                            type="button"
                            onClick={loadAllPosts}
                            className="font-semibold underline hover:no-underline"
                        >
                            Try again
                        </button>
                    </div>
                )}

                {/* Loading state */}
                {loading ? (
                    <div
                        role="status"
                        className="rounded-2xl bg-white px-6 py-12 text-center shadow-sm"
                    >
                        <p className="text-lg font-medium text-[#355C43]">
                            Loading travel stories...
                        </p>
                    </div>
                ) : error ? null : posts.length === 0 ? (

                    /* Empty state */
                    <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-12 text-center">
                        <p className="mb-3 text-4xl">🧭</p>

                        <h3 className="mb-2 text-xl font-bold text-[#243B2F]">
                            No travel stories found
                        </h3>

                        <p className="text-sm text-gray-500">
                            Try another location or check back later for new adventures.
                        </p>
                    </div>
                ) : (

                    /* Travel post cards */
                    <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {posts.map((post) => (
                            <article
                                key={post.id}
                                className="group overflow-hidden rounded-3xl border border-[#E8E9E2] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                            >
                                {/* Decorative header */}
                                <div className="relative flex h-44 flex-col items-start justify-between bg-gradient-to-br from-[#DCE8D8] via-[#B8CFB2] to-[#789477] p-6">
                                    <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#355C43]">
                                        Travel Diary
                                    </span>

                                    <h3 className="pr-12 text-2xl font-bold text-[#243B2F]">
                                        {post.title}
                                    </h3>

                                    <span className="absolute right-5 top-4 text-4xl transition duration-300 group-hover:scale-110">
                                        🌿
                                    </span>
                                </div>

                                {/* Post content */}
                                <div className="p-6">

                                    <p className="mb-5 min-h-14 leading-7 text-gray-600">
                                        {post.description}
                                    </p>

                                    {/* Location and likes */}
                                    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-4">
                                        <span className="inline-flex items-center gap-2 rounded-full bg-[#F3F5EF] px-3 py-2 text-sm font-medium text-[#355C43]">
                                            <span aria-hidden="true">📍</span>
                                            {post.location}
                                        </span>

                                        <div className="flex items-center gap-3">
                                            <span className="text-sm text-gray-500">
                                                {post.likes} likes
                                            </span>

                                            <button
                                                type="button"
                                                onClick={() => handleLike(post.id)}
                                                aria-label={`Like ${post.title}`}
                                                className="rounded-full bg-[#F8F7F2] p-3 text-lg transition duration-200 hover:scale-110 hover:bg-red-50 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#355C43]"
                                            >
                                                ❤️
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </section>
                )}
            </div>
        </main>
    );

}

export default Dashboard;
