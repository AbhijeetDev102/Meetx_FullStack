import React from "react";
import Btn from './button.jsx';
import image from '../assets/landingPageImg.png'
import Segment from "./segment.jsx";
import Navbar from './navbar';
import PricingSection from "./theme.jsx";
import Footer from "./footer.jsx";
function Card(){
    return(
        <div className='bg-white h-screen w-screen'>
            <div>
                <Navbar />
            </div>

           <div className='h-full flex justify-around items-center '>
            <div>
            <div className="text-black">
       <h1 className="text-6xl text-start">Start a Call</h1>
       <p className="text-2xl text-start">Revolutionizing Video Calls with AI: </p>
       <p className="text-2xl">A New Way to Connect with Family and Friends</p>
        </div>

       <div>
        <Btn/>
       </div>
            </div>
      
      <div>
      <img src={image}  />
      </div>
      </div>
        <div >
            <Segment/>
            <PricingSection id="pricing"/>
            <Footer/>
        </div>

        </div>
    )
}
export default Card;