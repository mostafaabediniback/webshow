import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../services/category/categoryApi";

const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
};

export default useCategories;
