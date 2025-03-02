import { Link } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import { useAllbrands } from "../../assets/hooks/useAllBrands";

export default function Brands() {
  const { isLoading, data } = useAllbrands();

 

  if (isLoading) {
    return (
      <div className="flex h-screen justify-center items-center bg-white">
        <TailSpin height="80" width="80" color="#15803D" />
      </div>
    );
  }

  return (
    <div className="container px-4 mx-auto py-10">
      <h2 className="text-center text-3xl font-bold mb-10 text-gray-800">Our Brands</h2>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6">
        {data?.data?.map((brand) => (
            <Link key={brand._id} to={`/brandproducts/${brand._id}`} className="block">
              <div className="cursor-pointer border rounded-lg p-4 hover:shadow-xl hover:scale-105 transition duration-300">
                <img
                  src={brand.image}
                  className="h-28 w-full p-1 rounded-lg object-contain"
                  alt={brand.name}
                />
                <h6 className="text-center mt-3 font-semibold text-gray-700 text-lg">{brand.name}</h6>
              </div>
            </Link>
          ))
        }
      </div>
    </div>
  );
}
