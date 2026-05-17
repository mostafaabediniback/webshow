import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../services/category/categoryApi";

const useCategories = (options = {}) => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    enabled: options.enabled ?? true,
  });
};

export default useCategories;
