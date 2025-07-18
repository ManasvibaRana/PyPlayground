import { useState ,useEffect} from 'react'
import Homepage from './Landing/Homepage'
import './App.css'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Routes, Route } from 'react-router-dom';
import Login from './checklogin/Login';
import FaceRecognition from './Face_recognition/FaceRecognition'
import Home from './Explore/Home';
import Signup from './checklogin/Signup';



function App() {
    useEffect(() => {
        AOS.init({ duration: 2000, once: true });
     

   }, []);

  return (
    <>
   

     <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/explore" element={<Home/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/facereco" element={<FaceRecognition/>}/>


    </Routes>
    </>
  )
}

export default App
