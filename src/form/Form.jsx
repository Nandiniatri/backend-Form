import React, { useState } from "react";
import "./Form.css";

export default function Form() {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        linkedin: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        const res = await fetch("http://localhost:4000/api/save", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });

        const data = await res.json();
        alert(data.message);
        setFormData({
            first_name: "",
            last_name: "",
            email: "",
            github: "",
            linkedin: "",
        });
    };

    return (
        <div className="modalContainer">
            <div className="formCard">

                {/* LEFT FORM */}
                <div className="formLeft">
                    <h2>Sign Up</h2>
                    <p>Enter your details below to get started</p>

                    <label>First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        placeholder="Enter first name"
                        value={formData.first_name}
                        onChange={handleChange}
                    />

                    <label>Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Enter last name"
                        value={formData.last_name}
                        onChange={handleChange}
                    />

                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                    />

                    <label>LinkedIn URL</label>
                    <input
                        type="text"
                        name="linkedin"
                        placeholder="https://linkedin.com/in/username"
                        value={formData.linkedin}
                        onChange={handleChange}
                    />

                    <button className="submitBtn" onClick={handleSubmit}>Submit</button>
                </div>

                {/* RIGHT IMAGE */}
                <div className="formRight">
                    <img
                        src="https://i.pinimg.com/736x/8d/78/08/8d780816c808581cdaa321fa2891507d.jpg"
                        alt="Artwork"
                    />
                </div>
            </div>
        </div>
    );
}
