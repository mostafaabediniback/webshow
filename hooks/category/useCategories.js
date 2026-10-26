import { useQuery } from "@tanstack/react-query";
import { getAllCategories, getCategories } from "../../services/category/categoryApi";

const useCategories = ({ page = 1, withPagination = true, ...options } = {}) => {
  const query = useQuery({
    queryKey: ["categories", withPagination ? page : "all"],
    queryFn: async () =>
      withPagination ? getCategories(page) : { items: await getAllCategories() },
    ...options,
  });

  return {
    ...query,
    data: query.data?.items || [],
    pagination: withPagination ? query.data : undefined,
  };
};

export default useCategories;
