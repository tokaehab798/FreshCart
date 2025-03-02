import { useContext } from "react";
import { WishlistContext } from "../../assets/Context/WishlistContext";
import { TailSpin } from "react-loader-spinner";
import { CartContext } from "../../assets/Context/CartContext";
import { Link } from "react-router-dom";
import emptyWishlistImage from '../../assets/images/emptyWishlist.jpg';

export default function Wishlist() {
  const { wishList, removeFromWishlist, loading } = useContext(WishlistContext);
  const { addProductToCart } = useContext(CartContext);

  if (loading) {
    return (
      <div className="flex h-screen justify-center items-center bg-white">
        <TailSpin visible={true} height="80" width="80" color="#15803D" ariaLabel="loading" />
      </div>
    );
  }

  if (wishList.length == 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col items-center text-center space-y-4">
          <img src={emptyWishlistImage} className="max-w-md w-3/4" alt="empty wishlist" />
          <p className="text-lg font-semibold text-gray-600">Looks like your wishlist is empty..</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 flex flex-col items-center">
    <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">My Wishlist</h2>

    <div className="bg-white shadow-lg rounded-lg p-5 w-full md:w-3/4">
      <table className="hidden sm:table w-full text-sm text-gray-700 border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-4 text-gray-600 text-center">Product</th>
            <th className="px-6 py-4 text-gray-600 text-center">Title</th>
            <th className="px-6 py-4 text-gray-600 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {wishList.map((wishlistItem) => (
            <tr key={wishlistItem._id} className="border-b hover:bg-gray-50 transition-all">
              <td className="p-4 text-center">
                <Link to={`/productdetails/${wishlistItem._id}`}>
                  <img
                    src={wishlistItem.imageCover}
                    className="w-20 h-20 object-cover rounded-lg shadow-md mx-auto"
                    alt={wishlistItem.title}
                  />
                </Link>
              </td>
              <td className="px-6 py-4 font-medium text-gray-900 text-lg text-center">
                {wishlistItem.title}
              </td>
              <td className="px-2 py-2 text-center align-middle">
                <div className="flex justify-center items-center space-x-4">
                  <button
                    onClick={() => {
                      addProductToCart(wishlistItem._id);
                      removeFromWishlist(wishlistItem._id);
                    }}
                    className="flex items-center bg-green-600 text-white px-3 py-2 rounded-lg shadow-md hover:bg-green-700 transition-all whitespace-nowrap gap-2"
                  >
                    <i className="fa-solid fa-cart-plus"></i> Add to Cart
                  </button>
                  <button
                    onClick={() => removeFromWishlist(wishlistItem._id)}
                    className="flex items-center bg-red-600 text-white px-3 py-2 rounded-lg shadow-md hover:bg-red-700 transition-all whitespace-nowrap gap-2"
                  >
                    <i className="fa-solid fa-trash"></i> Remove
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile View: Stacked Table */}
      <div className="sm:hidden flex flex-col gap-4">
        {wishList.map((wishlistItem) => (
          <div key={wishlistItem._id} className="border-b pb-4">
            <Link to={`/productdetails/${wishlistItem._id}`} className="block text-center">
              <img
                src={wishlistItem.imageCover}
                className="w-24 h-24 object-cover rounded-lg shadow-md mx-auto"
                alt={wishlistItem.title}
              />
            </Link>
            <h3 className="text-lg font-semibold text-gray-900 text-center mt-2">{wishlistItem.title}</h3>
            <div className="flex flex-col gap-3 mt-3">
              <button
                onClick={() => {
                  addProductToCart(wishlistItem._id);
                  removeFromWishlist(wishlistItem._id);
                }}
                className="flex items-center justify-center bg-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-700 transition-all gap-2"
              >
                <i className="fa-solid fa-cart-plus"></i> Add to Cart
              </button>
              <button
                onClick={() => removeFromWishlist(wishlistItem._id)}
                className="flex items-center justify-center bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition-all gap-2"
              >
                <i className="fa-solid fa-trash"></i> Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  );
}
