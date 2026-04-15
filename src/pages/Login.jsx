import Layout from "../layouts/Layout";
import { Sms, Lock, Eye, EyeSlash } from "iconsax-react";
import { useState } from "react";
import useLogin from "../hooks/useLogin";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import logo from "../assets/logo/logo-login.png";


function Login() {
  const { LogIn, isLoading } = useLogin();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // مدیریت نمایش رمز عبور

  const validationSchema = Yup.object().shape({
    phone: Yup.string()
      .matches(/^09\d{9}$/, "شماره موبایل معتبر نیست")
      .required("شماره موبایل الزامی است"),
    password: Yup.string()
      .min(6, "رمز عبور باید حداقل 6 کاراکتر باشد")
      .required("رمز عبور الزامی است"),
  });

  const handleSubmit = async (values) => {
    setError("");

    try {
      await LogIn({ phone_number: values.phone, password: values.password });
      // onSuccess در useLogin مدیریت می‌شود و redirect انجام می‌شود
    } catch (error) {
      const errorMessages = error?.response?.data?.errors;

      const formattedErrors = Array.isArray(errorMessages)
        ? errorMessages
        : [errorMessages || 'ورود ناموفق بود. لطفاً دوباره تلاش کنید.'];
      setError(formattedErrors || "ورود ناموفق بود. لطفاً شماره موبایل و رمز عبور را بررسی کنید.");
    }
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-6 sm:py-12 px-3 sm:px-4 bg-gray-50">
        <div className="max-w-md w-full mx-auto bg-white rounded-2xl border border-gray-200 shadow-lg p-6 sm:p-8 md:p-10">
          <div className="text-center mb-8">
            <div className="flex justify-center items-center">

              <img src={logo} alt="اربعین تی وی" className="h-32 sm:h-38       md:h-40 w-auto" />
            </div>
            {/* <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ورود به اربعین تی وی
            </h1>
            <p className="mt-2 text-sm sm:text-base text-gray-600">
              با حساب خود وارد شوید تا ویدیوها و لیست‌هایتان را مدیریت کنید
            </p> */}
          </div>

          <Formik
            initialValues={{ phone: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-5">
                {/* شماره موبایل */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    شماره موبایل
                  </label>
                  <div className="relative flex items-center gap-3 rounded-xl border border-gray-300 bg-gray-50 hover:bg-white hover:border-gray-400 transition-all px-4 py-2">
                    <Sms size={20} color="#64748b" />
                    <Field
                      type="tel"
                      name="phone"
                      className="w-full bg-transparent focus:outline-none focus:ring-0 text-sm placeholder-gray-400"
                      placeholder="0912xxxxxxx"
                    />
                  </div>
                  <ErrorMessage
                    name="phone"
                    component="p"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>

                {/* رمز عبور */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    رمز عبور
                  </label>
                  <div className="relative flex items-center gap-3 rounded-xl border border-gray-300 bg-gray-50 hover:bg-white hover:border-gray-400 transition-all px-4 py-2">
                    <Lock size={20} color="#64748b" />
                    <Field
                      type={showPassword ? "text" : "password"}
                      name="password"
                      className="w-full bg-transparent focus:outline-none focus:ring-0 text-sm placeholder-gray-400"
                      placeholder="••••••••"
                    />
                    <div
                      className="absolute left-4 cursor-pointer"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? (
                        <Eye size={20} color="#4a5565" />
                      ) : (
                        <EyeSlash size={20} color="#4a5565" />
                      )}
                    </div>
                  </div>
                  <ErrorMessage
                    name="password"
                    component="p"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>

                {error && <p className="text-red-600 text-sm">{error}</p>}

                <button
                  type="submit"
<<<<<<< HEAD
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-400 to-red-400 hover:from-orange-500 hover:to-red-500 active:scale-95 text-white font-medium text-sm shadow-md transition-all" disabled={isSubmitting || isLoading}
=======
className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-400 to-red-400 hover:from-orange-500 hover:to-red-500 active:scale-95 text-white font-medium text-sm shadow-md transition-all"                  disabled={isSubmitting || isLoading}
>>>>>>> d0d46aa4d63b99af16f230b0b9a0bdca29f11fad
                >
                  {isLoading ? "در حال ورود..." : "ورود"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Layout>
  );
}

export default Login;
