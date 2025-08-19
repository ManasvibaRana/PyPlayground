import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { isLoggedIn, logout as clearSession } from "../checklogin/CheckLogin";

export default function GlobalNavbar() {
	const [menuOpen, setMenuOpen] = useState(false);
	const [profileOpen, setProfileOpen] = useState(false);
	const [loggedIn, setLoggedIn] = useState(isLoggedIn());
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		setLoggedIn(isLoggedIn());
	}, [location.pathname]);

	const linkClass = (path) =>
		`px-3 py-2 rounded-md text-sm ${
			location.pathname === path
				? "bg-blue-900 text-white"
				: "text-gray-300 hover:bg-blue-950 hover:text-white"
		}`;

	return (
		<nav className="bg-gray-900/90 text-white sticky top-0 z-50 backdrop-blur-md border-b border-slate-800">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					<Link to="/" className="font-semibold tracking-wide text-blue-200">
						PyPlayground
					</Link>

					<div className="hidden md:flex items-center space-x-2">
						<Link to="/explore" className={linkClass("/explore")}>Explore</Link>
						<Link to="/facereco" className={linkClass("/facereco")}>Face Recognition</Link>
						<Link to="/handco" className={linkClass("/handco")}>Hand Control</Link>
						<Link to="/yolo" className={linkClass("/yolo")}>YOLO</Link>
						<Link to="/deepface" className={linkClass("/deepface")}>DeepFace</Link>
						<Link to="/collab" className={linkClass("/collab")}>Collab</Link>
						<Link to="/chatbot" className={linkClass("/chatbot")}>Chatbot</Link>
					</div>

					<div className="hidden md:flex relative items-center">
						{!loggedIn ? (
							<button
								className="bg-amber-300 text-blue-900 font-bold px-4 py-1 rounded border border-blue-950 shadow hover:bg-amber-400 transition"
								onClick={() => navigate("/login")}
							>
								Login ↦
							</button>
						) : (
							<div className="relative">
								<button
									onClick={() => setProfileOpen(!profileOpen)}
									className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-800 border border-slate-700 hover:border-slate-600"
								>
									<span className="h-6 w-6 rounded-full bg-indigo-500/80 flex items-center justify-center text-xs">{(sessionStorage.getItem('username') || 'U').charAt(0).toUpperCase()}</span>
									<span className="text-sm text-slate-200">Profile</span>
								</button>
								{profileOpen && (
									<div className="absolute right-0 mt-2 w-40 bg-slate-900 border border-slate-700 rounded-md shadow-lg">
										<button
											className="w-full text-left px-3 py-2 text-sm hover:bg-slate-800"
											onClick={async () => {
												try {
													await fetch("http://localhost:8000/api/logout/", {
														method: "POST",
														credentials: "include",
														headers: { "Content-Type": "application/json" },
													});
												} catch {}
												clearSession();
												setProfileOpen(false);
												setLoggedIn(false);
												navigate("/");
											}}
										>
											Logout
										</button>
									</div>
								)}
							</div>
						)}
					</div>

					<div className="md:hidden flex items-center">
						<button
							onClick={() => setMenuOpen(!menuOpen)}
							className="text-white focus:outline-none"
						>
							{menuOpen ? (
								<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
								</svg>
							) : (
								<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
								</svg>
							)}
						</button>
					</div>
				</div>

				{menuOpen && (
					<div className="md:hidden mt-2 space-y-1 pb-3">
						<Link to="/explore" className={linkClass("/explore")}>Explore</Link>
						<Link to="/facereco" className={linkClass("/facereco")}>Face Recognition</Link>
						<Link to="/handco" className={linkClass("/handco")}>Hand Control</Link>
						<Link to="/yolo" className={linkClass("/yolo")}>YOLO</Link>
						<Link to="/deepface" className={linkClass("/deepface")}>DeepFace</Link>
						<Link to="/collab" className={linkClass("/collab")}>Collab</Link>
						<Link to="/chatbot" className={linkClass("/chatbot")}>Chatbot</Link>
						{!loggedIn ? (
							<button
								className="block w-full text-left bg-amber-300 text-blue-900 font-bold px-3 py-2 rounded border border-blue-950 shadow hover:bg-amber-400 transition"
								onClick={() => navigate("/login")}
							>
								Login ↦
							</button>
						) : (
							<button
								className="block w-full text-left bg-slate-800 border border-slate-700 px-3 py-2 rounded hover:bg-slate-700"
								onClick={async () => {
									try {
										await fetch("http://localhost:8000/api/logout/", {
											method: "POST",
											credentials: "include",
											headers: { "Content-Type": "application/json" },
										});
									} catch {}
									clearSession();
									setMenuOpen(false);
									navigate("/");
								}}
							>
								Logout
							</button>
						)}
					</div>
				)}
			</div>
		</nav>
	);
}


