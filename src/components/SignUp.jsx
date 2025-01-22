import React, { useState } from "react";
import "./SignUp.css";

const SignUp = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [address,setAdress]=useState("");
    const [contactno,setContactNo]=useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch("https://roboticspointbackend-b6b7b2e85bbf.herokuapp.com/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, password,address,contactno})
            });

            if (response.ok) {
                // Redirect to the main page if authentication is successful
                window.location.href = "/";
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
                <h2>SignUp Here</h2>
                <form onSubmit={handleSubmit} className="LoginForm">
                    <input
                        type="text"
                        name="name"
                        className="NameSignUp"
                        placeholder="Please Enter Your Name Here"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="password" // should be password type for security
                        name="password"
                        className="PasswordSignUp"
                        placeholder="Please Enter Your Password Here"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />  
                     <input
                    type="text" // should be password type for security
                    name="address"
                    className="PasswordSignUp"
                    placeholder="Please Enter Your Address"
                    value={address}
                    onChange={(e) => setAdress(e.target.value)}
                />
                   <input
                        type="integer" // should be password type for security
                        name="contactno"
                        className="ContactNo"
                        placeholder="Please Enter Your Contact No"
                        value={contactno}
                        onChange={(e) => setContactNo(e.target.value)}
                    />
                    <button type="submit" className="SignUpButton">Press Here to Submit</button>
                </form>
                {error && <p className="error">{error}</p>}
            </div>
        </div>
    );
};

export default SignUp;
