import { Link, useParams } from "react-router-dom";
import { useCategoryProducts } from "../../assets/hooks/useCategoryProducts";
import { TailSpin } from "react-loader-spinner";
import { useAllCategories } from "../../assets/hooks/useAllCategories";

export default function CategoriesProducts() {
  const { id } = useParams();
  console.log("Category ID:", id);

  const { isLoading, data: productsData } = useCategoryProducts(id);
  const { data: categoryData } = useAllCategories();

  const category = categoryData?.data?.data?.find((cat) => String(cat._id) === String(id));

  if (isLoading) {
    return (
      <div className="flex h-screen justify-center items-center bg-white">
        <TailSpin height="80" width="80" color="#15803D" />
      </div>
    );
  }

  return (
<div className="container px-4 mx-auto py-10">
  <div className="text-center mb-10">
    {category ? (
      <>
        <img src={category.image} className="h-40 w-40 md:h-52 md:w-52 mx-auto rounded-lg" alt={category.name} />
        <h2 className="text-xl md:text-2xl font-bold mt-4">{category.name}</h2>
      </>
    ) : (
      <p className="text-red-500 text-xl">Category not found</p>
    )}
  </div>

  {productsData?.data?.length > 0 ? (
    <div className="flex justify-center sm:px-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {productsData.data.map((product) => (
          <Link key={product._id} to={`/productdetails/${product._id}`} className="p-2 block">
            <div className="border shadow-sm rounded-lg p-4 hover:shadow-md transition-all">
              <img src={product.imageCover} className="w-full h-40 md:h-48 object-contain p-2" alt={product.title} />
              <h3 className="text-md md:text-lg font-semibold mt-2">{product.title.split(" ").slice(0, 3).join(" ")}</h3>
              <p className="text-green-600 font-semibold">{product.price} EGP</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  ) : (
    <p className="text-center text-gray-500 text-lg md:text-xl">No products available in this category.</p>
  )}
</div>

  );
}
