import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const schema = yup.object().shape({
    firstName: yup.string().required('First Name is required').trim(),
    email: yup.string().email('Invalid email').required('Email is required').trim(),
});

const EditUser = () => {
    const params = useParams();
    const id = params.id
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        mode: 'all',
    });

    const [userData, setUserData] = useState({
        firstName: '',
        email: '',
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:8000/users/fetchuser/${id}`)
            .then((response) => {
                const userData = response.data.data;
                console.log(userData);
                setUserData(userData);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
                setLoading(false);
            });
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value,
        });
    };

    const onSubmit = () => {
        axios.put(`http://localhost:8000/users/updateuser/${id}`, {
            firstName: userData.firstName,
            email: userData.email,
        })
            .then((response) => {
                console.log('User data updated successfully:', response.data);
                navigate('/');
            })
            .catch((error) => {
                console.error('Error updating user data:', error);
            });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-5">
            <h3>Edit User</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-row">
                    <div className="form-group col">
                        <label className="text-dark">First Name</label>
                        <input
                            name="firstName"
                            type="text"
                            {...register("firstName")}
                            value={userData.firstName}
                            onChange={handleInputChange}
                            className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
                        />
                        <div className="invalid-feedback">{errors.firstName?.message}</div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col">
                        <label className="text-dark">Email</label>
                        <input
                            name="email"
                            type="text"
                            {...register("email")}
                            value={userData.email}
                            onChange={handleInputChange}
                            className={`form-control ${errors.email ? "is-invalid" : ""}`}
                        />
                        <div className="invalid-feedback">{errors.email?.message}</div>
                    </div>
                </div>
                <br />
                <button type="submit" className="btn btn-success">
                    Update User
                </button>
            </form>
        </div>
    );
};

export default EditUser;


// import React, { useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup'; // Import yupResolver
// import * as yup from 'yup';
// import axios from 'axios';
// import { useNavigate, useParams } from 'react-router-dom';

// const schema = yup.object().shape({
//     firstName: yup.string().required('First Name is required'),
//     email: yup.string().email('Invalid email').required('Email is required'),
//     // Define validation rules for other fields if needed
// });

// const EditUser = () => {
//     const { userId } = useParams();
//     const navigate = useNavigate();
//     const { register , handleSubmit, reset, formState:{errors} } = useForm({
//         resolver: yupResolver(schema),
//         mode:'all' // Use yupResolver with the schema
//     });

//     useEffect(() => {
//         // Fetch the user data based on the userId from the URL
//         axios.get(`http://localhost:8000/users/fetchuser/${userId}`)
//             .then((response) => {
//                 const userData = response.data.data;
//                 // Reset the form with initial values from the user data
//                 reset(userData);
//             })
//             .catch((error) => {
//                 console.error('Error fetching user data:', error);
//             });
//     }, [userId, reset]);

//     const onSubmit = (data) => {
//         // Send a PUT request to update the user's data
//         axios.put(`http://localhost:8000/users/updateuser/${userId}`, data)
//             .then((response) => {
//                 console.log('User data updated successfully:', response.data);
//                 // Optionally, you can navigate to another page after a successful update
//                 navigate('/');
//             })
//             .catch((error) => {
//                 console.error('Error updating user data:', error);
//             });
//     };

//     return (
//         <div className="container mt-5">
//             <h3>Edit User</h3>
//             <form onSubmit={handleSubmit(onSubmit)}>
//                 <div className="form-row">
//                     <div className="form-group col">
//                         <label className="text-dark">First Name</label>
//                         <input
//                             name="firstName"
//                             type="text"
//                             {...register("firstName")}
//                             className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
//                         />
//                         <div className="invalid-feedback">{errors.firstName?.message}</div>
//                     </div>
//                 </div>
//                 <div className="form-row">
//                     <div className="form-group col">
//                         <label className="text-dark">Email</label>
//                         <input
//                             name="email"
//                             type="text"
//                             {...register("email")}
//                             className={`form-control ${errors.email ? "is-invalid" : ""}`}
//                         />
//                         <div className="invalid-feedback">{errors.email?.message}</div>
//                     </div>
//                 </div>
//                 <br />
//                 <button type='submit' className='btn btn-success btn btn-outline-info text-white mr-1 m-2'>
//                     <i class="fa-solid fa-clipboard-check fa-beat-fade"></i>    Submit list
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default EditUser;
