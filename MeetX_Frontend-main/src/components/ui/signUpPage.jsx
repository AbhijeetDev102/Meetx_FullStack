import { useState } from "react";
import Navbar from "./navbar.jsx";
export default function SignupPage() {
  const [formData, setFormData] = useState({ email: "", phone: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone) => {
    return /^\d{10}$/.test(phone);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      alert("Please enter a valid email address");
      return;
    }

    if (!validatePhone(formData.phone)) {
      alert("Please enter a valid 10-digit phone number");
      return;
    }

    console.log("Submitting:", formData);
    alert("Signup successful!");
    setFormData({ email: "", phone: "" });
  };

  const handleGoogleSignIn = () => {
    window.location.href = "https://accounts.google.com/signup";
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Navbar/>
      <div className="bg-white p-8 rounded-lg shadow-md w-96 mt-8">
        <h2 className="text-center text-blue-600 text-2xl mb-6">Create Account</h2>

        <button
          className="w-full py-3 flex items-center bg-gray-100 justify-center border border-gray-300 rounded-md text-gray-700 hover:bg-gray-200"
          onClick={handleGoogleSignIn}
        >
          <img
            src="https://www.gstatic.com/images/branding/googleg/1x/googleg_standard_color_18dp.png"
            alt="Google logo"
            className="w-5 mr-2"
          />
          Sign up with Google
        </button>

        <div className="text-center my-4 text-gray-500">OR</div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-2 border border-gray-300 rounded-md bg-gray-200"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-600 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="w-full p-2 border border-gray-300 rounded-md bg-gray-200"
              pattern="[0-9]{10}"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}