import axios from "axios";
import React, { useEffect, useState } from "react";

import "../styles/DataTable.css";

const DataTable = () => {

    const [users, setUsers] = useState([]);

    useEffect(()=> {

        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/api/users');
                if(response.data) {
                    setUsers(response.data)
                }
            } catch(error) {
                console.error("Error fecthing users: ", error.message);
            }
        };
        fetchUsers();
    }, []);

    return (
        <div className="tableContainer">
            <h2 className="header">Users Data</h2>
            <table border="1" className="table">
                <thead>
                    <th>Email</th>
                    <th>About Me</th>
                    <th>Street Address</th>
                    <th>City</th>
                    <th>State</th>
                    <th>Zip</th>
                    <th>BirthDate</th>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td>{user.email}</td>
                            <td>{user.about_me}</td>
                            <td>{user.street_address}</td>
                            <td>{user.city}</td>
                            <td>{user.state}</td>
                            <td>{user.zip_code}</td>
                            <td>{user.birthdate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

}

export default DataTable;