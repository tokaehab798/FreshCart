import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { TailSpin } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

export default function ForgetPassword() {
      const [isClicked, setIsClicked] = useState(false)
    
    const navigate = useNavigate()
    const forgetPasswordFormik = useFormik({
        initialValues: {
            email: "",
        },
        onSubmit: handleForgetPassword,
    });
    function handleForgetPassword(values) {
        setIsClicked(true)
        axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, {
            email: values.email
        }).then(response => {
            setIsClicked(false)
            console.log("Reset code sent successfully:", response.data);
            setTimeout(() => {
                navigate('/resetcode')
            }, 2000);
        })
            .catch((error) => {
                setIsClicked(false)
                const errorMessage = error.response?.data?.message || "Something went wrong!";
                toast.error(errorMessage);
            });


    }

    return <>

        <form

            onSubmit={forgetPasswordFormik.handleSubmit}
            className="w-[70%] lg:w-[50%] mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-xl border border-gray-200 my-20"
        >
            <h2 className="text-green-600 text-2xl my-3">Forget Password</h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">
                Enter your email address, and we will send you a reset code to regain access to your account.
            </p>


            <div className="relative z-0 w-full mb-6 group">
                <input
                    type="email"
                    value={forgetPasswordFormik.values.email}
                    onBlur={forgetPasswordFormik.handleBlur}
                    onChange={forgetPasswordFormik.handleChange}
                    name="email"
                    id="email"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-500 peer"
                    placeholder=" "
                    required
                />
                <label
                    htmlFor="email"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                    email
                </label>
            </div>


            <div className=" gap-4 flex justify-end">
                <button
                    type="submit"
                    className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-700 flex items-center justify-center gap-2"
                >
                     {!isClicked ? (
                            "send code"
                          ) : (
                            <>
                              send code
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
