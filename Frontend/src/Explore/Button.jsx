import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import { isLoggedIn } from '../checklogin/CheckLogin';

const Button = ({to}) => {

  const navigate = useNavigate()
  const handleClick = () => {
     if (!isLoggedIn() && ["/facereco","/handco","/yolo","/deepface"].includes(to)) {
        navigate('/login');
        return;
     }
     navigate(to);
  };
  return (
    <StyledWrapper>
      <button onClick={handleClick}>Explore &rarr;</button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  button {
    text-decoration: none;
    position: relative;
    border: none;
    font-size: 12px; /* smaller text */
    font-family: inherit;
    cursor: pointer;
    color: #fff;
    width: 7em;      /* smaller width */
    height: 2.2em;   /* smaller height */
    line-height: 1em;
    text-align: center;
    background: linear-gradient(90deg, #306998, #4B8BBE, #FFD43B, #306998);
    background-size: 300%;
    border-radius: 25px; /* smaller radius for smaller button */
    z-index: 1;
  }

  button:hover {
    animation: ani 6s linear infinite;
    border: none;
  }

  @keyframes ani {
    0% {
      background-position: 0%;
    }
    100% {
      background-position: 400%;
    }
  }

  button:before {
    content: "";
    position: absolute;
    top: -4px;
    left: -4px;
    right: -4px;
    bottom: -4px;
    z-index: -1;
    background: linear-gradient(90deg, #306998, #4B8BBE, #FFD43B, #306998);
    background-size: 400%;
    border-radius: 30px;
    transition: 0.8s;
  }

  button:hover::before {
    filter: blur(15px);
  }

  button:active {
    background: linear-gradient(32deg, #306998, #4B8BBE, #FFD43B, #306998);
  }
`;

export default Button;
