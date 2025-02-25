import React, { useEffect, useState } from "react";
import "../styles/DataTable.css";
import { getUsers } from "../api/Api";
import ReactPaginate from "react-paginate";

const DataTable = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const usersPerPage = 10;

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await getUsers();
                if (response.data) {
                    setUsers(response.data);
                }
            } catch (error) {
                console.error("Error fetching users: ", error.message);
            }
        };
        fetchUsers();
    }, []);

    // Pagination logic
    const offset = currentPage * usersPerPage;
    const currentUsers = users.slice(offset, offset + usersPerPage);
    const pageCount = Math.ceil(users.length / usersPerPage);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    return (
        <div className="tableContainer">
            <h2 className="tableHeader">Users Data</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>About Me</th>
                        <th>Street Address</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Zip</th>
                        <th>BirthDate</th>
                    </tr>
                </thead>
                <tbody>
                    {currentUsers.map((user, index) => (
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

            {/* Pagination Component */}
            <ReactPaginate
                previousLabel={"«"}
                nextLabel={"»"}
                breakLabel={"..."}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                activeClassName={"active"}
            />
        </div>
    );
};

export default DataTable;
