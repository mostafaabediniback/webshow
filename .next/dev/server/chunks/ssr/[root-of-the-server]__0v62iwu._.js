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
"[project]/src/components/CategoryChips.jsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$1_$40$babel$2b$core$40$7$2e$2_002c6875e2cc4925b70c9aa5d4dde4bf$2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.1_@babel+core@7.2_002c6875e2cc4925b70c9aa5d4dde4bf/node_modules/next/router.js [ssr] (ecmascript)");
;
;
function CategoryChips({ channels, activeChannelId, onSelect }) {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$1_$40$babel$2b$core$40$7$2e$2_002c6875e2cc4925b70c9aa5d4dde4bf$2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    console.log(onSelect);
    console.log(activeChannelId);
    const list = Array.isArray(channels) ? channels : channels ? [
        channels
    ] : [];
    // useEffect(() => {
    //   isRefetch()
    // }, [activeChannelId])
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "flex gap-3 sm:gap-4 overflow-x-auto pb-1 scrollbar-hide -mx-1 px-1 p-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                onClick: ()=>onSelect(null),
                className: `flex flex-col items-center gap-2 flex-shrink-0 transition-all duration-200 ${activeChannelId === null ? 'scale-105' : 'opacity-75 hover:opacity-100 hover:scale-[1.02]'}`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    onClick: ()=>router.push("/"),
                    className: `w-14 h-14 rounded-xl overflow-hidden border-2 shadow-sm flex items-center justify-center transition-all duration-200 ${activeChannelId === null ? 'border-indigo-500 bg-indigo-50' : 'border-slate-200 bg-slate-100 hover:border-slate-300'}`,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                        className: `text-sm font-medium ${activeChannelId === null ? 'text-indigo-600' : 'text-slate-600'}`,
                        children: "همه"
                    }, void 0, false, {
                        fileName: "[project]/src/components/CategoryChips.jsx",
                        lineNumber: 27,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/CategoryChips.jsx",
                    lineNumber: 20,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/CategoryChips.jsx",
                lineNumber: 15,
                columnNumber: 7
            }, this),
            list.map((channel)=>{
                const isActive = activeChannelId == channel.id;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                    onClick: ()=>onSelect(channel.id),
                    className: `flex flex-col items-center gap-2 flex-shrink-0 transition-all duration-200 ${isActive ? 'scale-105' : 'opacity-75 hover:opacity-100 hover:scale-[1.02]'}`,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        onClick: ()=>router.push("/"),
                        className: `w-14 h-14 rounded-xl overflow-hidden border-2 shadow-sm transition-all duration-200 ${isActive ? 'border-indigo-500 ring-2 ring-indigo-200' : 'border-slate-200 hover:border-slate-300'}`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                            src: channel.image,
                            alt: channel.name,
                            className: "w-full h-full object-cover"
                        }, void 0, false, {
                            fileName: "[project]/src/components/CategoryChips.jsx",
                            lineNumber: 53,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/CategoryChips.jsx",
                        lineNumber: 46,
                        columnNumber: 13
                    }, this)
                }, channel.id, false, {
                    fileName: "[project]/src/components/CategoryChips.jsx",
                    lineNumber: 40,
                    columnNumber: 11
                }, this);
            })
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/CategoryChips.jsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
const __TURBOPACK__default__export__ = CategoryChips;
}),
"[project]/src/components/VideoCard.jsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$iconsax$2d$react__$5b$external$5d$__$28$iconsax$2d$react$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$iconsax$2d$react$40$0$2e$0$2e$8_react$40$19$2e$2$2e$0$2f$node_modules$2f$iconsax$2d$react$29$__ = __turbopack_context__.i("[externals]/iconsax-react [external] (iconsax-react, cjs, [project]/node_modules/.pnpm/iconsax-react@0.0.8_react@19.2.0/node_modules/iconsax-react)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$1_$40$babel$2b$core$40$7$2e$2_002c6875e2cc4925b70c9aa5d4dde4bf$2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.1_@babel+core@7.2_002c6875e2cc4925b70c9aa5d4dde4bf/node_modules/next/link.js [ssr] (ecmascript)");
;
;
;
function VideoCard({ video }) {
    // console.log(video);
    const normalizeUrl = (u)=>{
        if (typeof u !== 'string') return '';
        return u.replace(/[`'"]/g, '').trim();
    };
    const thumbnailRaw = video.cover_link || video.thumbnailUrl || video.cover;
    const thumbnail = normalizeUrl(thumbnailRaw);
    const channelName = video.channel_name || video.channelName || 'کانال ناشناس';
    const channelImage = normalizeUrl(video.channel_image);
    const views = video.view_count || video.views || 0;
    const formattedViews = views >= 1000 ? `${(views / 1000).toFixed(1)}هزار` : views.toLocaleString('fa-IR');
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$1_$40$babel$2b$core$40$7$2e$2_002c6875e2cc4925b70c9aa5d4dde4bf$2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
        href: `/v/${video.id}`,
        className: "group/card block w-full h-full cursor-pointer touch-manipulation isolate rounded-2xl border border-slate-200/60 bg-gradient-to-br from-white to-slate-50/50 shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 hover:border-indigo-200/50 transition-all duration-400 overflow-hidden hover:-translate-y-1 hover:scale-[1.02]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "relative aspect-video w-full overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                        src: thumbnail,
                        alt: video.title,
                        className: "w-full h-full object-cover transition-all duration-700 group-hover/card:scale-110 group-hover/card:brightness-110",
                        loading: "lazy",
                        onError: (e)=>{
                            e.target.src;
                            e.target.classList.add('animate-pulse');
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/VideoCard.jsx",
                        lineNumber: 28,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-all duration-500"
                    }, void 0, false, {
                        fileName: "[project]/src/components/VideoCard.jsx",
                        lineNumber: 40,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 flex items-center justify-center pointer-events-none",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "w-16 h-16 sm:w-20 sm:h-20 bg-white/90 backdrop-blur-xl rounded-2xl flex items-center justify-center shadow-2xl shadow-black/20 scale-75 opacity-0 group-hover/card:scale-100 group-hover/card:opacity-100 transition-all duration-500 delay-100 shadow-indigo-500/25",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$iconsax$2d$react__$5b$external$5d$__$28$iconsax$2d$react$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$iconsax$2d$react$40$0$2e$0$2e$8_react$40$19$2e$2$2e$0$2f$node_modules$2f$iconsax$2d$react$29$__["PlayCircle"], {
                                size: 28,
                                sm: 36,
                                color: "#f58a06",
                                className: "text-indigo-600 drop-shadow-lg"
                            }, void 0, false, {
                                fileName: "[project]/src/components/VideoCard.jsx",
                                lineNumber: 45,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/VideoCard.jsx",
                            lineNumber: 44,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/VideoCard.jsx",
                        lineNumber: 43,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "absolute bottom-3 right-3 sm:bottom-4 sm:right-4 bg-white/95 backdrop-blur-xl px-3 sm:px-4 py-1.5 sm:py-2 rounded-2xl shadow-lg shadow-black/10 border border-white/50 flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-800",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$iconsax$2d$react__$5b$external$5d$__$28$iconsax$2d$react$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$iconsax$2d$react$40$0$2e$0$2e$8_react$40$19$2e$2$2e$0$2f$node_modules$2f$iconsax$2d$react$29$__["Eye"], {
                                size: 14,
                                sm: 16,
                                color: "#0f172a",
                                className: "text-indigo-500 flex-shrink-0"
                            }, void 0, false, {
                                fileName: "[project]/src/components/VideoCard.jsx",
                                lineNumber: 51,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                children: formattedViews
                            }, void 0, false, {
                                fileName: "[project]/src/components/VideoCard.jsx",
                                lineNumber: 52,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/VideoCard.jsx",
                        lineNumber: 50,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/VideoCard.jsx",
                lineNumber: 26,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "flex flex-col justify-between  p-4 sm:p-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                        className: "text-base flex-1  sm:text-lg font-bold leading-tight line-clamp-2 text-slate-900 group-hover/card:text-indigo-600 group-hover/card:font-black transition-all duration-300 mb-3 pr-1",
                        children: video.title
                    }, void 0, false, {
                        fileName: "[project]/src/components/VideoCard.jsx",
                        lineNumber: 60,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "relative flex-shrink-0",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                    src: channelImage,
                                    alt: channelName,
                                    className: "w-10 h-10 sm:w-11 sm:h-11 rounded-2xl object-cover ring-2 ring-slate-100/50 shadow-lg hover:shadow-indigo-300/50 transition-all duration-300 cursor-pointer group-hover/card:ring-indigo-200/50",
                                    onError: (e)=>{
                                        e.target.src;
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/components/VideoCard.jsx",
                                    lineNumber: 68,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/VideoCard.jsx",
                                lineNumber: 67,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "flex-1 min-w-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        className: "text-sm font-semibold text-slate-900 line-clamp-1 group-hover/card:text-indigo-600 transition-colors",
                                        children: channelName
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/VideoCard.jsx",
                                        lineNumber: 82,
                                        columnNumber: 13
                                    }, this),
                                    video.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-slate-500 mt-0.5 line-clamp-1",
                                        children: video.description
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/VideoCard.jsx",
                                        lineNumber: 86,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/VideoCard.jsx",
                                lineNumber: 81,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/VideoCard.jsx",
                        lineNumber: 65,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/VideoCard.jsx",
                lineNumber: 58,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none"
            }, void 0, false, {
                fileName: "[project]/src/components/VideoCard.jsx",
                lineNumber: 95,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/VideoCard.jsx",
        lineNumber: 21,
        columnNumber: 5
    }, this);
}
const __TURBOPACK__default__export__ = VideoCard;
}),
"[project]/src/components/VideoGrid.jsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$VideoCard$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/VideoCard.jsx [ssr] (ecmascript)");
;
;
function VideoGrid({ items }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "grid gap-4 sm:gap-5 md:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5",
        children: items.map((v)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$VideoCard$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                video: v
            }, v.id, false, {
                fileName: "[project]/src/components/VideoGrid.jsx",
                lineNumber: 7,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/src/components/VideoGrid.jsx",
        lineNumber: 5,
        columnNumber: 5
    }, this);
}
const __TURBOPACK__default__export__ = VideoGrid;
}),
"[project]/src/components/VideoSkeleton.jsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
;
;
function VideoSkeleton({ count = 10 }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5",
        children: Array.from({
            length: count
        }).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "animate-pulse",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "aspect-video rounded-xl bg-gradient-to-br from-gray-200 to-gray-300"
                    }, void 0, false, {
                        fileName: "[project]/src/components/VideoSkeleton.jsx",
                        lineNumber: 8,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "mt-3 flex gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "w-10 h-10 rounded-full bg-gray-200 flex-shrink-0"
                            }, void 0, false, {
                                fileName: "[project]/src/components/VideoSkeleton.jsx",
                                lineNumber: 10,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "flex-1 space-y-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "h-4 bg-gray-200 rounded w-3/4"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/VideoSkeleton.jsx",
                                        lineNumber: 12,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "h-3 bg-gray-200 rounded w-1/2"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/VideoSkeleton.jsx",
                                        lineNumber: 13,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "h-3 bg-gray-200 rounded w-2/3"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/VideoSkeleton.jsx",
                                        lineNumber: 14,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/VideoSkeleton.jsx",
                                lineNumber: 11,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/VideoSkeleton.jsx",
                        lineNumber: 9,
                        columnNumber: 11
                    }, this)
                ]
            }, i, true, {
                fileName: "[project]/src/components/VideoSkeleton.jsx",
                lineNumber: 7,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/src/components/VideoSkeleton.jsx",
        lineNumber: 5,
        columnNumber: 5
    }, this);
}
const __TURBOPACK__default__export__ = VideoSkeleton;
}),
"[project]/src/hooks/usePaginationParams.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "usePaginationParams",
    ()=>usePaginationParams
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
;
function usePaginationParams(initialPage = 1) {
    const [page, setPage] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(initialPage);
    return (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useMemo"])(()=>({
            page,
            setPage
        }), [
        page
    ]);
}
const __TURBOPACK__default__export__ = usePaginationParams;
}),
"[project]/src/hooks/useLandingChannels.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "useLandingChannels",
    ()=>useLandingChannels
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$tanstack$2f$react$2d$query__$5b$external$5d$__$2840$tanstack$2f$react$2d$query$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$90$2e$10_react$40$19$2e$2$2e$0$2f$node_modules$2f40$tanstack$2f$react$2d$query$29$__ = __turbopack_context__.i("[externals]/@tanstack/react-query [external] (@tanstack/react-query, esm_import, [project]/node_modules/.pnpm/@tanstack+react-query@5.90.10_react@19.2.0/node_modules/@tanstack/react-query)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$videoApi$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/videoApi.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$usePaginationParams$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/usePaginationParams.js [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f40$tanstack$2f$react$2d$query__$5b$external$5d$__$2840$tanstack$2f$react$2d$query$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$90$2e$10_react$40$19$2e$2$2e$0$2f$node_modules$2f40$tanstack$2f$react$2d$query$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$videoApi$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f40$tanstack$2f$react$2d$query__$5b$external$5d$__$2840$tanstack$2f$react$2d$query$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$90$2e$10_react$40$19$2e$2$2e$0$2f$node_modules$2f40$tanstack$2f$react$2d$query$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$videoApi$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
const useLandingChannels = (initialPage = 1, initialData = null)=>{
    const { page, setPage } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$usePaginationParams$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["usePaginationParams"])(initialPage);
    return (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$tanstack$2f$react$2d$query__$5b$external$5d$__$2840$tanstack$2f$react$2d$query$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$90$2e$10_react$40$19$2e$2$2e$0$2f$node_modules$2f40$tanstack$2f$react$2d$query$29$__["useQuery"])({
        queryKey: [
            "landing-channels",
            page
        ],
        queryFn: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$videoApi$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["getLandingChannels"])({
                pageNumber: page
            }),
        keepPreviousData: true,
        staleTime: 5 * 60 * 1000,
        refetchOnMount: false,
        initialData,
        select: (data)=>({
                ...data,
                items: Array.isArray(data?.items) ? data.items : []
            })
    });
};
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/hooks/useInfiniteLandingVideos.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "useInfiniteLandingVideos",
    ()=>useInfiniteLandingVideos
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$tanstack$2f$react$2d$query__$5b$external$5d$__$2840$tanstack$2f$react$2d$query$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$90$2e$10_react$40$19$2e$2$2e$0$2f$node_modules$2f40$tanstack$2f$react$2d$query$29$__ = __turbopack_context__.i("[externals]/@tanstack/react-query [external] (@tanstack/react-query, esm_import, [project]/node_modules/.pnpm/@tanstack+react-query@5.90.10_react@19.2.0/node_modules/@tanstack/react-query)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$videoApi$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/videoApi.js [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f40$tanstack$2f$react$2d$query__$5b$external$5d$__$2840$tanstack$2f$react$2d$query$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$90$2e$10_react$40$19$2e$2$2e$0$2f$node_modules$2f40$tanstack$2f$react$2d$query$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$videoApi$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f40$tanstack$2f$react$2d$query__$5b$external$5d$__$2840$tanstack$2f$react$2d$query$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$90$2e$10_react$40$19$2e$2$2e$0$2f$node_modules$2f40$tanstack$2f$react$2d$query$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$videoApi$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
const useInfiniteLandingVideos = (channelId, pageSize = 25, initialPageData = null)=>{
    return (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$tanstack$2f$react$2d$query__$5b$external$5d$__$2840$tanstack$2f$react$2d$query$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$90$2e$10_react$40$19$2e$2$2e$0$2f$node_modules$2f40$tanstack$2f$react$2d$query$29$__["useInfiniteQuery"])({
        queryKey: [
            "landing-videos-infinite",
            channelId || "all",
            pageSize
        ],
        queryFn: ({ pageParam = 1 })=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$videoApi$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["getLandingVideos"])({
                channelId: channelId || undefined,
                pageNumber: pageParam,
                pageSize
            }),
        initialData: !channelId && initialPageData ? {
            pages: [
                initialPageData
            ],
            pageParams: [
                1
            ]
        } : undefined,
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages)=>{
            const nextPage = allPages.length + 1;
            return nextPage <= (lastPage?.totalPages || 1) ? nextPage : undefined;
        },
        staleTime: 2 * 60 * 1000,
        refetchOnMount: false,
        select: (data)=>{
            const pages = Array.isArray(data?.pages) ? data.pages : [];
            const items = pages.flatMap((page)=>Array.isArray(page?.items) ? page.items : []);
            const lastPage = pages.at(-1);
            return {
                ...data,
                items,
                totalPages: lastPage?.totalPages || 1,
                totalItems: lastPage?.totalItems || items.length
            };
        }
    });
};
const __TURBOPACK__default__export__ = useInfiniteLandingVideos;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/next/navigationState.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getHomeNavigationState",
    ()=>getHomeNavigationState,
    "setHomeNavigationState",
    ()=>setHomeNavigationState
]);
const state = {
    homeChannelId: null
};
function setHomeNavigationState(channelId) {
    state.homeChannelId = channelId ?? null;
}
function getHomeNavigationState() {
    return state.homeChannelId;
}
}),
"[project]/src/pages/Home.jsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>Home,
    "getServerSideProps",
    ()=>getServerSideProps
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
// pages/index.js
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$1_$40$babel$2b$core$40$7$2e$2_002c6875e2cc4925b70c9aa5d4dde4bf$2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.1_@babel+core@7.2_002c6875e2cc4925b70c9aa5d4dde4bf/node_modules/next/head.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$iconsax$2d$react__$5b$external$5d$__$28$iconsax$2d$react$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$iconsax$2d$react$40$0$2e$0$2e$8_react$40$19$2e$2$2e$0$2f$node_modules$2f$iconsax$2d$react$29$__ = __turbopack_context__.i("[externals]/iconsax-react [external] (iconsax-react, cjs, [project]/node_modules/.pnpm/iconsax-react@0.0.8_react@19.2.0/node_modules/iconsax-react)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$layouts$2f$Layout$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/layouts/Layout.jsx [ssr] (ecmascript)"); // فرض کردم Layout تو src/layouts/Layout هست
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CategoryChips$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/CategoryChips.jsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$VideoGrid$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/VideoGrid.jsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$VideoSkeleton$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/VideoSkeleton.jsx [ssr] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module '../lib/serverAxios'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useLandingChannels$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useLandingChannels.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useInfiniteLandingVideos$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useInfiniteLandingVideos.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$1_$40$babel$2b$core$40$7$2e$2_002c6875e2cc4925b70c9aa5d4dde4bf$2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.1_@babel+core@7.2_002c6875e2cc4925b70c9aa5d4dde4bf/node_modules/next/router.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$next$2f$navigationState$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/next/navigationState.js [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$layouts$2f$Layout$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useLandingChannels$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useInfiniteLandingVideos$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$layouts$2f$Layout$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useLandingChannels$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useInfiniteLandingVideos$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
;
;
;
;
;
;
;
const PAGE_SIZE = 25;
// ===== Map API response =====
const mapPaginatedResponse = (res)=>{
    const payload = res?.data ?? {};
    return {
        items: payload?.data ?? [],
        totalPages: payload?.meta?.last_page ?? 1,
        totalItems: payload?.meta?.total ?? payload?.data?.length ?? 0
    };
};
async function getServerSideProps() {
    try {
        const [channelsRes, videosRes] = await Promise.all([
            serverAxios.get("/api/landing/channels?page=1&per_page=10"),
            serverAxios.get("/api/landing/videos?page=1&per_page=25")
        ]);
        return {
            props: {
                initialChannels: mapPaginatedResponse(channelsRes),
                initialVideos: mapPaginatedResponse(videosRes)
            }
        };
    } catch (error) {
        console.error("Error fetching SSR data:", error);
        return {
            props: {
                initialChannels: {
                    items: [],
                    totalPages: 1,
                    totalItems: 0
                },
                initialVideos: {
                    items: [],
                    totalPages: 1,
                    totalItems: 0
                }
            }
        };
    }
}
function Home({ initialChannels, initialVideos }) {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$1_$40$babel$2b$core$40$7$2e$2_002c6875e2cc4925b70c9aa5d4dde4bf$2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [activeChannelId, setActiveChannelId] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const loadMoreRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
    // ===== Channels =====
    const { data: channelsData, isLoading: channelsLoading, refetch: channelsRefetch } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useLandingChannels$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useLandingChannels"])(1, initialChannels);
    const channelsList = Array.isArray(channelsData?.items) ? channelsData.items : [];
    // ===== Videos =====
    const { data: videosData, isLoading: videosLoading, isError: videosError, isFetchingNextPage, hasNextPage, fetchNextPage, refetch } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useInfiniteLandingVideos$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useInfiniteLandingVideos"])(activeChannelId, PAGE_SIZE, {
        pages: [
            initialVideos
        ],
        pageParams: [
            1
        ]
    });
    const videosList = videosData?.pages ? videosData.pages.flatMap((p)=>p.items || []) : [];
    const activeChannelName = channelsList.find((c)=>c.id === activeChannelId)?.name;
    // ===== Handlers =====
    const handleChannelSelect = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useCallback"])((id)=>{
        setActiveChannelId(id);
    }, []);
    const handleRefresh = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useCallback"])(()=>{
        refetch();
    }, [
        refetch
    ]);
    // ===== Set activeChannelId from router or transient state =====
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const queryChannelId = typeof router.query?.channelId === "string" ? router.query.channelId : null;
        const transientChannelId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$next$2f$navigationState$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["getHomeNavigationState"])();
        const nextChannelId = queryChannelId || transientChannelId;
        if (nextChannelId) {
            setActiveChannelId(nextChannelId);
        }
    }, [
        router.query?.channelId
    ]);
    // ===== Infinite scroll =====
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const sentinel = loadMoreRef.current;
        if (!sentinel || !hasNextPage) return;
        const observer = new IntersectionObserver((entries)=>{
            const [entry] = entries;
            if (entry?.isIntersecting && !isFetchingNextPage) {
                fetchNextPage();
            }
        }, {
            root: null,
            rootMargin: "300px 0px",
            threshold: 0.1
        });
        observer.observe(sentinel);
        return ()=>observer.disconnect();
    }, [
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        videosList.length
    ]);
    // ===== Loading state for channels =====
    if (channelsLoading && !channelsData) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$layouts$2f$Layout$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "min-h-screen bg-gradient-to-b from-slate-50 to-white",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "mx-auto max-w-7xl px-3 sm:px-4 md:px-6 py-6 sm:py-8",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$VideoSkeleton$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                        count: 12
                    }, void 0, false, {
                        fileName: "[project]/src/pages/Home.jsx",
                        lineNumber: 139,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/pages/Home.jsx",
                    lineNumber: 138,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/pages/Home.jsx",
                lineNumber: 137,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/pages/Home.jsx",
            lineNumber: 136,
            columnNumber: 7
        }, this);
    }
    const showInitialLoading = videosLoading && videosList.length === 0;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$layouts$2f$Layout$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$1_$40$babel$2b$core$40$7$2e$2_002c6875e2cc4925b70c9aa5d4dde4bf$2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("title", {
                        children: "اربعین تی وی - تلویزیون اینترنتی جبهه مقاومت"
                    }, void 0, false, {
                        fileName: "[project]/src/pages/Home.jsx",
                        lineNumber: 151,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        name: "description",
                        content: "تماشای ویدیوهای اربعین و جبهه مقاومت در اربعین تی وی"
                    }, void 0, false, {
                        fileName: "[project]/src/pages/Home.jsx",
                        lineNumber: 152,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        property: "og:title",
                        content: "اربعین تی وی"
                    }, void 0, false, {
                        fileName: "[project]/src/pages/Home.jsx",
                        lineNumber: 156,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        property: "og:description",
                        content: "تماشای ویدیوهای اربعین و جبهه مقاومت"
                    }, void 0, false, {
                        fileName: "[project]/src/pages/Home.jsx",
                        lineNumber: 157,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        property: "og:image",
                        content: "/vite.svg"
                    }, void 0, false, {
                        fileName: "[project]/src/pages/Home.jsx",
                        lineNumber: 161,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        name: "twitter:card",
                        content: "summary_large_image"
                    }, void 0, false, {
                        fileName: "[project]/src/pages/Home.jsx",
                        lineNumber: 162,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("link", {
                        rel: "canonical",
                        href: `${siteUrl}/`
                    }, void 0, false, {
                        fileName: "[project]/src/pages/Home.jsx",
                        lineNumber: 163,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/Home.jsx",
                lineNumber: 150,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "min-h-screen bg-gradient-to-b from-slate-50 to-white",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "mx-auto max-w-7xl px-3 sm:px-4 md:px-6 py-6 sm:py-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "sticky top-[57px] sm:top-[61px] md:top-[73px] z-40 -mx-3 sm:-mx-4 md:-mx-6 px-3 sm:px-4 md:px-6 py-3 backdrop-blur-md border-b border-slate-200/80 mb-6",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CategoryChips$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                channels: channelsList,
                                activeChannelId: activeChannelId,
                                onSelect: handleChannelSelect,
                                isLoading: channelsLoading,
                                isRefetch: channelsRefetch
                            }, void 0, false, {
                                fileName: "[project]/src/pages/Home.jsx",
                                lineNumber: 170,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/pages/Home.jsx",
                            lineNumber: 169,
                            columnNumber: 11
                        }, this),
                        activeChannelId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between gap-3 px-4 py-3 rounded-2xl bg-indigo-50 border border-indigo-100 shadow-sm mb-6",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                className: "text-sm text-slate-600 flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$iconsax$2d$react__$5b$external$5d$__$28$iconsax$2d$react$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$iconsax$2d$react$40$0$2e$0$2e$8_react$40$19$2e$2$2e$0$2f$node_modules$2f$iconsax$2d$react$29$__["ArrowLeft2"], {
                                        size: 16,
                                        className: "text-slate-400"
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/Home.jsx",
                                        lineNumber: 183,
                                        columnNumber: 17
                                    }, this),
                                    "نمایش ویدیوهای",
                                    " ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                        className: "text-slate-900",
                                        children: activeChannelName || videosList[0]?.channel_name || "کانال"
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/Home.jsx",
                                        lineNumber: 185,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/Home.jsx",
                                lineNumber: 182,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/pages/Home.jsx",
                            lineNumber: 181,
                            columnNumber: 13
                        }, this),
                        showInitialLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "mt-6",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$VideoSkeleton$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                count: PAGE_SIZE
                            }, void 0, false, {
                                fileName: "[project]/src/pages/Home.jsx",
                                lineNumber: 197,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/pages/Home.jsx",
                            lineNumber: 196,
                            columnNumber: 13
                        }, this) : videosError ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "flex flex-col items-center justify-center py-16 px-4 rounded-2xl bg-slate-50 border border-slate-200",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mb-4",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        className: "text-2xl",
                                        children: "⚠"
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/Home.jsx",
                                        lineNumber: 202,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/Home.jsx",
                                    lineNumber: 201,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                    className: "text-red-600 font-medium mb-2",
                                    children: "خطا در دریافت ویدیوها"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/Home.jsx",
                                    lineNumber: 204,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                    onClick: handleRefresh,
                                    className: "text-indigo-600 hover:text-indigo-700 font-medium px-4 py-2 border border-indigo-200 rounded-xl hover:bg-indigo-50 transition-all",
                                    children: "تلاش مجدد"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/Home.jsx",
                                    lineNumber: 205,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/Home.jsx",
                            lineNumber: 200,
                            columnNumber: 13
                        }, this) : videosList.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "flex flex-col items-center justify-center py-20 px-4 rounded-2xl bg-slate-50 border border-slate-200 border-dashed",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center mb-6 shadow-lg",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$iconsax$2d$react__$5b$external$5d$__$28$iconsax$2d$react$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$iconsax$2d$react$40$0$2e$0$2e$8_react$40$19$2e$2$2e$0$2f$node_modules$2f$iconsax$2d$react$29$__["PlayCircle"], {
                                        size: 40,
                                        color: "#f97316"
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/Home.jsx",
                                        lineNumber: 215,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/Home.jsx",
                                    lineNumber: 214,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                    className: "text-lg font-bold text-slate-900 mb-2",
                                    children: activeChannelId ? "ویدیویی یافت نشد" : "شروع کنید!"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/Home.jsx",
                                    lineNumber: 217,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                    className: "text-slate-600 text-center max-w-md",
                                    children: activeChannelId ? "در این کانال فعلاً ویدیویی موجود نیست." : "کانالی انتخاب کنید تا ویدیوهایش را ببینید."
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/Home.jsx",
                                    lineNumber: 220,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/Home.jsx",
                            lineNumber: 213,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "pb-8",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$VideoGrid$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        items: videosList
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/Home.jsx",
                                        lineNumber: 229,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/Home.jsx",
                                    lineNumber: 228,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    ref: loadMoreRef,
                                    className: "flex justify-center py-4 min-h-16",
                                    children: isFetchingNextPage ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "w-full",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$VideoSkeleton$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            count: Math.min(8, PAGE_SIZE)
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/Home.jsx",
                                            lineNumber: 234,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/Home.jsx",
                                        lineNumber: 233,
                                        columnNumber: 19
                                    }, this) : hasNextPage ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        className: "text-sm text-slate-500",
                                        children: "برای بارگذاری ویدیوهای بیشتر اسکرول کنید."
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/Home.jsx",
                                        lineNumber: 237,
                                        columnNumber: 19
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        className: "text-sm text-slate-400",
                                        children: "همه ویدیوها نمایش داده شدند."
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/Home.jsx",
                                        lineNumber: 241,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/Home.jsx",
                                    lineNumber: 231,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/Home.jsx",
                            lineNumber: 227,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/pages/Home.jsx",
                    lineNumber: 167,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/pages/Home.jsx",
                lineNumber: 166,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/pages/Home.jsx",
        lineNumber: 149,
        columnNumber: 5
    }, this);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/lib/serverAxios.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "serverAxios",
    ()=>serverAxios
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$axios__$5b$external$5d$__$28$axios$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$axios$40$1$2e$13$2e$2$2f$node_modules$2f$axios$29$__ = __turbopack_context__.i("[externals]/axios [external] (axios, esm_import, [project]/node_modules/.pnpm/axios@1.13.2/node_modules/axios)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$axios__$5b$external$5d$__$28$axios$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$axios$40$1$2e$13$2e$2$2f$node_modules$2f$axios$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$axios__$5b$external$5d$__$28$axios$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$axios$40$1$2e$13$2e$2$2f$node_modules$2f$axios$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
const serverAxios = __TURBOPACK__imported__module__$5b$externals$5d2f$axios__$5b$external$5d$__$28$axios$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$axios$40$1$2e$13$2e$2$2f$node_modules$2f$axios$29$__["default"].create({
    baseURL: process.env.API_BASE_URL,
    timeout: 10000
});
const __TURBOPACK__default__export__ = serverAxios;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/pages/[[...username]].js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "getServerSideProps",
    ()=>getServerSideProps
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Home$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/pages/Home.jsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$serverAxios$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/serverAxios.js [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Home$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$serverAxios$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Home$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$serverAxios$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
const mapPaginatedResponse = (res)=>{
    const payload = res?.data; // مهم‌ترین fix
    const items = Array.isArray(payload?.data) ? payload.data : [];
    const totalPages = Number(payload?.meta?.last_page || 1);
    const totalItems = Number(payload?.meta?.total || items.length);
    return {
        items,
        totalPages,
        totalItems
    };
};
async function getServerSideProps() {
    try {
        const [channelsRes, videosRes] = await Promise.all([
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$serverAxios$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["serverAxios"].get('/api/landing/channels?page=1&per_page=10'),
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$serverAxios$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["serverAxios"].get('/api/landing/videos?page=1&per_page=25')
        ]);
        return {
            props: {
                initialChannels: mapPaginatedResponse(channelsRes),
                initialVideos: mapPaginatedResponse(videosRes)
            }
        };
    } catch (error) {
        return {
            props: {
                initialChannels: {
                    items: [],
                    totalPages: 1,
                    totalItems: 0
                },
                initialVideos: {
                    items: [],
                    totalPages: 1,
                    totalItems: 0
                }
            }
        };
    }
}
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Home$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"];
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0v62iwu._.js.map