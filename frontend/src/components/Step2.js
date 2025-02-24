import React, { useEffect, useState } from "react";
import { ToastContainer, toast, Bounce} from "react-toastify";

import "../styles/Step2.css";
import { getConfig } from "../api/Api";

const Step2 = ({onNext, onBack, formData, updateFormData, isValidAge}) => {

    const [config, setConfig] = useState([]);

    useEffect(() => {
        const getAdminConfig = async() => {
            try {
                const response = await getConfig();
                // const response = await axios.get('http://127.0.0.1:5000/api/config')
                console.log("Response from API is: ", response.data)
                setConfig(response.data.page2);
            } catch(error) {
                console.log("Error fetching config details: ", error.message);
            }
        }
        getAdminConfig();
    }, []);

    const handleChange = (field, value) => {
        updateFormData({ [field]: value });
      };
    
    const handleSubmit1 = (e) => {
        e.preventDefault();
        if (config.includes("birthdate") && formData.birthdate) {
            if(isValidAge(formData.birthdate)) {
                toast.warn("You must be at least 12 years old.", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                    });
            } else {
                onNext({});
            }
        } else {
            onNext({});
        }
        // Simply call onNext – the updated formData is already in the parent
        // onNext({});
    };

    return (
        <form onSubmit={handleSubmit1} className="formContainer">
            {config.includes('about_me') && (
                <div className="formGroup">
                    <label className="label">About Me:</label>
                    <textarea className="input" value={formData.about_me || ''} onChange={(e)=>handleChange('about_me', e.target.value)} />
                </div>
            )}
            {config.includes('address') && (
                <>
                    <div className="formGroup">
                        <label className="label">Street Address:</label>
                        <input className="input" type="text" value={formData.street_address || ''} onChange={(e)=>handleChange('street_address',e.target.value)} />
                    </div>
                    <div className="formGroup">
                        <label className="label">City:</label>
                        <input className="input" type="text" value={formData.city || ''} onChange={(e)=>handleChange('city',e.target.value)} />
                    </div>
                    <div className="formGroup">
                        <label className="label">State:</label>
                        <input className="input" type="text" value={formData.state || ''} onChange={(e)=>handleChange('state',e.target.value)} />
                    </div>
                    <div className="formGroup">
                        <label className="label">Zip Code:</label>
                        <input className="input" type="text" value={formData.zip_code || ''} onChange={(e)=>handleChange('zip_code',e.target.value)} />
                    </div>
                </>
            )}
            {config.includes('birthdate') && (
                <div className="formGroup">
                    <label className="label">BirthDate:</label>
                    <input className="input" type="date" value={formData.birthdate || ''} onChange={(e)=>handleChange("birthdate",e.target.value)} />
                </div>
            )}
            <div className="navButtons">
                <button type="button" onClick={onBack} className="secondaryButton">Back</button>
                <button type="submit" className="button">Next</button>
            </div>
            <ToastContainer />
        </form>
    )
}

export default Step2;