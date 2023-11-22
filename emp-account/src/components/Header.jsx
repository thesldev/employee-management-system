import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import logo from '../data/logo_without_bg.png';

const Header = () => {

  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <nav x-data="{ isOpen: false }" className="relative bg-white shadow dark:bg-gray-800">
        <div className="container px-6 py-4 mx-auto md:flex md:justify-between md:items-center">
          <div className="flex items-center justify-between">
            <a href="#">
              <img className="w-auto h-6 sm:h-7" src={logo} alt="Logo" />
            </a>

            {/* Mobile menu button */}
            <div className="flex lg:hidden">
              <button
                x-cloak
                onClick={() => (isOpen = !isOpen)}
                type="button"
                className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
                aria-label="toggle menu"
              >
                {/* SVG icons */}
              </button>
            </div>
          </div>

          {/* Mobile Menu open: "block", Menu closed: "hidden" */}
          <div
            x-cloak
            className={`absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 md:mt-0 md:p-0 md:top-0 md:relative md:bg-transparent md:w-auto md:opacity-100 md:translate-x-0 md:flex md:items-center`}
          >
            <div className="flex flex-col md:flex-row md:mx-6">
              <Link
                to="/home"
                className="my-2 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0"
              >
                Home
              </Link>
              <Link
                to="/jobs"
                className="my-2 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0"
              >
                Jobs
              </Link>
              <Link
                to="/leaves"
                className="my-2 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0"
              >
                Leaves
              </Link>
              <Link
                to="/notes"
                className="my-2 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0"
              >
                Notes
              </Link>
              <Link
                to="/profile"
                className="my-2 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0"
              >
                Profile
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
