module.exports = [
"[project]/pages/[[...username]].js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// import Home from '../src/pages/Home'
// import { serverAxios } from '../lib/serverAxios'
// const mapPaginatedResponse = (data) => {
//   const items =
//     Array.isArray(data?.data) ? data.data :
//     Array.isArray(data?.data?.data) ? data.data.data :
//     []
//   const totalPages =
//     Number(data?.last_page || data?.meta?.last_page || data?.pagination?.last_page || 1) || 1
//   const totalItems =
//     Number(data?.total || data?.meta?.total || items.length) || items.length
//   return { items, totalPages, totalItems }
// }
// export async function getServerSideProps() {
//   try {
//     const [channelsRes, videosRes] = await Promise.all([
//       serverAxios.get('/api/landing/channels?page=1&per_page=10'),
//       serverAxios.get('/api/landing/videos?page=1&per_page=25'),
//     ])
//     return {
//       props: {
//         initialChannels: mapPaginatedResponse(channelsRes?.data),
//         initialVideos: mapPaginatedResponse(videosRes?.data),
//       },
//     }
//   } catch (error) {
//     return {
//       props: {
//         initialChannels: { items: [], totalPages: 1, totalItems: 0 },
//         initialVideos: { items: [], totalPages: 1, totalItems: 0 },
//       },
//     }
//   }
// }
// export default Home
__turbopack_context__.s([
    "getServerSideProps",
    ()=>getServerSideProps
]);
async function getServerSideProps() {
    try {
        const [channelsRes, videosRes] = await Promise.all([
            serverAxios.get('/api/landing/channels?page=1&per_page=10'),
            serverAxios.get('/api/landing/videos?page=1&per_page=25')
        ]);
        console.log('channelsRes:', channelsRes);
        console.log('videosRes:', videosRes);
        return {
            props: {}
        };
    } catch (error) {
        console.log('SSR Error:', error);
        return {
            props: {}
        };
    }
}
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0_9iapn._.js.map