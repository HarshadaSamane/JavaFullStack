import {useState, useEffect} from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Profile() {

    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token")

        axios.get(
            "http://localhost:8080/auth/me",
            {
                headers: {
                    Authorization : `Bearer ${token}`
                }
            }
        )
        .then((response) =>{
            setUser(response.data);
        })
        .catch((error) => {
            console.log(error);
        });

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
        })
        .catch((error) => {
            console.log(error);
        });

    }, []);

    return(
        <div>
            <Navbar />
            <h1>Profile</h1>
        
        {user && (
            <>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Total Posts: {posts.length}</p>
            </>
        )}

        </div>
    );
}

export default Profile;