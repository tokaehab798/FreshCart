import axios from "axios";
import { useFormik } from "formik"
import { useContext, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import { AuthContextobj } from "../../assets/Context/AuthContext";
import { CartContext } from "../../assets/Context/CartContext";
import toast from "react-hot-toast";

export default function Login() {
  const { setToken } = useContext(AuthContextobj)
  const navigate = useNavigate()
  const [theError, setTheError] = useState(null)
  const [submittedSuccessfully, setSubmittedSuccessfully] = useState(false)
  const [isClicked, setIsClicked] = useState(false)

  const { getUserCartUpdated } = useContext(CartContext)
  function login(userinfo) {
    setIsClicked(true)
    axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', userinfo)
      .then((x) => {
        setIsClicked(false)
        setSubmittedSuccessfully(true)
        setToken(x.data.token)
        getUserCartUpdated()

        localStorage.setItem('token', x.data.token)

        setTimeout(() => {
          navigate('/products')
        }, 2000);
      })
      .catch((error) => {
        console.log(error.response);
        setIsClicked(false)

        toast.error(error.response.data.message);
        setTheError(error.response.data.message);
        setTimeout(() => {
          setTheError(null);

        }, 2000);

      })

  }
  let user = {
    email: '',
    password: ''
  }
  let loginFormik = useFormik(
    {
      initialValues: user,
      onSubmit: login,
      validationSchema: Yup.object().shape({
        email: Yup.string().required('you must enter an Email').email('Wrong email '),
        password: Yup.string().required('you must enter a password').matches(/^[A-Z][A-Za-z0-9]{5,10}$/, ' wrong password '),
      })
    }
  )
  return <>
    <div className="flex justify-center w-full ">
      <form onSubmit={loginFormik.handleSubmit} className="w-[70%] lg:w-[50%] mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-xl border border-gray-200 my-20">
        <h2 className="text-2xl font-semibold text-green-600 mb-6">Login</h2>
        {theError ? (
          <div className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800  dark:text-white" role="alert">
            <svg className="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span className="sr-only">Info</span>
            <div>{theError}</div>
          </div>
        ) : ''}

        {submittedSuccessfully ? (
          <div className="flex items-center p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
            <svg className="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span className="sr-only">Info</span>
            <div>Welcome back to FreshCart</div>
          </div>
        ) : ''}

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            value={loginFormik.values.email}
            onBlur={loginFormik.handleBlur}
            onChange={loginFormik.handleChange}
            name="email"
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   dark:focus:border-green-400 focus:outline-none focus:ring-0 focus:border-green-500 peer"
            placeholder=" "
            required
          />
          <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-500 peer-focus:dark:text-green-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
          {loginFormik.errors.email && loginFormik.touched.email ? (
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-white" role="alert">
              {loginFormik.errors.email}
            </div>
          ) : ''}
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            value={loginFormik.values.password}
            onBlur={loginFormik.handleBlur}
            onChange={loginFormik.handleChange}
            name="password"
            id="password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   dark:focus:border-green-400 focus:outline-none focus:ring-0 focus:border-green-500 peer"
            placeholder=" "
            required
          />
          <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-500 peer-focus:dark:text-green-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
          {loginFormik.errors.password && loginFormik.touched.password ? (
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-white" role="alert">
              {loginFormik.errors.password}
            </div>
          ) : ''}
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center text-sm mb-5 gap-2 sm:gap-0">
          <Link to="/forgotpassword" className="text-green-600 hover:underline">
            Forgot Password?
          </Link>
          <Link to="/register" className="text-green-600 hover:underline">
            Create an account
          </Link>
        </div>


        <div className="flex justify-end">
          <button
            type="submit"
            className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-700 flex items-center justify-center gap-2"
          >
            {!isClicked ? (
              "Login"
            ) : (
              <>
                Login
                <TailSpin
                  visible={true}
                  height="20"
                  width="20"
                  color="#fff"
                  ariaLabel="tail-spin-loading"
                  radius="1"
                />
              </>
            )}
          </button>
        </div>
      </form>
    </div>

  </>
}
