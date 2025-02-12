import { LogOut, LogIn, UserPlus, BookOpen, User, Library, ShieldCheck, Menu, X } from "lucide-react";
import { useUser } from "../context/userContext";
import { Link } from "react-router";
import { useState } from "react";

const Navbar = () => {
  const { user, logoutUser,isAdmin, } = useUser();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

 
  const NavLinks = () => (
    <>
      <Link
        to="/books"
        className="flex items-center gap-2 text-white hover:text-pink-300 transition-all duration-300 group"
      >
        <Library className="h-5 w-5 group-hover:scale-110 transition-transform" />
        <span>Books</span>
      </Link>
      
      {isAdmin && (
        <Link
          to="/admin"
          className="flex items-center gap-2 text-white hover:text-pink-300 transition-all duration-300 group"
        >
          <ShieldCheck className="h-5 w-5 group-hover:scale-110 transition-transform" />
          <span>Admin</span>
        </Link>
      )}
    </>
  );

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-bold text-white hover:text-pink-300 transition-all duration-300 group"
          >
            <BookOpen className="h-7 w-7 text-pink-400 group-hover:scale-110 transition-transform" />
            <span className="bg-gradient-to-r from-pink-400 to-purple-400 text-transparent bg-clip-text">
              LumineReads
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <NavLinks />
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <Link
                  to="/profile"
                  className="flex items-center gap-2 text-white hover:text-pink-300 transition-all duration-300 group"
                >
                  <User className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  <span>Profile</span>
                </Link>
                <button
                  onClick={logoutUser}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 transition-all duration-300 transform hover:-translate-y-0.5 focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex gap-4">
                <Link
                  to="/login"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 transition-all duration-300 transform hover:-translate-y-0.5 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                >
                  <LogIn className="h-5 w-5" />
                  <span>Login</span>
                </Link>
                <Link
                  to="/register"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 transition-all duration-300 transform hover:-translate-y-0.5 focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
                >
                  <UserPlus className="h-5 w-5" />
                  <span>Sign Up</span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-900 bg-opacity-95 backdrop-blur-sm">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <NavLinks />
            {user ? (
              <>
                <Link
                  to="/profile"
                  className="flex items-center gap-2 text-white hover:text-pink-300 transition-all duration-300 py-2"
                >
                  <User className="h-5 w-5" />
                  <span>Profile</span>
                </Link>
                <button
                  onClick={logoutUser}
                  className="flex items-center gap-2 text-white hover:text-pink-300 transition-all duration-300 py-2"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex items-center gap-2 text-white hover:text-pink-300 transition-all duration-300 py-2"
                >
                  <LogIn className="h-5 w-5" />
                  <span>Login</span>
                </Link>
                <Link
                  to="/signup"
                  className="flex items-center gap-2 text-white hover:text-pink-300 transition-all duration-300 py-2"
                >
                  <UserPlus className="h-5 w-5" />
                  <span>Sign Up</span>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;