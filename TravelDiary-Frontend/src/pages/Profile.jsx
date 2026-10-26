import { useState, useEffect } from "react";
import axios from "axios";

function Profile() {

    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");

        Promise.all([
            axios.get("http://localhost:8080/auth/me", {
                headers: { Authorization: `Bearer ${token}` }
            }),
            axios.get("http://localhost:8080/posts/my-posts", {
                headers: { Authorization: `Bearer ${token}` }
            })
        ])
            .then(([userResponse, postsResponse]) => {
                setUser(userResponse.data);
                setPosts(postsResponse.data);
            })
            .catch((error) => {
                console.log("Error fetching profile data:", error);
                setError("Unable to load your profile information. Please try again.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <div className="min-h-screen bg-[#F8F7F2] px-4 py-10 text-[#243B2F] sm:px-8">
            <div className="mx-auto max-w-4xl">

                <div className="mb-8">
                    <h1 className="mb-2 text-3xl font-bold sm:text-4xl">
                        My Profile
                    </h1>

                    <p className="text-sm text-gray-600 sm:text-base">
                        View your account information and travel activity.
                    </p>
                </div>

                {loading ? (
                    <div
                        role="status"
                        className="rounded-2xl bg-white px-6 py-12 text-center shadow-sm"
                    >
                        <p className="text-lg font-medium text-[#355C43]">
                            Loading your profile...
                        </p>
                    </div>
                ) : error ? (
                    <div
                        role="alert"
                        className="rounded-2xl border border-red-200 bg-red-50 px-6 py-8 text-center"
                    >
                        <p className="font-medium text-red-700">
                            {error}
                        </p>
                    </div>
                ) : user ? (
                    <>
                        {/* Account Information Card */}
                        <div className="mb-6 rounded-2xl border border-[#E8E9E2] bg-white p-6 shadow-sm sm:p-8">
                            <div className="mb-6 border-b border-gray-100 pb-5">
                                <h2 className="mb-1 text-xl font-bold text-[#243B2F]">
                                    Account Information
                                </h2>

                                <p className="text-sm text-gray-500">
                                    Your personal account details.
                                </p>
                            </div>

                            <div className="space-y-5">
                                <div>
                                    <p className="mb-1 text-sm font-medium text-gray-500">
                                        Full Name
                                    </p>

                                    <p className="text-base font-semibold text-[#243B2F]">
                                        {user.name}
                                    </p>
                                </div>

                                <div>
                                    <p className="mb-1 text-sm font-medium text-gray-500">
                                        Email Address
                                    </p>

                                    <p className="break-words text-base font-semibold text-[#243B2F]">
                                        {user.email}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Travel Activity Card */}
                        <div className="mb-6 rounded-2xl border border-[#E8E9E2] bg-white p-6 shadow-sm sm:p-8">
                            <div className="mb-5">
                                <h2 className="mb-1 text-xl font-bold text-[#243B2F]">
                                    Your Travel Activity
                                </h2>

                                <p className="text-sm text-gray-500">
                                    A snapshot of your shared adventures.
                                </p>
                            </div>

                            <div className="rounded-2xl bg-[#F3F5EF] p-6">
                                <p className="mb-2 text-sm font-medium text-gray-600">
                                    Total Travel Stories
                                </p>

                                <p className="text-4xl font-bold text-[#355C43]">
                                    {posts.length}
                                </p>
                            </div>
                        </div>
                    </>
                ) : (
                    <div
                        role="status"
                        className="rounded-2xl bg-white px-6 py-8 text-center shadow-sm"
                    >
                        <p className="text-gray-600">
                            No profile information is available.
                        </p>
                    </div>
                )}



            </div>
        </div>
    );
}

export default Profile;