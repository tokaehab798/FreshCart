import axios from "axios";
import {  useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
// import { AuthContextobj } from "../../assets/Context/AuthContext";

export default function AllOrders() {
    // const { userId } = useContext(AuthContextobj);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const userId = localStorage.getItem("userId");
    useEffect(() => {
        console.log("The user ID:", userId);
        
        if (userId) {
            setLoading(true);
            axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
                .then((response) => {
                    setOrders(response.data);
                    setError(null);
                })
                .catch((error) => {
                    console.error("Error fetching orders:", error);
                    setError("Failed to fetch orders.");
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [userId]);

    if (loading) {
        return       <div className="flex h-screen justify-center items-center  bg-white">
                <TailSpin
                  visible={true}
                  height="80"
                  width="80"
                  color="#15803D"
                  ariaLabel="tail-spin-loading"
                  radius="1"
                />
              </div>
    }

    if (error) {
        return <div className="h-screen flex justify-center items-center bg-white text-red-600">{error}</div>;
    }

    return (
        <section className="container mx-auto px-5 py-10">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Orders</h1>
            {orders.length === 0 ? (
                <p className="text-gray-500">No orders found.</p>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <div key={order._id} className="bg-white shadow-lg rounded-lg p-6">
                            <h2 className="text-xl font-semibold text-gray-800">Order #{order._id}</h2>
                            <p className="text-gray-500">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                            <p className="text-gray-500">Total: <span className="font-bold text-green-600">{order.totalOrderPrice} EGP</span></p>
                            <p className="text-gray-500">Payment Method: {order.paymentMethodType}</p>
                            <h3 className="text-lg font-semibold mt-4">Shipping Details</h3>
                            {/* Uncomment if shippingAddress is available */}
                            {/* <p className="text-gray-500">City: {order.shippingAddress?.city}</p>
                            <p className="text-gray-500">Phone: {order.shippingAddress?.phone}</p> */}
                            <h3 className="text-lg font-semibold mt-4">Items</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
                                {order.cartItems.map((item) => (
                                    <div key={item._id} className="bg-gray-100 p-4 rounded-lg flex gap-4 items-center">
                                        <img src={item.product.imageCover} alt={item.product.title} className="w-20 h-20 object-cover rounded" />
                                        <div>
                                            <p className="font-semibold">{item.product.title}</p>
                                            <p className="text-gray-500">Price: {item.price} EGP</p>
                                            <p className="text-gray-500">Quantity: {item.count}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}
