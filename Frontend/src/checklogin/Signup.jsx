import React,{useState} from 'react';
import styled from 'styled-components';
import { useNavigate,} from "react-router-dom";
import { Link } from 'react-router-dom';


const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setemail] = useState("");
  const navigate = useNavigate();


const handleSignup = async (e) => {
   e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/api/signup/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, email }),
      });

      if (!response.ok) {
        const text = await response.text();
        alert("Signup failed: " + text);
        return;
      }

      const data = await response.json();

      if (data.status === "success") {
        alert("Signup successful!");
        navigate("/explore"); // redirect to login page after signup
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (error) {
      alert("Network or parsing error: " + error.message);
    }
};

  return (


    <StyledWrapper>
      <div className='flex items-center justify-center h-screen'>
      <div className="container">
        <div className="heading  text-amber-400">Signup</div>
        <form  className="form" onSubmit={handleSignup} >
          <input required className="input" type="text" name="username" id="username" placeholder="Username" value={username}
        onChange={(e) => setUsername(e.target.value)} />

          <input required className="input" type="email" name="email" id="email" placeholder="E-mail" value={email}
        onChange={(e) => setemail(e.target.value)} />
          <input required className="input" type="password" name="password" id="password" placeholder="Password"  value={password}
        onChange={(e) => setPassword(e.target.value)} />
         
          <input className="Signup-button  bg-amber-400" type="submit"  defaultValue="Signup" />
        </form>
        <div className="social-account-container">
          <span className="title">Already have an acount ?<Link to="/login" className='text-blue-500'>Login</Link></span>
         
        </div>
        
      </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .container {
    max-width: 350px;
    background: #F8F9FD;
    background: linear-gradient(0deg, rgb(255, 255, 255) 0%, rgb(244, 247, 251) 100%);
    border-radius: 40px;
    padding: 25px 35px;
    border: 5px solid rgb(255, 255, 255);
    box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 30px 30px -20px;
    margin: 20px;
  }

  .heading {
    text-align: center;
    font-weight: 900;
    font-size: 30px;
   
  }

  .form {
    margin-top: 20px;
  }

  .form .input {
    width: 100%;
    background: white;
    border: none;
    color:black;
    padding: 15px 20px;
    border-radius: 20px;
    margin-top: 15px;
    box-shadow: #cff0ff 0px 10px 10px -5px;
    border-inline: 2px solid transparent;
  }

  .form .input::-moz-placeholder {
    color: rgb(170, 170, 170);
  }

  .form .input::placeholder {
    color: rgb(170, 170, 170);
  }

  .form .input:focus {
    outline: none;
    border-inline: 2px solid #12B1D1;
  }

  .form .forgot-password {
    display: block;
    margin-top: 10px;
    margin-left: 10px;
  }

  .form .forgot-password a {
    font-size: 11px;
   
    text-decoration: none;
  }

  .form .Signup-button {
    display: block;
    width: 100%;
    font-weight: bold;

    color: white;
    padding-block: 15px;
    margin: 20px auto;
    border-radius: 20px;
    box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 20px 10px -15px;
    border: none;
    transition: all 0.2s ease-in-out;
  }

  .form .Signup-button:hover {
    transform: scale(1.03);
    box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 23px 10px -20px;
  }

  .form .Signup-button:active {
    transform: scale(0.95);
    box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 15px 10px -10px;
  }

  .social-account-container {
    margin-top: 25px;
  }

  .social-account-container .title {
    display: block;
    text-align: center;
    font-size: 10px;
    color: rgb(170, 170, 170);
  }

  .social-account-container .social-accounts {
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-top: 5px;
  }

  .social-account-container .social-accounts .social-button {
    background: linear-gradient(45deg, rgb(0, 0, 0) 0%, rgb(112, 112, 112) 100%);
    border: 5px solid white;
    padding: 5px;
    border-radius: 50%;
    width: 40px;
    aspect-ratio: 1;
    display: grid;
    place-content: center;
    box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 12px 10px -8px;
    transition: all 0.2s ease-in-out;
  }

  .social-account-container .social-accounts .social-button .svg {
    fill: white;
    margin: auto;
  }

  .social-account-container .social-accounts .social-button:hover {
    transform: scale(1.2);
  }

  .social-account-container .social-accounts .social-button:active {
    transform: scale(0.9);
  }

  .agreement {
    display: block;
    text-align: center;
    margin-top: 15px;
  }

  .agreement a {
    text-decoration: none;
    color: #0099ff;
    font-size: 9px;
  }`;

export default Signup;
