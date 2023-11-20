import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import Swal from 'sweetalert2'

const Listcompnent = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8000/users").then((res) => {
            setUsers(res.data.data);
        });
    }, []);

    const deleteUser = (id) => {
        // console.log(id);
        // axios.delete(`http://localhost:8000/users/deleteuser/${id}`)
        //     .then(response => {
        //         console.log('Resource deleted successfully:', response.data);

        //         // Update the users state by filtering out the deleted user
        //         setUsers(users.filter(user => user._id !== id));
        //     })
        //     .catch(error => {
        //         console.error('Error deleting resource:', error);
        //     });
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                // User confirmed the delete action
                axios.delete(`http://localhost:8000/users/deleteuser/${id}`)
                    .then(response => {
                        console.log('Resource deleted successfully:', response.data);
                        setUsers(users.filter(user => user._id !== id));
                        // Redirect to a new page or update the UI after successful deletion
                        navigate('/'); // Change the route as needed

                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        );
                    })
                    .catch(error => {
                        console.error('Error deleting resource:', error);
                        Swal.fire(
                            'Error!',
                            'An error occurred while deleting the file.',
                            'error'
                        );
                    });
            }
        });
    }

    const col = [
        {
            name: 'firstName',
            selector: 'firstName',
        },
        {
            name: 'email',
            selector: 'email',
        },
        {
            name: "Actions/Delete",
            cell: (users) => (
                <button className="btn btn-danger btn btn-outline-dark"
                    onClick={() => deleteUser(users._id)}><i class="fa-solid fa-trash fa-beat-fade"></i>Delete
                </button>
            ),
        },
        {
            name: "Actions/Edit",
            cell: (users) => (
                <button className="btn btn-primary btn btn-outline-dark"
                    onClick={() => navigate(`/EditUser/${users._id}`)}><i class="fa-solid fa-pen-to-square fa-beat-fade"></i>Edit..
                </button>
            ),
        }
    ];

    return (

        <div className="container mt-5">
            <button onClick={() => navigate(`/Register`)} className='btn btn-success'>Register</button>
            <br />
            <br />
            <br />
            <br />
            <h3>Users</h3>
            <DataTable
                title=''
                columns={col}
                data={users}
                pagination
                id='data-table'
            />
        </div>

    )
}

export default Listcompnent
