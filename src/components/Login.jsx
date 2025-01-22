import React, { useState } from "react";
import "./Login.css";
import {useNavigate} from "react-router-dom";
const Login = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");



    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch("https://roboticspointbackend-b6b7b2e85bbf.herokuapp.com/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, password })
            });

            if (response.ok) {
                 const result = await response.json();
                alert(result.message || "Login successful");
                // Redirect to the main page if authentication is successful
                 navigate(`/?username=${name}`);
            } else {
                // Display an error message if authentication fails
                const result = await response.json();
                setError(result.error || "Authentication failed");
            }
        } catch (error) {
            console.error("Error logging in:", error);
            setError("An unexpected error occurred. Please try again later.");
        }
    };

    return (
        <div className="BodyWala"> 
            <div className="Login-form-container">
                <h2>Login Here</h2>
                <form onSubmit={handleSubmit} className="LoginForm">
                    <input
                        type="text"
                        name="name"
                        className="NameLogin"
                        placeholder="Enter Your Email"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="password" // should be password type for security
                        name="password"
                        className="PasswordLogin"
                        placeholder="Enter Your Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" className="LoginButton">Press Here to Submit</button>
                </form>
                {error && <p className="error">{error}</p>}
            </div>
        </div>
    );
};

export default Login;

