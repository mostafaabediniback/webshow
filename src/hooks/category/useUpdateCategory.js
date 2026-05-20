import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateCategory } from "../../services/category/categoryApi";

const useUpdateCategory = (options = {}) => {
  const qc = useQueryClient();
  const { onSuccess } = options;

  const updateCategoryMutation = useMutation({
    mutationFn: ({ id, payload }) => updateCategory(id, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["categories"] });
      toast.success("دسته‌بندی با موفقیت ویرایش شد");
      onSuccess?.();
    },
  });

  return {
    updateCategory: updateCategoryMutation.mutateAsync,
    isUpdatingCategory: updateCategoryMutation.isPending,
  };
};

export default useUpdateCategory;
