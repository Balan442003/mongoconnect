// import React, { useState } from "react";
// import axios from "axios"; // Import Axios
// import { useNavigate } from "react-router-dom";

// function Login() {
//   const [loginData, setLoginData] = useState({
//     email: "",
//     password: "",
//   });
//   const [token, setToken] = useState("");
//   const navigate = useNavigate();
//   const [userDatas, setUserDatas] = useState({});

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setLoginData({ ...loginData, [name]: value });
//   };

//   const fetchUserData = async (authToken) => {
//     try {
//       const userResponse = await axios.get(
//         `http://localhost:8000/users/singlefetchuser`,
//         {
//           headers: {
//             Authorization: `Bearer ${authToken}`,
//           },
//         }
//       );
//       return userResponse.data;
//     } catch (error) {
//       console.error("Fetching user data failed", error);
//       return null;
//     }
//   };
//   const handleLogin = async () => {
//     try {
//       const response = await axios.post(
//         "http://localhost:8000/login/",
//         loginData
//       );
//       const authToken = response.data.token;
//       localStorage.setItem("token", authToken);

//       const userResponse = await fetchUserData(authToken);
//       // console.log(response.data.user);
//       if (userResponse) {
//         setUserDatas(userResponse);
//         // console.log(userDatas.data._id);
//         // navigate(`/Dashboard/${userResponse.data._id}`);
//         setTimeout(() => {
//           navigate(`/Dashboard/${userDatas.data._id}`);
//         }, 5000);
//       }
//     } catch (error) {
//       console.error("Login failed", error);
//     }
//   };

//   console.log(userDatas);

//   return (
//     <div className="container mt-5">
//       <div className="card">
//         <div className="card-body">
//           <h2 className="card-title">LOGIN FORM</h2>
//           <div className="mb-3">
//             <input
//               type="email"
//               className="form-control"
//               name="email"
//               placeholder="Email"
//               value={loginData.email}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className="mb-3">
//             <input
//               type="password"
//               className="form-control"
//               name="password"
//               placeholder="Password"
//               value={loginData.password}
//               onChange={handleInputChange}
//             />
//           </div>
//           <button className="btn btn-primary" onClick={handleLogin}>
//             Login
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login

// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { jwtDecode } from 'jwt-decode';

// function Login() {
//   const [loginData, setLoginData] = useState({
//     email: "",
//     password: "",
//   });
//   const navigate = useNavigate();

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setLoginData({ ...loginData, [name]: value });
//   };

//   const handleLogin = async () => {
//     try {
//       const response = await axios.post("http://localhost:8000/login/", loginData);
//       const authToken = response.data.token;
//       localStorage.setItem("token", authToken);

//       // Extract the user ID from the token, assuming it's included in the token
//       const decoded = jwtDecode(authToken);
//       const userId = decoded._id;

//       // Now, you have the user's ID, and you can navigate to the Dashboard
//       navigate(`/Dashboard/${userId}`);
//     } catch (error) {
//       console.error("Login failed", error);
//       alert("Invalid Login")
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <div className="card">
//         <div className="card-body">
//           <h2 className="card-title">LOGIN FORM</h2>
//           <div className="mb-3">
//             <input
//               type="email"
//               className="form-control"
//               name="email"
//               placeholder="Email"
//               value={loginData.email}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className="mb-3">
//             <input
//               type="password"
//               className="form-control"
//               name="password"
//               placeholder="Password"
//               value={loginData.password}
//               onChange={handleInputChange}
//             />
//           </div>
//           <button className="btn btn-primary" onClick={handleLogin}>
//             Login
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;




import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";



//schema validation
const schema = yup
  .object({
    password: yup
      .string()
      .required("Password is required"),
    email: yup.string().required("Email is required")
    .email("Email is invalid"),
  })
  .required();

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loggedUser, setLoggedUser] = useState({});
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });

  // handleSubmit data
  const onSubmit = async (data) => {
    console.log(data);
    try {
      // console.log("working", data);
      const response = await axios.post("http://localhost:8000/login/", data);

      navigate(`/Dashboard/${response.data.user._id}`);
      localStorage.setItem("LoggedUserID", response.data.user._id)
      console.log(response)
      localStorage.setItem('LoggedUserToken',response.data.token)

    } catch (error) {
      console.error("login failed", error);
    }

    resetField("password");

    resetField("email");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };



  return (
    <div className="App p-5">
      <div className="container p-5">
        <div className="row d-flex justify-content-center align-items-center vh-100">
          <div className="col-lg-5">

            <form
              className="p-5 rounded h-100 mb-5"
              onSubmit={handleSubmit(onSubmit)}
              style={{ backgroundColor: "skyblue" }}
            >
              <h3 style={{ color: "blue" }}>Login Form</h3>

              <div className="form-group">
                <label className="">Email: </label>
                <br />
                <input
                  autoFocus
                  className="form-control"
                  // style={{textTransform:'lowercase'}}
                  {...register("email")}
                  name="email"
                  type="email"
                />
                <p className="text-danger">{errors.email?.message}</p>
              </div>

              <div className="form-group">
                <label className="">Password: </label>
                <br />
                <div className="input-group">
                  <input
                    className="form-control"
                    {...register("password")}
                    name="password"
                    type={showPassword ? "text" : "password"}
                  />
                  <button
                    type="button"
                    className="input-group-text"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <i className="bi bi-eye-slash-fill"></i>
                    ) : (
                      <i className="bi bi-eye-fill"></i>
                    )}
                  </button>
                </div>

                <p className="text-danger">{errors.password?.message}</p>
              </div>
              <input type="submit" className="btn btn-primary" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

