import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";
import { signIn, signOut } from "../services/signInApi";

const useLogin = () => {
  const [verifyPhoneNumber, setVerifyPhoneNumber] = useState(false);
  const [codeOtp, setcodeOtp] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  // [02] - Post logout hook
  const logOut = useMutation({
    mutationFn: signOut,
    onSuccess: (res) => {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user_id");
      const message = res?.message || "با موفقیت از حساب کاربری خارج شدید";
      toast.success(message, { position: "top-right", theme: "colored" });
      window.location.href = "/login";
    },
    onError: (error) => {
      console.error("Logout error:", error);
      // حتی در صورت خطا، token را پاک می‌کنیم
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user_id");
      toast.error("خطا در خروج از حساب کاربری", { position: "top-right", theme: "colored" });
      window.location.href = "/login";
    },
  });

  const goSigIn = useMutation({
    mutationFn: signIn,
    onSuccess: (res) => {
      // ساختار پاسخ API: { status: "success", data: { token: "...", user: {...} } }
      const token = res?.data?.token || null;
      const user = res?.data?.user || null;
      
      if (token) {
        sessionStorage.setItem("token", token);
        if (user?.id) {
          sessionStorage.setItem("user_id", user.id.toString());
        }
        toast.success("ورود با موفقیت انجام شد", { position: "top-right", theme: "colored" });
        window.location.href = "/dashboard/channels";
      } else {
        setVerifyPhoneNumber(false);
        setcodeOtp(false);
        toast.error("خطا در دریافت اطلاعات کاربر", { position: "top-right", theme: "colored" });
      }
      if (user?.phone_number) {
        setPhoneNumber(user.phone_number);
      }
    },
    onError: (error) => {
      console.error("Login error:", error);
      setVerifyPhoneNumber(false);
      setcodeOtp(false);
      // خطاها توسط axios interceptor مدیریت می‌شوند، اما اگر خطای خاصی بود اینجا هم نمایش می‌دهیم
      const errorMessage = error?.response?.data?.message || "ورود ناموفق بود. لطفاً دوباره تلاش کنید.";
      toast.error(errorMessage, { position: "top-right", theme: "colored" });
    },
  });
  return {
    LogOut: logOut.mutateAsync,
    LogIn: goSigIn.mutateAsync,
    isLoading: goSigIn.isPending,
    isLoggingOut: logOut.isPending,
    verifyPhoneNumber,
    codeOtp,
    setcodeOtp,
    phoneNumber,
  };
};

export default useLogin;
