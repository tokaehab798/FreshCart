import axios from "axios"
import { TailSpin } from "react-loader-spinner"

import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import { useContext, useState } from "react"
import { CartContext } from "../../assets/Context/CartContext"
import toast from "react-hot-toast"
import { WishlistContext } from "../../assets/Context/WishlistContext"

export default function Products() {
    const [searchQuery, setSearchQuery] = useState('')
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
        return <p>there is an error{error}</p>
    }
    const filterProducts = data.data.data.filter(product=>product.title.toLowerCase().includes(searchQuery.toLowerCase()))
    return <>
        <section>
            <div className="container mx-auto">

                <form className=" py-9 w-[70%] mx-auto ">
                    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input type="search"
                         id="default-search"
                          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 focus:outline-none rounded-lg bg-gray-50 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                           placeholder=" Search products..." 
                           required 
                           value={searchQuery}
                           onChange={e=>{setSearchQuery(e.target.value)}}
                           />
                        
                    </div>
                </form>



                <div className="row py-5">
                <div className="flex justify-center sm:px-4">

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4 relative max-w-[80%] sm:max-w-[400px] md:max-w-full mx-auto">
                {filterProducts.map((product) => (
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
