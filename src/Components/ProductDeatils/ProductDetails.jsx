import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { TailSpin } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import { CartContext } from "../../assets/Context/CartContext";
import toast from "react-hot-toast";
import Slider from "react-slick";
import { WishlistContext } from "../../assets/Context/WishlistContext";


export default function ProductDetails() {
    const { addProductToCart } = useContext(CartContext);
    const { id } = useParams();
    const { addToWishlist, wishList, removeFromWishlist } = useContext(WishlistContext)
    function toggleWishlist(productId) {
        const isWishlisted = wishList.some(item => item._id === productId);

        if (isWishlisted) {
            removeFromWishlist(productId);
        } else {
            addToWishlist(productId);
        }
    }

    function getProductDetails() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
    }


    const { data, isLoading } = useQuery({
        queryKey: ["productDetails", id],
        queryFn: getProductDetails,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });

    if (isLoading) {
        return (
            <div className="h-screen flex justify-center items-center bg-white">
                <TailSpin visible={true} height="80" width="80" color="#15803D" ariaLabel="tail-spin-loading" radius="1" />
            </div>
        );
    }

    const productDetails = data?.data?.data;

    async function handleAddToCart(productId) {
        const returnedFlag = await addProductToCart(productId);
        if (returnedFlag) {
            toast.success("Product added successfully to your cart");
        } else {
            toast.error("Adding product error");
        }
    }
    const settings = {
        dots: false,
        infinite: true,
        speed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
    };


    return (
<section className="container mx-auto px-5 py-10 flex justify-center">
  <div className="w-full md:w-4/5 pb-4 lg:w-3/4 bg-white shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row">
    
    {/* Image Section */}
    <div className="w-full md:w-1/3 focus:outline-none flex justify-center items-center">
      <Slider {...settings} className="w-full flex justify-center">
        {productDetails.images.map((img, index) => (
          <div key={index} className="p-2 flex justify-center">
            <img 
              src={img} 
              alt={`Slide ${index}`} 
              className="w-3/4 sm:w-2/3 md:w-full object-contain rounded-lg h-[200px] sm:h-[250px] md:h-auto mx-auto"
            />
          </div>
        ))}
      </Slider>
    </div>

    {/* Product Details */}
    <div className="w-full md:w-2/3 px-6 space-y-4 flex flex-col justify-center">
      
      {/* Wishlist Button */}
      <div className="relative">
        <div
          onClick={() => toggleWishlist(productDetails._id)}
          className={`cursor-pointer p-2 rounded absolute top-0 right-0 transition-all duration-300 ${
            wishList.some(item => item._id === productDetails._id) ? 'text-red-500' : 'text-stone-400'
          }`}
        >
          <i className={`fa-heart fa ${wishList.some(item => item._id === productDetails._id) ? 'fa-solid' : 'fa-regular'}`} />
        </div>
      </div>

      <h1 className="text-2xl font-bold text-gray-800">{productDetails.title}</h1>
      <p className="text-gray-600 text-lg">{productDetails.description}</p>
      <h2 className="text-green-600 text-xl font-semibold">{productDetails.category.name}</h2>

      {/* Price & Rating */}
      <div className="flex justify-between items-center text-lg font-semibold text-gray-900">
        <p>
          {productDetails.priceAfterDiscount ? (
            <>
              <span className="text-red-600 line-through me-2">{productDetails.price} EGP</span>
              <span className="text-green-600">{productDetails.priceAfterDiscount} EGP</span>
            </>
          ) : (
            <span>{productDetails.price} EGP</span>
          )}
        </p>
        <p className="flex items-center text-yellow-500">
          {productDetails.ratingsAverage} <i className="fa-solid fa-star ms-1"></i>
        </p>
      </div>

      {/* Add to Cart Button with Space Below */}
      <button
        onClick={() => handleAddToCart(productDetails._id)}
        className="w-full bg-green-600 text-white sm:mb-6 py-3 px-6 rounded-lg shadow-md hover:bg-green-700 transition duration-300 flex items-center justify-center gap-2 mt-4"
      >
        <i className="fa-solid fa-plus"></i> Add To Cart
      </button>
    </div>
  </div>
</section>


    );
}
