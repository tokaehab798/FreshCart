import { useQuery } from "@tanstack/react-query"
import axios from "axios"

 export function useAllCategories() {
    function getAllCategories() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
 
     }
     const res = useQuery({
         queryKey: ['allCategories'],
         queryFn: getAllCategories,
         refetchOnMount:false,
         refetchOnWindowFocus:false,
 
     })

  return res
}
