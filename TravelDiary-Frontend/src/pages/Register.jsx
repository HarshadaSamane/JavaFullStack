import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(
            "http://localhost:8080/auth/register",
            {
                name: name,
                email: email,
                password: password
            }
        )
        .then((response) => {
            console.log(response.data);

            setMessage("Registration Successful!");

            setTimeout(() => {
                navigate("/");
            }, 2000);
        })
        .catch((error) => {
            console.log(error);
        });
    };

    return (
        <div>
            <h1>Register</h1>

            <p>{message}</p>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name</label>
                    <br/>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <br/>

                <div>
                    <label>Email</label>
                    <br/>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <br/>

                <div>
                    <label>Password</label>
                    <br/>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <br/>

                <button type="submit">
                    Register
                </button>
            </form>
        </div>
    );
}

export default Register;