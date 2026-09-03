import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function MyPosts() {

    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        axios.get(
            "http://localhost:8080/posts/my-posts",
            {
                headers: {
                    Authorization : `Bearer ${token}` 
                }
            }
        )
        .then((response) => {
            console.log(response.data)
            setPosts(response.data);
        })
        .catch((error) => {
            console.log(error);
        });

    },[]);


    const handleDelete = (id) => {
        const token = localStorage.getItem("token");

        axios.delete(
            `http://localhost:8080/posts/${id}`,
            {
            headers : {
                Authorization : `Bearer ${token}`
            }
        }
        )
        .then((response) => {
            console.log(response.data);

            setPosts(
                posts.filter((post) => post.id !== id)
            );
        })
        .catch((error) => {
            console.log(error);
        });

    };

    return (
        <div>
            <Navbar />
            <h1>My Posts</h1>

            {
                posts.map((post) => (
                    <div key={post.id}>
                        <h3>{post.title}</h3>
                        <p>{post.description}</p>
                        <p>{post.location}</p>

                        <button onClick={() => navigate(`/edit-post/${post.id}`) }>Edit</button>

                        <button onClick={() => handleDelete(post.id)}>Delete</button>
                        <hr />
                    </div>
                ))
            }
        </div>
    );
}

export default MyPosts;