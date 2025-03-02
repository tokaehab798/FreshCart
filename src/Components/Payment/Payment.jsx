import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { CartContext } from "../../assets/Context/CartContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';

export default function Payment() {
    const { cartId, celerCartProduct } = useContext(CartContext);
    const [isOnline, setIsOnline] = useState(false)
    const naviagte = useNavigate()

    const paymentFormik = useFormik({
        initialValues: {
            details: "",
            phone: "",
            city: "",
        },
        onSubmit: detectAndCall,
        validationSchema: Yup.object().shape({
            details: Yup.string()
                .min(10, 'Address must be at least 10 characters long')
                .max(100, 'Address cannot exceed 100 characters')
                .required('Address is required'),

            phone: Yup.string()
                .matches(/^01[0125][0-9]{8}$/, 'Please enter a valid Egyptian phone number')
                .required('Phone number is required'),

            city: Yup.string()
                .matches(/^[A-Za-z\s]{3,30}$/, 'City name must contain only letters and be between 3 to 30 characters')
                .required('City name is required'),
        })
    });

    function cashPaymentOrder(values) {
        axios.post(
            `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
            { shippingAddress: values },
            { headers: { token: localStorage.getItem("token") } }
        )
            .then(() => {
                toast.success("Thank you for ordering from FreshCart");
                celerCartProduct();
                naviagte('/allorders');
            })
            .catch(() => {
                toast.error("There was an error processing your order");
            });
    }
    function onlinePaymentOrder(values) {
        axios.post(
            `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
            { shippingAddress: values },
            {
                headers: { token: localStorage.getItem("token") },
                params: { url: 'https://fresh-cart-three-sooty.vercel.app' }
                

            }
        )
            .then((response) => {
                console.log("after online", response.data.session.url);

                toast.success("Thank you for ordering from FreshCart");
                celerCartProduct();
                window.open(response.data.session.url, '_self')
            })
            .catch((error) => {
                console.error("Online Payment Error:", error);
                if (error.response) {
                    console.error("Response Data:", error.response.data);
                    console.error("Status Code:", error.response.status);
                }
                toast.error(error.response?.data?.message || "There was an error processing your order");
            });
            
    }
    function detectAndCall(values) {
        if (isOnline) {
            onlinePaymentOrder(values)
        }
        else {
            cashPaymentOrder(values)
        }
    }
    return <>
        <form
            onSubmit={paymentFormik.handleSubmit}
            className="w-[70%] lg:w-[50%] mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-xl border border-gray-200 my-20"
        >
            <h2 className="text-green-600 text-2xl my-3">Payment Method</h2>

            <div className="relative z-0 w-full mb-6 group">
                <input
                    type="text"
                    value={paymentFormik.values.details}
                    onBlur={paymentFormik.handleBlur}
                    onChange={paymentFormik.handleChange}
                    name="details"
                    id="details"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-500 peer"
                    placeholder=" "
                    required
                />
                <label
                    htmlFor="details"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                    Details
                </label>
                {paymentFormik.touched.details && paymentFormik.errors.details && (
                    <p className="text-red-500 text-xs mt-1">{paymentFormik.errors.details}</p>
                )}
            </div>

            <div className="relative z-0 w-full mb-6 group">
                <input
                    type="tel"
                    value={paymentFormik.values.phone}
                    onBlur={paymentFormik.handleBlur}
                    onChange={paymentFormik.handleChange}
                    name="phone"
                    id="phone"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-500 peer"
                    placeholder=" "
                    required
                />
                <label
                    htmlFor="phone"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                    Phone
                </label>
                {paymentFormik.touched.phone && paymentFormik.errors.phone && (
                    <p className="text-red-500 text-xs mt-1">{paymentFormik.errors.phone}</p>
                )}
            </div>

            <div className="relative z-0 w-full mb-6 group">
                <input
                    type="text"
                    value={paymentFormik.values.city}
                    onBlur={paymentFormik.handleBlur}
                    onChange={paymentFormik.handleChange}
                    name="city"
                    id="city"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-500 peer"
                    placeholder=" "
                    required
                />
                <label
                    htmlFor="city"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                    City
                </label>
                {paymentFormik.touched.city && paymentFormik.errors.city && (
                    <p className="text-red-500 text-xs mt-1">{paymentFormik.errors.city}</p>
                )}
            </div>

            <div className="flex justify-between gap-4">


                <button
                    type="submit"
                    onClick={() => { setIsOnline(false); }}
                    className="text-white bg-green-600 hover:bg-green-700 font-medium rounded-lg text-xs sm:text-sm w-full px-4 sm:px-6 py-2 sm:py-3 transition"
                >
                    Cash on Delivery
                </button>

                <button
                    type="submit"
                    onClick={() => { setIsOnline(true); }}
                    className="text-white bg-green-600 hover:bg-green-700 font-medium rounded-lg text-xs sm:text-sm w-full px-4 sm:px-6 py-2 sm:py-3 transition"
                >
                    Pay Online
                </button>

            </div>
        </form>

    </>
}


