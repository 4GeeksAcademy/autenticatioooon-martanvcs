import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export const Navbar = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const token = sessionStorage.getItem("token");
	const username = sessionStorage.getItem("user");

	const isLoggedIn = !!token;

	const handleLogout = () => {
		console.log("Token antes de salir:", token);
		sessionStorage.removeItem("token");
		sessionStorage.removeItem("user");
		console.log("Token eliminado");
		navigate("/login");
	};

	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
			<div className="container-fluid">
				<Link className="navbar-brand" to="/">Pawthenticator😺🐾</Link>
				<div className="ms-auto d-flex align-items-center gap-2">
					{!isLoggedIn ? (
						<>
							{location.pathname === "/login" && (
								<Link to="/signup">
									<button className="btn btn-outline-light btn-sm">Sign Up</button>
								</Link>
							)}
							{location.pathname !== "/login" && (
								<Link to="/login">
									<button className="btn btn-outline-light btn-sm">Login</button>
								</Link>
							)}
						</>
					) : (
						<>
							<span className="text-white me-2">👤 {username}</span>
							<button className="btn btn-danger btn-sm" onClick={handleLogout}>
								Logout
							</button>
						</>
					)}
				</div>
			</div>
		</nav>
	);
};
