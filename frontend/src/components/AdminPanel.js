import axios from "axios";
import React, { useEffect, useState } from "react";

import "../styles/AdminPanel.css";

const AdminPanel = () => {

    const [page2Components, setPage2Components] = useState([]);
    const [page3Components, setPage3Components] = useState([]);
    const availableComponents = ['about_me', 'address', 'birthdate'];

    useEffect(()=> {
        const fetchConfig = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/api/config');
                console.log("Admin config details are: ", response.data);
                if(response.data) {
                    setPage2Components(response.data.page2);
                    setPage3Components(response.data.page3);
                }
            } catch(error) {
                console.log("Error fetching admin config details", error.message);
            }
        }
        fetchConfig();
    }, []);

    const handleConfigChange = (page, component) => {
        if(page === 2) {
            if(page2Components.includes(component)) {
                setPage2Components(page2Components.filter((c) => c !== component));
            } else {
                setPage2Components([...page2Components, component]);
            }
        } else if(page === 3) {
            if(page3Components.includes(component)) {
                setPage3Components(page3Components.filter((c)=> c !== component));
            } else {
                setPage3Components([...page3Components, component]);
            }
        }
    };

    const handleSubmit = async(e) => {
        e.preventDefault();

        if(page2Components.length === 0 || page3Components.length === 0) {
            alert('Each page must have atleast one component.');
            return;
        }

        const submit = async (data) => {
            try {
                const response = await axios.post('http://127.0.0.1:5000/api/config', data);
                console.log("Admin panel configurations response: ", response.data)
                if(response.data) {
                    alert('Configuration updated successfully');
                }
            } catch(error) {
                console.error("Error updating configuration", error.message);
            }
        }
        const config = {page2:page2Components, page3:page3Components};
        submit(config);
    };

    return (
        <div className="adminContainer">
            <h2 className="adminHeader">Admin Page</h2>
            <form onSubmit={handleSubmit}>
                <div className="formGroup">
                    <h3>Page 2 Components</h3>
                    {availableComponents.map((component) => (
                        <div key={component} className="checkboxItem">
                            <input type="checkbox" checked={page2Components.includes(component)} onChange={()=>handleConfigChange(2, component)} />
                            <label>{component}</label>
                        </div>
                    ))}
                </div>
                <div className="formGroup">
                    <h3>Page 3 Components</h3>
                    {availableComponents.map((component) => (
                        <div key={component} className="checkboxItem">
                            <input type="checkbox" checked={page3Components.includes(component)} onChange={()=>handleConfigChange(3, component)} />
                            <label>{component}</label>
                        </div>
                    ))}
                </div>
                <button type="submit" className="button">Save Configurations</button>
            </form>
        </div>
    )

}

export default AdminPanel;