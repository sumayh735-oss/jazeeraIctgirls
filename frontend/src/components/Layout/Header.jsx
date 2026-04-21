import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HiMenu, HiX, HiLogout } from 'react-icons/hi';
import Logo from '../../assets/images/wali.png';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
 console.log("AUTH:", { user, logout, isAuthenticated });
 
console.log("AUTH DEBUG:", { user, logout, isAuthenticated });
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/community', label: 'Community' },
    { path: '/blog', label: 'Blog' },
    { path: '/innovators', label: 'Innovators' },
    { path: '/events', label: 'Events' },


  
  ];


 const handleLogout = () => {
  if (typeof logout === "function") {
    logout();
    navigate('/');
    setOpen(false);
  } else {
    console.log("❌ logout not working", logout);
  }
};

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 h-[96px]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 h-full flex items-center justify-between">

       <div className="flex items-center"> <Link to="/"> <img src={Logo} alt="Jazeera ICT Girls" className="h-44 w-auto" /> </Link> </div>

        {/* ================= NAV (CENTER) ================= */}
        <nav className="hidden lg:flex items-center gap-12 absolute left-1/2 -translate-x-1/2">
          {navItems.map(item => (
            <div key={item.path} className="relative">
              <Link
                to={item.path}
                className={`text-lg font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'text-primary-tech'
                    : 'text-gray-800 hover:text-primary-tech'
                }`}
              >
                {item.label}
              </Link>

              {location.pathname === item.path && (
                <span className="absolute -bottom-2 left-0 right-0 h-1 bg-primary-tech rounded-full" />
              )}
            </div>
          ))}
        </nav>

        {/* ================= ACTIONS (RIGHT) ================= */}
        <div className="hidden lg:flex items-center gap-8">
          {isAuthenticated ? (
            <>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary-tech/20 flex items-center justify-center">
                  <span className="text-primary-tech font-bold">
                    {user?.fullName?.charAt(0)}
                  </span>
                </div>
                <span className="font-medium text-primary-navy">
                  {user?.fullName}
                </span>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-primary-navy hover:text-primary-tech transition"
              >
                <HiLogout className="text-lg" />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-lg font-medium text-gray-800 hover:text-primary-tech transition"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="bg-primary-tech hover:bg-primary-navy text-white px-8 py-3 rounded-full text-lg font-semibold shadow-md hover:shadow-lg transition"
              >
                Join Now
              </Link>
            </>
          )}
        </div>

        {/* ================= MOBILE TOGGLE ================= */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-gray-800 hover:text-primary-tech p-2"
        >
          {open ? <HiX size={32} /> : <HiMenu size={32} />}
        </button>
      </div>

      {/* ================= MOBILE MENU ================= */}
      {open && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-6 py-6 space-y-2">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setOpen(false)}
                className={`block py-4 text-lg font-medium ${
                  location.pathname === item.path
                    ? 'text-primary-tech'
                    : 'text-gray-800 hover:text-primary-tech'
                }`}
              >
                {item.label}
              </Link>
            ))}

            <div className="pt-6 mt-4 border-t border-gray-200 space-y-4">
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="w-full py-3 bg-primary-tech text-white text-lg font-semibold rounded-lg"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setOpen(false)}
                    className="block py-3 text-center text-lg border border-gray-300 rounded-lg"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setOpen(false)}
                    className="block py-3 text-center bg-primary-tech text-white text-lg font-semibold rounded-lg"
                  >
                    Join
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
