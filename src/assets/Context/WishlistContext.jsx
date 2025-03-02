import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const WishlistContext = createContext();

export default function WishlistContextProvider({ children }) {
  const [wishList, setWishList] = useState([]);
  const [wishcount, setwishcount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://ecommerce.routemisr.com/api/v1/wishlist", {
        headers: { token: localStorage.getItem("token") },
      })
      .then((response) => {
        setWishList(response.data.data);
        setwishcount(response.data.count);
      })
      .catch((error) => console.error("Error fetching wishlist", error))
      .finally(() => setLoading(false));
  }, []);

  function addToWishlist(productId) {
    axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { productId },
        { headers: { token: localStorage.getItem("token") } }
      )
      .then(() => {
        return axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", {
          headers: { token: localStorage.getItem("token") },
        });
      })
      .then((response) => {
        setWishList(response.data.data);
        setwishcount(response.data.count);
      })
      .catch((error) => console.error("Error adding to wishlist", error))
  }

  function removeFromWishlist(productId) {
    axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
        headers: { token: localStorage.getItem("token") },
      })
      .then(() => {
        return axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", {
          headers: { token: localStorage.getItem("token") },
        });
      })
      .then((response) => {
        setWishList(response.data.data);
        setwishcount(response.data.count);
      })
      .catch((error) => console.error("Error removing from wishlist", error))
  }

  return (
    <WishlistContext.Provider value={{ wishList, addToWishlist, removeFromWishlist, wishcount, loading }}>
      {children}
    </WishlistContext.Provider>
  );
}
