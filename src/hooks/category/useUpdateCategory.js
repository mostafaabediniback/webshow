import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCategory } from "../../services/category/categoryApi";

const useUpdateCategory = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }) => updateCategory(id, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

export default useUpdateCategory;
