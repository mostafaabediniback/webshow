module.exports = [
"[project]/src/components/GlobalLoading.jsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$tanstack$2f$react$2d$query__$5b$external$5d$__$2840$tanstack$2f$react$2d$query$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$90$2e$10_react$40$19$2e$2$2e$0$2f$node_modules$2f40$tanstack$2f$react$2d$query$29$__ = __turbopack_context__.i("[externals]/@tanstack/react-query [external] (@tanstack/react-query, esm_import, [project]/node_modules/.pnpm/@tanstack+react-query@5.90.10_react@19.2.0/node_modules/@tanstack/react-query)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f40$tanstack$2f$react$2d$query__$5b$external$5d$__$2840$tanstack$2f$react$2d$query$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$90$2e$10_react$40$19$2e$2$2e$0$2f$node_modules$2f40$tanstack$2f$react$2d$query$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f40$tanstack$2f$react$2d$query__$5b$external$5d$__$2840$tanstack$2f$react$2d$query$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$90$2e$10_react$40$19$2e$2$2e$0$2f$node_modules$2f40$tanstack$2f$react$2d$query$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
function GlobalLoading() {
    const isFetching = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$tanstack$2f$react$2d$query__$5b$external$5d$__$2840$tanstack$2f$react$2d$query$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$90$2e$10_react$40$19$2e$2$2e$0$2f$node_modules$2f40$tanstack$2f$react$2d$query$29$__["useIsFetching"])();
    const isMutating = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$tanstack$2f$react$2d$query__$5b$external$5d$__$2840$tanstack$2f$react$2d$query$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$90$2e$10_react$40$19$2e$2$2e$0$2f$node_modules$2f40$tanstack$2f$react$2d$query$29$__["useIsMutating"])();
    const isLoading = isFetching > 0 || isMutating > 0;
    if (!isLoading) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "fixed top-0 left-0 right-0 z-[9999] h-1 bg-gray-200",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-[shimmer_1.5s_ease-in-out_infinite] bg-[length:200%_100%]"
            }, void 0, false, {
                fileName: "[project]/src/components/GlobalLoading.jsx",
                lineNumber: 12,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("style", {
                children: `
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `
            }, void 0, false, {
                fileName: "[project]/src/components/GlobalLoading.jsx",
                lineNumber: 13,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/GlobalLoading.jsx",
        lineNumber: 11,
        columnNumber: 5
    }, this);
}
const __TURBOPACK__default__export__ = GlobalLoading;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/pages/_app.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>App
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$tanstack$2f$react$2d$query__$5b$external$5d$__$2840$tanstack$2f$react$2d$query$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$90$2e$10_react$40$19$2e$2$2e$0$2f$node_modules$2f40$tanstack$2f$react$2d$query$29$__ = __turbopack_context__.i("[externals]/@tanstack/react-query [external] (@tanstack/react-query, esm_import, [project]/node_modules/.pnpm/@tanstack+react-query@5.90.10_react@19.2.0/node_modules/@tanstack/react-query)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$toastify__$5b$external$5d$__$28$react$2d$toastify$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$toastify$40$11$2e$0$2e$5_react_44b200bfef41235b57e0bc42b6edd101$2f$node_modules$2f$react$2d$toastify$29$__ = __turbopack_context__.i("[externals]/react-toastify [external] (react-toastify, esm_import, [project]/node_modules/.pnpm/react-toastify@11.0.5_react_44b200bfef41235b57e0bc42b6edd101/node_modules/react-toastify)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$GlobalLoading$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/GlobalLoading.jsx [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f40$tanstack$2f$react$2d$query__$5b$external$5d$__$2840$tanstack$2f$react$2d$query$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$90$2e$10_react$40$19$2e$2$2e$0$2f$node_modules$2f40$tanstack$2f$react$2d$query$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$toastify__$5b$external$5d$__$28$react$2d$toastify$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$toastify$40$11$2e$0$2e$5_react_44b200bfef41235b57e0bc42b6edd101$2f$node_modules$2f$react$2d$toastify$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$GlobalLoading$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f40$tanstack$2f$react$2d$query__$5b$external$5d$__$2840$tanstack$2f$react$2d$query$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$90$2e$10_react$40$19$2e$2$2e$0$2f$node_modules$2f40$tanstack$2f$react$2d$query$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$toastify__$5b$external$5d$__$28$react$2d$toastify$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$toastify$40$11$2e$0$2e$5_react_44b200bfef41235b57e0bc42b6edd101$2f$node_modules$2f$react$2d$toastify$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$GlobalLoading$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
;
function App({ Component, pageProps }) {
    const [queryClient] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(()=>new __TURBOPACK__imported__module__$5b$externals$5d2f40$tanstack$2f$react$2d$query__$5b$external$5d$__$2840$tanstack$2f$react$2d$query$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$90$2e$10_react$40$19$2e$2$2e$0$2f$node_modules$2f40$tanstack$2f$react$2d$query$29$__["QueryClient"]());
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$tanstack$2f$react$2d$query__$5b$external$5d$__$2840$tanstack$2f$react$2d$query$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$90$2e$10_react$40$19$2e$2$2e$0$2f$node_modules$2f40$tanstack$2f$react$2d$query$29$__["QueryClientProvider"], {
        client: queryClient,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$GlobalLoading$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/pages/_app.js",
                lineNumber: 13,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Component, {
                ...pageProps
            }, void 0, false, {
                fileName: "[project]/pages/_app.js",
                lineNumber: 14,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$toastify__$5b$external$5d$__$28$react$2d$toastify$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$toastify$40$11$2e$0$2e$5_react_44b200bfef41235b57e0bc42b6edd101$2f$node_modules$2f$react$2d$toastify$29$__["ToastContainer"], {
                position: "top-right",
                theme: "colored",
                rtl: true
            }, void 0, false, {
                fileName: "[project]/pages/_app.js",
                lineNumber: 15,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/pages/_app.js",
        lineNumber: 12,
        columnNumber: 5
    }, this);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[externals]/@tanstack/react-query [external] (@tanstack/react-query, esm_import, [project]/node_modules/.pnpm/@tanstack+react-query@5.90.10_react@19.2.0/node_modules/@tanstack/react-query)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

const mod = await __turbopack_context__.y("@tanstack/react-query-a946a1a6a1c5992c");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[externals]/react-toastify [external] (react-toastify, esm_import, [project]/node_modules/.pnpm/react-toastify@11.0.5_react_44b200bfef41235b57e0bc42b6edd101/node_modules/react-toastify)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

const mod = await __turbopack_context__.y("react-toastify-dd6a5827e6738855");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__02qbrht._.js.map