import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { TailSpin } from "react-loader-spinner";

export default function ResetCode() {
    const navigate = useNavigate();
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const inputRefs = useRef([]);
    const [isClicked, setIsClicked] = useState(false)


    const handleChange = (index, e) => {
        const value = e.target.value;
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 5) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const code = otp.join("");
        setIsClicked(true)
        axios
            .post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, { resetCode: code })
            .then(() => {
                toast.success("Code verified successfully!");
                setTimeout(() => navigate("/newpassword"), 2000);
                setIsClicked(false)
            })
            .catch((error) => {
                const errorMessage = error.response?.data?.message || "Invalid reset code!";
                setIsClicked(false)
                toast.error(errorMessage);
            });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-[70%] lg:w-[50%] mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-xl border border-gray-200 my-20"
        >
            <h2 className="text-green-600 text-2xl my-3 text-center">Verify Reset Code</h2>

            <p className="text-gray-500 text-sm text-center mb-6">
                Please enter the 6-digit code we sent to your email to verify your account.
            </p>

            <div className="flex justify-center gap-3 mb-6">
                {otp.map((digit, index) => (
                   <input
                   key={index}
                   type="text"
                   value={digit}
                   onChange={(e) => handleChange(index, e)}
                   onKeyDown={(e) => handleKeyDown(index, e)}
                   maxLength="1"
                   ref={(el) => (inputRefs.current[index] = el)}
                   className="w-10 h-10 sm:w-12 sm:h-12 text-center text-lg sm:text-xl border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
               />
               
                ))}
            </div>


            <button
                type="submit"
                className="text-white  bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-700 flex items-center justify-center gap-2"
            >
                {!isClicked ? (
                    " Verify Code"
                ) : (
                    <>
                        Verify Code
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
        </form>

    );
}
