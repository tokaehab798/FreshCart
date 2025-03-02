import { useContext } from "react";
import { CartContext } from "../../assets/Context/CartContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import emptyCartImage from '../../assets/images/emptyCart.jpg';

export default function Cart() {
  const { celerCartProduct, products, totalCartPrice, getCartCountUpdated, deleteCartProduct } =
    useContext(CartContext);

  function handleCartCounter(id, count) {
    getCartCountUpdated(id, count);
  }

  async function handleDelete(id) {
    const response = await deleteCartProduct(id);
    if (response) {
      toast.success("Product removed successfully from your cart");
    } else {
      toast.error("Error removing product");
    }
  }

  async function handleClear() {
    const response = await celerCartProduct();
    if (response) {
      toast.success("All products cleared");
    } else {
      toast.error("Clearing cart failed");
    }
  }

  return <>
  {products.length === 0 ? (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center text-center space-y-4">
        <img src={emptyCartImage} className="max-w-md" alt="Empty cart" />
        <p className="text-lg font-semibold text-gray-600">Looks like your cart is empty..</p>
      </div>
    </div>
  ) : (
    <div className="container mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* Shopping Cart Section */}
      <div className="lg:col-span-2">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Shopping Cart</h2>
          <button
            onClick={handleClear}
            className="bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition-all text-sm sm:text-base"
          >
            Clear Cart
          </button>
        </div>

        {/* Cart Table for Larger Screens */}
        <div className="hidden sm:block relative overflow-x-auto shadow-lg rounded-lg bg-white p-6">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="text-xs text-gray-800 uppercase bg-gray-100">
              <tr>
                <th scope="col" className="px-6 py-3">Image</th>
                <th scope="col" className="px-6 py-3">Product</th>
                <th scope="col" className="px-6 py-3">Quantity</th>
                <th scope="col" className="px-6 py-3">Price</th>
                <th scope="col" className="px-6 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {products?.map((product) => (
                <tr key={product._id} className="border-b hover:bg-gray-50 transition-all">
                  <td className="p-4">
                    <img
                      src={product.product.imageCover}
                      className="w-16 h-16 object-cover rounded-md shadow"
                      alt={product.product.title}
                    />
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {product.product.title}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleCartCounter(product.product._id, product.count - 1)}
                        disabled={product.count === 1}
                        className="p-2 text-gray-600 bg-gray-200 hover:bg-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        className="w-12 text-center border border-gray-300 rounded-md"
                        value={product.count}
                        readOnly
                      />
                      <button
                        onClick={() => handleCartCounter(product.product._id, product.count + 1)}
                        className="p-2 text-gray-600 bg-gray-200 hover:bg-gray-300 rounded-lg"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">{product.price} EGP</td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleDelete(product.product._id)}
                      className="text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View (Stacked Items) */}
        <div className="sm:hidden flex flex-col gap-4">
          {products.map((product) => (
            <div key={product._id} className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center text-center">
              <img
                src={product.product.imageCover}
                className="w-24 h-24 object-cover rounded-md shadow-md"
                alt={product.product.title}
              />
              <h3 className="text-lg font-semibold text-gray-900 mt-2">{product.product.title}</h3>

              <div className="flex items-center space-x-2 mt-2">
                <button
                  onClick={() => handleCartCounter(product.product._id, product.count - 1)}
                  disabled={product.count === 1}
                  className="p-2 text-gray-600 bg-gray-200 hover:bg-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  -
                </button>
                <input
                  type="number"
                  className="w-12 text-center border border-gray-300 rounded-md"
                  value={product.count}
                  readOnly
                />
                <button
                  onClick={() => handleCartCounter(product.product._id, product.count + 1)}
                  className="p-2 text-gray-600 bg-gray-200 hover:bg-gray-300 rounded-lg"
                >
                  +
                </button>
              </div>

              <p className="text-lg font-semibold text-gray-800 mt-2">{product.price} EGP</p>

              <button
                onClick={() => handleDelete(product.product._id)}
                className="text-red-600 hover:text-red-700 text-sm mt-3"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

      </div>

      {/* Order Summary Section */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg h-fit">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Order Summary</h3>

        <div className="mb-4">
          {products.map((product) => (
            <div key={product.product._id} className="flex justify-between items-center border-b py-2">
              <div className="flex flex-col">
                <span className="text-gray-800 font-semibold">{product.product.title}</span>
                <span className="text-sm text-gray-600">Quantity: {product.count}</span>
              </div>
              <span className="text-gray-900 font-medium">{product.price * product.count} EGP</span>
            </div>
          ))}
        </div>

        <p className="text-lg font-semibold text-gray-700">Total Price: {totalCartPrice} EGP</p>

        <div className="mt-6">
          <Link
            to="/payment"
            className="block text-center bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition-all"
          >
            Proceed to Payment
          </Link>
        </div>
      </div>

    </div>
  )}
</>


}
