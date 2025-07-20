import React, { useEffect, useState } from "react";
import welcomeImg from "../assets/img/welcome.png";

const Private = () => {
    const [message, setMessage] = useState("");
    const [user, setUser] = useState("");
    const BASE_URL = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        fetchPrivateInfo();
        const savedUser = sessionStorage.getItem("user");
        if (savedUser) setUser(savedUser);
    }, []);

    const fetchPrivateInfo = async () => {
        const token = sessionStorage.getItem("token");

        try {
            const res = await fetch(BASE_URL + "/private", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await res.json();
            console.log(data);

            if (res.ok) {
                setMessage(data.msg);
            } else {
                setMessage("Access denied");
            }

        } catch (err) {
            setMessage("You are logged in, but no private content was returned😿");
        }
    };

    return (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-center">
            <h2 className="text-success fw-bold mb-3" style={{ fontSize: "2rem" }}>
                Welcome to Your Private Area
            </h2>
            <p className="mb-4">{message}</p>
            <img
                src={welcomeImg}
                alt="Welcome Cat"
                style={{
                    height: "200px",
                    objectFit: "contain",
                    borderRadius: "10px"
                }}
            />
            {user && (
                <h5 className="mt-4 text-primary">
                    Hello, <strong>{user}</strong>!
                </h5>
            )}
        </div>
    );
};

export default Private;
