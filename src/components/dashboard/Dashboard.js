import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
    firstName: yup.string().required("First Name is required"),
    email: yup.string().required("Email is required").email("Email is invalid"),
    password: yup
        .string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
});

const Dashboard = () => {

    const [user, setUser] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const params = useParams();
    const id = params.id;

    useEffect(() => {
        axios.get(`http://localhost:8000/users/fetchuser/${id}`).then((res) => {
            setUser(res.data.data);
        });
    }, [user]);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data,) => {


        await axios.put(`http://localhost:8000/users/updateuser/${id}`, data);

    };

    const openModal = () => {
        reset(user);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    const saveChanges = () => {
        axios.get(`http://localhost:8000/users/fetchuser/${id}`).then((res) => {
            setUser(res.data.data);
        })
    }

    const getExpiryTimeFromToken = (token) => {
        if (!token) {
            return null;
        }

        const tokenParts = token.split('.');
        if (tokenParts.length < 3) {
            return null;
        }

        try {
            const decodedToken = atob(tokenParts[1]);
            const parsedToken = JSON.parse(decodedToken);

            if (parsedToken.exp) {
                return parsedToken.exp * 1000;
            } else {
                return null;
            }
        } catch (error) {
            console.error("Error decoding or parsing the token:", error);
            return null;
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('LoggedUserToken');
        const expiryTime = getExpiryTimeFromToken(token);

        if (expiryTime && expiryTime < Date.now()) {
            localStorage.removeItem('LoggedUserToken');
            navigate('/Login');
            window.location.reload();
        }
    }, [navigate]);

    return (
        <>
            <h3>User Details</h3>
            <div className="card ms-2 mt-2 col-lg-4 m-1" key={user.id}>
                <h4 className="card-title text-center mt-4">
                    {user.firstName}'s Profile
                </h4>
                <div className="card-body p-4">
                    <h5 className="card-title">UserID: {user._id}</h5>
                    <p>FirstName: {user.firstName}</p>
                    <p>email: {user.email}</p>
                </div>
                <div>
                    <button className="btn btn-success m-3" onClick={openModal}>
                        Edit Profile
                    </button>
                </div>
            </div>

            {isModalOpen && (
                <div className="modal" style={{ display: "block" }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Profile</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={closeModal}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <form id="registration-form" onSubmit={handleSubmit(onSubmit)}>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label className="text-dark">First Name</label>
                                            <input
                                                name="firstName"
                                                type="text"
                                                {...register("firstName")}
                                                className={`form-control ${errors.firstName ? "is-invalid" : ""
                                                    }`}
                                            />
                                            <div className="invalid-feedback">
                                                {errors.firstName?.message}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col">
                                            <label className="text-dark">Email</label>
                                            <input
                                                name="email"
                                                type="text"
                                                {...register("email")}
                                                className={`form-control ${errors.email ? "is-invalid" : ""
                                                    }`}
                                            />
                                            <div className="invalid-feedback">
                                                {errors.email?.message}
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className="form-row">
                                        <div className="form-group col">
                                            <label className="text-dark">Password</label>
                                            <input
                                                name="password"
                                                type="password"
                                                {...register("password")}
                                                className={`form-control ${errors.password ? "is-invalid" : ""
                                                    }`}
                                            />
                                            <div className="invalid-feedback">
                                                {errors.password?.message}
                                            </div>
                                        </div>
                                    </div> */}
                                    <div className="mt-4">
                                        <button type="submit" onClick={() => saveChanges()}
                                            className="btn btn-primary me-3">
                                            Save Changes
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            onClick={closeModal}
                                        >
                                            Close
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Dashboard;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";

// function Dashboard() {
//   const [userDatas, setUserDatas] = useState({});
//   const { id } = useParams();

//   useEffect(() => {
//     const authToken = localStorage.getItem("token");

//     axios
//       .get(`http://localhost:8000/users/fetchuser/${id}`, {
//         // headers: {
//         //   Authorization: `Bearer ${authToken}`,
//         // },
//       })
//       .then((response) => {
//         setUserDatas(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching user data:", error);
//       });
//   }, [id]);

//   return (
//     <div>
//       <h2>Welcome to the Dashboard</h2>
//       <div className="card mt-3">
//         <div className="card-body">
//           <h3>USER DETAILS</h3>
//           {userDatas.data ? (
//             <div>
//               <p>ID: {userDatas.data._id}</p>
//               <p>First Name: {userDatas.data.firstName}</p>
//               <p>Email: {userDatas.data.email}</p>
//             </div>
//           ) : (
//             <p>Loading user data...</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;
