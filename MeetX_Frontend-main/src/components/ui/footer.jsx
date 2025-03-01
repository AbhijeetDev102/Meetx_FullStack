import { FaTwitter, FaLinkedin, FaFacebook, FaYoutube } from 'react-icons/fa';
import logo from '../assets/logo2.png'
const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12">
          {/* Product Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Product</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Features</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Pricing</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Download</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Integrations</a></li>
            </ul>
          </div>

          {/* Solutions Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Solutions</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Meetings</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Education</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Accessibility</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Developers</a></li>
            </ul>
          </div>

          {/* Company Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">About</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Careers</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Resources Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Help Center</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">API Docs</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Security</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Privacy</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-200 py-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-6 mb-4 md:mb-0">
            <img src={logo} alt="Logo" className="h-8 w-auto" />
            <span className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} MeetX. All rights reserved.</span>
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-600">
                <span className="sr-only">Twitter</span>
                <FaTwitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600">
                <span className="sr-only">LinkedIn</span>
                <FaLinkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600">
                <span className="sr-only">Facebook</span>
                <FaFacebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600">
                <span className="sr-only">YouTube</span>
                <FaYoutube className="h-5 w-5" />
              </a>
            </div>

            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 text-sm hover:text-blue-600">Terms</a>
              <a href="#" className="text-gray-500 text-sm hover:text-blue-600">Privacy</a>
              <select className="text-gray-500 text-sm bg-transparent border-none focus:ring-0">
                <option>English</option>
                <option>Español</option>
                <option>Français</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;