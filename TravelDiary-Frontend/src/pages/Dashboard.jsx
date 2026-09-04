import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Dashboard() {

    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [location, setLocation] = useState("");

    useEffect (() => {

        loadAllPosts();
        const token = localStorage.getItem("token");

        axios.get(
            "http://localhost:8080/auth/me",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        .then((response) => {
            setUser(response.data);
        })
        .catch((error) => {
            console.log(error);
        });

    },[]);


    const handleSerch = () => {
        const token = localStorage.getItem("token");

        axios.get(
            `http://localhost:8080/posts/location/${location}`,
            {
                headers : {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        .then((response) => {
            setPosts(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
    };

    const loadAllPosts = () => {

        setLocation("");

        const token = localStorage.getItem("token");

        axios.get(
            "http://localhost:8080/posts",
            {
                headers :{
                    Authorization: `Bearer ${token}`
                }
            }
        )
        .then((response) => {
            setPosts(response.data);
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
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
            console.log("Like Response:", response.data);
            setPosts(
                posts.map((post) => 
                    post.id === id ? response.data : post
                )
            );
        })
        .catch((error) => {
            console.log(error);
        });
    };

    return (
        <div>
            <Navbar />
        {user && (<>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        </>
        )}

        <h2>All Posts</h2>

        <input
            type="text"
            placeholder="Search by Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
        />

        <button onClick={handleSerch}>Search</button>
        <button onClick={loadAllPosts}>Reset</button>

        {
            posts.map((post) => (
                <div key={post.id}>
                    <h3>{post.title}</h3>
                    <p>{post.description}</p>
                    <p>{post.location}</p>

                    <p>{post.likes}</p> 
                    <button onClick={() => handleLike(post.id)}>❤️</button>

                    <hr/>
                </div>
            ))
        }

        </div>
    );
    
}

export default Dashboard;