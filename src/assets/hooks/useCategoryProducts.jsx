import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useCategoryProducts(categoryId) {
  async function getProductsByCategory() {
    const { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products?category[in]=${categoryId}`
    );
    return data;
  }
return useQuery({
    queryKey:['CategoryProducts',categoryId],
    queryFn:getProductsByCategory,
    refetchOnMount:false,
    refetchOnWindowFocus:false

})
}
