import axios from "axios"
import { TailSpin } from "react-loader-spinner"
import SimpleSlider from "../MainSlider/Mainslider"
import CenterMode from "../CategoriesSlider/CategoriesSlider"
import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import { useContext } from "react"
import { CartContext } from "../../assets/Context/CartContext"
import toast from "react-hot-toast"
import { WishlistContext } from "../../assets/Context/WishlistContext"

export default function Home() {
    const { addProductToCart } = useContext(CartContext)
    const { addToWishlist, wishList, removeFromWishlist } = useContext(WishlistContext)
  function toggleWishlist(productId) {
        const isWishlisted = wishList.some(item => item._id === productId);

        if (isWishlisted) {
            removeFromWishlist(productId);
        } else {
            addToWishlist(productId);
        }
    }

    function handleAddProductToCart(id) {
        const returnedFlag = addProductToCart(id)
        if (returnedFlag) {
            toast.success('Product added successfully to your cart')
        } else {
            toast.error('adding product error')
        }
    }

    function getProducts() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/products')
    }

    const { data, isError, isLoading, error } = useQuery({
        queryKey: 'allProducts',
        queryFn: getProducts,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    })

    if (isLoading) {
        return (
            <div className="h-screen flex justify-center items-center bg-white">
                <TailSpin visible={true} height="80" width="80" color="#15803D" ariaLabel="tail-spin-loading" radius="1" />
            </div>
        )
    }

    if (isError) {
        return <p>fi error {error}</p>
    }
    return <>
        <section>
            <div className="container mx-auto">
                <SimpleSlider />
                <div className="py-2">
                    <CenterMode />
                </div>

                <div className="row py-16">
                <div className="flex justify-center sm:px-4">

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4 relative max-w-[80%] sm:max-w-[180px] md:max-w-full mx-auto">
                        {data?.data?.data?.map((product) => (
                            <div key={product._id} className="relative overflow-hidden group border shadow-sm rounded-lg bg-white transition-all duration-300 hover:shadow-md pb-6">
                                <div className="relative group">
                                    <div
                                        onClick={() => toggleWishlist(product._id)}
                                        className={`cursor-pointer p-2 rounded absolute top-0 right-0 transition-all duration-300 ${wishList.some(item => item._id === product._id) ? 'text-red-500' : 'text-stone-400'
                                            }`}
                                    >
                                        <i className={`fa-heart fa ${wishList.some(item => item._id === product._id) ? 'fa-solid' : 'fa-regular'
                                            }`} />
                                    </div>



                                </div>

                                <Link to={`/productdetails/${product._id}`}>

                                    <img src={product.imageCover} className="w-full h-48 object-contain p-2" alt={product.title} />
                                    <div className="p-4">
                                        <h6 className="text-green-600 text-sm font-semibold">{product.category.name}</h6>
                                        <h2 className="text-gray-800 font-bold truncate">{product.title.split(' ').slice(0, 3).join(' ')}</h2>
                                        <div className="flex justify-between items-center mt-2">
                                            <p className="text-gray-600 text-sm">
                                                {product.priceAfterDiscount ? (
                                                    <span className="text-red-600 line-through me-1">{product.price}EGP</span>
                                                ) : (
                                                    <span>{product.price}</span>
                                                )}
                                                <span className="font-bold text-gray-900"> {product.priceAfterDiscount} EGP</span>
                                            </p>
                                            <p className="flex items-center text-yellow-500 font-semibold text-sm">
                                                {product.ratingsAverage} <i className="fa-solid fa-star ms-1"></i>
                                            </p>
                                        </div>
                                    </div>
                                </Link>

                                <div
                                    onClick={() => handleAddProductToCart(product._id)}
                                    className="cursor-pointer absolute bg-green-600 bottom-1 left-0 right-0 mx-auto w-[90%] rounded-md h-9 translate-y-10 group-hover:translate-y-0 transition-all duration-500 text-white flex items-center justify-center"
                                >
                                    <div className="flex items-center">
                                        <i className="fa-solid fa-plus me-2"></i>
                                        <p>Add  to Cart</p>
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>
                    </div>
                </div>
            </div>
        </section>
    </>

}

