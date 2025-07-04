import { useRef } from 'react';
import '../App.css'
import svg from "./images/SVG.svg";
import Navbar from './Navbar';
import FlipCard from './FilpCard';
import Howitworks from "./Howitworks";
import Footer from './Footer';
import { useNavigate } from 'react-router';


function Homepage(){
    const homeRef = useRef(null);
    const pythonhighlightRef = useRef(null);
    const howitworksRef = useRef(null);
    const linkRef = useRef(null);
    const scrollToSection = (section) => {
      const refs = {
        home: homeRef,
        pythonhighlight: pythonhighlightRef,
        howitworks: howitworksRef,
        link: linkRef,
      };

      const targetRef = refs[section];
      if (targetRef && targetRef.current) {
        targetRef.current.scrollIntoView({ behavior: 'smooth',block: 'start'  });
      }
    };
 
    const nevigate = useNavigate();

    const handleClick = () =>{
      
         nevigate("/explore")
    }

    return(
        <>
        <title>PyPlayground</title>
      <Navbar scrollToSection={scrollToSection}/>
     <div className="overflow-x-hidden">
      <section  ref={homeRef} id="home">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-8 md:px-16 py-20" >
        
        <div className="max-w-screen-sm w-full mx-auto" id="headline"  >
           <h1 className="break-words text-4xl md:text-7xl  pt-10 pb-5 font-extrabold  text-amber-300 " data-aos="zoom-in" data-aos-delay="200"><span className="text-blue-400">PyPlay</span>ground </h1>
           <h3 className="text-2xl font-bold py-5 m-0  text-indigo-300" data-aos="zoom-in" data-aos-delay="400" >Your Interactive Hub for Python Experiments — designed to help you explore Python libraries in a fun, intuitive way</h3>
           <button className="text-blue-900 bg-amber-300  h-10 w-40 font-bold shadow-md shadow-amber-100 hover:bg-amber-300 hover:scale-105 transition-all duration-300" onClick={handleClick} >Explore Now  </button>
            
        </div>
        <div className="w-full flex justify-center md:justify-start">
           <img src={svg} className="h-100 w-[90%] max-w-xs md:w-auto md:max-w-full md:pl-10 "/>
        </div>
        </div>
      </section>

      <section ref={pythonhighlightRef} id="pythonhighlight">
         <div className="py-15" id="bgcolor">
          <h1 className="text-center text-4xl font-extrabold text-blue-200 py-10" >Python Highlights</h1>
         <FlipCard/>
         </div>
        </section>

        <section ref={howitworksRef} id="howitworks" >
         <div >
         <Howitworks/>
         </div>
         </section>
       
        <div ref={linkRef} id='link'>
          <Footer/>
        </div>
</div>

        </>
    )
}

export default Homepage