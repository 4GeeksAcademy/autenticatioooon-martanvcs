import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'; 
import loginImg from "../assets/img/login.png"; 


const Login = () => {  
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const BASE_URL = import.meta.env.VITE_BACKEND_URL;

    
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(BASE_URL + "/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const result = await response.json();
            console.log("Respuesta del backend:", result);

            if (response.ok) {
                sessionStorage.setItem("token", result.token);
                sessionStorage.setItem("user", result.user);

                Swal.fire({
                    icon: 'success',
                    title: 'Login successful!',
                    text: 'Welcome back',
                    confirmButtonText: 'Continue',
                    timer: 3000,
                    width: "230px",
                    customClass: {
                        title: 'fs-4',
                        popup: 'p-3',
                        confirmButton: 'btn btn-success btn-sm',
                    },
                }).then(() => {
                    navigate("/private");
                });

            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Login failed',
                    text: result.msg || 'Incorrect email or password',
                    width: "220px",
                    timer: 3000,
                    customClass: {
                        title: 'fs-5',
                        popup: 'p-3',
                        confirmButton: 'btn btn-danger btn-sm',
                    },
                });
            }

        } catch (error) {
            console.error("ERROR DE FETCH:", error);
            Swal.fire({
                icon: 'error',
                title: 'Server error',
                text: 'Could not connect to the server',
                timer: 3000,
                width: "230px",
                customClass: {
                    title: 'fs-6',
                    popup: 'p-3',
                    confirmButton: 'btn btn-danger btn-sm',
                },
            });
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="row shadow rounded w-100 overflow-hidden" style={{ maxWidth: "850px" }}>
                <div className="col-md-6 d-none d-md-block p-0">
                    <img
                        src={loginImg}
                        alt="Login visual"
                        className="img-fluid h-100 w-100"
                        style={{ objectFit: "cover" }}
                    />
                </div>

                <div className="col-md-6 p-4">
                    <form onSubmit={handleSubmit}>
                        <h3 className="mb-4">Sign In</h3>
                        <div className="mb-3">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Email"
                                value={email} onChange={(e) => setEmail(e.target.value)} required
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                value={password} onChange={(e) => setPassword(e.target.value)} required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Login</button>
                        <div className="mt-3 text-center">
                            <span>Don't have an account? </span>
                            <Link to="/signup">Register here</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
