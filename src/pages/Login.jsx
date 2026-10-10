import Layout from "../layouts/Layout";
import { Sms, Lock, Eye, EyeSlash, Key, User } from "iconsax-react";
import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import logo from "../assets/logo/logo-login.png";
import useLogin from "../hooks/auth/useLogin";
import useSendOtp from "../hooks/auth/useSendOtp";
import useCheckOtp from "../hooks/auth/useCheckOtp";
import useCompleteUserData from "../hooks/auth/useCompleteUserData";
import OTPInput from "../components/OTPInput";

const MODES = {
  LOGIN: 'LOGIN',
  REGISTER: 'REGISTER'
};

const STEPS = {
  PHONE: 'PHONE',
  OTP: 'OTP',
  COMPLETE: 'COMPLETE'
};

function Login() {
  const [mode, setMode] = useState(MODES.LOGIN);
  const [step, setStep] = useState(STEPS.PHONE);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userId, setUserId] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [timer, setTimer] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loginError, setLoginError] = useState("");

  const { LogIn, isLoading: isLoggingIn } = useLogin();
  const { mutateAsync: sendOtp, isPending: isSendingOtp } = useSendOtp();
  const { mutateAsync: checkOtp, isPending: isCheckingOtp } = useCheckOtp();
  const { mutateAsync: completeData, isPending: isCompletingData } = useCompleteUserData();

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // Login Handler
  const handleLogin = async (values) => {
    setLoginError("");
    try {
      await LogIn({ phone_number: values.phone, password: values.password });
    } catch (error) {
      const errorMessages = error?.response?.data?.errors;
      const formattedErrors = Array.isArray(errorMessages)
        ? errorMessages.join(' - ')
        : (errorMessages || 'ورود ناموفق بود. لطفاً شماره موبایل و رمز عبور را بررسی کنید.');
      setLoginError(formattedErrors);
    }
  };

  // Registration Handlers
  const handleSendOtp = async (values) => {
    try {
      await sendOtp({ phone_number: values.phone });
      setPhoneNumber(values.phone);
      setStep(STEPS.OTP);
      setTimer(120);
    } catch (error) {}
  };

  const handleCheckOtp = async (values) => {
    try {
      const res = await checkOtp({ phone_number: phoneNumber, code: values.otp });
      const user = res?.data?.data;
      const token = res?.data?.token;
      
      // If user info is incomplete (name is missing), go to complete data step
      if (user && !user.name) {
        setUserId(user.id);
        setAuthToken(token);
        setStep(STEPS.COMPLETE);
      }
    } catch (error) {}
  };

  const handleCompleteData = async (values) => {
    try {
      await completeData({
        token: authToken,
        user_id: userId,
        name: values.name,
        password: values.password
      });
    } catch (error) {}
  };

  const resendOtp = () => {
    if (timer === 0) {
      handleSendOtp({ phone: phoneNumber });
    }
  };

  // Validation Schemas
  const loginSchema = Yup.object().shape({
    phone: Yup.string()
      .matches(/^09\d{9}$/, "شماره موبایل معتبر نیست")
      .required("شماره موبایل الزامی است"),
    password: Yup.string().required("رمز عبور الزامی است"),
  });

  const phoneSchema = Yup.object().shape({
    phone: Yup.string()
      .matches(/^09\d{9}$/, "شماره موبایل معتبر نیست")
      .required("شماره موبایل الزامی است"),
  });

  const otpSchema = Yup.object().shape({
    otp: Yup.string()
      .matches(/^\d{5}$/, "کد تایید باید ۵ رقم باشد")
      .required("کد تایید الزامی است"),
  });

  const completeSchema = Yup.object().shape({
    name: Yup.string().required("نام و نام خانوادگی الزامی است"),
    password: Yup.string()
      .min(6, "رمز عبور باید حداقل 6 کاراکتر باشد")
      .required("رمز عبور الزامی است"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'تکرار رمز عبور مطابقت ندارد')
      .required('تکرار رمز عبور الزامی است')
  });

  return (
    <Layout>
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-6 sm:py-12 px-3 sm:px-4 bg-gray-50 pb-24">
        <div className="max-w-md w-full mx-auto bg-white rounded-[10px] border border-gray-200 shadow-lg p-6 sm:p-8 md:p-10">
          <div className="text-center mb-8">
            <div className="flex justify-center items-center">
              <img src={logo} alt="اربعین تی وی" className="h-32 sm:h-38 md:h-40 w-auto" />
            </div>
            <h2 className="text-xl font-bold mt-4 text-gray-800">
              {mode === MODES.LOGIN ? '' : 'ثبت‌نام در سامانه'}
            </h2>
          </div>

          {mode === MODES.LOGIN ? (
            /* --- LOGIN FORM --- */
            <Formik
              initialValues={{ phone: "", password: "" }}
              validationSchema={loginSchema}
              onSubmit={handleLogin}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">شماره موبایل</label>
                    <div className="relative flex items-center gap-3 rounded-[10px] border border-gray-300 bg-gray-50 hover:bg-white hover:border-gray-400 transition-all px-4 py-2">
                      <Sms size={20} color="#64748b" />
                      <Field
                        type="tel"
                        name="phone"
                        className="w-full bg-transparent focus:outline-none focus:ring-0 text-sm placeholder-gray-400"
                        placeholder="0912xxxxxxx"
                      />
                    </div>
                    <ErrorMessage name="phone" component="p" className="text-red-600 text-sm mt-1" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">رمز عبور</label>
                    <div className="relative flex items-center gap-3 rounded-[10px] border border-gray-300 bg-gray-50 hover:bg-white hover:border-gray-400 transition-all px-4 py-2">
                      <Lock size={20} color="#64748b" />
                      <Field
                        type={showPassword ? "text" : "password"}
                        name="password"
                        className="w-full bg-transparent focus:outline-none focus:ring-0 text-sm placeholder-gray-400"
                        placeholder="••••••••"
                      />
                      <div className="absolute left-4 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <Eye size={20} color="#4a5565" /> : <EyeSlash size={20} color="#4a5565" />}
                      </div>
                    </div>
                    <ErrorMessage name="password" component="p" className="text-red-600 text-sm mt-1" />
                  </div>

                  {loginError && <p className="text-red-600 text-sm text-center">{loginError}</p>}

                  <button
                    type="submit"
                    className="w-full py-3 rounded-[10px] bg-gradient-to-r from-orange-400 to-red-400 hover:from-orange-500 hover:to-red-500 active:scale-95 text-white font-medium text-sm shadow-md transition-all"
                    disabled={isSubmitting || isLoggingIn}
                  >
                    {isLoggingIn ? "در حال ورود..." : "ورود"}
                  </button>

                  <div className="text-center pt-4 border-t border-gray-100">
                    <p className="text-sm text-gray-600 mb-2">هنوز حساب کاربری ندارید؟</p>
                    <button
                      type="button"
                      onClick={() => { setMode(MODES.REGISTER); setStep(STEPS.PHONE); }}
                      className="text-orange-500 hover:text-orange-600 font-bold text-sm underline underline-offset-4"
                    >
                      ثبت‌نام در سامانه
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          ) : (
            /* --- REGISTRATION FLOW (OTP) --- */
            <div className="space-y-5">
              {step === STEPS.PHONE && (
                <Formik
                  initialValues={{ phone: "" }}
                  validationSchema={phoneSchema}
                  onSubmit={handleSendOtp}
                >
                  {({ isSubmitting }) => (
                    <Form className="space-y-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">شماره موبایل</label>
                        <div className="relative flex items-center gap-3 rounded-[10px] border border-gray-300 bg-gray-50 hover:bg-white hover:border-gray-400 transition-all px-4 py-2">
                          <Sms size={20} color="#64748b" />
                          <Field
                            type="tel"
                            name="phone"
                            className="w-full bg-transparent focus:outline-none focus:ring-0 text-sm placeholder-gray-400"
                            placeholder="0912xxxxxxx"
                          />
                        </div>
                        <ErrorMessage name="phone" component="p" className="text-red-600 text-sm mt-1" />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 rounded-[10px] bg-gradient-to-r from-orange-400 to-red-400 hover:from-orange-500 hover:to-red-500 active:scale-95 text-white font-medium text-sm shadow-md transition-all"
                        disabled={isSubmitting || isSendingOtp}
                      >
                        {isSendingOtp ? "در حال ارسال..." : "ارسال کد تایید"}
                      </button>

                      <div className="text-center pt-4 border-t border-gray-100">
                        <button
                          type="button"
                          onClick={() => setMode(MODES.LOGIN)}
                          className="text-gray-500 hover:text-gray-700 text-sm font-medium"
                        >
                          بازگشت به صفحه ورود
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              )}

              {step === STEPS.OTP && (
                <Formik
                  initialValues={{ otp: "" }}
                  validationSchema={otpSchema}
                  onSubmit={handleCheckOtp}
                >
                  {({ values, setFieldValue, isSubmitting }) => (
                    <Form className="space-y-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
                          کد تایید
                        </label>
                        <OTPInput
                          value={values.otp}
                          onChange={(otp) => setFieldValue("otp", otp)}
                        />
                        <ErrorMessage
                          name="otp"
                          component="p"
                          className="text-red-600 text-sm mt-2 text-center"
                        />
                      </div>

                      <div className="text-center">
                        {timer > 0 ? (
                          <p className="text-sm text-gray-500">
                            ارسال مجدد کد تا {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')} دیگر
                          </p>
                        ) : (
                          <button type="button" onClick={resendOtp} className="text-sm text-orange-500 hover:text-orange-600 font-medium">
                            ارسال مجدد کد تایید
                          </button>
                        )}
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 rounded-[10px] bg-gradient-to-r from-orange-400 to-red-400 hover:from-orange-500 hover:to-red-500 active:scale-95 text-white font-medium text-sm shadow-md transition-all"
                        disabled={isSubmitting || isCheckingOtp}
                      >
                        {isCheckingOtp ? "در حال بررسی..." : "تایید کد"}
                      </button>

                      <button
                        type="button"
                        onClick={() => setStep(STEPS.PHONE)}
                        className="w-full text-sm text-gray-500 hover:text-gray-700"
                      >
                        تغییر شماره موبایل
                      </button>
                    </Form>
                  )}
                </Formik>
              )}

              {step === STEPS.COMPLETE && (
                <Formik
                  initialValues={{ name: "", password: "", confirmPassword: "" }}
                  validationSchema={completeSchema}
                  onSubmit={handleCompleteData}
                >
                  {({ isSubmitting }) => (
                    <Form className="space-y-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">نام و نام خانوادگی</label>
                        <div className="relative flex items-center gap-3 rounded-[10px] border border-gray-300 bg-gray-50 hover:bg-white hover:border-gray-400 transition-all px-4 py-2">
                          <User size={20} color="#64748b" />
                          <Field
                            type="text"
                            name="name"
                            className="w-full bg-transparent focus:outline-none focus:ring-0 text-sm placeholder-gray-400"
                            placeholder="مثلاً: علی محمدی"
                          />
                        </div>
                        <ErrorMessage name="name" component="p" className="text-red-600 text-sm mt-1" />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">رمز عبور</label>
                        <div className="relative flex items-center gap-3 rounded-[10px] border border-gray-300 bg-gray-50 hover:bg-white hover:border-gray-400 transition-all px-4 py-2">
                          <Lock size={20} color="#64748b" />
                          <Field
                            type={showPassword ? "text" : "password"}
                            name="password"
                            className="w-full bg-transparent focus:outline-none focus:ring-0 text-sm placeholder-gray-400"
                            placeholder="••••••••"
                          />
                          <div className="absolute left-4 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <Eye size={20} color="#4a5565" /> : <EyeSlash size={20} color="#4a5565" />}
                          </div>
                        </div>
                        <ErrorMessage name="password" component="p" className="text-red-600 text-sm mt-1" />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">تکرار رمز عبور</label>
                        <div className="relative flex items-center gap-3 rounded-[10px] border border-gray-300 bg-gray-50 hover:bg-white hover:border-gray-400 transition-all px-4 py-2">
                          <Lock size={20} color="#64748b" />
                          <Field
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            className="w-full bg-transparent focus:outline-none focus:ring-0 text-sm placeholder-gray-400"
                            placeholder="••••••••"
                          />
                          <div className="absolute left-4 cursor-pointer" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                            {showConfirmPassword ? <Eye size={20} color="#4a5565" /> : <EyeSlash size={20} color="#4a5565" />}
                          </div>
                        </div>
                        <ErrorMessage name="confirmPassword" component="p" className="text-red-600 text-sm mt-1" />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 rounded-[10px] bg-gradient-to-r from-orange-400 to-red-400 hover:from-orange-500 hover:to-red-500 active:scale-95 text-white font-medium text-sm shadow-md transition-all"
                        disabled={isSubmitting || isCompletingData}
                      >
                        {isCompletingData ? "در حال ثبت..." : "تکمیل ثبت‌نام"}
                      </button>
                    </Form>
                  )}
                </Formik>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Login;
