import React, { useEffect, useState, useRef , useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const HeaderDashboard = ({ title , profileRoute}) => {
  const [username, setUsername] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef();
  const { token, userData, setToken, setUserData} = useContext(AppContext)
  // const loggedIn = token && userData;
    
    const handleLogout = () => {
      setToken('')
      setUserData(null)
      navigate('/login')
    }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUsername(user.username ||user.email);
    }

    // Close dropdown when clicking outside
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // const handleLogout = () => {
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('user');
  //   navigate('/login');
  // };

  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-2xl font-semibold">{title}</h1>

      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center space-x-2 cursor-pointer focus:outline-none"
        >
          <span>👤 {username}</span>
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-10">
            <button
              onClick={() => {
                navigate(profileRoute); 
                setDropdownOpen(false);
              }}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Profile
            </button>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default HeaderDashboard;
