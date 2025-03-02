import { Link, NavLink, useNavigate } from 'react-router-dom'
import FreshLogo from '../../assets/images/freshcart-logo.svg'
import { useContext, useState } from 'react'
import { AuthContextobj } from '../../assets/Context/AuthContext'
import { CartContext } from '../../assets/Context/CartContext'
import { WishlistContext } from '../../assets/Context/WishlistContext'

export default function Navbar() {
  const { token, handleLogout } = useContext(AuthContextobj)
  const navigateToHome = useNavigate()
  const { numberOfCartItems } = useContext(CartContext)
  const { wishcount } = useContext(WishlistContext)

  const [menuOpen, setMenuOpen] = useState(false)

  function logOut() {
    handleLogout()
    navigateToHome('/login')
  }

  return (
    <>
      <nav className="bg-slate-100 p-5 fixed w-full top-0 z-50 shadow-md">
        <div className="flex items-center justify-between container mx-auto">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Link to="">
              <img src={FreshLogo} alt="Fresh cart" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <i className="fa-solid fa-bars text-2xl"></i>
          </button>

          {/* Links - Desktop */}
          <ul className="hidden md:flex flex-grow justify-center space-x-6">
            {token && (
              <>
                <NavLink
                  to=""
                  className={({ isActive }) =>
                    `me-1 py-2 transition duration-300 rounded-md 
                  ${isActive ? 'text-green-600 font-bold' : 'text-gray-700'} 
                  hover:text-green-600`
                  }
                >
                  Home
                </NavLink>
                <NavLink
                  to="/products"
                  className={({ isActive }) =>
                    `me-1 py-2 transition duration-300 rounded-md 
                  ${isActive ? 'text-green-600 font-bold' : 'text-gray-700'} 
                  hover:text-green-600`
                  }
                >
                  Products
                </NavLink>
                <NavLink
                  to="/categories"
                  className={({ isActive }) =>
                    `me-1 py-2 transition duration-300 rounded-md 
                  ${isActive ? 'text-green-600 font-bold' : 'text-gray-700'} 
                  hover:text-green-600`
                  }
                >
                  Categories
                </NavLink>
                <NavLink
                  to="/brands"
                  className={({ isActive }) =>
                    `me-1 py-2 transition duration-300 rounded-md 
                  ${isActive ? 'text-green-600 font-bold' : 'text-gray-700'} 
                  hover:text-green-600`
                  }
                >
                  Brands
                </NavLink>
              </>
            )}
          </ul>

          {/* Icons & Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <ul className="flex items-center space-x-4">
              {token && (
                <>
                  <Link to="/cart" className="relative">
                    <i className="fa-solid fa-shopping-cart text-xl text-gray-700 hover:text-green-600 transition duration-300"></i>
                    {numberOfCartItems >= 0 && (
                      <span className="absolute top-[-5px] right-[-5px] bg-green-600 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                        {numberOfCartItems}
                      </span>
                    )}
                  </Link>
                  <Link to="/wishlist" className="relative">
                    <i className="fa-solid fa-heart text-xl text-gray-700 hover:text-green-600 transition duration-300"></i>
                    {wishcount >= 0 && (
                      <span className="absolute top-[-5px] right-[-5px] bg-green-600 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                        {wishcount}
                      </span>
                    )}
                  </Link>
                </>
              )}
     
            </ul>

            <ul className="flex items-center space-x-4">
              {token ? (
                <span
                  onClick={logOut}
                  className="cursor-pointer text-gray-700 hover:text-green-600 transition duration-300"
                >
                  LogOut
                </span>
              ) : (
                <>
                  <NavLink
                    to={'/login'}
                    className="text-gray-700 hover:text-green-600 transition duration-300 px-3 py-2 rounded-md"
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to={'/register'}
                    className="text-gray-700 hover:text-green-600 transition duration-300 px-3 py-2 rounded-md"
                  >
                    Register
                  </NavLink>
                </>
              )}
            </ul>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-slate-100 p-4 absolute top-16 left-0 w-full shadow-md">
            <ul className="flex flex-col space-y-3 items-center">
              <NavLink
                to=""
                className="text-gray-700 hover:text-green-600"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </NavLink>
              <NavLink
                to="/products"
                className="text-gray-700 hover:text-green-600"
                onClick={() => setMenuOpen(false)}
              >
                Products
              </NavLink>
              <NavLink
                to="/categories"
                className="text-gray-700 hover:text-green-600"
                onClick={() => setMenuOpen(false)}
              >
                Categories
              </NavLink>
              <NavLink
                to="/brands"
                className="text-gray-700 hover:text-green-600"
                onClick={() => setMenuOpen(false)}
              >
                Brands
              </NavLink>

              {token ? <>
                <div className='flex  items-center gap-3'>
                  <Link to="/cart" className="relative" onClick={() => setMenuOpen(false)}
                  >
                    <i className="fa-solid  fa-shopping-cart text-xl text-gray-700 hover:text-green-600 transition duration-300"></i>
                    {numberOfCartItems >= 0 && (
                      <span className="absolute top-[-5px] right-[-5px] bg-green-600 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                        {numberOfCartItems}
                      </span>
                    )}
                  </Link>
                  <Link to="/wishlist" className="relative" onClick={() => setMenuOpen(false)}
                  >
                    <i className="fa-solid fa-heart text-xl text-gray-700 hover:text-green-600 transition duration-300"></i>
                    {wishcount >= 0 && (
                      <span className="absolute top-[-5px] right-[-5px] bg-green-600 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                        {wishcount}
                      </span>
                    )}
                  </Link>
                </div>
                <span
                  onClick={() => {
                    logOut()
                    setMenuOpen(false)
                  }}
                  className="cursor-pointer text-gray-700 hover:text-green-600"
                >
                  LogOut
                </span>
              </> : (
                <>
                  <NavLink
                    to="/login"
                    className="text-gray-700 hover:text-green-600"
                    onClick={() => setMenuOpen(false)}
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/register"
                    className="text-gray-700 hover:text-green-600"
                    onClick={() => setMenuOpen(false)}
                  >
                    Register
                  </NavLink>
                </>
              )}
            </ul>
          </div>
        )}
      </nav>
    </>
  )
}
