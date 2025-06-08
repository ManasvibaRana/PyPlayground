import './App.css'

import svg from "./SVG.svg";
import Navbar from './Navbar';
import FlipCard from './FilpCard';
import Howitworks from "./Howitworks";
import Footer from './Footer';


function Homepage(){
 
    return(
        <>
        <title>PyPlayground</title>
      <Navbar/>
     
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 px-8 md:px-16 py-20">
        
        <div class="" id="headline"  >
           <h1 class=" text-7xl pt-10 pb-5 font-extrabold  text-amber-300 " data-aos="zoom-in" data-aos-delay="200"><span class="text-blue-400">PyPlay</span>ground </h1>
           <h3 class="text-2xl font-bold py-5 m-0  text-indigo-300" data-aos="zoom-in" data-aos-delay="400" >Your Interactive Hub for Python Experiments — designed to help you explore Python libraries in a fun, intuitive way</h3>
           <button class="text-blue-900 bg-amber-300  h-10 w-40 font-bold shadow-md shadow-amber-100 hover:bg-amber-300 hover:scale-105 transition-all duration-300" >Explore Now  </button>
            
        </div>
        <div class="">
           <img src={svg} class="h-100 w-auto pl-7 "/>
        </div>
        </div>
      
         <div class="py-15" id="bgcolor">
          <h1 class="text-center text-4xl font-extrabold text-blue-200 py-10" >Python Highlights</h1>
         <FlipCard/>
         </div>
         <div >
         <Howitworks/>
         </div>
       
        <div>
          <Footer/>
        </div>

        </>
    )
}

export default Homepage