import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Contents from "./contents/Contents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTachometerAlt,
    faClipboard,
    faBox,
    faAddressBook,
} from "@fortawesome/free-solid-svg-icons";



const Admin = () => {
    const [activeContent, setActiveContent] = useState(
        localStorage.getItem("activeContent") || "dashboard"
    );

    useEffect(() => {
        localStorage.setItem("activeContent", activeContent);
    }, [activeContent]);

    const handleNavClick = (content) => {
        setActiveContent(content);
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <nav
                    id="sidebar"
                    className="col-md-3 col-lg-2 d-md-block bg-primary sidebar vh-100"
                >
                    <div className="position-sticky">
                        <div
                            className="d-flex align-items-center justify-content-center my-4"
                            style={{ height: "70px" }}
                        >


                            <FontAwesomeIcon
                                className="text-white"
                                icon={faAddressBook}
                                style={{ width: "50px", height: "50px" }}
                            />
                        </div>
                        <ul className="nav flex-column">
                            <li
                                className={`nav-item ${activeContent === "dashboard" ? "active" : ""
                                    }`}
                            >
                                <a
                                    className="nav-link text-white px-2"
                                    href="#"
                                    onClick={() => handleNavClick("dashboard")}
                                >
                                    <FontAwesomeIcon icon={faTachometerAlt} className="me-2" />
                                    Dashboard
                                </a>
                            </li>
                            <li
                                className={`nav-item ${activeContent === "orders" ? "active" : ""
                                    }`}
                            >
                                <a
                                    className="nav-link  text-white px-2"
                                    href="#"
                                    onClick={() => handleNavClick("orders")}
                                >
                                    <FontAwesomeIcon icon={faClipboard} className="me-2" />
                                    Contents
                                </a>
                            </li>
                            <li
                                className={`nav-item ${activeContent === "products" ? "active" : ""
                                    }`}
                            >
                                <a
                                    className="nav-link  text-white px-2"
                                    href="#"
                                    onClick={() => handleNavClick("products")}
                                >
                                    <FontAwesomeIcon icon={faBox} className="me-2" />
                                    Products
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>

                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                    {activeContent === "dashboard" && <h2>Admin Dashboard</h2>}
                    {activeContent === "orders" && <Contents />}
                    {activeContent === "products" && <h2>Products</h2>}
                </main>
            </div>


        </div>



    );
};

export default Admin;