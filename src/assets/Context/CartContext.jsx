import axios from "axios"
import { createContext, useEffect, useState } from "react"

export const CartContext = createContext()

export function CartContextProvider({ children }) {
    const [numberOfCartItems, setNumberOfCartItems] = useState(0)
    const [products, setproducts] = useState([])
    const [totalCartPrice, setTotalCartPrice] = useState(0)
    const [cartId, setCartId] = useState(0)



    async function addProductToCart(productId) {
        return axios.post('https://ecommerce.routemisr.com/api/v1/cart', {
            productId: productId
        }, {

            headers: {
                token: localStorage.getItem("token")
            }

        }).then(() => {

            // setNumberOfCartItems(response.data.numOfCartItems)
            // setproducts(response.data.data.products)
            // setTotalCartPrice(response.data.data.totalCartPrice)
            // setUserId(response.data.data.cartOwner)
            //3l4an fi mo4kla f l api
            getUserCartUpdated();
            return true
        }).catch((error) => {
            console.error("Error adding product to cart:", error);
            return false;
        });

    }
    function getUserCartUpdated() {
        axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
            headers: {
                token: localStorage.getItem('token')
            }
        }).then((response) => {
            setNumberOfCartItems(response.data.numOfCartItems)
            setTotalCartPrice(response.data.data.totalCartPrice)
            setproducts(response.data.data.products)
            setCartId(response.data.cartId)
            console.log(cartId);
            
     

        }).catch((error) => {
            console.log(error);

        })
    }
    useEffect(() => { getUserCartUpdated() }, [])

    function getCartCountUpdated(productId, productCount) {
        axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
            "count": productCount
        }, {
            headers: {
                token: localStorage.getItem("token")
            }
        }).then((respone) => {
            setNumberOfCartItems(respone.data.numOfCartItems)
            setTotalCartPrice(respone.data.data.totalCartPrice)
            setproducts(respone.data.data.products)


        })
            .catch((error) => {
                console.log(error);
            })
    }

    async function deleteCartProduct(productId) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
            headers: {
                token: localStorage.getItem('token')
            }
        }).then((respone) => {
            setNumberOfCartItems(respone.data.numOfCartItems)
            setTotalCartPrice(respone.data.data.totalCartPrice)
            setproducts(respone.data.data.products)

            return true
        })
            .catch(() => {
                return false
            })
    }
    async function celerCartProduct() {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
            headers: {
                token: localStorage.getItem('token')
            }
        }).then(() => {
            setNumberOfCartItems(0)
            setTotalCartPrice(0)
            setproducts([])
            return true
        })
            .catch((error) => {
                console.log(error);
                return false
            })
    }

    return <CartContext.Provider value={{
        addProductToCart,
        numberOfCartItems,
        products,
        totalCartPrice,
        getUserCartUpdated,
        getCartCountUpdated,
        deleteCartProduct,
        celerCartProduct,
        cartId,

    }}>
        {children}
    </CartContext.Provider>
}
