import { useState ,useEffect} from 'react'

import Homepage from './Homepage'
import './App.css'
import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
    useEffect(() => {
        AOS.init({ duration: 2000, once: true });
   }, []);

  return (
    <>
     <Homepage/>
    </>
  )
}

export default App
