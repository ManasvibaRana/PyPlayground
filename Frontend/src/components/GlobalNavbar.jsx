import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function GlobalNavbar() {
	const [menuOpen, setMenuOpen] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();

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

					<div className="hidden md:flex">
						<button
							className="bg-amber-300 text-blue-900 font-bold px-4 py-1 rounded border border-blue-950 shadow hover:bg-amber-400 transition"
							onClick={() => navigate("/login")}
						>
							Login ↦
						</button>
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
						<button
							className="block w-full text-left bg-amber-300 text-blue-900 font-bold px-3 py-2 rounded border border-blue-950 shadow hover:bg-amber-400 transition"
							onClick={() => navigate("/login")}
						>
							Login ↦
						</button>
					</div>
				)}
			</div>
		</nav>
	);
}


