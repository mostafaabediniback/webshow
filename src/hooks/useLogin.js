import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { signIn, signOut } from "../services/signInApi";

const useLogin = () => {
  const [verifyPhoneNumber, setVerifyPhoneNumber] = useState(false);
  const [codeOtp, setcodeOtp] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  // [02] - Post logout hook
  const logOut = useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      sessionStorage.removeItem("token");
      window.location.href = "/login";
    },
  });

  const goSigIn = useMutation({
    mutationFn: signIn,
    onSuccess: (res) => {
      const token = res && res.token ? res.token : null;
      const data = res && res.data ? res.data : null;
      if (token) {
        sessionStorage.setItem("token", token);
        window.location.href = "/dashboard/channels";
      } else {
        setVerifyPhoneNumber(false);
        setcodeOtp(false);
      }
      if (data?.phone_number) {
        setPhoneNumber(data.phone_number);
      }
    },
  });
  return {
    LogOut: logOut.mutate,
    LogIn: goSigIn.mutate,
    verifyPhoneNumber,
    codeOtp,
    setcodeOtp,
    phoneNumber,
  };
};

export default useLogin;
