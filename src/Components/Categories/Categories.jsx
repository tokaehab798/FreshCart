import { TailSpin } from "react-loader-spinner";
import { useAllCategories } from "../../assets/hooks/useAllCategories";
import { Link } from "react-router-dom";

export default function Categories() {
  const { isLoading, data } = useAllCategories();

  if (isLoading) {
    return (
      <div className="flex h-screen justify-center items-center bg-white">
        <TailSpin height="80" width="80" color="#15803D" />
      </div>
    );
  }

  return (
    <div className="container px-4 mx-auto py-10">
      <h2 className="text-center text-3xl font-bold mb-10 text-gray-800"> Categories</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {data?.data?.data.map((category) => (
          <Link key={category._id} to={`/categoryproducts/${category._id}`} className="block">
            <div className="cursor-pointer border rounded-lg p-4 hover:shadow-xl hover:scale-105 transition duration-300">
              <img
                src={category.image}
                className="h-52 w-full p-1  rounded-lg"
                alt={category.name}
              />
              <h6 className="text-center mt-3 font-semibold text-gray-700 text-lg">{category.name}</h6>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
