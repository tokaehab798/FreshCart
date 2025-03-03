import axios from "axios";
import { useFormik } from "formik"
import { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from 'yup';
export default function Register() {

  const [theError, setTheError] = useState(null)
  const [submittedSuccessfully, setSubmittedSuccessfully] = useState(false)
  const [isClicked, setIsClicked] = useState(false)

  const Navigate = useNavigate()
  let user = {
    name: '',
    phone: '',
    email: '',
    password: '',
    rePassword: ''
  }
  let registerFormik = useFormik({
    initialValues: user,
    onSubmit: registerSignup,
    validationSchema: Yup.object().shape(
      {
        name: Yup.string().min(3, ' Name Min Length 3 ').max(20, '  Name Max Length 20').required('you must enter your name'),
        phone: Yup.string().required('you must enter your phone number').matches(/^01[0125][0-9]{8}$/, "accept only egypt phone numbers"),
        password: Yup.string().required('you must enter a password').matches(/^[A-Z][A-Za-z0-9]{5,10}$/, ' password must start with upperCase then from 6 to more any chars '),
        rePassword: Yup.string().required('you must enter a repassword').oneOf([Yup.ref('password')], "Password confirmation is incorrect"),
        email: Yup.string().required('you must enter an Email').email('Enter Valid Email ')

      }
    ),
  })



  function registerSignup(userData) {
    setIsClicked(true)
    axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', userData)
      .then(() => {
        setSubmittedSuccessfully(true)
        setIsClicked(false)

        setTimeout(() => {
          Navigate('/login')
        }, 2000);
      })
      .catch((error) => {
        setTheError(error.response.data.message)
        setIsClicked(false)
        setTimeout(() => {
          setTheError(null)
        }, 2000);
      })

  }


  return <>

    <form onSubmit={registerFormik.handleSubmit} className="w-[70%] lg:w-[50%] mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-xl border border-gray-200 my-20">
      <h2 className="text-2xl font-semibold text-green-600 mb-6">Register</h2>

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
          <div>Congratulations, your account has been created successfully!</div>
        </div>
      ) : ''}

      {/* Name Field */}
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="name"
          id="name"
          value={registerFormik.values.name}
          onBlur={registerFormik.handleBlur}
          onChange={registerFormik.handleChange}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:focus:border-green-400 focus:outline-none focus:ring-0 focus:border-green-500 peer"
          placeholder=" "
          required
        />
        <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-500 peer-focus:dark:text-green-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
        {registerFormik.errors.name && registerFormik.touched.name && (
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800  dark:text-white" role="alert">
            {registerFormik.errors.name}
          </div>
        )}
      </div>

      {/* Email Field */}
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="email"
          name="email"
          id="email"
          value={registerFormik.values.email}
          onBlur={registerFormik.handleBlur}
          onChange={registerFormik.handleChange}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:focus:border-green-400 focus:outline-none focus:ring-0 focus:border-green-500 peer"
          placeholder=" "
          required
        />
        <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-500 peer-focus:dark:text-green-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
        {registerFormik.errors.email && registerFormik.touched.email && (
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800  dark:text-white" role="alert">
            {registerFormik.errors.email}
          </div>
        )}
      </div>

      {/* Phone Field */}
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="tel"
          name="phone"
          id="phone"
          value={registerFormik.values.phone}
          onBlur={registerFormik.handleBlur}
          onChange={registerFormik.handleChange}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:focus:border-green-400 focus:outline-none focus:ring-0 focus:border-green-500 peer"
          placeholder=" "
          required
        />
        <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-500 peer-focus:dark:text-green-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone</label>
        {registerFormik.errors.phone && registerFormik.touched.phone && (
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800  dark:text-white" role="alert">
            {registerFormik.errors.phone}
          </div>
        )}
      </div>

      {/* Password Field */}
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="password"
          name="password"
          id="password"
          value={registerFormik.values.password}
          onBlur={registerFormik.handleBlur}
          onChange={registerFormik.handleChange}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:focus:border-green-400 focus:outline-none focus:ring-0 focus:border-green-500 peer"
          placeholder=" "
          required
        />
        <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-500 peer-focus:dark:text-green-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
        {registerFormik.errors.password && registerFormik.touched.password && (
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800  dark:text-white" role="alert">
            {registerFormik.errors.password}
          </div>
        )}
      </div>

      {/* Repassword Field */}
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="password"
          name="rePassword"
          id="rePassword"
          value={registerFormik.values.rePassword}
          onBlur={registerFormik.handleBlur}
          onChange={registerFormik.handleChange}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:focus:border-green-400 focus:outline-none focus:ring-0 focus:border-green-500 peer"
          placeholder=" "
          required
        />
        <label htmlFor="rePassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-500 peer-focus:dark:text-green-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Re-enter Password</label>
        {registerFormik.errors.rePassword && registerFormik.touched.rePassword && (
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800  dark:text-white" role="alert">
            {registerFormik.errors.rePassword}
          </div>
        )}
      </div>
      
          <div className="flex justify-between items-center text-sm mb-5">
                <Link to="/login" className="text-green-600 hover:underline">
                  Already Have an account?
                </Link>
               
              </div>

      <div className="flex justify-end">
    <button
      type="submit"
      className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-700 flex items-center justify-center gap-2"
    >
      {!isClicked ? (
        "Register"
      ) : (
        <>
          Register
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

  </>
}
