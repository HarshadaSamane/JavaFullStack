import axios from "axios";
import { useState } from "react";
import Navbar from "../components/Navbar";

function CreatePost() {

const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [location, setLocation] = useState(""); 
const [message, setMessage] = useState("");

const handleSubmit = (e) => {
    
    e.preventDefault();

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
            setMessage("Post created Successfully!")
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
    };

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center">
            <Navbar />
            <h1 className="text-3xl font-bold text-center mb-6">Create Post</h1>

            <p>{message}</p>
            
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title</label>
                    <br />
                    <input className="w-full border border-gray-300 rounded px-3 py-2"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} />
                </div>

                <br />

                <div>
                    <label>Description</label>
                    <br />
                    <textarea className="w-full border border-gray-300 rounded px-3 py-2"
                    type="text" 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}> </textarea>
                </div>

                <br />

                <div>
                    <label>Location</label>
                    <br />
                    <input className="w-full border border-gray-300 rounded px-3 py-2"
                    type="text" 
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}/>
                </div>

                <br />

                <button type="submit">
                    Create Post
                </button>
            </form>
        </div>
    );
}

export default CreatePost;


