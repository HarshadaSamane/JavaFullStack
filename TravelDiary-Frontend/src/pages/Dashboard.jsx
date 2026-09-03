import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Dashboard() {

    const [user, setUser] = useState(null);

    useEffect (() => {
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

    return (
        <div>
            <Navbar />
        {user && (<>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        </>
        )}

        </div>
    );
    
}

export default Dashboard;