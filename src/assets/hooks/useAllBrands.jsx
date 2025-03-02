import { useQuery } from "@tanstack/react-query"
import axios from "axios"

 export function useAllbrands() {
    async function getAllbrands() {
    const {data}= await axios.get('https://ecommerce.routemisr.com/api/v1/brands')
    return data;

     }
     const res = useQuery({
         queryKey: ['allbrands'],
         queryFn: getAllbrands,
         refetchOnMount:false,
         refetchOnWindowFocus:false,
 
     })

  return res
}
