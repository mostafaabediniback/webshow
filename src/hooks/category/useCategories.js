import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../services/category/categoryApi";

const useCategories = ({ page = 1, ...options } = {}) => {
  const query = useQuery({
    queryKey: ["categories", page],
    queryFn: () => getCategories(page),
    ...options,
  });

  return {
    ...query,
    data: query.data?.items || [],
    pagination: query.data,
  };
};

export default useCategories;
