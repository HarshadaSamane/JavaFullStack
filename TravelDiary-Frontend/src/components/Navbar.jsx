import {useNavigate} from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");

        navigate("/");
    };

    return (
        <nav className="bg-blue-600 text-white px-6 py-5 flex justify-between items-center shadow-md">
            
            <h1 className="text-2xl font-bold cursor-pointer" onClick={() => navigate("/dashboard")}>Travel Diary</h1>            
            
            <div className="flex items-center gap-6">
            <button onClick={() => navigate("/dashboard")}className="hover:text-yellow-300 transition">Dashboard</button>
            <button onClick={() => navigate("/create-post")} className="hover:text-yellow-300 transition">Create Post</button>
            <button onClick={() => navigate("/my-posts")} className="hover:text-yellow-300 transition">My Posts</button>
            <button onClick={() => navigate("/profile")} className="hover:text-yellow-300 transition">Profile</button>
            <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition">Logout</button>
            </div>
        </nav>
    );
}

export default Navbar;