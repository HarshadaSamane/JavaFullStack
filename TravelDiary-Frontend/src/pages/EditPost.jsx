import {useParams} from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function EditPost() {

    const {id} = useParams();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        console.log("TOKEN:", token);

        axios.get(
            "http://localhost:8080/posts/my-posts",
            {
                headers : {
                    Authorization : `Bearer ${token}`
                }
            }
        )
        .then((response) => {

            console.log("All Posts:", response.data);

            const post = response.data.find(
                (post) => post.id === Number(id)
            );

            console.log("Selected Post:", post);

            if(post){
                setTitle(post.title);
                setDescription(post.description);
                setLocation(post.location);
            }

        })
        .catch((error) =>{
            console.log(error);
        });
    }, [id]);

    const handleUpdate = () => {

        const token = localStorage.getItem("token");

        axios.put(
            `http://localhost:8080/posts/${id}`,
            {
                title,
                description,
                location
            },
            {
                headers: {
                    Authorization : `Bearer ${token}`
                }
            }
        )
        .then((response) => {
            alert("Post Updated Successfully!");
            navigate("/my-posts");
        }) 
        .catch((error) => {
            console.log(error);
        });
    };

    return (
    <div>

        <h1>Edit Post</h1>

        <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
        />

        <br /><br />

        <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
        />

        <br /><br />

        <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
        />

        <br /> <br />

        <button onClick={handleUpdate}>Update Post</button>

    </div>
    );

}

export default EditPost;