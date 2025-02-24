import React, { useState } from "react";

import "../styles/Step1.css"

const Step1 = ({onNext, formData}) => {

    const [email, setEmail] = useState(formData.email || '');
    const [password, setPassword] = useState(formData.password || '');


    const handleSubmit = (e) => {
        e.preventDefault();
        if(email && password) {
            onNext({email, password});
        } else {
            alert('Please enter both email and password')
        }
    };

    return (
        <form onSubmit={handleSubmit} className="formContainer">
            <div className="formGroup">
                <label className="label">Email:</label>
                <input className="input" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
            </div>
            <div className="formGroup">
                <label className="label">Password:</label>
                <input className="input" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
            </div>
            <button className="button" type="submit">Next</button>
        </form>
    )

}

export default Step1;