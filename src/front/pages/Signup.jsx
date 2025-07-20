import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // para los mensajes modales de alerta 
import registerImg from '../assets/img/register.png'; // ✅ Imagen para el modal



const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const BASE_URL = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            Swal.fire({
                icon: "warning",
                title: "Passwords do not match",
                text: "Please confirm your password correctly.",
                width: "220px",
                timer: 3000,
                customClass: {
                    title: 'fs-5',
                    popup: 'p-3',
                    confirmButton: 'btn btn-warning btn-sm',
                },
            });
            return;
        }

        try {
            const res = await fetch(`${BASE_URL}/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            console.log("Registro:", data);

            if (res.ok) {
               
                Swal.fire({
                    title: "User created successfully!",
                    text: "Redirecting to login...",
                    imageUrl: registerImg,
                    imageWidth: 200,
                    imageAlt: "Registration success",
                    confirmButtonText: "Log In",
                    width: "280px",
                    timer: 3000,
                    customClass: {
                        title: 'fs-5',
                        popup: 'p-3',
                        confirmButton: 'btn btn-success btn-sm',
                    },
                }).then(() => {
                    setEmail("");
                    setPassword("");
                    setConfirmPassword("");
                    navigate("/login");
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Registration failed",
                    text: data.msg || "Something went wrong",
                    width: "220px",
                    timer: 3000,
                    customClass: {
                        title: 'fs-5',
                        popup: 'p-3',
                        confirmButton: 'btn btn-danger btn-sm',
                    },
                });
            }
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Server error",
                text: "Unable to reach backend.",
                width: "220px",
            });
        }
    };

    return (
        <form onSubmit={handleRegister} className="container d-flex justify-content-center align-items-center vh-100">
            <div className="w-100 text-center" style={{ maxWidth: "420px" }}>
                <h3 className="mb-4">Create Account</h3>
                <div className="mb-3">
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Email address"
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
                <div className="mb-3">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Repeat password"
                        value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">Register</button>
            </div>
        </form>
    );
};

export default Signup;
