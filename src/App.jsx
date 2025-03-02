import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Layout from './Components/Layout/Layout'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Notfound from './Components/NotFound/Notfound'
import ProtectedRoute from './Components/Protected/ProtectedRoute'
import Cart from './Components/Cart/Cart'
import Categories from './Components/Categories/Categories'
import Brands from './Components/Brands/Brands'
import Products from './Components/Products/Products'
import AuthContext from './assets/Context/AuthContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ProductDetails from './Components/ProductDeatils/ProductDetails'
import { CartContextProvider } from './assets/Context/CartContext'
import { Toaster } from 'react-hot-toast'
import Payment from './Components/Payment/Payment'
import Allorders from './Components/AllOrders/Allorders'
import Wishlist from './Components/Wishlist/Wishlist'
import WishlistContextProvider from './assets/Context/WishlistContext'
import CategoriesProducts from './Components/CategoriesProducts/CategoriesProducts'
import BrandsProducts from './Components/BrandProducts/BrandsProducts'
import ForgetPassword from './Components/ForgetPassword/ForgetPassword'
import ResetCode from './Components/ResetCode/ResetCode'
import NewPassword from './Components/NewPassword/NewPassword'
import Home from './Components/Home/Home'

function App() {

  let router = createBrowserRouter([
    {
      path: '/', element: <Layout />, children: [
        { path: 'login', element: <Login /> },
        { path: 'forgotpassword', element: <ForgetPassword/> },
        { path: 'resetcode', element: <ResetCode/> },
        { path: 'newpassword', element: <NewPassword/> },
        { path: '', element: <ProtectedRoute><Home /></ProtectedRoute> },
        { path: 'cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
        { path: 'categories', element: <ProtectedRoute><Categories /></ProtectedRoute> },
        { path: 'brands', element: <ProtectedRoute><Brands /></ProtectedRoute> },
        { path: 'brandproducts/:id', element: <ProtectedRoute><BrandsProducts /></ProtectedRoute> },
        { path: 'products', element: <ProtectedRoute><Products /></ProtectedRoute> },
        { path: 'payment', element: <ProtectedRoute><Payment /></ProtectedRoute> },
        { path: 'categoryproducts/:id', element: <ProtectedRoute><CategoriesProducts /></ProtectedRoute> },
        { path: 'allorders', element: <ProtectedRoute><Allorders /></ProtectedRoute> },
        { path: 'wishlist', element: <ProtectedRoute><Wishlist /></ProtectedRoute> },
        { path: 'productdetails/:id', element: <ProtectedRoute><ProductDetails/></ProtectedRoute> },
        { path: 'register', element: <Register /> },
        { path: '*', element: <Notfound /> }
      ]
    }
  ])

  const reactQueryObj= new QueryClient()
  return (
    <>
      <AuthContext>
        <QueryClientProvider client={reactQueryObj}>
          <WishlistContextProvider>
          <CartContextProvider>
          <RouterProvider router={router} />
          <Toaster/>
          </CartContextProvider>
          </WishlistContextProvider>
        </QueryClientProvider>
      </AuthContext>
    </>
  )
}

export default App
