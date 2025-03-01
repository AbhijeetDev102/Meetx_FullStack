import React, { useState } from 'react';
import logo1 from '../assets/logo2.png';
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigator = useNavigate();
  const [activeDropdown, setActiveDropdown] = useState(null);

  const menuItems = [
   
    {
      title: 'Solutions',
      subItems: ['Business', 'Education', 'Healthcare', 'Government']
    },
    {
      title: 'Resources',
      subItems: ['Docs', 'Blog', 'Videos', 'Webinars']
    },
    {
      title: 'Company',
      subItems: ['About', 'Careers', 'Contact', 'Partners']
    }
  ];

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const handleScrollToSection = () => {
    const element = document.getElementById('pricing');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

const navigate = useNavigate()
  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-8 py-4">
        {/* Logo */}
        <div onClick={()=>navigate('/card')} className="h-16 w-24">
          <img src={logo1} className='h-full w-full hover:cursor-pointer' />
        </div>

        {/* Menu Items */}
        <div className="flex gap-8">
          <button onClick={handleScrollToSection} className="hover:cursor-pointer" >Product</button>
          {menuItems.map((item, index) => (
            <div 
              className="relative" 
              key={index}
              onMouseEnter={() => toggleDropdown(index)}
              onMouseLeave={() => toggleDropdown(null)}
            >
              <button 
                className="bg-none border-none py-2 px-3 text-gray-800 cursor-pointer transition-colors duration-300 hover:text-blue-600"
                onClick={() => toggleDropdown(index)}
                aria-expanded={activeDropdown === index}
              >
                {item.title}
              </button>
              
              {/* Dropdown Menu */}
              {activeDropdown === index && (
                <div className="absolute top-full left-0 bg-white shadow-lg rounded-md py-2 min-w-[200px] z-50">
                  {item.subItems.map((subItem, subIndex) => (
                    <a 
                      key={subIndex} 
                      href="#" 
                      className="block py-2 px-4 text-gray-800 transition-colors duration-200 hover:bg-gray-100"
                    >
                      {subItem}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
          <button 
            onClick={()=>navigator("/signup")}
            className='bg-white border-2 border-green-500 text-gray-500 px-6 font-semibold rounded-3xl shadow-lg transition-all 
            duration-300 hover:bg-green-500 hover:text-white hover:scale-105 active:scale-95'
          >
            Sign In
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;