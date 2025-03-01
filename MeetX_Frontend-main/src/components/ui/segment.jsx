import Btn from "./button";
import image1 from '../assets/image1.png'
import image2 from '../assets/image2.png'
import image3 from '../assets/image3.png'
import { useNavigate } from "react-router-dom";

function Segment() {
  const navigator = useNavigate()
  return (
    <div  className=" flex text-center flex-wrap justify-around gap-8 mx-8 lg:mx-16 py-8">
      <div className="bg-white border-[1px] border-slate-200 p-6 rounded-2xl shadow-md max-w-xs">
        <h1 className="text-2xl font-semibold text-red-500">Individuals</h1>
        <div className="pt-4">
        <img src={image3} className="rounded-xl "/>
        </div>
        <p className="text-gray-700 mt-2">
          Freelancers and remote workers get automated notes and key insights, boosting productivity.
        </p>
        <button 
          onClick={() => navigator("/room/individual")}
          className="mt-4 bg-[#d62e5bc4] text-white px-6 py-2 rounded-full font-medium transition-all duration-300 ease-in-out hover:bg-[#d62e5b] hover:shadow-lg active:scale-95">
          Start Now
        </button>
      </div>

      <div className="bg-white border-[1px] border-slate-200 p-6 rounded-2xl shadow-md max-w-xs">
        <h1 className="text-2xl font-semibold text-green-500">Businesses</h1>
        <div className="pt-4">
        <img src={image2} className="rounded-xl "/>
        </div>
        <p className="text-gray-700 mt-2">
          Enhances collaboration with automated summaries and action items.
        </p>
        <button 
          onClick={() => navigator("/room/business")}
          className="mt-4  bg-green-500 text-white px-6 py-2 rounded-full font-medium transition-all duration-300 ease-in-out hover:bg-green-600 hover:shadow-lg active:scale-95">
          Start Now
        </button>
      </div>

      <div className="bg-white border-[1px] border-slate-200 p-6 rounded-2xl shadow-md max-w-xs">
        <h1 className="text-2xl font-semibold text-blue-500">Educators</h1>
        <div className="pt-4">
        <img src={image1} className="rounded-xl "/>
        </div>
        <p className="text-gray-700 mt-2">
          Auto-generates lecture summaries, helping students review key points easily.
        </p>
        <button 
          onClick={() => navigator("/room/educator")}
          className="mt-4  bg-blue-500 text-white px-6 py-2 rounded-full font-medium transition-all duration-300 ease-in-out hover:bg-blue-600 hover:shadow-lg active:scale-95">
          Start Now
        </button>
      </div>
    </div>
  );
}

export default Segment;
