import { Link } from 'react-router-dom';
import notfound from '../../assets/images/error.svg'
export default function Notfound() {
  return <>

    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="text-center">
       <img src={notfound} alt="not found page" />
        <Link to="/products" className="px-6 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition duration-300">
          Go to products page
        </Link>
      </div>
    </div>


  </>
}
