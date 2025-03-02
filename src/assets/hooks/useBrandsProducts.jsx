import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useBrandsProducts(brandId) {
  async function getProductsByBrand() {
    const { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products?brand=${brandId}`
    );
    return data;
  }
return useQuery({
    queryKey:['BrandProducts',brandId],
    queryFn:getProductsByBrand,
    refetchOnMount:false,
    refetchOnWindowFocus:false

})
}
