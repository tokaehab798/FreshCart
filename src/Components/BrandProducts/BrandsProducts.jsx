import { Link, useParams } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import { useBrandsProducts } from "../../assets/hooks/useBrandsProducts";
import { useAllbrands } from "../../assets/hooks/useAllBrands";

export default function BrandsProducts() {
  const { id } = useParams();
  const { isLoading, data: productsData } = useBrandsProducts(id);
  const { data: brandsData } = useAllbrands();
  const brand = brandsData?.data?.find((brand) => String(brand._id) === String(id));

  if (isLoading) {
    return (
      <div className="flex h-screen justify-center items-center bg-white">
        <TailSpin height="80" width="80" color="#15803D" />
      </div>
    );
  }

  return (
    <div className="container px-4 mx-auto py-12">
      <div className="text-center mb-12">
        {brand ? (
          <div className="flex flex-col items-center gap-4">
            <img
              src={brand.image}
              className="h-52 w-52 rounded-lg shadow-md border border-gray-200 transition-transform duration-300 hover:scale-105"
              alt={brand.name}
            />
            <h2 className="text-3xl font-bold text-gray-800">{brand.name}</h2>
            <p className="text-gray-600 text-lg">Discover the best products from {brand.name}.</p>
          </div>
        ) : (
          <p className="text-red-500 text-xl">Brand not found</p>
        )}
      </div>
      {productsData?.data?.length > 0 ? (
    <div className="flex justify-center sm:px-4">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {productsData.data.map((product) => (
            <Link key={product._id} to={`/productdetails/${product._id}`} className="block">
              <div className="border rounded-lg shadow-md p-4 hover:shadow-xl transition duration-300">
                <img
                  src={product.imageCover}
                  className="w-full h-48 object-contain p-2 rounded-md"
                  alt={product.title}
                />
                <h3 className="text-lg font-semibold mt-3 text-gray-800">
                  {product.title.split(" ").slice(0, 3).join(" ")}
                </h3>
                <p className="text-green-600 font-semibold text-lg mt-2">{product.price} EGP</p>
              </div>
            </Link>
          ))}
        </div>
        </div>
      ) : (
        <p className="text-center text-gray-500 text-xl">No products available in this brand.</p>
      )}
    </div>
  );
}
