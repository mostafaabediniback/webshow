import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createCategory } from "../../services/category/categoryApi";

const useCreateCategory = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createCategory,
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["categories"] });
      toast.success("دسته‌بندی ایجاد شد", { theme: "colored" });
      return data;
    },
    onError: (e) => {
      toast.error(e?.response?.data?.message || "خطا در ایجاد دسته‌بندی", { theme: "colored" });
    },
  });
};

export default useCreateCategory;

