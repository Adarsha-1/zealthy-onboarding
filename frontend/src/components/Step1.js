import React, { useState } from "react";
import {FaEye, FaEyeSlash} from "react-icons/fa";

import "../styles/Step1.css"
import { toast } from "react-toastify";

const Step1 = ({onNext, formData}) => {

    const [email, setEmail] = useState(formData.email || '');
    const [password, setPassword] = useState(formData.password || '');
    const [showPassword, setShowPassword] = useState(false);
    const [passwordError, setPasswordError] = useState('');


    const validatePassword = (password) => {
        // Password must be at least 8 characters and include at least one uppercase letter,
        // one lowercase letter, and one digit and special character.
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
        return regex.test(password);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) {
            alert("Please enter both email and password");
            return;
        }
      
          // Validate password against criteria
        if (!validatePassword(password)) {
            setPasswordError(
            "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character."
        );
        return;
        }
        if(email && password) {
            onNext({email, password});
        } else {
            toast.warning('Please enter both email and password')
        }
    };

    return (
        <form onSubmit={handleSubmit} className="step1FormContainer">
            <div className="step1FormGroup">
                <label className="step1Label">Email:</label>
                <input className="step1Input" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
            </div>
            <div className="step1FormGroup">
                <label className="step1Label">Password:</label>
                <div className="step1PasswordContainer">
                    <input
                        className="step1Input  step1PasswordInput"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button
                        type="button"
                        className="step1ToggleButton"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>
                {passwordError && (
                    <p style={{ color: "red", fontSize: "0.9rem" }}>{passwordError}</p>
                )}
            </div>
            <button className="step1Button" type="submit">Next</button>
        </form>
    )

}

export default Step1;