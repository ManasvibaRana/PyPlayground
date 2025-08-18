import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';

// ✅ Helper to get CSRF token from cookies
function getCsrfToken() {
  const name = 'csrftoken=';
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    cookie = cookie.trim();
    if (cookie.startsWith(name)) return cookie.substring(name.length);
  }
  return '';
}

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/api/login/", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          'X-CSRFToken': getCsrfToken() , // CSRF token added
        },
        credentials: "include", // important: store Django session cookie
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert("Login failed: " + (data.message || "Unknown error"));
      } else {

        sessionStorage.setItem("user_id", data.user_id || data.id); // use user id if returned
        sessionStorage.setItem("username", data.username);
        alert("Login successful! Welcome, " + data.username);
        navigate("/"); // Redirect to home/dashboard
      }
    } catch (error) {
      alert("Network or parsing error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledWrapper>
      <div className='flex items-center justify-center h-screen'>
        <div className="container">
          <div className="heading text-amber-400">Login</div>
          <form className="form" onSubmit={handleLogin}>
            <input
              required
              className="input"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              required
              className="input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              className="Login-button bg-amber-400"
              type="submit"
              value={loading ? "Logging in..." : "Login"}
              disabled={loading}
            />
          </form>
          <div className="social-account-container">
            <span className="title">
              Don’t have an account?
              <Link to="/signup" className='text-blue-500'> Signup</Link>
            </span>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};


const StyledWrapper = styled.div`
  .container {
    max-width: 350px;
    background: linear-gradient(0deg, #FFF 0%, #F4F7FB 100%);
    border-radius: 40px;
    padding: 25px 35px;
    border: 5px solid #FFF;
    box-shadow: rgba(133, 189, 215, 0.88) 0px 30px 30px -20px;
    margin: 20px;
  }
  .heading { text-align: center; font-weight: 900; font-size: 30px; }
  .form { margin-top: 20px; }
  .form .input {
    width: 100%; background: white; border: none; color: black;
    padding: 15px 20px; border-radius: 20px; margin-top: 15px;
    box-shadow: #cff0ff 0px 10px 10px -5px; border-inline: 2px solid transparent;
  }
  .form .input::placeholder { color: rgb(170, 170, 170); }
  .form .input:focus { outline: none; border-inline: 2px solid #12B1D1; }
  .form .Login-button {
    display: block; width: 100%; font-weight: bold; color: white;
    padding-block: 15px; margin: 20px auto; border-radius: 20px;
    box-shadow: rgba(133, 189, 215, 0.88) 0px 20px 10px -15px; border: none;
    transition: all 0.2s ease-in-out;
  }
  .form .Login-button:hover { transform: scale(1.03); box-shadow: rgba(133,189,215,0.88) 0px 23px 10px -20px; }
  .form .Login-button:active { transform: scale(0.95); box-shadow: rgba(133,189,215,0.88) 0px 15px 10px -10px; }
  .social-account-container { margin-top: 25px; }
  .social-account-container .title { display: block; text-align: center; font-size: 10px; color: rgb(170, 170, 170); }
`;

export default Login;
