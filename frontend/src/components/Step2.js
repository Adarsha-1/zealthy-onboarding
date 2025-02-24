import axios from "axios";
import React, { useEffect, useState } from "react";

import "../styles/Step2.css";

const Step2 = ({onNext, onBack, formData, updateFormData}) => {

    const [config, setConfig] = useState([]);
    // const [aboutMe, setAboutMe] = useState(formData.about_me || '');
    // const [streetAddress, setStreetAddress] = useState(formData.street_address || '');
    // const [city, setCity] = useState(formData.city || '');
    // const [state, setState] = useState(formData.state || '');
    // const [zipCode, setZipCode] = useState(formData.zip_code || '');
    // const [birthDate, setBirthDate] = useState(formData.birthdate || '');

    useEffect(() => {
        const getConfig = async() => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/api/config')
                console.log("Response from API is: ", response.data)
                setConfig(response.data.page2);
            } catch(error) {
                console.log("Error fetching config details: ", error.message);
            }
        }
        getConfig();
    }, []);

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     let data = {};
    //     if(config.includes('about_me')) {
    //         data.about_me = aboutMe;
    //     } 
    //     if(config.includes('address')) {
    //         data.street_address = streetAddress;
    //         data.city = city;
    //         data.state = state;
    //         data.zip_code = zipCode;
    //     } 
    //     if(config.includes('birthdate')) {
    //         data.birthdate = birthDate;
    //     }
    //     onNext(data);
    // }

    const handleChange = (field, value) => {
        updateFormData({ [field]: value });
      };
    
    const handleSubmit1 = (e) => {
    e.preventDefault();
    // Simply call onNext – the updated formData is already in the parent
    onNext({});
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
            <button type="button" onClick={onBack} className="secondaryButton">Back</button>
            <button type="submit" className="button">Next</button>
        </form>
    )
}

export default Step2;