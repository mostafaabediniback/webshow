module.exports = [
"[project]/src/assets/logo/logo-01-01.png (static in ecmascript, tag client)", ((__turbopack_context__) => {

__turbopack_context__.v("/_next/static/media/logo-01-01.0tufgn5xtz74..png" + (globalThis["NEXT_CLIENT_ASSET_SUFFIX"] || ''));}),
"[project]/src/assets/logo/logo-01-01.png.mjs { IMAGE => \"[project]/src/assets/logo/logo-01-01.png (static in ecmascript, tag client)\" } [ssr] (structured image object with data url, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$assets$2f$logo$2f$logo$2d$01$2d$01$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__ = __turbopack_context__.i("[project]/src/assets/logo/logo-01-01.png (static in ecmascript, tag client)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$assets$2f$logo$2f$logo$2d$01$2d$01$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__["default"],
    width: 387,
    height: 107,
    blurWidth: 8,
    blurHeight: 2,
    blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAACCAYAAABllJ3tAAAATUlEQVR42gFCAL3/AG5ubixwcHAoZGRkJnBwcCplZWUujoVlUsWtbYvy7uMaAAQEBFQBAQFVAAAASQAAAFEAAABOIBwNTmdeRGmUkotn2VIT6tGwkcoAAAAASUVORK5CYII="
};
}),
"[project]/src/utils/safeStorage.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "safeLocalStorage",
    ()=>safeLocalStorage,
    "safeSessionStorage",
    ()=>safeSessionStorage
]);
const isBrowser = ("TURBOPACK compile-time value", "undefined") !== 'undefined';
const safeSessionStorage = {
    get: (key)=>("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : null,
    set: (key, value)=>{
        if ("TURBOPACK compile-time truthy", 1) return null;
        //TURBOPACK unreachable
        ;
    },
    remove: (key)=>{
        if ("TURBOPACK compile-time truthy", 1) return null;
        //TURBOPACK unreachable
        ;
    }
};
const safeLocalStorage = {
    get: (key)=>("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : null,
    set: (key, value)=>{
        if ("TURBOPACK compile-time truthy", 1) return null;
        //TURBOPACK unreachable
        ;
    },
    remove: (key)=>{
        if ("TURBOPACK compile-time truthy", 1) return null;
        //TURBOPACK unreachable
        ;
    }
};
const __TURBOPACK__default__export__ = safeSessionStorage;
}),
"[project]/src/utils/axiosConfigNew.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "serverUrl",
    ()=>serverUrl
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$axios__$5b$external$5d$__$28$axios$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$axios$40$1$2e$13$2e$2$2f$node_modules$2f$axios$29$__ = __turbopack_context__.i("[externals]/axios [external] (axios, esm_import, [project]/node_modules/.pnpm/axios@1.13.2/node_modules/axios)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$toastify__$5b$external$5d$__$28$react$2d$toastify$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$toastify$40$11$2e$0$2e$5_react_44b200bfef41235b57e0bc42b6edd101$2f$node_modules$2f$react$2d$toastify$29$__ = __turbopack_context__.i("[externals]/react-toastify [external] (react-toastify, esm_import, [project]/node_modules/.pnpm/react-toastify@11.0.5_react_44b200bfef41235b57e0bc42b6edd101/node_modules/react-toastify)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$safeStorage$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/safeStorage.js [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$axios__$5b$external$5d$__$28$axios$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$axios$40$1$2e$13$2e$2$2f$node_modules$2f$axios$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$toastify__$5b$external$5d$__$28$react$2d$toastify$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$toastify$40$11$2e$0$2e$5_react_44b200bfef41235b57e0bc42b6edd101$2f$node_modules$2f$react$2d$toastify$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$axios__$5b$external$5d$__$28$axios$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$axios$40$1$2e$13$2e$2$2f$node_modules$2f$axios$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$toastify__$5b$external$5d$__$28$react$2d$toastify$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$toastify$40$11$2e$0$2e$5_react_44b200bfef41235b57e0bc42b6edd101$2f$node_modules$2f$react$2d$toastify$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
const serverUrl = ("TURBOPACK compile-time value", "http://app.arbaeentv.com/api/");
const axiosInstanceNew = __TURBOPACK__imported__module__$5b$externals$5d2f$axios__$5b$external$5d$__$28$axios$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$axios$40$1$2e$13$2e$2$2f$node_modules$2f$axios$29$__["default"].create({
    baseURL: serverUrl,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
    }
});
axiosInstanceNew.interceptors.request.use((config)=>{
    const token = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$safeStorage$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["safeSessionStorage"].get("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    // مدیریت Content-Type
    // اگر Content-Type در config مشخص شده باشد (مثل multipart/form-data)، آن را حفظ می‌کنیم
    if (!config.headers["Content-Type"]) {
        // اگر Content-Type مشخص نشده، پیش‌فرض application/json را استفاده می‌کنیم
        config.headers["Content-Type"] = "application/json";
    }
    // مدیریت Accept - همیشه application/json است
    if (!config.headers.Accept) {
        config.headers.Accept = "application/json";
    }
    return config;
}, (error)=>Promise.reject(error));
axiosInstanceNew.interceptors.response.use((response)=>response, (error)=>{
    const status = error.response?.status;
    const data = error.response?.data;
    if (data?.errors && typeof data.errors === "object") {
        Object.keys(data.errors).forEach((field)=>{
            const msgs = Array.isArray(data.errors[field]) ? data.errors[field] : [
                String(data.errors[field])
            ];
            msgs.forEach((msg)=>__TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$toastify__$5b$external$5d$__$28$react$2d$toastify$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$toastify$40$11$2e$0$2e$5_react_44b200bfef41235b57e0bc42b6edd101$2f$node_modules$2f$react$2d$toastify$29$__["toast"].error(msg, {
                    position: "top-right",
                    theme: "colored"
                }));
        });
    } else if (data?.message) {
        __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$toastify__$5b$external$5d$__$28$react$2d$toastify$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$toastify$40$11$2e$0$2e$5_react_44b200bfef41235b57e0bc42b6edd101$2f$node_modules$2f$react$2d$toastify$29$__["toast"].error(String(data.message), {
            position: "top-right",
            theme: "colored"
        });
    }
    if (status === 401 || status === 403) {
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
    }
    return Promise.reject(error);
});
const __TURBOPACK__default__export__ = axiosInstanceNew;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/services/signInApi.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "signIn",
    ()=>signIn,
    "signOut",
    ()=>signOut
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$axiosConfigNew$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/axiosConfigNew.js [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$axiosConfigNew$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$axiosConfigNew$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
const signIn = async (data)=>{
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$axiosConfigNew$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].post("/auth/login", data);
    return response.data;
};
const signOut = async ()=>{
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$axiosConfigNew$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].post("/auth/logout");
    return response.data;
};
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/hooks/useLogin.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$tanstack$2f$react$2d$query__$5b$external$5d$__$2840$tanstack$2f$react$2d$query$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$90$2e$10_react$40$19$2e$2$2e$0$2f$node_modules$2f40$tanstack$2f$react$2d$query$29$__ = __turbopack_context__.i("[externals]/@tanstack/react-query [external] (@tanstack/react-query, esm_import, [project]/node_modules/.pnpm/@tanstack+react-query@5.90.10_react@19.2.0/node_modules/@tanstack/react-query)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$toastify__$5b$external$5d$__$28$react$2d$toastify$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$toastify$40$11$2e$0$2e$5_react_44b200bfef41235b57e0bc42b6edd101$2f$node_modules$2f$react$2d$toastify$29$__ = __turbopack_context__.i("[externals]/react-toastify [external] (react-toastify, esm_import, [project]/node_modules/.pnpm/react-toastify@11.0.5_react_44b200bfef41235b57e0bc42b6edd101/node_modules/react-toastify)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$signInApi$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/signInApi.js [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f40$tanstack$2f$react$2d$query__$5b$external$5d$__$2840$tanstack$2f$react$2d$query$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$90$2e$10_react$40$19$2e$2$2e$0$2f$node_modules$2f40$tanstack$2f$react$2d$query$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$toastify__$5b$external$5d$__$28$react$2d$toastify$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$toastify$40$11$2e$0$2e$5_react_44b200bfef41235b57e0bc42b6edd101$2f$node_modules$2f$react$2d$toastify$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$signInApi$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f40$tanstack$2f$react$2d$query__$5b$external$5d$__$2840$tanstack$2f$react$2d$query$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$90$2e$10_react$40$19$2e$2$2e$0$2f$node_modules$2f40$tanstack$2f$react$2d$query$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$toastify__$5b$external$5d$__$28$react$2d$toastify$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$toastify$40$11$2e$0$2e$5_react_44b200bfef41235b57e0bc42b6edd101$2f$node_modules$2f$react$2d$toastify$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$signInApi$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
const useLogin = ()=>{
    const [verifyPhoneNumber, setVerifyPhoneNumber] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [codeOtp, setcodeOtp] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [phoneNumber, setPhoneNumber] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])("");
    // [02] - Post logout hook
    const logOut = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$tanstack$2f$react$2d$query__$5b$external$5d$__$2840$tanstack$2f$react$2d$query$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$90$2e$10_react$40$19$2e$2$2e$0$2f$node_modules$2f40$tanstack$2f$react$2d$query$29$__["useMutation"])({
        mutationFn: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$signInApi$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["signOut"],
        onSuccess: (res)=>{
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("user_id");
            sessionStorage.removeItem("role");
            sessionStorage.removeItem("channel_id");
            const message = res?.message || "با موفقیت از حساب کاربری خارج شدید";
            __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$toastify__$5b$external$5d$__$28$react$2d$toastify$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$toastify$40$11$2e$0$2e$5_react_44b200bfef41235b57e0bc42b6edd101$2f$node_modules$2f$react$2d$toastify$29$__["toast"].success(message, {
                position: "top-right",
                theme: "colored"
            });
            window.location.href = "/login";
        },
        onError: (error)=>{
            console.error("Logout error:", error);
            // حتی در صورت خطا، token را پاک می‌کنیم
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("user_id");
            sessionStorage.removeItem("role");
            sessionStorage.removeItem("channel_id");
            __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$toastify__$5b$external$5d$__$28$react$2d$toastify$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$toastify$40$11$2e$0$2e$5_react_44b200bfef41235b57e0bc42b6edd101$2f$node_modules$2f$react$2d$toastify$29$__["toast"].error("خطا در خروج از حساب کاربری", {
                position: "top-right",
                theme: "colored"
            });
            window.location.href = "/login";
        }
    });
    const goSigIn = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$tanstack$2f$react$2d$query__$5b$external$5d$__$2840$tanstack$2f$react$2d$query$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$90$2e$10_react$40$19$2e$2$2e$0$2f$node_modules$2f40$tanstack$2f$react$2d$query$29$__["useMutation"])({
        mutationFn: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$signInApi$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["signIn"],
        onSuccess: (res)=>{
            // ساختار پاسخ API: { status: "success", data: { token: "...", user: {...} } }
            const token = res?.data?.token || null;
            const user = res?.data?.user || null;
            if (token) {
                sessionStorage.setItem("token", token);
                if (user?.id) {
                    sessionStorage.setItem("user_id", user.id.toString());
                }
                const role = user?.role || user?.role || (Array.isArray(user?.role) ? user.role[0]?.name || user.role[0] : null);
                const roleName = role ? String(role).toLowerCase() : "";
                if (roleName) {
                    sessionStorage.setItem("role", roleName);
                }
                const channelId = user?.channel_id || user?.channel?.id;
                if (channelId) {
                    sessionStorage.setItem("channel_id", String(channelId));
                }
                __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$toastify__$5b$external$5d$__$28$react$2d$toastify$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$toastify$40$11$2e$0$2e$5_react_44b200bfef41235b57e0bc42b6edd101$2f$node_modules$2f$react$2d$toastify$29$__["toast"].success("ورود با موفقیت انجام شد", {
                    position: "top-right",
                    theme: "colored"
                });
                window.location.href = roleName === "admin" ? "/dashboard/user-videos" : "/dashboard/channels";
            } else {
                setVerifyPhoneNumber(false);
                setcodeOtp(false);
                __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$toastify__$5b$external$5d$__$28$react$2d$toastify$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$toastify$40$11$2e$0$2e$5_react_44b200bfef41235b57e0bc42b6edd101$2f$node_modules$2f$react$2d$toastify$29$__["toast"].error("خطا در دریافت اطلاعات کاربر", {
                    position: "top-right",
                    theme: "colored"
                });
            }
            if (user?.phone_number) {
                setPhoneNumber(user.phone_number);
            }
        },
        onError: (error)=>{
            console.error("Login error:", error);
            setVerifyPhoneNumber(false);
            setcodeOtp(false);
            // خطاها توسط axios interceptor مدیریت می‌شوند، اما اگر خطای خاصی بود اینجا هم نمایش می‌دهیم
            const errorMessage = error?.response?.data?.message || "ورود ناموفق بود. لطفاً دوباره تلاش کنید.";
            __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$toastify__$5b$external$5d$__$28$react$2d$toastify$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$toastify$40$11$2e$0$2e$5_react_44b200bfef41235b57e0bc42b6edd101$2f$node_modules$2f$react$2d$toastify$29$__["toast"].error(errorMessage, {
                position: "top-right",
                theme: "colored"
            });
        }
    });
    return {
        LogOut: logOut.mutateAsync,
        LogIn: goSigIn.mutateAsync,
        isLoading: goSigIn.isPending,
        isLoggingOut: logOut.isPending,
        verifyPhoneNumber,
        codeOtp,
        setcodeOtp,
        phoneNumber
    };
};
const __TURBOPACK__default__export__ = useLogin;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/react-dom [external] (react-dom, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("react-dom", () => require("react-dom"));

module.exports = mod;
}),
"[project]/src/services/videoApi.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "deleteVideo",
    ()=>deleteVideo,
    "getAllVideos",
    ()=>getAllVideos,
    "getLandingChannels",
    ()=>getLandingChannels,
    "getLandingVideos",
    ()=>getLandingVideos,
    "getSearch",
    ()=>getSearch,
    "getVideoDetail",
    ()=>getVideoDetail,
    "getVideosByChannel",
    ()=>getVideosByChannel,
    "storeVideo",
    ()=>storeVideo,
    "updateVideo",
    ()=>updateVideo,
    "uploadVideo",
    ()=>uploadVideo
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$axiosConfigNew$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/axiosConfigNew.js [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$axiosConfigNew$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$axiosConfigNew$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
// کمک برای صفحه‌بندی
const mapPaginatedResponse = (data)=>{
    const items = Array.isArray(data?.data) ? data.data : Array.isArray(data?.data?.data) ? data.data.data : [];
    const totalPages = Number(data?.last_page || data?.meta?.last_page || data?.pagination?.last_page || 1) || 1;
    const totalItems = Number(data?.total || data?.meta?.total || items.length) || items.length;
    return {
        items,
        totalPages,
        totalItems
    };
};
const uploadVideo = async (file)=>{
    const fd = new FormData();
    fd.append("file", file);
    const res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$axiosConfigNew$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].post("/video/upload", fd, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
    return res.data;
};
const storeVideo = async (channelId, { path, title, description, cover })=>{
    const fd = new FormData();
    fd.append("path", path);
    fd.append("title", title);
    fd.append("description", description || "");
    if (cover) fd.append("cover", cover);
    const url = channelId ? `/video/store-video/${channelId}` : "/video/store-video";
    const res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$axiosConfigNew$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].post(url, fd, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
    return res.data;
};
const getVideosByChannel = async (channelId, page = 1, per_page = 25)=>{
    const res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$axiosConfigNew$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].get(`/video/${channelId}`, {
        params: {
            page,
            per_page
        }
    });
    return mapPaginatedResponse(res.data);
};
const getVideoDetail = async (id)=>{
    const res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$axiosConfigNew$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].get(`/video/show/${id}`);
    return res.data;
};
const getAllVideos = async (page = 1, per_page = 25)=>{
    const res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$axiosConfigNew$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].get("/video", {
        params: {
            page,
            per_page
        }
    });
    return mapPaginatedResponse(res.data);
};
const getLandingChannels = async ({ pageNumber = 1, pageSize = 10 } = {})=>{
    const page = Number(pageNumber) || 1;
    const perPage = Number(pageSize) || 10;
    const params = new URLSearchParams({
        page: page.toString(),
        per_page: perPage.toString()
    });
    const queryString = params.toString();
    const res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$axiosConfigNew$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].get(`/landing/channels?${queryString}`);
    return mapPaginatedResponse(res.data);
};
const getLandingVideos = async ({ channelId, pageNumber = 1, pageSize = 25 } = {})=>{
    const params = new URLSearchParams({
        page: pageNumber,
        per_page: pageSize
    });
    if (channelId) {
        params.append('channel_id', channelId);
    }
    const url = `/landing/videos?${params}`;
    const res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$axiosConfigNew$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].get(url);
    // استفاده از mapPaginatedResponse موجود
    return mapPaginatedResponse(res.data);
};
const getSearch = async (q)=>{
    const res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$axiosConfigNew$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].get(`/search/${encodeURIComponent(q)}`);
    return res.data;
};
const deleteVideo = async (id)=>{
    const res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$axiosConfigNew$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].delete(`/video/delete/${id}`);
    return res.data;
};
const updateVideo = async (videoId, { title, description, coverFile })=>{
    const fd = new FormData();
    fd.append("title", title || "");
    fd.append("description", description || "");
    if (coverFile) {
        fd.append("cover", coverFile);
    }
    const res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$axiosConfigNew$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].post(`/video/update-video/${videoId}`, fd, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
    return res.data;
};
const __TURBOPACK__default__export__ = {
    uploadVideo,
    storeVideo,
    getVideosByChannel,
    getVideoDetail,
    getAllVideos,
    // getLanding,
    getSearch,
    deleteVideo,
    updateVideo,
    getLandingVideos,
    getLandingChannels
};
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/assets/img/cover.jpg (static in ecmascript, tag client)", ((__turbopack_context__) => {

__turbopack_context__.v("/_next/static/media/cover.0j7m_iz7_ln1h.jpg" + (globalThis["NEXT_CLIENT_ASSET_SUFFIX"] || ''));}),
"[project]/src/assets/img/cover.jpg.mjs { IMAGE => \"[project]/src/assets/img/cover.jpg (static in ecmascript, tag client)\" } [ssr] (structured image object with data url, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$assets$2f$img$2f$cover$2e$jpg__$28$static__in__ecmascript$2c$__tag__client$29$__ = __turbopack_context__.i("[project]/src/assets/img/cover.jpg (static in ecmascript, tag client)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$assets$2f$img$2f$cover$2e$jpg__$28$static__in__ecmascript$2c$__tag__client$29$__["default"],
    width: 1328,
    height: 744,
    blurWidth: 8,
    blurHeight: 4,
    blurDataURL: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAAQABAAD/wAARCAAEAAgDAREAAhEBAxEB/9sAQwAKBwcIBwYKCAgICwoKCw4YEA4NDQ4dFRYRGCMfJSQiHyIhJis3LyYpNCkhIjBBMTQ5Oz4+PiUuRElDPEg3PT47/9sAQwEKCwsODQ4cEBAcOygiKDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD0Q3Uv2vzs8gbcZOMZ9PWt+VbHN7R3uf/Z"
};
}),
"[project]/src/components/SearchInput.jsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$1_$40$babel$2b$core$40$7$2e$2_002c6875e2cc4925b70c9aa5d4dde4bf$2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.1_@babel+core@7.2_002c6875e2cc4925b70c9aa5d4dde4bf/node_modules/next/router.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$iconsax$2d$react__$5b$external$5d$__$28$iconsax$2d$react$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$iconsax$2d$react$40$0$2e$0$2e$8_react$40$19$2e$2$2e$0$2f$node_modules$2f$iconsax$2d$react$29$__ = __turbopack_context__.i("[externals]/iconsax-react [external] (iconsax-react, cjs, [project]/node_modules/.pnpm/iconsax-react@0.0.8_react@19.2.0/node_modules/iconsax-react)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$tanstack$2f$react$2d$query__$5b$external$5d$__$2840$tanstack$2f$react$2d$query$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$90$2e$10_react$40$19$2e$2$2e$0$2f$node_modules$2f40$tanstack$2f$react$2d$query$29$__ = __turbopack_context__.i("[externals]/@tanstack/react-query [external] (@tanstack/react-query, esm_import, [project]/node_modules/.pnpm/@tanstack+react-query@5.90.10_react@19.2.0/node_modules/@tanstack/react-query)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$videoApi$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/videoApi.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$assets$2f$img$2f$cover$2e$jpg$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$src$2f$assets$2f$img$2f$cover$2e$jpg__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$ssr$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/src/assets/img/cover.jpg.mjs { IMAGE => "[project]/src/assets/img/cover.jpg (static in ecmascript, tag client)" } [ssr] (structured image object with data url, ecmascript)');
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f40$tanstack$2f$react$2d$query__$5b$external$5d$__$2840$tanstack$2f$react$2d$query$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$90$2e$10_react$40$19$2e$2$2e$0$2f$node_modules$2f40$tanstack$2f$react$2d$query$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$videoApi$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f40$tanstack$2f$react$2d$query__$5b$external$5d$__$2840$tanstack$2f$react$2d$query$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$90$2e$10_react$40$19$2e$2$2e$0$2f$node_modules$2f40$tanstack$2f$react$2d$query$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$videoApi$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
;
function SearchInput() {
    const [q, setQ] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [debouncedQ, setDebouncedQ] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$1_$40$babel$2b$core$40$7$2e$2_002c6875e2cc4925b70c9aa5d4dde4bf$2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const pathname = router.asPath;
    const onSubmit = (e)=>{
        e.preventDefault();
        if (!q.trim()) return;
        router.push(`/search/${encodeURIComponent(q.trim())}`);
    };
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const t = setTimeout(()=>setDebouncedQ(q.trim()), 300);
        return ()=>clearTimeout(t);
    }, [
        q
    ]);
    const { data: searchData } = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$tanstack$2f$react$2d$query__$5b$external$5d$__$2840$tanstack$2f$react$2d$query$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$90$2e$10_react$40$19$2e$2$2e$0$2f$node_modules$2f40$tanstack$2f$react$2d$query$29$__["useQuery"])({
        queryKey: [
            'search-inline',
            debouncedQ
        ],
        queryFn: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$videoApi$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["getSearch"])(debouncedQ),
        enabled: debouncedQ.length >= 2
    });
    const inlineVideos = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useMemo"])(()=>{
        const payload = searchData?.data;
        if (!payload) return [];
        if (Array.isArray(payload)) return payload;
        if (payload.videos) {
            if (Array.isArray(payload.videos)) {
                const sample = payload.videos[0];
                if (sample && Array.isArray(sample.videos)) {
                    return payload.videos.flatMap((v)=>Array.isArray(v.videos) ? v.videos.flat() : []);
                }
                return payload.videos;
            }
        }
        return [];
    }, [
        searchData
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("form", {
        onSubmit: onSubmit,
        className: "flex-1 max-w-xl",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: "relative group",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                    value: q,
                    onChange: (e)=>setQ(e.target.value),
                    onKeyDown: (e)=>{
                        if (e.key === 'Escape') {
                            setQ('');
                            if (pathname.startsWith('/search')) router.push('/');
                        }
                    },
                    placeholder: "جستجو در ویدیوها",
                    className: "w-full h-11 rounded-full border border-gray-300 bg-gray-50 hover:bg-white hover:border-gray-400 px-4 pr-12 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white text-sm placeholder:text-gray-400"
                }, void 0, false, {
                    fileName: "[project]/src/components/SearchInput.jsx",
                    lineNumber: 50,
                    columnNumber: 9
                }, this),
                q && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                    type: "button",
                    onClick: ()=>{
                        setQ('');
                        if (pathname.startsWith('/search')) router.push('/');
                    },
                    className: "absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-gray-200 active:bg-gray-300 transition-colors",
                    "aria-label": "حذف جستجو",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$iconsax$2d$react__$5b$external$5d$__$28$iconsax$2d$react$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$iconsax$2d$react$40$0$2e$0$2e$8_react$40$19$2e$2$2e$0$2f$node_modules$2f$iconsax$2d$react$29$__["CloseCircle"], {
                        size: 18,
                        color: "#64748b",
                        className: "group-focus-within:text-blue-500"
                    }, void 0, false, {
                        fileName: "[project]/src/components/SearchInput.jsx",
                        lineNumber: 72,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/SearchInput.jsx",
                    lineNumber: 63,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                    type: "submit",
                    className: "absolute left-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-gray-200 active:bg-gray-300 transition-colors",
                    "aria-label": "جستجو",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$iconsax$2d$react__$5b$external$5d$__$28$iconsax$2d$react$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$iconsax$2d$react$40$0$2e$0$2e$8_react$40$19$2e$2$2e$0$2f$node_modules$2f$iconsax$2d$react$29$__["SearchNormal1"], {
                        size: 18,
                        color: "#64748b",
                        className: "group-focus-within:text-blue-500"
                    }, void 0, false, {
                        fileName: "[project]/src/components/SearchInput.jsx",
                        lineNumber: 80,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/SearchInput.jsx",
                    lineNumber: 75,
                    columnNumber: 9
                }, this),
                inlineVideos.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "absolute z-50 mt-2 left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "px-4 py-2 text-xs font-medium text-gray-600 border-b border-gray-100",
                            children: "نتایج جستجو"
                        }, void 0, false, {
                            fileName: "[project]/src/components/SearchInput.jsx",
                            lineNumber: 84,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("ul", {
                            className: "max-h-64 overflow-auto",
                            children: [
                                inlineVideos.slice(0, 8).map((v)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>router.push(`/v/${v.id}`),
                                            className: "w-full text-right px-4 py-3 hover:bg-gray-50 flex items-center gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                                    src: (()=>{
                                                        const raw = v.cover_link || v.cover;
                                                        return typeof raw === 'string' ? raw.replace(/[`'"]/g, '').trim() || __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$assets$2f$img$2f$cover$2e$jpg$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$src$2f$assets$2f$img$2f$cover$2e$jpg__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$ssr$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__["default"] : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$assets$2f$img$2f$cover$2e$jpg$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$src$2f$assets$2f$img$2f$cover$2e$jpg__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$ssr$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__["default"];
                                                    })(),
                                                    alt: v.title,
                                                    className: "w-12 h-7 rounded object-cover bg-gray-200",
                                                    onError: (e)=>{
                                                        e.target.src = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$assets$2f$img$2f$cover$2e$jpg$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$src$2f$assets$2f$img$2f$cover$2e$jpg__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$ssr$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__["default"];
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/SearchInput.jsx",
                                                    lineNumber: 95,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    className: "flex-1 min-w-0",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                            className: "text-sm font-medium text-gray-900 truncate",
                                                            children: v.title
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/SearchInput.jsx",
                                                            lineNumber: 105,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                            className: "text-xs text-gray-600 truncate",
                                                            children: v.channel_name
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/SearchInput.jsx",
                                                            lineNumber: 106,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/SearchInput.jsx",
                                                    lineNumber: 104,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/SearchInput.jsx",
                                            lineNumber: 90,
                                            columnNumber: 19
                                        }, this)
                                    }, v.id, false, {
                                        fileName: "[project]/src/components/SearchInput.jsx",
                                        lineNumber: 89,
                                        columnNumber: 17
                                    }, this)),
                                inlineVideos.length > 8 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>router.push(`/search/${encodeURIComponent(q.trim())}`),
                                        className: "w-full text-right px-4 py-3 bg-gray-50 hover:bg-gray-100 text-sm text-blue-700",
                                        children: "مشاهده همه نتایج"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/SearchInput.jsx",
                                        lineNumber: 113,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/SearchInput.jsx",
                                    lineNumber: 112,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/SearchInput.jsx",
                            lineNumber: 87,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/SearchInput.jsx",
                    lineNumber: 83,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/SearchInput.jsx",
            lineNumber: 49,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/SearchInput.jsx",
        lineNumber: 48,
        columnNumber: 5
    }, this);
}
const __TURBOPACK__default__export__ = SearchInput;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/components/Navbar.jsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$iconsax$2d$react__$5b$external$5d$__$28$iconsax$2d$react$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$iconsax$2d$react$40$0$2e$0$2e$8_react$40$19$2e$2$2e$0$2f$node_modules$2f$iconsax$2d$react$29$__ = __turbopack_context__.i("[externals]/iconsax-react [external] (iconsax-react, cjs, [project]/node_modules/.pnpm/iconsax-react@0.0.8_react@19.2.0/node_modules/iconsax-react)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$1_$40$babel$2b$core$40$7$2e$2_002c6875e2cc4925b70c9aa5d4dde4bf$2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.1_@babel+core@7.2_002c6875e2cc4925b70c9aa5d4dde4bf/node_modules/next/link.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$assets$2f$logo$2f$logo$2d$01$2d$01$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$src$2f$assets$2f$logo$2f$logo$2d$01$2d$01$2e$png__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$ssr$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/src/assets/logo/logo-01-01.png.mjs { IMAGE => "[project]/src/assets/logo/logo-01-01.png (static in ecmascript, tag client)" } [ssr] (structured image object with data url, ecmascript)');
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useLogin$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useLogin.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SearchInput$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/SearchInput.jsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$safeStorage$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/safeStorage.js [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useLogin$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SearchInput$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useLogin$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SearchInput$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
;
;
function Navbar() {
    const [isSidebarOpen, setIsSidebarOpen] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [isSearchOpen, setIsSearchOpen] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const { LogOut, isLoggingOut } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useLogin$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"])();
    const [isAuthenticated, setIsAuthenticated] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    // بررسی وضعیت لاگین
    const closeSidebar = ()=>setIsSidebarOpen(false);
    const toggleSidebar = ()=>setIsSidebarOpen(!isSidebarOpen);
    const toggleSearch = ()=>setIsSearchOpen(!isSearchOpen);
    const handleLogout = async ()=>{
        try {
            await LogOut();
            setIsAuthenticated(false);
            closeSidebar();
        } catch (error) {
        // خطا در useLogin مدیریت می‌شود
        }
    };
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        setIsAuthenticated(!!__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$safeStorage$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["safeSessionStorage"].get("token"));
    }, []);
    // Prevent body scroll when sidebar is open
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (isSidebarOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return ()=>{
            document.body.style.overflow = "";
        };
    }, [
        isSidebarOpen
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("header", {
                className: "sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "max-w-7xl w-full mx-auto flex justify-center items-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "w-full justify-between px-3 sm:px-4 md:px-6 py-2.5 md:py-3 flex items-center gap-2 sm:gap-3 md:gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                    onClick: toggleSidebar,
                                    className: "md:hidden p-2 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors text-slate-900 touch-manipulation",
                                    "aria-label": "منو",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$iconsax$2d$react__$5b$external$5d$__$28$iconsax$2d$react$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$iconsax$2d$react$40$0$2e$0$2e$8_react$40$19$2e$2$2e$0$2f$node_modules$2f$iconsax$2d$react$29$__["Menu"], {
                                        size: 20,
                                        color: "#0f172a"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Navbar.jsx",
                                        lineNumber: 63,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Navbar.jsx",
                                    lineNumber: 58,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$1_$40$babel$2b$core$40$7$2e$2_002c6875e2cc4925b70c9aa5d4dde4bf$2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/",
                                    onClick: closeSidebar,
                                    className: "flex items-center gap-2",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                        src: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$assets$2f$logo$2f$logo$2d$01$2d$01$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$src$2f$assets$2f$logo$2f$logo$2d$01$2d$01$2e$png__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$ssr$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__["default"],
                                        alt: "اربعین تی وی",
                                        className: "h-8 sm:h-9 md:h-10 w-auto"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Navbar.jsx",
                                        lineNumber: 70,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Navbar.jsx",
                                    lineNumber: 65,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "hidden md:block flex-1 max-w-2xl mx-8",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SearchInput$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                        fileName: "[project]/src/components/Navbar.jsx",
                                        lineNumber: 73,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Navbar.jsx",
                                    lineNumber: 72,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                    onClick: toggleSearch,
                                    className: "md:hidden p-2 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors  text-slate-900 touch-manipulation",
                                    "aria-label": "جستجو",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$iconsax$2d$react__$5b$external$5d$__$28$iconsax$2d$react$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$iconsax$2d$react$40$0$2e$0$2e$8_react$40$19$2e$2$2e$0$2f$node_modules$2f$iconsax$2d$react$29$__["SearchNormal1"], {
                                        size: 20,
                                        color: "#0f172a"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Navbar.jsx",
                                        lineNumber: 80,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Navbar.jsx",
                                    lineNumber: 75,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "hidden md:flex items-center gap-3 ",
                                    children: isAuthenticated ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$1_$40$babel$2b$core$40$7$2e$2_002c6875e2cc4925b70c9aa5d4dde4bf$2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/dashboard",
                                                className: "h-10 px-4 rounded-full border border-gray-300 bg-white hover:bg-gray-50 active:bg-gray-100 text-sm font-medium flex items-center gap-2 text-slate-900 transition-colors shadow-sm hover:shadow",
                                                children: "مدیریت کانال‌ها"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Navbar.jsx",
                                                lineNumber: 98,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                onClick: handleLogout,
                                                disabled: isLoggingOut,
                                                className: "h-10 px-4 rounded-full border border-red-300 bg-white hover:bg-red-50 active:bg-red-100 text-sm font-medium flex items-center gap-2 text-red-600 transition-colors shadow-sm hover:shadow disabled:opacity-50 disabled:cursor-not-allowed",
                                                title: "خروج از حساب کاربری",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$iconsax$2d$react__$5b$external$5d$__$28$iconsax$2d$react$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$iconsax$2d$react$40$0$2e$0$2e$8_react$40$19$2e$2$2e$0$2f$node_modules$2f$iconsax$2d$react$29$__["Logout"], {
                                                        size: 18,
                                                        color: "#dc2626"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/Navbar.jsx",
                                                        lineNumber: 110,
                                                        columnNumber: 21
                                                    }, this),
                                                    isLoggingOut ? "در حال خروج..." : "خروج"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/Navbar.jsx",
                                                lineNumber: 104,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$1_$40$babel$2b$core$40$7$2e$2_002c6875e2cc4925b70c9aa5d4dde4bf$2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/login",
                                        className: "h-10 px-4 rounded-full border border-gray-300 bg-white hover:bg-gray-50 active:bg-gray-100 text-sm font-medium flex items-center gap-2 text-slate-900 transition-colors shadow-sm hover:shadow",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$iconsax$2d$react__$5b$external$5d$__$28$iconsax$2d$react$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$iconsax$2d$react$40$0$2e$0$2e$8_react$40$19$2e$2$2e$0$2f$node_modules$2f$iconsax$2d$react$29$__["User"], {
                                                size: 18,
                                                color: "#0f172a"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Navbar.jsx",
                                                lineNumber: 119,
                                                columnNumber: 19
                                            }, this),
                                            "ورود"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Navbar.jsx",
                                        lineNumber: 115,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Navbar.jsx",
                                    lineNumber: 82,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/Navbar.jsx",
                            lineNumber: 57,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/Navbar.jsx",
                        lineNumber: 56,
                        columnNumber: 9
                    }, this),
                    isSearchOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "md:hidden px-3 sm:px-4 pb-3",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SearchInput$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                            fileName: "[project]/src/components/Navbar.jsx",
                            lineNumber: 130,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/Navbar.jsx",
                        lineNumber: 129,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Navbar.jsx",
                lineNumber: 55,
                columnNumber: 7
            }, this),
            isSidebarOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 bg-black/50 z-40 md:hidden animate-in fade-in duration-300",
                onClick: closeSidebar
            }, void 0, false, {
                fileName: "[project]/src/components/Navbar.jsx",
                lineNumber: 137,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("aside", {
                className: `fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "flex flex-col h-full",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between p-4 border-b border-gray-200",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                    className: "text-xl font-extrabold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent",
                                    children: "منو"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Navbar.jsx",
                                    lineNumber: 151,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                    onClick: closeSidebar,
                                    className: "p-2 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors touch-manipulation",
                                    "aria-label": "بستن منو",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$iconsax$2d$react__$5b$external$5d$__$28$iconsax$2d$react$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$iconsax$2d$react$40$0$2e$0$2e$8_react$40$19$2e$2$2e$0$2f$node_modules$2f$iconsax$2d$react$29$__["CloseCircle"], {
                                        size: 24,
                                        color: "#0f172a"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Navbar.jsx",
                                        lineNumber: 159,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Navbar.jsx",
                                    lineNumber: 154,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/Navbar.jsx",
                            lineNumber: 150,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "flex-1 overflow-y-auto",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("nav", {
                                    className: "p-4 space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$1_$40$babel$2b$core$40$7$2e$2_002c6875e2cc4925b70c9aa5d4dde4bf$2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/",
                                            onClick: closeSidebar,
                                            className: "flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors text-gray-900 font-medium",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                children: "خانه"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Navbar.jsx",
                                                lineNumber: 171,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Navbar.jsx",
                                            lineNumber: 166,
                                            columnNumber: 15
                                        }, this),
                                        isAuthenticated && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$1_$40$babel$2b$core$40$7$2e$2_002c6875e2cc4925b70c9aa5d4dde4bf$2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/dashboard/channels",
                                            onClick: closeSidebar,
                                            className: "flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors text-gray-900 font-medium",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                children: "مدیریت کانال‌ها"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Navbar.jsx",
                                                lineNumber: 193,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Navbar.jsx",
                                            lineNumber: 188,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/Navbar.jsx",
                                    lineNumber: 165,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "border-t border-gray-200 p-4 space-y-2"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Navbar.jsx",
                                    lineNumber: 212,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/Navbar.jsx",
                            lineNumber: 164,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "border-t border-gray-200 p-4",
                            children: isAuthenticated ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                onClick: handleLogout,
                                disabled: isLoggingOut,
                                className: "w-full h-12 rounded-lg bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 active:scale-[0.98] text-white font-medium flex items-center justify-center gap-2 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$iconsax$2d$react__$5b$external$5d$__$28$iconsax$2d$react$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$iconsax$2d$react$40$0$2e$0$2e$8_react$40$19$2e$2$2e$0$2f$node_modules$2f$iconsax$2d$react$29$__["Logout"], {
                                        size: 20,
                                        color: "#ffffff"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Navbar.jsx",
                                        lineNumber: 233,
                                        columnNumber: 17
                                    }, this),
                                    isLoggingOut ? "در حال خروج..." : "خروج از حساب کاربری"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Navbar.jsx",
                                lineNumber: 228,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$1_$40$babel$2b$core$40$7$2e$2_002c6875e2cc4925b70c9aa5d4dde4bf$2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: "/login",
                                onClick: closeSidebar,
                                className: "w-full h-12 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 hover:from-blue-700 hover:to-purple-700 active:scale-[0.98] text-white font-medium flex items-center justify-center gap-2 transition-all duration-200 shadow-lg",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$iconsax$2d$react__$5b$external$5d$__$28$iconsax$2d$react$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$iconsax$2d$react$40$0$2e$0$2e$8_react$40$19$2e$2$2e$0$2f$node_modules$2f$iconsax$2d$react$29$__["User"], {
                                        size: 20,
                                        color: "#ffffff"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Navbar.jsx",
                                        lineNumber: 242,
                                        columnNumber: 17
                                    }, this),
                                    "ورود به حساب کاربری"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Navbar.jsx",
                                lineNumber: 237,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/Navbar.jsx",
                            lineNumber: 226,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/Navbar.jsx",
                    lineNumber: 148,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/Navbar.jsx",
                lineNumber: 144,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
const __TURBOPACK__default__export__ = Navbar;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/components/Footer.jsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$1_$40$babel$2b$core$40$7$2e$2_002c6875e2cc4925b70c9aa5d4dde4bf$2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.1_@babel+core@7.2_002c6875e2cc4925b70c9aa5d4dde4bf/node_modules/next/link.js [ssr] (ecmascript)");
;
;
function Footer() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("footer", {
        className: "mt-12 sm:mt-16 border-t border-gray-200 bg-white",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: "mx-auto max-w-7xl px-4 sm:px-6 py-6 sm:py-8",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "pt-4 sm:pt-6 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                        className: "text-xs sm:text-sm text-gray-600 text-center sm:text-left",
                        children: [
                            "© ",
                            new Date().getFullYear(),
                            " اربعین تی وی. تمامی حقوق محفوظ است."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Footer.jsx",
                        lineNumber: 42,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "flex gap-4 sm:gap-6 text-xs sm:text-sm text-gray-600",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$1_$40$babel$2b$core$40$7$2e$2_002c6875e2cc4925b70c9aa5d4dde4bf$2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: "/",
                                className: "hover:text-blue-600 transition-colors",
                                children: "حریم خصوصی"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Footer.jsx",
                                lineNumber: 46,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$1_$40$babel$2b$core$40$7$2e$2_002c6875e2cc4925b70c9aa5d4dde4bf$2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: "/",
                                className: "hover:text-blue-600 transition-colors",
                                children: "شرایط استفاده"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Footer.jsx",
                                lineNumber: 47,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Footer.jsx",
                        lineNumber: 45,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Footer.jsx",
                lineNumber: 41,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/Footer.jsx",
            lineNumber: 6,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/Footer.jsx",
        lineNumber: 5,
        columnNumber: 5
    }, this);
}
const __TURBOPACK__default__export__ = Footer;
}),
"[project]/src/layouts/Layout.jsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Navbar$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Navbar.jsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Footer$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Footer.jsx [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Navbar$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Navbar$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
function Layout({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-slate-50 text-slate-900 flex flex-col",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Navbar$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/src/layouts/Layout.jsx",
                lineNumber: 7,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("main", {
                className: "flex-1 w-full",
                children: children
            }, void 0, false, {
                fileName: "[project]/src/layouts/Layout.jsx",
                lineNumber: 8,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Footer$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/src/layouts/Layout.jsx",
                lineNumber: 11,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/layouts/Layout.jsx",
        lineNumber: 6,
        columnNumber: 5
    }, this);
}
const __TURBOPACK__default__export__ = Layout;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/assets/logo/logo-login.png (static in ecmascript, tag client)", ((__turbopack_context__) => {

__turbopack_context__.v("/_next/static/media/logo-login.01kz8.6y7mh7_.png" + (globalThis["NEXT_CLIENT_ASSET_SUFFIX"] || ''));}),
"[project]/src/assets/logo/logo-login.png.mjs { IMAGE => \"[project]/src/assets/logo/logo-login.png (static in ecmascript, tag client)\" } [ssr] (structured image object with data url, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$assets$2f$logo$2f$logo$2d$login$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__ = __turbopack_context__.i("[project]/src/assets/logo/logo-login.png (static in ecmascript, tag client)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$assets$2f$logo$2f$logo$2d$login$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__["default"],
    width: 763,
    height: 480,
    blurWidth: 8,
    blurHeight: 5,
    blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAYAAAB4ka1VAAAAsElEQVR42gGlAFr/AP///wD///8A////AP78+wXs3s0z9OzlG////wD///8AAP///wD///8A////APLdtk/fqzPdyI9VsPjx7RT///8AAOrq6gXi4uII3t7dB7injGWbhlKnfF9ErcW/ukT4+PgHAF5eXkMyMjJVPj4+RTo6OlI1NTVXY2NjTWRkZISxsbE7AIeHhw9bW1sWaWlpEmJiYhJcXFwRZGRkFmRkZBybm5sRFrJXiHYng2EAAAAASUVORK5CYII="
};
}),
"[project]/src/pages/Login.jsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$layouts$2f$Layout$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/layouts/Layout.jsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$iconsax$2d$react__$5b$external$5d$__$28$iconsax$2d$react$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$iconsax$2d$react$40$0$2e$0$2e$8_react$40$19$2e$2$2e$0$2f$node_modules$2f$iconsax$2d$react$29$__ = __turbopack_context__.i("[externals]/iconsax-react [external] (iconsax-react, cjs, [project]/node_modules/.pnpm/iconsax-react@0.0.8_react@19.2.0/node_modules/iconsax-react)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useLogin$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useLogin.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$formik__$5b$external$5d$__$28$formik$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$formik$40$2$2e$4$2e$9_$40$types$2b$react$40$19$2e$2$2e$6_react$40$19$2e$2$2e$0$2f$node_modules$2f$formik$29$__ = __turbopack_context__.i("[externals]/formik [external] (formik, cjs, [project]/node_modules/.pnpm/formik@2.4.9_@types+react@19.2.6_react@19.2.0/node_modules/formik)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$yup__$5b$external$5d$__$28$yup$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$yup$40$1$2e$7$2e$1$2f$node_modules$2f$yup$29$__ = __turbopack_context__.i("[externals]/yup [external] (yup, cjs, [project]/node_modules/.pnpm/yup@1.7.1/node_modules/yup)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$assets$2f$logo$2f$logo$2d$login$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$src$2f$assets$2f$logo$2f$logo$2d$login$2e$png__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$ssr$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/src/assets/logo/logo-login.png.mjs { IMAGE => "[project]/src/assets/logo/logo-login.png (static in ecmascript, tag client)" } [ssr] (structured image object with data url, ecmascript)');
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$layouts$2f$Layout$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useLogin$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$layouts$2f$Layout$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useLogin$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
;
;
function Login() {
    const { LogIn, isLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useLogin$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"])();
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])("");
    const [showPassword, setShowPassword] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false); // مدیریت نمایش رمز عبور
    const validationSchema = __TURBOPACK__imported__module__$5b$externals$5d2f$yup__$5b$external$5d$__$28$yup$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$yup$40$1$2e$7$2e$1$2f$node_modules$2f$yup$29$__["object"]().shape({
        phone: __TURBOPACK__imported__module__$5b$externals$5d2f$yup__$5b$external$5d$__$28$yup$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$yup$40$1$2e$7$2e$1$2f$node_modules$2f$yup$29$__["string"]().matches(/^09\d{9}$/, "شماره موبایل معتبر نیست").required("شماره موبایل الزامی است"),
        password: __TURBOPACK__imported__module__$5b$externals$5d2f$yup__$5b$external$5d$__$28$yup$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$yup$40$1$2e$7$2e$1$2f$node_modules$2f$yup$29$__["string"]().min(6, "رمز عبور باید حداقل 6 کاراکتر باشد").required("رمز عبور الزامی است")
    });
    const handleSubmit = async (values)=>{
        setError("");
        try {
            await LogIn({
                phone_number: values.phone,
                password: values.password
            });
        // onSuccess در useLogin مدیریت می‌شود و redirect انجام می‌شود
        } catch (err) {
            setError("ورود ناموفق بود. لطفاً شماره موبایل و رمز عبور را بررسی کنید.");
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$layouts$2f$Layout$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: "min-h-[calc(100vh-200px)] flex items-center justify-center py-6 sm:py-12 px-3 sm:px-4 bg-gray-50",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "max-w-md w-full mx-auto bg-white rounded-2xl border border-gray-200 shadow-lg p-6 sm:p-8 md:p-10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "text-center mb-8",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "flex justify-center items-center",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                src: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$assets$2f$logo$2f$logo$2d$login$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$src$2f$assets$2f$logo$2f$logo$2d$login$2e$png__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$ssr$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__["default"],
                                alt: "اربعین تی وی",
                                className: "h-32 sm:h-38       md:h-40 w-auto"
                            }, void 0, false, {
                                fileName: "[project]/src/pages/Login.jsx",
                                lineNumber: 42,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/pages/Login.jsx",
                            lineNumber: 40,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/pages/Login.jsx",
                        lineNumber: 39,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$formik__$5b$external$5d$__$28$formik$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$formik$40$2$2e$4$2e$9_$40$types$2b$react$40$19$2e$2$2e$6_react$40$19$2e$2$2e$0$2f$node_modules$2f$formik$29$__["Formik"], {
                        initialValues: {
                            phone: "",
                            password: ""
                        },
                        validationSchema: validationSchema,
                        onSubmit: handleSubmit,
                        children: ({ isSubmitting })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$formik__$5b$external$5d$__$28$formik$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$formik$40$2$2e$4$2e$9_$40$types$2b$react$40$19$2e$2$2e$6_react$40$19$2e$2$2e$0$2f$node_modules$2f$formik$29$__["Form"], {
                                className: "space-y-5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                className: "block text-sm font-medium text-gray-700 mb-2",
                                                children: "شماره موبایل"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/Login.jsx",
                                                lineNumber: 61,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "relative flex items-center gap-3 rounded-xl border border-gray-300 bg-gray-50 hover:bg-white hover:border-gray-400 transition-all px-4 py-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$iconsax$2d$react__$5b$external$5d$__$28$iconsax$2d$react$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$iconsax$2d$react$40$0$2e$0$2e$8_react$40$19$2e$2$2e$0$2f$node_modules$2f$iconsax$2d$react$29$__["Sms"], {
                                                        size: 20,
                                                        color: "#64748b"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/Login.jsx",
                                                        lineNumber: 65,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$formik__$5b$external$5d$__$28$formik$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$formik$40$2$2e$4$2e$9_$40$types$2b$react$40$19$2e$2$2e$6_react$40$19$2e$2$2e$0$2f$node_modules$2f$formik$29$__["Field"], {
                                                        type: "tel",
                                                        name: "phone",
                                                        className: "w-full bg-transparent focus:outline-none focus:ring-0 text-sm placeholder-gray-400",
                                                        placeholder: "0912xxxxxxx"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/Login.jsx",
                                                        lineNumber: 66,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/pages/Login.jsx",
                                                lineNumber: 64,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$formik__$5b$external$5d$__$28$formik$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$formik$40$2$2e$4$2e$9_$40$types$2b$react$40$19$2e$2$2e$6_react$40$19$2e$2$2e$0$2f$node_modules$2f$formik$29$__["ErrorMessage"], {
                                                name: "phone",
                                                component: "p",
                                                className: "text-red-600 text-sm mt-1"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/Login.jsx",
                                                lineNumber: 73,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/pages/Login.jsx",
                                        lineNumber: 60,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                className: "block text-sm font-medium text-gray-700 mb-2",
                                                children: "رمز عبور"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/Login.jsx",
                                                lineNumber: 82,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "relative flex items-center gap-3 rounded-xl border border-gray-300 bg-gray-50 hover:bg-white hover:border-gray-400 transition-all px-4 py-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$iconsax$2d$react__$5b$external$5d$__$28$iconsax$2d$react$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$iconsax$2d$react$40$0$2e$0$2e$8_react$40$19$2e$2$2e$0$2f$node_modules$2f$iconsax$2d$react$29$__["Lock"], {
                                                        size: 20,
                                                        color: "#64748b"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/Login.jsx",
                                                        lineNumber: 86,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$formik__$5b$external$5d$__$28$formik$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$formik$40$2$2e$4$2e$9_$40$types$2b$react$40$19$2e$2$2e$6_react$40$19$2e$2$2e$0$2f$node_modules$2f$formik$29$__["Field"], {
                                                        type: showPassword ? "text" : "password",
                                                        name: "password",
                                                        className: "w-full bg-transparent focus:outline-none focus:ring-0 text-sm placeholder-gray-400",
                                                        placeholder: "••••••••"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/Login.jsx",
                                                        lineNumber: 87,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: "absolute left-4 cursor-pointer",
                                                        onClick: ()=>setShowPassword((prev)=>!prev),
                                                        children: showPassword ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$iconsax$2d$react__$5b$external$5d$__$28$iconsax$2d$react$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$iconsax$2d$react$40$0$2e$0$2e$8_react$40$19$2e$2$2e$0$2f$node_modules$2f$iconsax$2d$react$29$__["Eye"], {
                                                            size: 20,
                                                            color: "#4a5565"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/Login.jsx",
                                                            lineNumber: 98,
                                                            columnNumber: 25
                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$iconsax$2d$react__$5b$external$5d$__$28$iconsax$2d$react$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$iconsax$2d$react$40$0$2e$0$2e$8_react$40$19$2e$2$2e$0$2f$node_modules$2f$iconsax$2d$react$29$__["EyeSlash"], {
                                                            size: 20,
                                                            color: "#4a5565"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/Login.jsx",
                                                            lineNumber: 100,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/Login.jsx",
                                                        lineNumber: 93,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/pages/Login.jsx",
                                                lineNumber: 85,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$formik__$5b$external$5d$__$28$formik$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$formik$40$2$2e$4$2e$9_$40$types$2b$react$40$19$2e$2$2e$6_react$40$19$2e$2$2e$0$2f$node_modules$2f$formik$29$__["ErrorMessage"], {
                                                name: "password",
                                                component: "p",
                                                className: "text-red-600 text-sm mt-1"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/Login.jsx",
                                                lineNumber: 104,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/pages/Login.jsx",
                                        lineNumber: 81,
                                        columnNumber: 17
                                    }, this),
                                    error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        className: "text-red-600 text-sm",
                                        children: error
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/Login.jsx",
                                        lineNumber: 111,
                                        columnNumber: 27
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        type: "submit",
                                        className: "w-full py-3 rounded-xl bg-gradient-to-r from-orange-400 to-red-400 hover:from-orange-500 hover:to-red-500 active:scale-95 text-white font-medium text-sm shadow-md transition-all",
                                        disabled: isSubmitting || isLoading,
                                        children: isLoading ? "در حال ورود..." : "ورود"
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/Login.jsx",
                                        lineNumber: 113,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/Login.jsx",
                                lineNumber: 58,
                                columnNumber: 15
                            }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/pages/Login.jsx",
                        lineNumber: 52,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/Login.jsx",
                lineNumber: 38,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/pages/Login.jsx",
            lineNumber: 37,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/pages/Login.jsx",
        lineNumber: 36,
        columnNumber: 5
    }, this);
}
const __TURBOPACK__default__export__ = Login;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/pages/login.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Login$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/pages/Login.jsx [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Login$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Login$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Login$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"];
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0gig4cm._.js.map