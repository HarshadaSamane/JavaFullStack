import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Login() {


    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(
            "http://localhost:8080/auth/login",{
                email,
                password
            }
        )
        .then((response) => {
            localStorage.setItem("token", response.data);
            
            const token = localStorage.getItem("token");

            navigate("/dashboard");

            axios.get(
                "http://localhost:8080/auth/me",
                {
                    headers : {
                        Authorization : `Bearer ${token}`
                    }
                }
            )
            .then((response) => {
                console.log(response.data);
            });
        })
        .catch((error) => {
            console.log(error);
        });

    };

    return (
        <div>
            <h1>Login</h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <br />
                    <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <br />

                <div>
                    <label>Password</label>
                    <br />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <br />

                <button type="submit">
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;