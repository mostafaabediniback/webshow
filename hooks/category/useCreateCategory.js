import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createCategory } from "../../services/category/categoryApi";

const useCreateCategory = (options = {}) => {
  const qc = useQueryClient();
  const { onSuccess } = options;

  const createCategoryMutation = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["categories"] });
      toast.success("دسته‌بندی ایجاد شد", { theme: "colored" });
      onSuccess?.();
    },
  });

  return {
    createCategory: createCategoryMutation.mutateAsync,
    isCreatingCategory: createCategoryMutation.isPending,
  };
};

export default useCreateCategory;
