(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[turbopack]/browser/dev/hmr-client/hmr-client.ts [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference path="../../../shared/runtime/runtime-types.d.ts" />
/// <reference path="../../../shared/runtime/dev-globals.d.ts" />
/// <reference path="../../../shared/runtime/dev-protocol.d.ts" />
/// <reference path="../../../shared/runtime/dev-extensions.ts" />
__turbopack_context__.s([
    "connect",
    ()=>connect,
    "setHooks",
    ()=>setHooks,
    "subscribeToUpdate",
    ()=>subscribeToUpdate
]);
function connect({ addMessageListener, sendMessage, onUpdateError = console.error }) {
    addMessageListener((msg)=>{
        switch(msg.type){
            case 'turbopack-connected':
                handleSocketConnected(sendMessage);
                break;
            default:
                try {
                    if (Array.isArray(msg.data)) {
                        for(let i = 0; i < msg.data.length; i++){
                            handleSocketMessage(msg.data[i]);
                        }
                    } else {
                        handleSocketMessage(msg.data);
                    }
                    applyAggregatedUpdates();
                } catch (e) {
                    console.warn('[Fast Refresh] performing full reload\n\n' + "Fast Refresh will perform a full reload when you edit a file that's imported by modules outside of the React rendering tree.\n" + 'You might have a file which exports a React component but also exports a value that is imported by a non-React component file.\n' + 'Consider migrating the non-React component export to a separate file and importing it into both files.\n\n' + 'It is also possible the parent component of the component you edited is a class component, which disables Fast Refresh.\n' + 'Fast Refresh requires at least one parent function component in your React tree.');
                    onUpdateError(e);
                    location.reload();
                }
                break;
        }
    });
    const queued = globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS;
    if (queued != null && !Array.isArray(queued)) {
        throw new Error('A separate HMR handler was already registered');
    }
    globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS = {
        push: ([chunkPath, callback])=>{
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    };
    if (Array.isArray(queued)) {
        for (const [chunkPath, callback] of queued){
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    }
}
const updateCallbackSets = new Map();
function sendJSON(sendMessage, message) {
    sendMessage(JSON.stringify(message));
}
function resourceKey(resource) {
    return JSON.stringify({
        path: resource.path,
        headers: resource.headers || null
    });
}
function subscribeToUpdates(sendMessage, resource) {
    sendJSON(sendMessage, {
        type: 'turbopack-subscribe',
        ...resource
    });
    return ()=>{
        sendJSON(sendMessage, {
            type: 'turbopack-unsubscribe',
            ...resource
        });
    };
}
function handleSocketConnected(sendMessage) {
    for (const key of updateCallbackSets.keys()){
        subscribeToUpdates(sendMessage, JSON.parse(key));
    }
}
// we aggregate all pending updates until the issues are resolved
const chunkListsWithPendingUpdates = new Map();
function aggregateUpdates(msg) {
    const key = resourceKey(msg.resource);
    let aggregated = chunkListsWithPendingUpdates.get(key);
    if (aggregated) {
        aggregated.instruction = mergeChunkListUpdates(aggregated.instruction, msg.instruction);
    } else {
        chunkListsWithPendingUpdates.set(key, msg);
    }
}
function applyAggregatedUpdates() {
    if (chunkListsWithPendingUpdates.size === 0) return;
    hooks.beforeRefresh();
    for (const msg of chunkListsWithPendingUpdates.values()){
        triggerUpdate(msg);
    }
    chunkListsWithPendingUpdates.clear();
    finalizeUpdate();
}
function mergeChunkListUpdates(updateA, updateB) {
    let chunks;
    if (updateA.chunks != null) {
        if (updateB.chunks == null) {
            chunks = updateA.chunks;
        } else {
            chunks = mergeChunkListChunks(updateA.chunks, updateB.chunks);
        }
    } else if (updateB.chunks != null) {
        chunks = updateB.chunks;
    }
    let merged;
    if (updateA.merged != null) {
        if (updateB.merged == null) {
            merged = updateA.merged;
        } else {
            // Since `merged` is an array of updates, we need to merge them all into
            // one, consistent update.
            // Since there can only be `EcmascriptMergeUpdates` in the array, there is
            // no need to key on the `type` field.
            let update = updateA.merged[0];
            for(let i = 1; i < updateA.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateA.merged[i]);
            }
            for(let i = 0; i < updateB.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateB.merged[i]);
            }
            merged = [
                update
            ];
        }
    } else if (updateB.merged != null) {
        merged = updateB.merged;
    }
    return {
        type: 'ChunkListUpdate',
        chunks,
        merged
    };
}
function mergeChunkListChunks(chunksA, chunksB) {
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    return chunks;
}
function mergeChunkUpdates(updateA, updateB) {
    if (updateA.type === 'added' && updateB.type === 'deleted' || updateA.type === 'deleted' && updateB.type === 'added') {
        return undefined;
    }
    if (updateA.type === 'partial') {
        invariant(updateA.instruction, 'Partial updates are unsupported');
    }
    if (updateB.type === 'partial') {
        invariant(updateB.instruction, 'Partial updates are unsupported');
    }
    return undefined;
}
function mergeChunkListEcmascriptMergedUpdates(mergedA, mergedB) {
    const entries = mergeEcmascriptChunkEntries(mergedA.entries, mergedB.entries);
    const chunks = mergeEcmascriptChunksUpdates(mergedA.chunks, mergedB.chunks);
    return {
        type: 'EcmascriptMergedUpdate',
        entries,
        chunks
    };
}
function mergeEcmascriptChunkEntries(entriesA, entriesB) {
    return {
        ...entriesA,
        ...entriesB
    };
}
function mergeEcmascriptChunksUpdates(chunksA, chunksB) {
    if (chunksA == null) {
        return chunksB;
    }
    if (chunksB == null) {
        return chunksA;
    }
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeEcmascriptChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    if (Object.keys(chunks).length === 0) {
        return undefined;
    }
    return chunks;
}
function mergeEcmascriptChunkUpdates(updateA, updateB) {
    if (updateA.type === 'added' && updateB.type === 'deleted') {
        // These two completely cancel each other out.
        return undefined;
    }
    if (updateA.type === 'deleted' && updateB.type === 'added') {
        const added = [];
        const deleted = [];
        const deletedModules = new Set(updateA.modules ?? []);
        const addedModules = new Set(updateB.modules ?? []);
        for (const moduleId of addedModules){
            if (!deletedModules.has(moduleId)) {
                added.push(moduleId);
            }
        }
        for (const moduleId of deletedModules){
            if (!addedModules.has(moduleId)) {
                deleted.push(moduleId);
            }
        }
        if (added.length === 0 && deleted.length === 0) {
            return undefined;
        }
        return {
            type: 'partial',
            added,
            deleted
        };
    }
    if (updateA.type === 'partial' && updateB.type === 'partial') {
        const added = new Set([
            ...updateA.added ?? [],
            ...updateB.added ?? []
        ]);
        const deleted = new Set([
            ...updateA.deleted ?? [],
            ...updateB.deleted ?? []
        ]);
        if (updateB.added != null) {
            for (const moduleId of updateB.added){
                deleted.delete(moduleId);
            }
        }
        if (updateB.deleted != null) {
            for (const moduleId of updateB.deleted){
                added.delete(moduleId);
            }
        }
        return {
            type: 'partial',
            added: [
                ...added
            ],
            deleted: [
                ...deleted
            ]
        };
    }
    if (updateA.type === 'added' && updateB.type === 'partial') {
        const modules = new Set([
            ...updateA.modules ?? [],
            ...updateB.added ?? []
        ]);
        for (const moduleId of updateB.deleted ?? []){
            modules.delete(moduleId);
        }
        return {
            type: 'added',
            modules: [
                ...modules
            ]
        };
    }
    if (updateA.type === 'partial' && updateB.type === 'deleted') {
        // We could eagerly return `updateB` here, but this would potentially be
        // incorrect if `updateA` has added modules.
        const modules = new Set(updateB.modules ?? []);
        if (updateA.added != null) {
            for (const moduleId of updateA.added){
                modules.delete(moduleId);
            }
        }
        return {
            type: 'deleted',
            modules: [
                ...modules
            ]
        };
    }
    // Any other update combination is invalid.
    return undefined;
}
function invariant(_, message) {
    throw new Error(`Invariant: ${message}`);
}
const CRITICAL = [
    'bug',
    'error',
    'fatal'
];
function compareByList(list, a, b) {
    const aI = list.indexOf(a) + 1 || list.length;
    const bI = list.indexOf(b) + 1 || list.length;
    return aI - bI;
}
const chunksWithIssues = new Map();
function emitIssues() {
    const issues = [];
    const deduplicationSet = new Set();
    for (const [_, chunkIssues] of chunksWithIssues){
        for (const chunkIssue of chunkIssues){
            if (deduplicationSet.has(chunkIssue.formatted)) continue;
            issues.push(chunkIssue);
            deduplicationSet.add(chunkIssue.formatted);
        }
    }
    sortIssues(issues);
    hooks.issues(issues);
}
function handleIssues(msg) {
    const key = resourceKey(msg.resource);
    let hasCriticalIssues = false;
    for (const issue of msg.issues){
        if (CRITICAL.includes(issue.severity)) {
            hasCriticalIssues = true;
        }
    }
    if (msg.issues.length > 0) {
        chunksWithIssues.set(key, msg.issues);
    } else if (chunksWithIssues.has(key)) {
        chunksWithIssues.delete(key);
    }
    emitIssues();
    return hasCriticalIssues;
}
const SEVERITY_ORDER = [
    'bug',
    'fatal',
    'error',
    'warning',
    'info',
    'log'
];
const CATEGORY_ORDER = [
    'parse',
    'resolve',
    'code generation',
    'rendering',
    'typescript',
    'other'
];
function sortIssues(issues) {
    issues.sort((a, b)=>{
        const first = compareByList(SEVERITY_ORDER, a.severity, b.severity);
        if (first !== 0) return first;
        return compareByList(CATEGORY_ORDER, a.category, b.category);
    });
}
const hooks = {
    beforeRefresh: ()=>{},
    refresh: ()=>{},
    buildOk: ()=>{},
    issues: (_issues)=>{}
};
function setHooks(newHooks) {
    Object.assign(hooks, newHooks);
}
function handleSocketMessage(msg) {
    sortIssues(msg.issues);
    handleIssues(msg);
    switch(msg.type){
        case 'issues':
            break;
        case 'partial':
            // aggregate updates
            aggregateUpdates(msg);
            break;
        default:
            // run single update
            const runHooks = chunkListsWithPendingUpdates.size === 0;
            if (runHooks) hooks.beforeRefresh();
            triggerUpdate(msg);
            if (runHooks) finalizeUpdate();
            break;
    }
}
function finalizeUpdate() {
    hooks.refresh();
    hooks.buildOk();
    // This is used by the Next.js integration test suite to notify it when HMR
    // updates have been completed.
    // TODO: Only run this in test environments (gate by `process.env.__NEXT_TEST_MODE`)
    if (globalThis.__NEXT_HMR_CB) {
        globalThis.__NEXT_HMR_CB();
        globalThis.__NEXT_HMR_CB = null;
    }
}
function subscribeToChunkUpdate(chunkListPath, sendMessage, callback) {
    return subscribeToUpdate({
        path: chunkListPath
    }, sendMessage, callback);
}
function subscribeToUpdate(resource, sendMessage, callback) {
    const key = resourceKey(resource);
    let callbackSet;
    const existingCallbackSet = updateCallbackSets.get(key);
    if (!existingCallbackSet) {
        callbackSet = {
            callbacks: new Set([
                callback
            ]),
            unsubscribe: subscribeToUpdates(sendMessage, resource)
        };
        updateCallbackSets.set(key, callbackSet);
    } else {
        existingCallbackSet.callbacks.add(callback);
        callbackSet = existingCallbackSet;
    }
    return ()=>{
        callbackSet.callbacks.delete(callback);
        if (callbackSet.callbacks.size === 0) {
            callbackSet.unsubscribe();
            updateCallbackSets.delete(key);
        }
    };
}
function triggerUpdate(msg) {
    const key = resourceKey(msg.resource);
    const callbackSet = updateCallbackSets.get(key);
    if (!callbackSet) {
        return;
    }
    for (const callback of callbackSet.callbacks){
        callback(msg);
    }
    if (msg.type === 'notFound') {
        // This indicates that the resource which we subscribed to either does not exist or
        // has been deleted. In either case, we should clear all update callbacks, so if a
        // new subscription is created for the same resource, it will send a new "subscribe"
        // message to the server.
        // No need to send an "unsubscribe" message to the server, it will have already
        // dropped the update stream before sending the "notFound" message.
        updateCallbackSets.delete(key);
    }
}
}),
"[project]/src/utils/safeStorage.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "safeLocalStorage",
    ()=>safeLocalStorage,
    "safeSessionStorage",
    ()=>safeSessionStorage
]);
const isBrowser = ("TURBOPACK compile-time value", "object") !== 'undefined';
const safeSessionStorage = {
    get: (key)=>("TURBOPACK compile-time truthy", 1) ? window.sessionStorage.getItem(key) : "TURBOPACK unreachable",
    set: (key, value)=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        window.sessionStorage.setItem(key, value);
        return value;
    },
    remove: (key)=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        window.sessionStorage.removeItem(key);
        return null;
    }
};
const safeLocalStorage = {
    get: (key)=>("TURBOPACK compile-time truthy", 1) ? window.localStorage.getItem(key) : "TURBOPACK unreachable",
    set: (key, value)=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        window.localStorage.setItem(key, value);
        return value;
    },
    remove: (key)=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        window.localStorage.removeItem(key);
        return null;
    }
};
const __TURBOPACK__default__export__ = safeSessionStorage;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/utils/axiosConfigNew.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "serverUrl",
    ()=>serverUrl
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$1_$40$babel$2b$core$40$7$2e$2_002c6875e2cc4925b70c9aa5d4dde4bf$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.1_@babel+core@7.2_002c6875e2cc4925b70c9aa5d4dde4bf/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$axios$40$1$2e$13$2e$2$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/axios@1.13.2/node_modules/axios/lib/axios.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$toastify$40$11$2e$0$2e$5_react_44b200bfef41235b57e0bc42b6edd101$2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react-toastify@11.0.5_react_44b200bfef41235b57e0bc42b6edd101/node_modules/react-toastify/dist/index.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$safeStorage$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/safeStorage.js [client] (ecmascript)");
;
;
;
const serverUrl = ("TURBOPACK compile-time value", "http://app.arbaeentv.com/api/");
const axiosInstanceNew = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$axios$40$1$2e$13$2e$2$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].create({
    baseURL: serverUrl,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
    }
});
axiosInstanceNew.interceptors.request.use((config)=>{
    const token = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$safeStorage$2e$js__$5b$client$5d$__$28$ecmascript$29$__["safeSessionStorage"].get("token");
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
            msgs.forEach((msg)=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$toastify$40$11$2e$0$2e$5_react_44b200bfef41235b57e0bc42b6edd101$2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["toast"].error(msg, {
                    position: "top-right",
                    theme: "colored"
                }));
        });
    } else if (data?.message) {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$toastify$40$11$2e$0$2e$5_react_44b200bfef41235b57e0bc42b6edd101$2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["toast"].error(String(data.message), {
            position: "top-right",
            theme: "colored"
        });
    }
    if (status === 401 || status === 403) {
        if ("TURBOPACK compile-time truthy", 1) {
            window.location.href = "/login";
        }
    }
    return Promise.reject(error);
});
const __TURBOPACK__default__export__ = axiosInstanceNew;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/services/videoApi.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$axiosConfigNew$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/axiosConfigNew.js [client] (ecmascript)");
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
    const res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$axiosConfigNew$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].post("/video/upload", fd, {
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
    const res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$axiosConfigNew$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].post(url, fd, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
    return res.data;
};
const getVideosByChannel = async (channelId, page = 1, per_page = 25)=>{
    const res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$axiosConfigNew$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].get(`/video/${channelId}`, {
        params: {
            page,
            per_page
        }
    });
    return mapPaginatedResponse(res.data);
};
const getVideoDetail = async (id)=>{
    const res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$axiosConfigNew$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].get(`/video/show/${id}`);
    return res.data;
};
const getAllVideos = async (page = 1, per_page = 25)=>{
    const res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$axiosConfigNew$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].get("/video", {
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
    const res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$axiosConfigNew$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].get(`/landing/channels?${queryString}`);
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
    const res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$axiosConfigNew$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].get(url);
    // استفاده از mapPaginatedResponse موجود
    return mapPaginatedResponse(res.data);
};
const getSearch = async (q)=>{
    const res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$axiosConfigNew$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].get(`/search/${encodeURIComponent(q)}`);
    return res.data;
};
const deleteVideo = async (id)=>{
    const res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$axiosConfigNew$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].delete(`/video/delete/${id}`);
    return res.data;
};
const updateVideo = async (videoId, { title, description, coverFile })=>{
    const fd = new FormData();
    fd.append("title", title || "");
    fd.append("description", description || "");
    if (coverFile) {
        fd.append("cover", coverFile);
    }
    const res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$axiosConfigNew$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].post(`/video/update-video/${videoId}`, fd, {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/useChannelVideos.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$90$2e$10_react$40$19$2e$2$2e$0$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tanstack+react-query@5.90.10_react@19.2.0/node_modules/@tanstack/react-query/build/modern/useQuery.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$videoApi$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/videoApi.js [client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
const useChannelVideos = ({ channelId, pageNumber = 1, pageSize = 25 } = {})=>{
    _s();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$90$2e$10_react$40$19$2e$2$2e$0$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'channelVideos',
            channelId || 'all',
            pageNumber,
            pageSize
        ],
        queryFn: {
            "useChannelVideos.useQuery": ()=>{
                if (!channelId || channelId === '') {
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$videoApi$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getAllVideos"])(pageNumber, pageSize);
                }
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$videoApi$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getVideosByChannel"])(channelId, pageNumber, pageSize);
            }
        }["useChannelVideos.useQuery"],
        enabled: true
    });
};
_s(useChannelVideos, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$90$2e$10_react$40$19$2e$2$2e$0$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
const __TURBOPACK__default__export__ = useChannelVideos;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/useVideo.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "useVideo",
    ()=>useVideo
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$90$2e$10_react$40$19$2e$2$2e$0$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tanstack+react-query@5.90.10_react@19.2.0/node_modules/@tanstack/react-query/build/modern/useQuery.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$videoApi$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/videoApi.js [client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
const useVideo = (id)=>{
    _s();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$90$2e$10_react$40$19$2e$2$2e$0$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'video',
            id
        ],
        queryFn: {
            "useVideo.useQuery": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$videoApi$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getVideoDetail"])(id)
        }["useVideo.useQuery"],
        enabled: !!id
    });
};
_s(useVideo, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$90$2e$10_react$40$19$2e$2$2e$0$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
const __TURBOPACK__default__export__ = useVideo;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/assets/logo/logo-01-01.png (static in ecmascript, tag client)", ((__turbopack_context__) => {

__turbopack_context__.q("/_next/static/media/logo-01-01.0tufgn5xtz74..png");}),
"[project]/src/assets/logo/logo-01-01.png.mjs { IMAGE => \"[project]/src/assets/logo/logo-01-01.png (static in ecmascript, tag client)\" } [client] (structured image object with data url, ecmascript)", ((__turbopack_context__) => {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/services/signInApi.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "signIn",
    ()=>signIn,
    "signOut",
    ()=>signOut
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$axiosConfigNew$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/axiosConfigNew.js [client] (ecmascript)");
;
const signIn = async (data)=>{
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$axiosConfigNew$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].post("/auth/login", data);
    return response.data;
};
const signOut = async ()=>{
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$axiosConfigNew$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].post("/auth/logout");
    return response.data;
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/useLogin.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$90$2e$10_react$40$19$2e$2$2e$0$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tanstack+react-query@5.90.10_react@19.2.0/node_modules/@tanstack/react-query/build/modern/useMutation.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react@19.2.0/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$toastify$40$11$2e$0$2e$5_react_44b200bfef41235b57e0bc42b6edd101$2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react-toastify@11.0.5_react_44b200bfef41235b57e0bc42b6edd101/node_modules/react-toastify/dist/index.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$signInApi$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/signInApi.js [client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
;
;
const useLogin = ()=>{
    _s();
    const [verifyPhoneNumber, setVerifyPhoneNumber] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [codeOtp, setcodeOtp] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [phoneNumber, setPhoneNumber] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])("");
    // [02] - Post logout hook
    const logOut = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$90$2e$10_react$40$19$2e$2$2e$0$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$signInApi$2e$js__$5b$client$5d$__$28$ecmascript$29$__["signOut"],
        onSuccess: {
            "useLogin.useMutation[logOut]": (res)=>{
                sessionStorage.removeItem("token");
                sessionStorage.removeItem("user_id");
                sessionStorage.removeItem("role");
                sessionStorage.removeItem("channel_id");
                const message = res?.message || "با موفقیت از حساب کاربری خارج شدید";
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$toastify$40$11$2e$0$2e$5_react_44b200bfef41235b57e0bc42b6edd101$2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["toast"].success(message, {
                    position: "top-right",
                    theme: "colored"
                });
                window.location.href = "/login";
            }
        }["useLogin.useMutation[logOut]"],
        onError: {
            "useLogin.useMutation[logOut]": (error)=>{
                console.error("Logout error:", error);
                // حتی در صورت خطا، token را پاک می‌کنیم
                sessionStorage.removeItem("token");
                sessionStorage.removeItem("user_id");
                sessionStorage.removeItem("role");
                sessionStorage.removeItem("channel_id");
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$toastify$40$11$2e$0$2e$5_react_44b200bfef41235b57e0bc42b6edd101$2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["toast"].error("خطا در خروج از حساب کاربری", {
                    position: "top-right",
                    theme: "colored"
                });
                window.location.href = "/login";
            }
        }["useLogin.useMutation[logOut]"]
    });
    const goSigIn = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$90$2e$10_react$40$19$2e$2$2e$0$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$signInApi$2e$js__$5b$client$5d$__$28$ecmascript$29$__["signIn"],
        onSuccess: {
            "useLogin.useMutation[goSigIn]": (res)=>{
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
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$toastify$40$11$2e$0$2e$5_react_44b200bfef41235b57e0bc42b6edd101$2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["toast"].success("ورود با موفقیت انجام شد", {
                        position: "top-right",
                        theme: "colored"
                    });
                    window.location.href = roleName === "admin" ? "/dashboard/user-videos" : "/dashboard/channels";
                } else {
                    setVerifyPhoneNumber(false);
                    setcodeOtp(false);
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$toastify$40$11$2e$0$2e$5_react_44b200bfef41235b57e0bc42b6edd101$2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["toast"].error("خطا در دریافت اطلاعات کاربر", {
                        position: "top-right",
                        theme: "colored"
                    });
                }
                if (user?.phone_number) {
                    setPhoneNumber(user.phone_number);
                }
            }
        }["useLogin.useMutation[goSigIn]"],
        onError: {
            "useLogin.useMutation[goSigIn]": (error)=>{
                console.error("Login error:", error);
                setVerifyPhoneNumber(false);
                setcodeOtp(false);
                // خطاها توسط axios interceptor مدیریت می‌شوند، اما اگر خطای خاصی بود اینجا هم نمایش می‌دهیم
                const errorMessage = error?.response?.data?.message || "ورود ناموفق بود. لطفاً دوباره تلاش کنید.";
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$toastify$40$11$2e$0$2e$5_react_44b200bfef41235b57e0bc42b6edd101$2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["toast"].error(errorMessage, {
                    position: "top-right",
                    theme: "colored"
                });
            }
        }["useLogin.useMutation[goSigIn]"]
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
_s(useLogin, "2sOLscM86B/nab9CGDKD9c4U108=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$90$2e$10_react$40$19$2e$2$2e$0$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useMutation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$90$2e$10_react$40$19$2e$2$2e$0$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
const __TURBOPACK__default__export__ = useLogin;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/assets/img/cover.jpg (static in ecmascript, tag client)", ((__turbopack_context__) => {

__turbopack_context__.q("/_next/static/media/cover.0j7m_iz7_ln1h.jpg");}),
"[project]/src/assets/img/cover.jpg.mjs { IMAGE => \"[project]/src/assets/img/cover.jpg (static in ecmascript, tag client)\" } [client] (structured image object with data url, ecmascript)", ((__turbopack_context__) => {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/SearchInput.jsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react@19.2.0/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$1_$40$babel$2b$core$40$7$2e$2_002c6875e2cc4925b70c9aa5d4dde4bf$2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.1_@babel+core@7.2_002c6875e2cc4925b70c9aa5d4dde4bf/node_modules/next/router.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react@19.2.0/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$iconsax$2d$react$40$0$2e$0$2e$8_react$40$19$2e$2$2e$0$2f$node_modules$2f$iconsax$2d$react$2f$dist$2f$esm$2f$SearchNormal1$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SearchNormal1$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/iconsax-react@0.0.8_react@19.2.0/node_modules/iconsax-react/dist/esm/SearchNormal1.js [client] (ecmascript) <export default as SearchNormal1>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$iconsax$2d$react$40$0$2e$0$2e$8_react$40$19$2e$2$2e$0$2f$node_modules$2f$iconsax$2d$react$2f$dist$2f$esm$2f$CloseCircle$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CloseCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/iconsax-react@0.0.8_react@19.2.0/node_modules/iconsax-react/dist/esm/CloseCircle.js [client] (ecmascript) <export default as CloseCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$90$2e$10_react$40$19$2e$2$2e$0$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tanstack+react-query@5.90.10_react@19.2.0/node_modules/@tanstack/react-query/build/modern/useQuery.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$videoApi$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/videoApi.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$assets$2f$img$2f$cover$2e$jpg$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$src$2f$assets$2f$img$2f$cover$2e$jpg__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/src/assets/img/cover.jpg.mjs { IMAGE => "[project]/src/assets/img/cover.jpg (static in ecmascript, tag client)" } [client] (structured image object with data url, ecmascript)');
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
;
function SearchInput() {
    _s();
    const [q, setQ] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [debouncedQ, setDebouncedQ] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('');
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$1_$40$babel$2b$core$40$7$2e$2_002c6875e2cc4925b70c9aa5d4dde4bf$2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const pathname = router.asPath;
    const onSubmit = (e)=>{
        e.preventDefault();
        if (!q.trim()) return;
        router.push(`/search/${encodeURIComponent(q.trim())}`);
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SearchInput.useEffect": ()=>{
            const t = setTimeout({
                "SearchInput.useEffect.t": ()=>setDebouncedQ(q.trim())
            }["SearchInput.useEffect.t"], 300);
            return ({
                "SearchInput.useEffect": ()=>clearTimeout(t)
            })["SearchInput.useEffect"];
        }
    }["SearchInput.useEffect"], [
        q
    ]);
    const { data: searchData } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$90$2e$10_react$40$19$2e$2$2e$0$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'search-inline',
            debouncedQ
        ],
        queryFn: {
            "SearchInput.useQuery": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$videoApi$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getSearch"])(debouncedQ)
        }["SearchInput.useQuery"],
        enabled: debouncedQ.length >= 2
    });
    const inlineVideos = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "SearchInput.useMemo[inlineVideos]": ()=>{
            const payload = searchData?.data;
            if (!payload) return [];
            if (Array.isArray(payload)) return payload;
            if (payload.videos) {
                if (Array.isArray(payload.videos)) {
                    const sample = payload.videos[0];
                    if (sample && Array.isArray(sample.videos)) {
                        return payload.videos.flatMap({
                            "SearchInput.useMemo[inlineVideos]": (v)=>Array.isArray(v.videos) ? v.videos.flat() : []
                        }["SearchInput.useMemo[inlineVideos]"]);
                    }
                    return payload.videos;
                }
            }
            return [];
        }
    }["SearchInput.useMemo[inlineVideos]"], [
        searchData
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
        onSubmit: onSubmit,
        className: "flex-1 max-w-xl",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative group",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
                q && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    onClick: ()=>{
                        setQ('');
                        if (pathname.startsWith('/search')) router.push('/');
                    },
                    className: "absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-gray-200 active:bg-gray-300 transition-colors",
                    "aria-label": "حذف جستجو",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$iconsax$2d$react$40$0$2e$0$2e$8_react$40$19$2e$2$2e$0$2f$node_modules$2f$iconsax$2d$react$2f$dist$2f$esm$2f$CloseCircle$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CloseCircle$3e$__["CloseCircle"], {
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
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "submit",
                    className: "absolute left-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-gray-200 active:bg-gray-300 transition-colors",
                    "aria-label": "جستجو",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$iconsax$2d$react$40$0$2e$0$2e$8_react$40$19$2e$2$2e$0$2f$node_modules$2f$iconsax$2d$react$2f$dist$2f$esm$2f$SearchNormal1$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SearchNormal1$3e$__["SearchNormal1"], {
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
                inlineVideos.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute z-50 mt-2 left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "px-4 py-2 text-xs font-medium text-gray-600 border-b border-gray-100",
                            children: "نتایج جستجو"
                        }, void 0, false, {
                            fileName: "[project]/src/components/SearchInput.jsx",
                            lineNumber: 84,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                            className: "max-h-64 overflow-auto",
                            children: [
                                inlineVideos.slice(0, 8).map((v)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>router.push(`/v/${v.id}`),
                                            className: "w-full text-right px-4 py-3 hover:bg-gray-50 flex items-center gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                    src: (()=>{
                                                        const raw = v.cover_link || v.cover;
                                                        return typeof raw === 'string' ? raw.replace(/[`'"]/g, '').trim() || __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$assets$2f$img$2f$cover$2e$jpg$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$src$2f$assets$2f$img$2f$cover$2e$jpg__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__["default"] : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$assets$2f$img$2f$cover$2e$jpg$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$src$2f$assets$2f$img$2f$cover$2e$jpg__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__["default"];
                                                    })(),
                                                    alt: v.title,
                                                    className: "w-12 h-7 rounded object-cover bg-gray-200",
                                                    onError: (e)=>{
                                                        e.target.src = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$assets$2f$img$2f$cover$2e$jpg$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$src$2f$assets$2f$img$2f$cover$2e$jpg__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__["default"];
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/SearchInput.jsx",
                                                    lineNumber: 95,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex-1 min-w-0",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-sm font-medium text-gray-900 truncate",
                                                            children: v.title
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/SearchInput.jsx",
                                                            lineNumber: 105,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                inlineVideos.length > 8 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
_s(SearchInput, "zUhung7PaXNuka/F3k281vtaxdU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$1_$40$babel$2b$core$40$7$2e$2_002c6875e2cc4925b70c9aa5d4dde4bf$2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$90$2e$10_react$40$19$2e$2$2e$0$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
_c = SearchInput;
const __TURBOPACK__default__export__ = SearchInput;
var _c;
__turbopack_context__.k.register(_c, "SearchInput");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/Navbar.jsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react@19.2.0/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$iconsax$2d$react$40$0$2e$0$2e$8_react$40$19$2e$2$2e$0$2f$node_modules$2f$iconsax$2d$react$2f$dist$2f$esm$2f$CloseCircle$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CloseCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/iconsax-react@0.0.8_react@19.2.0/node_modules/iconsax-react/dist/esm/CloseCircle.js [client] (ecmascript) <export default as CloseCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$iconsax$2d$react$40$0$2e$0$2e$8_react$40$19$2e$2$2e$0$2f$node_modules$2f$iconsax$2d$react$2f$dist$2f$esm$2f$Logout$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Logout$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/iconsax-react@0.0.8_react@19.2.0/node_modules/iconsax-react/dist/esm/Logout.js [client] (ecmascript) <export default as Logout>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$iconsax$2d$react$40$0$2e$0$2e$8_react$40$19$2e$2$2e$0$2f$node_modules$2f$iconsax$2d$react$2f$dist$2f$esm$2f$Menu$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/iconsax-react@0.0.8_react@19.2.0/node_modules/iconsax-react/dist/esm/Menu.js [client] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$iconsax$2d$react$40$0$2e$0$2e$8_react$40$19$2e$2$2e$0$2f$node_modules$2f$iconsax$2d$react$2f$dist$2f$esm$2f$SearchNormal1$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SearchNormal1$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/iconsax-react@0.0.8_react@19.2.0/node_modules/iconsax-react/dist/esm/SearchNormal1.js [client] (ecmascript) <export default as SearchNormal1>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$iconsax$2d$react$40$0$2e$0$2e$8_react$40$19$2e$2$2e$0$2f$node_modules$2f$iconsax$2d$react$2f$dist$2f$esm$2f$User$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/iconsax-react@0.0.8_react@19.2.0/node_modules/iconsax-react/dist/esm/User.js [client] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react@19.2.0/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$1_$40$babel$2b$core$40$7$2e$2_002c6875e2cc4925b70c9aa5d4dde4bf$2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.1_@babel+core@7.2_002c6875e2cc4925b70c9aa5d4dde4bf/node_modules/next/link.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$assets$2f$logo$2f$logo$2d$01$2d$01$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$src$2f$assets$2f$logo$2f$logo$2d$01$2d$01$2e$png__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/src/assets/logo/logo-01-01.png.mjs { IMAGE => "[project]/src/assets/logo/logo-01-01.png (static in ecmascript, tag client)" } [client] (structured image object with data url, ecmascript)');
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useLogin$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useLogin.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SearchInput$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/SearchInput.jsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$safeStorage$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/safeStorage.js [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
;
;
function Navbar() {
    _s();
    const [isSidebarOpen, setIsSidebarOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isSearchOpen, setIsSearchOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const { LogOut, isLoggingOut } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useLogin$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"])();
    const [isAuthenticated, setIsAuthenticated] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
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
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Navbar.useEffect": ()=>{
            setIsAuthenticated(!!__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$safeStorage$2e$js__$5b$client$5d$__$28$ecmascript$29$__["safeSessionStorage"].get("token"));
        }
    }["Navbar.useEffect"], []);
    // Prevent body scroll when sidebar is open
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Navbar.useEffect": ()=>{
            if (isSidebarOpen) {
                document.body.style.overflow = "hidden";
            } else {
                document.body.style.overflow = "";
            }
            return ({
                "Navbar.useEffect": ()=>{
                    document.body.style.overflow = "";
                }
            })["Navbar.useEffect"];
        }
    }["Navbar.useEffect"], [
        isSidebarOpen
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-w-7xl w-full mx-auto flex justify-center items-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-full justify-between px-3 sm:px-4 md:px-6 py-2.5 md:py-3 flex items-center gap-2 sm:gap-3 md:gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: toggleSidebar,
                                    className: "md:hidden p-2 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors text-slate-900 touch-manipulation",
                                    "aria-label": "منو",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$iconsax$2d$react$40$0$2e$0$2e$8_react$40$19$2e$2$2e$0$2f$node_modules$2f$iconsax$2d$react$2f$dist$2f$esm$2f$Menu$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$1_$40$babel$2b$core$40$7$2e$2_002c6875e2cc4925b70c9aa5d4dde4bf$2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/",
                                    onClick: closeSidebar,
                                    className: "flex items-center gap-2",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$assets$2f$logo$2f$logo$2d$01$2d$01$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$src$2f$assets$2f$logo$2f$logo$2d$01$2d$01$2e$png__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__["default"],
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "hidden md:block flex-1 max-w-2xl mx-8",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SearchInput$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                        fileName: "[project]/src/components/Navbar.jsx",
                                        lineNumber: 73,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Navbar.jsx",
                                    lineNumber: 72,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: toggleSearch,
                                    className: "md:hidden p-2 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors  text-slate-900 touch-manipulation",
                                    "aria-label": "جستجو",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$iconsax$2d$react$40$0$2e$0$2e$8_react$40$19$2e$2$2e$0$2f$node_modules$2f$iconsax$2d$react$2f$dist$2f$esm$2f$SearchNormal1$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SearchNormal1$3e$__["SearchNormal1"], {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "hidden md:flex items-center gap-3 ",
                                    children: isAuthenticated ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$1_$40$babel$2b$core$40$7$2e$2_002c6875e2cc4925b70c9aa5d4dde4bf$2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/dashboard",
                                                className: "h-10 px-4 rounded-full border border-gray-300 bg-white hover:bg-gray-50 active:bg-gray-100 text-sm font-medium flex items-center gap-2 text-slate-900 transition-colors shadow-sm hover:shadow",
                                                children: "مدیریت کانال‌ها"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Navbar.jsx",
                                                lineNumber: 98,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: handleLogout,
                                                disabled: isLoggingOut,
                                                className: "h-10 px-4 rounded-full border border-red-300 bg-white hover:bg-red-50 active:bg-red-100 text-sm font-medium flex items-center gap-2 text-red-600 transition-colors shadow-sm hover:shadow disabled:opacity-50 disabled:cursor-not-allowed",
                                                title: "خروج از حساب کاربری",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$iconsax$2d$react$40$0$2e$0$2e$8_react$40$19$2e$2$2e$0$2f$node_modules$2f$iconsax$2d$react$2f$dist$2f$esm$2f$Logout$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Logout$3e$__["Logout"], {
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
                                    }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$1_$40$babel$2b$core$40$7$2e$2_002c6875e2cc4925b70c9aa5d4dde4bf$2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/login",
                                        className: "h-10 px-4 rounded-full border border-gray-300 bg-white hover:bg-gray-50 active:bg-gray-100 text-sm font-medium flex items-center gap-2 text-slate-900 transition-colors shadow-sm hover:shadow",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$iconsax$2d$react$40$0$2e$0$2e$8_react$40$19$2e$2$2e$0$2f$node_modules$2f$iconsax$2d$react$2f$dist$2f$esm$2f$User$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
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
                    isSearchOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "md:hidden px-3 sm:px-4 pb-3",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SearchInput$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
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
            isSidebarOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 bg-black/50 z-40 md:hidden animate-in fade-in duration-300",
                onClick: closeSidebar
            }, void 0, false, {
                fileName: "[project]/src/components/Navbar.jsx",
                lineNumber: 137,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                className: `fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col h-full",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between p-4 border-b border-gray-200",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-xl font-extrabold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent",
                                    children: "منو"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Navbar.jsx",
                                    lineNumber: 151,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: closeSidebar,
                                    className: "p-2 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors touch-manipulation",
                                    "aria-label": "بستن منو",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$iconsax$2d$react$40$0$2e$0$2e$8_react$40$19$2e$2$2e$0$2f$node_modules$2f$iconsax$2d$react$2f$dist$2f$esm$2f$CloseCircle$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CloseCircle$3e$__["CloseCircle"], {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 overflow-y-auto",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                                    className: "p-4 space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$1_$40$babel$2b$core$40$7$2e$2_002c6875e2cc4925b70c9aa5d4dde4bf$2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/",
                                            onClick: closeSidebar,
                                            className: "flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors text-gray-900 font-medium",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                        isAuthenticated && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$1_$40$babel$2b$core$40$7$2e$2_002c6875e2cc4925b70c9aa5d4dde4bf$2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/dashboard/channels",
                                            onClick: closeSidebar,
                                            className: "flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors text-gray-900 font-medium",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "border-t border-gray-200 p-4",
                            children: isAuthenticated ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleLogout,
                                disabled: isLoggingOut,
                                className: "w-full h-12 rounded-lg bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 active:scale-[0.98] text-white font-medium flex items-center justify-center gap-2 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$iconsax$2d$react$40$0$2e$0$2e$8_react$40$19$2e$2$2e$0$2f$node_modules$2f$iconsax$2d$react$2f$dist$2f$esm$2f$Logout$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Logout$3e$__["Logout"], {
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
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$1_$40$babel$2b$core$40$7$2e$2_002c6875e2cc4925b70c9aa5d4dde4bf$2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/login",
                                onClick: closeSidebar,
                                className: "w-full h-12 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 hover:from-blue-700 hover:to-purple-700 active:scale-[0.98] text-white font-medium flex items-center justify-center gap-2 transition-all duration-200 shadow-lg",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$iconsax$2d$react$40$0$2e$0$2e$8_react$40$19$2e$2$2e$0$2f$node_modules$2f$iconsax$2d$react$2f$dist$2f$esm$2f$User$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
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
_s(Navbar, "UOS1L1uBtIResW/gA5CA546S0ms=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useLogin$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"]
    ];
});
_c = Navbar;
const __TURBOPACK__default__export__ = Navbar;
var _c;
__turbopack_context__.k.register(_c, "Navbar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/Footer.jsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react@19.2.0/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$1_$40$babel$2b$core$40$7$2e$2_002c6875e2cc4925b70c9aa5d4dde4bf$2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.1_@babel+core@7.2_002c6875e2cc4925b70c9aa5d4dde4bf/node_modules/next/link.js [client] (ecmascript)");
;
;
function Footer() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
        className: "mt-12 sm:mt-16 border-t border-gray-200 bg-white",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mx-auto max-w-7xl px-4 sm:px-6 py-6 sm:py-8",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pt-4 sm:pt-6 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-4 sm:gap-6 text-xs sm:text-sm text-gray-600",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$1_$40$babel$2b$core$40$7$2e$2_002c6875e2cc4925b70c9aa5d4dde4bf$2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/",
                                className: "hover:text-blue-600 transition-colors",
                                children: "حریم خصوصی"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Footer.jsx",
                                lineNumber: 46,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$1_$40$babel$2b$core$40$7$2e$2_002c6875e2cc4925b70c9aa5d4dde4bf$2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
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
_c = Footer;
const __TURBOPACK__default__export__ = Footer;
var _c;
__turbopack_context__.k.register(_c, "Footer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/layouts/Layout.jsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react@19.2.0/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Navbar$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Navbar.jsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Footer$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Footer.jsx [client] (ecmascript)");
;
;
;
function Layout({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-slate-50 text-slate-900 flex flex-col",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Navbar$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/src/layouts/Layout.jsx",
                lineNumber: 7,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "flex-1 w-full",
                children: children
            }, void 0, false, {
                fileName: "[project]/src/layouts/Layout.jsx",
                lineNumber: 8,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Footer$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
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
_c = Layout;
const __TURBOPACK__default__export__ = Layout;
var _c;
__turbopack_context__.k.register(_c, "Layout");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/next/navigationState.js [client] (ecmascript)", ((__turbopack_context__) => {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/pages/Video.jsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$1_$40$babel$2b$core$40$7$2e$2_002c6875e2cc4925b70c9aa5d4dde4bf$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.1_@babel+core@7.2_002c6875e2cc4925b70c9aa5d4dde4bf/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react@19.2.0/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$axios$40$1$2e$13$2e$2$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/axios@1.13.2/node_modules/axios/lib/axios.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$iconsax$2d$react$40$0$2e$0$2e$8_react$40$19$2e$2$2e$0$2f$node_modules$2f$iconsax$2d$react$2f$dist$2f$esm$2f$Eye$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/iconsax-react@0.0.8_react@19.2.0/node_modules/iconsax-react/dist/esm/Eye.js [client] (ecmascript) <export default as Eye>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react@19.2.0/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$1_$40$babel$2b$core$40$7$2e$2_002c6875e2cc4925b70c9aa5d4dde4bf$2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.1_@babel+core@7.2_002c6875e2cc4925b70c9aa5d4dde4bf/node_modules/next/link.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$1_$40$babel$2b$core$40$7$2e$2_002c6875e2cc4925b70c9aa5d4dde4bf$2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.1_@babel+core@7.2_002c6875e2cc4925b70c9aa5d4dde4bf/node_modules/next/router.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$1_$40$babel$2b$core$40$7$2e$2_002c6875e2cc4925b70c9aa5d4dde4bf$2f$node_modules$2f$next$2f$head$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.1_@babel+core@7.2_002c6875e2cc4925b70c9aa5d4dde4bf/node_modules/next/head.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$toastify$40$11$2e$0$2e$5_react_44b200bfef41235b57e0bc42b6edd101$2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react-toastify@11.0.5_react_44b200bfef41235b57e0bc42b6edd101/node_modules/react-toastify/dist/index.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useChannelVideos$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useChannelVideos.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useVideo$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useVideo.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$layouts$2f$Layout$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/layouts/Layout.jsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$next$2f$navigationState$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/next/navigationState.js [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
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
const DownloadIcon = ({ size = 16, color = '#4a5565', className = '' })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: className,
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M12 3v12",
                stroke: color,
                strokeWidth: "1.6",
                strokeLinecap: "round",
                strokeLinejoin: "round"
            }, void 0, false, {
                fileName: "[project]/src/pages/Video.jsx",
                lineNumber: 15,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M8 11l4 4 4-4",
                stroke: color,
                strokeWidth: "1.6",
                strokeLinecap: "round",
                strokeLinejoin: "round"
            }, void 0, false, {
                fileName: "[project]/src/pages/Video.jsx",
                lineNumber: 16,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M21 21H3",
                stroke: color,
                strokeWidth: "1.6",
                strokeLinecap: "round",
                strokeLinejoin: "round"
            }, void 0, false, {
                fileName: "[project]/src/pages/Video.jsx",
                lineNumber: 17,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/pages/Video.jsx",
        lineNumber: 14,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c = DownloadIcon;
function Video() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$1_$40$babel$2b$core$40$7$2e$2_002c6875e2cc4925b70c9aa5d4dde4bf$2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const id = typeof router.query.id === 'string' ? router.query.id : '';
    const siteUrl = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$1_$40$babel$2b$core$40$7$2e$2_002c6875e2cc4925b70c9aa5d4dde4bf$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
    const { data, isLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useVideo$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useVideo"])(id);
    const { data: relatedVideos, isLoading: isRelatedLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useChannelVideos$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"])({
        channelId: data?.data?.channel_id,
        pageNumber: 1,
        pageSize: 25
    });
    const [isDownloading, setIsDownloading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [videoSource, setVideoSource] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Video.useEffect": ()=>{
            const src = data?.data?.video_link || data?.data?.videoUrl || '';
            setVideoSource(src);
        }
    }["Video.useEffect"], [
        data
    ]);
    const extractFilenameFromContentDisposition = (cd)=>{
        if (!cd) return null;
        // try filename*=
        let m = cd.match(/filename\*=(?:UTF-8'')?(.+)/i);
        if (m && m[1]) {
            try {
                const raw = m[1].trim().replace(/(^"|"$)/g, '');
                return decodeURIComponent(raw);
            } catch  {
                return m[1].replace(/(^"|"$)/g, '');
            }
        }
        m = cd.match(/filename="?([^"]+)"?/);
        if (m && m[1]) return m[1];
        return null;
    };
    const handleDownload = async ()=>{
        if (!videoSource) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$toastify$40$11$2e$0$2e$5_react_44b200bfef41235b57e0bc42b6edd101$2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["toast"].error('آدرس ویدیو موجود نیست');
            return;
        }
        if (isDownloading) return;
        setIsDownloading(true);
        const safeName = (data?.data?.title || 'video').replace(/[\/\\?%*:|"<>]/g, '-').slice(0, 120);
        try {
            // فقط از axios استفاده می‌کنیم (آدرس کامل است)
            const token = sessionStorage.getItem('token');
            const res = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$axios$40$1$2e$13$2e$2$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].get(videoSource, {
                responseType: 'blob',
                headers: {
                    ...token ? {
                        Authorization: `Bearer ${token}`
                    } : {}
                }
            });
            const blob = res.data;
            let ext = '.mp4';
            const mime = blob && blob.type || res.headers && (res.headers['content-type'] || res.headers['Content-Type']) || '';
            if (mime.includes('webm')) ext = '.webm';
            else if (mime.includes('ogg')) ext = '.ogg';
            else if (mime.includes('mp4')) ext = '.mp4';
            let downloadName = `${safeName}${ext}`;
            const cdHeader = res.headers && (res.headers['content-disposition'] || res.headers['Content-Disposition'] || '');
            const cdName = extractFilenameFromContentDisposition(cdHeader);
            if (cdName) downloadName = cdName;
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = downloadName;
            document.body.appendChild(a);
            a.click();
            a.remove();
            setTimeout(()=>URL.revokeObjectURL(url), 1000);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$toastify$40$11$2e$0$2e$5_react_44b200bfef41235b57e0bc42b6edd101$2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["toast"].success('دانلود شروع شد');
        } catch (err) {
            console.error('download error', err);
            // احتمال خطای CORS یا بلاک شدن توسط سرور
            // تلاش برای باز کردن لینک مستقیم به‌عنوان fallback
            try {
                window.open(videoSource, '_blank', 'noopener');
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$toastify$40$11$2e$0$2e$5_react_44b200bfef41235b57e0bc42b6edd101$2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["toast"].info('لینک ویدیو در تب جدید باز شد. در صورت نیاز می‌توانید روی آن راست‌کلیک و Save as کنید.');
            } catch (e) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$toastify$40$11$2e$0$2e$5_react_44b200bfef41235b57e0bc42b6edd101$2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["toast"].error('دانلود مستقیم ممکن نیست. لطفاً با پشتیبانی تماس بگیرید یا بعداً تلاش کنید.');
            }
        } finally{
            setIsDownloading(false);
        }
    };
    if (isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$layouts$2f$Layout$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-auto max-w-7xl px-3 sm:px-4 md:px-6 py-4 sm:py-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "animate-pulse",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "aspect-video bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg sm:rounded-xl"
                        }, void 0, false, {
                            fileName: "[project]/src/pages/Video.jsx",
                            lineNumber: 115,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-4 sm:mt-6 space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-6 sm:h-8 bg-gray-200 rounded w-3/4"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/Video.jsx",
                                    lineNumber: 117,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-3 sm:gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-200"
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/Video.jsx",
                                            lineNumber: 119,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex-1 space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "h-3 sm:h-4 bg-gray-200 rounded w-1/4"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/Video.jsx",
                                                    lineNumber: 121,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "h-2 sm:h-3 bg-gray-200 rounded w-1/3"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/Video.jsx",
                                                    lineNumber: 122,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/pages/Video.jsx",
                                            lineNumber: 120,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/pages/Video.jsx",
                                    lineNumber: 118,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/Video.jsx",
                            lineNumber: 116,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/pages/Video.jsx",
                    lineNumber: 114,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/pages/Video.jsx",
                lineNumber: 113,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/pages/Video.jsx",
            lineNumber: 112,
            columnNumber: 7
        }, this);
    }
    if (!data) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$layouts$2f$Layout$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-auto max-w-7xl px-4 md:px-6 py-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center py-12",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-red-600 text-lg font-medium",
                            children: "ویدیو یافت نشد"
                        }, void 0, false, {
                            fileName: "[project]/src/pages/Video.jsx",
                            lineNumber: 137,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-gray-500 mt-2",
                            children: "لطفاً آدرس را بررسی کنید"
                        }, void 0, false, {
                            fileName: "[project]/src/pages/Video.jsx",
                            lineNumber: 138,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/pages/Video.jsx",
                    lineNumber: 136,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/pages/Video.jsx",
                lineNumber: 135,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/pages/Video.jsx",
            lineNumber: 134,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$layouts$2f$Layout$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$1_$40$babel$2b$core$40$7$2e$2_002c6875e2cc4925b70c9aa5d4dde4bf$2f$node_modules$2f$next$2f$head$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("title", {
                        children: data?.data?.title ? `${data.data.title} | اربعین تی وی` : 'تماشای ویدیو | اربعین تی وی'
                    }, void 0, false, {
                        fileName: "[project]/src/pages/Video.jsx",
                        lineNumber: 148,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "description",
                        content: data?.data?.description || 'تماشای ویدیو در اربعین تی وی'
                    }, void 0, false, {
                        fileName: "[project]/src/pages/Video.jsx",
                        lineNumber: 149,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        property: "og:title",
                        content: data?.data?.title || 'تماشای ویدیو در اربعین تی وی'
                    }, void 0, false, {
                        fileName: "[project]/src/pages/Video.jsx",
                        lineNumber: 150,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        property: "og:description",
                        content: data?.data?.description || 'تماشای ویدیو در اربعین تی وی'
                    }, void 0, false, {
                        fileName: "[project]/src/pages/Video.jsx",
                        lineNumber: 151,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        property: "og:image",
                        content: data?.data?.thumbnailUrl || data?.data?.cover_link || data?.data?.cover || '/vite.svg'
                    }, void 0, false, {
                        fileName: "[project]/src/pages/Video.jsx",
                        lineNumber: 152,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "twitter:card",
                        content: "summary_large_image"
                    }, void 0, false, {
                        fileName: "[project]/src/pages/Video.jsx",
                        lineNumber: 153,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("link", {
                        rel: "canonical",
                        href: `${siteUrl}/v/${id || ''}`
                    }, void 0, false, {
                        fileName: "[project]/src/pages/Video.jsx",
                        lineNumber: 154,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/Video.jsx",
                lineNumber: 147,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-auto max-w-7xl px-3 sm:px-4 md:px-6 py-4 sm:py-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid gap-4 sm:gap-6 lg:grid-cols-[minmax(0,1fr)_400px]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative aspect-video w-full overflow-hidden rounded-lg sm:rounded-xl bg-black shadow-lg",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                                        controls: true,
                                        className: "w-full h-full",
                                        // poster={data.data.thumbnailUrl || data.data.cover_link || data.data.cover}
                                        src: data.data.video_link || data.data.videoUrl
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/Video.jsx",
                                        lineNumber: 160,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/Video.jsx",
                                    lineNumber: 159,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "mt-4 sm:mt-6 text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold text-gray-900 leading-tight px-1",
                                    children: data.data.title
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/Video.jsx",
                                    lineNumber: 167,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-3 sm:mt-4 flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 sm:gap-4 pb-4 border-b border-gray-200",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-3 flex-1 min-w-0",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$1_$40$babel$2b$core$40$7$2e$2_002c6875e2cc4925b70c9aa5d4dde4bf$2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                                onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$next$2f$navigationState$2e$js__$5b$client$5d$__$28$ecmascript$29$__["setHomeNavigationState"])(data?.data?.channel_id),
                                                href: {
                                                    pathname: data?.data?.username ? `/${data.data.username}` : '/',
                                                    query: {
                                                        channelId: data?.data?.channel_id
                                                    }
                                                },
                                                className: "flex items-center gap-3 flex-1 min-w-0 hover:opacity-80 transition-opacity",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                        src: data.data.channel_image,
                                                        alt: data.data.channelName || data.data.channel_name,
                                                        className: "w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-200 ring-2 ring-gray-200 flex-shrink-0"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/Video.jsx",
                                                        lineNumber: 177,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex-1 min-w-0",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-sm font-semibold text-gray-900 truncate",
                                                                children: data.data.channel_name
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/pages/Video.jsx",
                                                                lineNumber: 183,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs text-gray-500 mt-0.5",
                                                                children: [
                                                                    (data.data.view_count || 0).toLocaleString('fa-IR'),
                                                                    " بازدید"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/pages/Video.jsx",
                                                                lineNumber: 184,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/pages/Video.jsx",
                                                        lineNumber: 182,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/pages/Video.jsx",
                                                lineNumber: 172,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/Video.jsx",
                                            lineNumber: 171,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2 flex-wrap text-gray-600",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "inline-flex items-center gap-1.5 text-xs sm:text-sm rounded-full bg-gray-100 px-3 py-1.5",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$iconsax$2d$react$40$0$2e$0$2e$8_react$40$19$2e$2$2e$0$2f$node_modules$2f$iconsax$2d$react$2f$dist$2f$esm$2f$Eye$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
                                                            size: 16,
                                                            color: "#4a5565"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/Video.jsx",
                                                            lineNumber: 190,
                                                            columnNumber: 19
                                                        }, this),
                                                        (data.data.view_count || 0).toLocaleString('fa-IR')
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/pages/Video.jsx",
                                                    lineNumber: 189,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: handleDownload,
                                                    disabled: isDownloading || !videoSource,
                                                    className: "inline-flex items-center gap-1.5 text-xs sm:text-sm rounded-full bg-gray-100 px-3 py-1.5 hover:bg-gray-50 transition-colors disabled:opacity-60 disabled:cursor-not-allowed",
                                                    title: !videoSource ? 'آدرس ویدیو موجود نیست' : 'دانلود ویدیو',
                                                    children: isDownloading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "w-4 h-4 border-2 border-gray-300 border-t-transparent rounded-full animate-spin"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/pages/Video.jsx",
                                                                lineNumber: 210,
                                                                columnNumber: 23
                                                            }, this),
                                                            "در حال دانلود..."
                                                        ]
                                                    }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DownloadIcon, {
                                                                size: 16,
                                                                color: "#4a5565"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/pages/Video.jsx",
                                                                lineNumber: 215,
                                                                columnNumber: 23
                                                            }, this),
                                                            "دانلود"
                                                        ]
                                                    }, void 0, true)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/Video.jsx",
                                                    lineNumber: 201,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/pages/Video.jsx",
                                            lineNumber: 188,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/pages/Video.jsx",
                                    lineNumber: 170,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-4 p-3 sm:p-4 bg-gray-50 rounded-lg sm:rounded-xl",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm sm:text-base text-gray-700 leading-6 sm:leading-7 break-words ",
                                        children: data.data.description
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/Video.jsx",
                                        lineNumber: 223,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/Video.jsx",
                                    lineNumber: 222,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/Video.jsx",
                            lineNumber: 158,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                            className: "hidden lg:block",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "sticky top-24 space-y-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-lg font-bold text-gray-900 mb-4",
                                        children: "ویدیوهای مرتبط"
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/Video.jsx",
                                        lineNumber: 230,
                                        columnNumber: 15
                                    }, this),
                                    isRelatedLoading ? Array.from({
                                        length: 5
                                    }).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex gap-3 p-2 rounded-lg",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-40 h-24 rounded-lg bg-gray-200 animate-pulse flex-shrink-0"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/Video.jsx",
                                                    lineNumber: 234,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex-1 space-y-2 py-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "h-4 bg-gray-200 rounded w-3/4 animate-pulse"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/Video.jsx",
                                                            lineNumber: 236,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "h-3 bg-gray-200 rounded w-1/2 animate-pulse"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/Video.jsx",
                                                            lineNumber: 237,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/pages/Video.jsx",
                                                    lineNumber: 235,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, i, true, {
                                            fileName: "[project]/src/pages/Video.jsx",
                                            lineNumber: 233,
                                            columnNumber: 19
                                        }, this)) : (relatedVideos?.items || []).filter((v)=>String(v.id) !== String(id)).slice(0, 10).map((video)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$1_$40$babel$2b$core$40$7$2e$2_002c6875e2cc4925b70c9aa5d4dde4bf$2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: `/v/${video.id}`,
                                            className: "flex gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-40 h-24 rounded-lg bg-gray-200 flex-shrink-0 overflow-hidden relative",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                        src: video.thumbnailUrl || video.cover_link || video.cover,
                                                        alt: video.title,
                                                        className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300",
                                                        onError: (e)=>{
                                                            e.currentTarget.src = "https://picsum.photos/seed/default/160/90";
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/Video.jsx",
                                                        lineNumber: 245,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/Video.jsx",
                                                    lineNumber: 244,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex-1 min-w-0",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                            className: "text-sm font-semibold line-clamp-2 text-gray-900 group-hover:text-blue-600 transition-colors",
                                                            children: video.title
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/Video.jsx",
                                                            lineNumber: 253,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs text-gray-500 mt-1",
                                                            children: video.channelName || video.channel_name
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/Video.jsx",
                                                            lineNumber: 256,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs text-gray-400 mt-1",
                                                            children: [
                                                                (video.views || 0).toLocaleString('fa-IR'),
                                                                " بازدید"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/pages/Video.jsx",
                                                            lineNumber: 257,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/pages/Video.jsx",
                                                    lineNumber: 252,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, video.id, true, {
                                            fileName: "[project]/src/pages/Video.jsx",
                                            lineNumber: 243,
                                            columnNumber: 19
                                        }, this)),
                                    !isRelatedLoading && !(relatedVideos?.items || []).length && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-gray-500 text-sm",
                                        children: "ویدیوی مرتبطی یافت نشد"
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/Video.jsx",
                                        lineNumber: 263,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/Video.jsx",
                                lineNumber: 229,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/pages/Video.jsx",
                            lineNumber: 228,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/pages/Video.jsx",
                    lineNumber: 157,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/pages/Video.jsx",
                lineNumber: 156,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/pages/Video.jsx",
        lineNumber: 146,
        columnNumber: 5
    }, this);
}
_s(Video, "hiwffDdijaDf6eIyiJvc5XbiSS0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$1_$40$babel$2b$core$40$7$2e$2_002c6875e2cc4925b70c9aa5d4dde4bf$2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useVideo$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useVideo"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useChannelVideos$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"]
    ];
});
_c1 = Video;
const __TURBOPACK__default__export__ = Video;
var _c, _c1;
__turbopack_context__.k.register(_c, "DownloadIcon");
__turbopack_context__.k.register(_c1, "Video");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/pages/v/[id].js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Video$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/pages/Video.jsx [client] (ecmascript)");
;
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Video$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["default"];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[next]/entry/page-loader.ts { PAGE => \"[project]/pages/v/[id].js [client] (ecmascript)\" } [client] (ecmascript)", ((__turbopack_context__, module, exports) => {

const PAGE_PATH = "/v/[id]";
(window.__NEXT_P = window.__NEXT_P || []).push([
    PAGE_PATH,
    ()=>{
        return __turbopack_context__.r("[project]/pages/v/[id].js [client] (ecmascript)");
    }
]);
// @ts-expect-error module.hot exists
if ("TURBOPACK compile-time truthy", 1) {
    // @ts-expect-error module.hot exists
    module.hot.dispose(function() {
        window.__NEXT_P.push([
            PAGE_PATH
        ]);
    });
}
}),
"[hmr-entry]/hmr-entry.js { ENTRY => \"[project]/pages/v/[id].js\" }", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.r("[next]/entry/page-loader.ts { PAGE => \"[project]/pages/v/[id].js [client] (ecmascript)\" } [client] (ecmascript)");
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__0e_g~88._.js.map