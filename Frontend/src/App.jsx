import { useState ,useEffect} from 'react'
import Homepage from './Landing/Homepage'
import './App.css'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import Login from './checklogin/Login';
import FaceRecognition from './Face_recognition/FaceRecognition'
import Handcontroll from './handcontrol/HandControl'
import Home from './Explore/Home';
import Signup from './checklogin/Signup';
import YoloPlayground from './yolo/yolodetaction';
import DeepFacePlayground from './Deepface/Deepface';
import {ProjectsList} from './collab/ProjectsList';
import AddProjectModal from './collab/AddProjectModal';
import PyTutorChat from './chatbot/PyTutorChat';
import GlobalNavbar from './components/GlobalNavbar';

function App() {
    useEffect(() => {
        AOS.init({ duration: 2000, once: true });
     

   }, []);

  const location = useLocation();
  const isLanding = location.pathname === "/";

  return (
    <>
    {!isLanding && <GlobalNavbar />}
     <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/explore" element={<Home/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/facereco" element={<FaceRecognition/>}/>
      <Route path="/handco" element={<Handcontroll/>}/>
      <Route path="/yolo" element={<YoloPlayground/>}/>
      <Route path="/deepface" element={<DeepFacePlayground/>}/>
      <Route path="/collab" element={<ProjectsList />} />
      <Route path="/collab/add" element={<AddProjectModal />} /> 
      <Route path="/chatbot" element={<PyTutorChat />} /> 


    

    </Routes>
    </>
  )
}

export default App
