import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';

// ✅ Helper to get CSRF token
function getCsrfToken() {
  const name = 'csrftoken=';
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    cookie = cookie.trim();
    if (cookie.startsWith(name)) return cookie.substring(name.length);
  }
  return '';
}

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/api/signup/", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "X-CSRFToken": getCsrfToken() 
        },
        credentials: "include", // store Django session cookie
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert("Signup failed: " + (data.message || "Unknown error"));
      } else {
        alert("Signup successful!");
        navigate("/explore"); // Redirect to login page
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
          <div className="heading text-amber-400">Signup</div>
          <form className="form" onSubmit={handleSignup}>
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
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              className="Signup-button bg-amber-400"
              type="submit"
              value={loading ? "Signing up..." : "Signup"}
              disabled={loading}
            />
          </form>
          <div className="social-account-container">
            <span className="title">
              Already have an account?
              <Link to="/login" className='text-blue-500'> Login</Link>
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
  .form .Signup-button {
    display: block; width: 100%; font-weight: bold; color: white;
    padding-block: 15px; margin: 20px auto; border-radius: 20px;
    box-shadow: rgba(133, 189, 215, 0.88) 0px 20px 10px -15px; border: none;
    transition: all 0.2s ease-in-out;
  }
  .form .Signup-button:hover { transform: scale(1.03); box-shadow: rgba(133,189,215,0.88) 0px 23px 10px -20px; }
  .form .Signup-button:active { transform: scale(0.95); box-shadow: rgba(133,189,215,0.88) 0px 15px 10px -10px; }
  .social-account-container { margin-top: 25px; }
  .social-account-container .title { display: block; text-align: center; font-size: 10px; color: rgb(170, 170, 170); }
`;

export default Signup;
