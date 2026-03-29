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
"[project]/src/components/CategoryChips.jsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react@19.2.0/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$1_$40$babel$2b$core$40$7$2e$2_002c6875e2cc4925b70c9aa5d4dde4bf$2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.1_@babel+core@7.2_002c6875e2cc4925b70c9aa5d4dde4bf/node_modules/next/router.js [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
function CategoryChips({ channels, activeChannelId, onSelect }) {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$1_$40$babel$2b$core$40$7$2e$2_002c6875e2cc4925b70c9aa5d4dde4bf$2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"])();
    console.log(onSelect);
    console.log(activeChannelId);
    const list = Array.isArray(channels) ? channels : channels ? [
        channels
    ] : [];
    // useEffect(() => {
    //   isRefetch()
    // }, [activeChannelId])
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex gap-3 sm:gap-4 overflow-x-auto pb-1 scrollbar-hide -mx-1 px-1 p-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>onSelect(null),
                className: `flex flex-col items-center gap-2 flex-shrink-0 transition-all duration-200 ${activeChannelId === null ? 'scale-105' : 'opacity-75 hover:opacity-100 hover:scale-[1.02]'}`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    onClick: ()=>router.push("/"),
                    className: `w-14 h-14 rounded-xl overflow-hidden border-2 shadow-sm flex items-center justify-center transition-all duration-200 ${activeChannelId === null ? 'border-indigo-500 bg-indigo-50' : 'border-slate-200 bg-slate-100 hover:border-slate-300'}`,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: ()=>onSelect(channel.id),
                    className: `flex flex-col items-center gap-2 flex-shrink-0 transition-all duration-200 ${isActive ? 'scale-105' : 'opacity-75 hover:opacity-100 hover:scale-[1.02]'}`,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        onClick: ()=>router.push("/"),
                        className: `w-14 h-14 rounded-xl overflow-hidden border-2 shadow-sm transition-all duration-200 ${isActive ? 'border-indigo-500 ring-2 ring-indigo-200' : 'border-slate-200 hover:border-slate-300'}`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
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
_s(CategoryChips, "fN7XvhJ+p5oE6+Xlo0NJmXpxjC8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$1_$40$babel$2b$core$40$7$2e$2_002c6875e2cc4925b70c9aa5d4dde4bf$2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = CategoryChips;
const __TURBOPACK__default__export__ = CategoryChips;
var _c;
__turbopack_context__.k.register(_c, "CategoryChips");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/VideoCard.jsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react@19.2.0/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$iconsax$2d$react$40$0$2e$0$2e$8_react$40$19$2e$2$2e$0$2f$node_modules$2f$iconsax$2d$react$2f$dist$2f$esm$2f$Eye$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/iconsax-react@0.0.8_react@19.2.0/node_modules/iconsax-react/dist/esm/Eye.js [client] (ecmascript) <export default as Eye>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$iconsax$2d$react$40$0$2e$0$2e$8_react$40$19$2e$2$2e$0$2f$node_modules$2f$iconsax$2d$react$2f$dist$2f$esm$2f$PlayCircle$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PlayCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/iconsax-react@0.0.8_react@19.2.0/node_modules/iconsax-react/dist/esm/PlayCircle.js [client] (ecmascript) <export default as PlayCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$1_$40$babel$2b$core$40$7$2e$2_002c6875e2cc4925b70c9aa5d4dde4bf$2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.1_@babel+core@7.2_002c6875e2cc4925b70c9aa5d4dde4bf/node_modules/next/link.js [client] (ecmascript)");
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$1_$40$babel$2b$core$40$7$2e$2_002c6875e2cc4925b70c9aa5d4dde4bf$2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
        href: `/v/${video.id}`,
        className: "group/card block w-full h-full cursor-pointer touch-manipulation isolate rounded-2xl border border-slate-200/60 bg-gradient-to-br from-white to-slate-50/50 shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 hover:border-indigo-200/50 transition-all duration-400 overflow-hidden hover:-translate-y-1 hover:scale-[1.02]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative aspect-video w-full overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-all duration-500"
                    }, void 0, false, {
                        fileName: "[project]/src/components/VideoCard.jsx",
                        lineNumber: 40,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 flex items-center justify-center pointer-events-none",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-16 h-16 sm:w-20 sm:h-20 bg-white/90 backdrop-blur-xl rounded-2xl flex items-center justify-center shadow-2xl shadow-black/20 scale-75 opacity-0 group-hover/card:scale-100 group-hover/card:opacity-100 transition-all duration-500 delay-100 shadow-indigo-500/25",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$iconsax$2d$react$40$0$2e$0$2e$8_react$40$19$2e$2$2e$0$2f$node_modules$2f$iconsax$2d$react$2f$dist$2f$esm$2f$PlayCircle$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PlayCircle$3e$__["PlayCircle"], {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute bottom-3 right-3 sm:bottom-4 sm:right-4 bg-white/95 backdrop-blur-xl px-3 sm:px-4 py-1.5 sm:py-2 rounded-2xl shadow-lg shadow-black/10 border border-white/50 flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-800",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$iconsax$2d$react$40$0$2e$0$2e$8_react$40$19$2e$2$2e$0$2f$node_modules$2f$iconsax$2d$react$2f$dist$2f$esm$2f$Eye$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
                                size: 14,
                                sm: 16,
                                color: "#0f172a",
                                className: "text-indigo-500 flex-shrink-0"
                            }, void 0, false, {
                                fileName: "[project]/src/components/VideoCard.jsx",
                                lineNumber: 51,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col justify-between  p-4 sm:p-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-base flex-1  sm:text-lg font-bold leading-tight line-clamp-2 text-slate-900 group-hover/card:text-indigo-600 group-hover/card:font-black transition-all duration-300 mb-3 pr-1",
                        children: video.title
                    }, void 0, false, {
                        fileName: "[project]/src/components/VideoCard.jsx",
                        lineNumber: 60,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative flex-shrink-0",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 min-w-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm font-semibold text-slate-900 line-clamp-1 group-hover/card:text-indigo-600 transition-colors",
                                        children: channelName
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/VideoCard.jsx",
                                        lineNumber: 82,
                                        columnNumber: 13
                                    }, this),
                                    video.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
_c = VideoCard;
const __TURBOPACK__default__export__ = VideoCard;
var _c;
__turbopack_context__.k.register(_c, "VideoCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/VideoGrid.jsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react@19.2.0/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$VideoCard$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/VideoCard.jsx [client] (ecmascript)");
;
;
function VideoGrid({ items }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "grid gap-4 sm:gap-5 md:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5",
        children: items.map((v)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$VideoCard$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
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
_c = VideoGrid;
const __TURBOPACK__default__export__ = VideoGrid;
var _c;
__turbopack_context__.k.register(_c, "VideoGrid");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/VideoSkeleton.jsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react@19.2.0/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react@19.2.0/node_modules/react/index.js [client] (ecmascript)");
;
;
function VideoSkeleton({ count = 10 }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5",
        children: Array.from({
            length: count
        }).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "animate-pulse",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "aspect-video rounded-xl bg-gradient-to-br from-gray-200 to-gray-300"
                    }, void 0, false, {
                        fileName: "[project]/src/components/VideoSkeleton.jsx",
                        lineNumber: 8,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-3 flex gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-10 h-10 rounded-full bg-gray-200 flex-shrink-0"
                            }, void 0, false, {
                                fileName: "[project]/src/components/VideoSkeleton.jsx",
                                lineNumber: 10,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 space-y-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-4 bg-gray-200 rounded w-3/4"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/VideoSkeleton.jsx",
                                        lineNumber: 12,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-3 bg-gray-200 rounded w-1/2"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/VideoSkeleton.jsx",
                                        lineNumber: 13,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
_c = VideoSkeleton;
const __TURBOPACK__default__export__ = VideoSkeleton;
var _c;
__turbopack_context__.k.register(_c, "VideoSkeleton");
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
"[project]/src/hooks/usePaginationParams.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "usePaginationParams",
    ()=>usePaginationParams
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react@19.2.0/node_modules/react/index.js [client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
function usePaginationParams(initialPage = 1) {
    _s();
    const [page, setPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(initialPage);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "usePaginationParams.useMemo": ()=>({
                page,
                setPage
            })
    }["usePaginationParams.useMemo"], [
        page
    ]);
}
_s(usePaginationParams, "2QvihaDel/35Zpfx4mKjPgW6AnU=");
const __TURBOPACK__default__export__ = usePaginationParams;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/useLandingChannels.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useLandingChannels",
    ()=>useLandingChannels
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$90$2e$10_react$40$19$2e$2$2e$0$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tanstack+react-query@5.90.10_react@19.2.0/node_modules/@tanstack/react-query/build/modern/useQuery.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$videoApi$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/videoApi.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$usePaginationParams$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/usePaginationParams.js [client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
;
const useLandingChannels = (initialPage = 1, initialData = null)=>{
    _s();
    const { page, setPage } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$usePaginationParams$2e$js__$5b$client$5d$__$28$ecmascript$29$__["usePaginationParams"])(initialPage);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$90$2e$10_react$40$19$2e$2$2e$0$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "landing-channels",
            page
        ],
        queryFn: {
            "useLandingChannels.useQuery": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$videoApi$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getLandingChannels"])({
                    pageNumber: page
                })
        }["useLandingChannels.useQuery"],
        keepPreviousData: true,
        staleTime: 5 * 60 * 1000,
        refetchOnMount: false,
        initialData,
        select: {
            "useLandingChannels.useQuery": (data)=>({
                    ...data,
                    items: Array.isArray(data?.items) ? data.items : []
                })
        }["useLandingChannels.useQuery"]
    });
};
_s(useLandingChannels, "gS86i3DvsJGM6Y1ii5CSg/OUJ1k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$usePaginationParams$2e$js__$5b$client$5d$__$28$ecmascript$29$__["usePaginationParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$90$2e$10_react$40$19$2e$2$2e$0$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/useInfiniteLandingVideos.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "useInfiniteLandingVideos",
    ()=>useInfiniteLandingVideos
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$90$2e$10_react$40$19$2e$2$2e$0$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useInfiniteQuery$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tanstack+react-query@5.90.10_react@19.2.0/node_modules/@tanstack/react-query/build/modern/useInfiniteQuery.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$videoApi$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/videoApi.js [client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
const useInfiniteLandingVideos = (channelId, pageSize = 25, initialPageData = null)=>{
    _s();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$90$2e$10_react$40$19$2e$2$2e$0$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useInfiniteQuery$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useInfiniteQuery"])({
        queryKey: [
            "landing-videos-infinite",
            channelId || "all",
            pageSize
        ],
        queryFn: {
            "useInfiniteLandingVideos.useInfiniteQuery": ({ pageParam = 1 })=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$videoApi$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getLandingVideos"])({
                    channelId: channelId || undefined,
                    pageNumber: pageParam,
                    pageSize
                })
        }["useInfiniteLandingVideos.useInfiniteQuery"],
        initialData: !channelId && initialPageData ? {
            pages: [
                initialPageData
            ],
            pageParams: [
                1
            ]
        } : undefined,
        initialPageParam: 1,
        getNextPageParam: {
            "useInfiniteLandingVideos.useInfiniteQuery": (lastPage, allPages)=>{
                const nextPage = allPages.length + 1;
                return nextPage <= (lastPage?.totalPages || 1) ? nextPage : undefined;
            }
        }["useInfiniteLandingVideos.useInfiniteQuery"],
        staleTime: 2 * 60 * 1000,
        refetchOnMount: false,
        select: {
            "useInfiniteLandingVideos.useInfiniteQuery": (data)=>{
                const pages = Array.isArray(data?.pages) ? data.pages : [];
                const items = pages.flatMap({
                    "useInfiniteLandingVideos.useInfiniteQuery.items": (page)=>Array.isArray(page?.items) ? page.items : []
                }["useInfiniteLandingVideos.useInfiniteQuery.items"]);
                const lastPage = pages.at(-1);
                return {
                    ...data,
                    items,
                    totalPages: lastPage?.totalPages || 1,
                    totalItems: lastPage?.totalItems || items.length
                };
            }
        }["useInfiniteLandingVideos.useInfiniteQuery"]
    });
};
_s(useInfiniteLandingVideos, "xMCOiuh9cV5e8gBi6hogZoGnISk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$90$2e$10_react$40$19$2e$2$2e$0$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useInfiniteQuery$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useInfiniteQuery"]
    ];
});
const __TURBOPACK__default__export__ = useInfiniteLandingVideos;
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
"[project]/src/pages/Home.jsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$1_$40$babel$2b$core$40$7$2e$2_002c6875e2cc4925b70c9aa5d4dde4bf$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.1_@babel+core@7.2_002c6875e2cc4925b70c9aa5d4dde4bf/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react@19.2.0/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$iconsax$2d$react$40$0$2e$0$2e$8_react$40$19$2e$2$2e$0$2f$node_modules$2f$iconsax$2d$react$2f$dist$2f$esm$2f$ArrowLeft2$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft2$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/iconsax-react@0.0.8_react@19.2.0/node_modules/iconsax-react/dist/esm/ArrowLeft2.js [client] (ecmascript) <export default as ArrowLeft2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$iconsax$2d$react$40$0$2e$0$2e$8_react$40$19$2e$2$2e$0$2f$node_modules$2f$iconsax$2d$react$2f$dist$2f$esm$2f$PlayCircle$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PlayCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/iconsax-react@0.0.8_react@19.2.0/node_modules/iconsax-react/dist/esm/PlayCircle.js [client] (ecmascript) <export default as PlayCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react@19.2.0/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$1_$40$babel$2b$core$40$7$2e$2_002c6875e2cc4925b70c9aa5d4dde4bf$2f$node_modules$2f$next$2f$head$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.1_@babel+core@7.2_002c6875e2cc4925b70c9aa5d4dde4bf/node_modules/next/head.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CategoryChips$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/CategoryChips.jsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$VideoGrid$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/VideoGrid.jsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$VideoSkeleton$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/VideoSkeleton.jsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$layouts$2f$Layout$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/layouts/Layout.jsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useLandingChannels$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useLandingChannels.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useInfiniteLandingVideos$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useInfiniteLandingVideos.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$1_$40$babel$2b$core$40$7$2e$2_002c6875e2cc4925b70c9aa5d4dde4bf$2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.1_@babel+core@7.2_002c6875e2cc4925b70c9aa5d4dde4bf/node_modules/next/router.js [client] (ecmascript)");
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
const PAGE_SIZE = 25;
function Home({ initialChannels, initialVideos }) {
    _s();
    console.log(initialChannels);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$1_$40$babel$2b$core$40$7$2e$2_002c6875e2cc4925b70c9aa5d4dde4bf$2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [activeChannelId, setActiveChannelId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const siteUrl = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$1_$40$babel$2b$core$40$7$2e$2_002c6875e2cc4925b70c9aa5d4dde4bf$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
    const loadMoreRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const { data: channelsData, isLoading: channelsLoading, refetch: channelsRefetch } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useLandingChannels$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useLandingChannels"])(1, initialChannels);
    const { data: videosData, isLoading: videosLoading, isError: videosError, isFetchingNextPage, hasNextPage, fetchNextPage, refetch } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useInfiniteLandingVideos$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useInfiniteLandingVideos"])(activeChannelId, PAGE_SIZE, initialVideos);
    const channelsList = Array.isArray(channelsData?.items) ? channelsData.items : [];
    const videosList = Array.isArray(videosData?.items) ? videosData.items : [];
    // console.log(videosList);
    const activeChannelName = channelsList.find((channel)=>channel.id === activeChannelId)?.name;
    const handleChannelSelect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Home.useCallback[handleChannelSelect]": (id)=>{
            setActiveChannelId(id);
        }
    }["Home.useCallback[handleChannelSelect]"], []);
    const handleRefresh = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Home.useCallback[handleRefresh]": ()=>{
            refetch();
        }
    }["Home.useCallback[handleRefresh]"], [
        refetch
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            const queryChannelId = typeof router.query?.channelId === 'string' ? router.query.channelId : null;
            const transientChannelId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$next$2f$navigationState$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getHomeNavigationState"])();
            const nextChannelId = queryChannelId || transientChannelId;
            if (nextChannelId) {
                setActiveChannelId(nextChannelId);
            }
        }
    }["Home.useEffect"], [
        router.query?.channelId
    ]);
    // useEffect(() => {
    //   if (username && !location.state?.channelId) {
    //     navigate("/", { replace: true });
    //   }
    // }, [username]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            const sentinel = loadMoreRef.current;
            if (!sentinel || !hasNextPage) {
                return undefined;
            }
            const observer = new IntersectionObserver({
                "Home.useEffect": (entries)=>{
                    const [entry] = entries;
                    if (entry?.isIntersecting && !isFetchingNextPage) {
                        fetchNextPage();
                    }
                }
            }["Home.useEffect"], {
                root: null,
                rootMargin: "300px 0px",
                threshold: 0.1
            });
            observer.observe(sentinel);
            return ({
                "Home.useEffect": ()=>{
                    observer.disconnect();
                }
            })["Home.useEffect"];
        }
    }["Home.useEffect"], [
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        videosList.length
    ]);
    if (channelsLoading && !channelsData) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$layouts$2f$Layout$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "min-h-screen bg-gradient-to-b from-slate-50 to-white",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto max-w-7xl px-3 sm:px-4 md:px-6 py-6 sm:py-8",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$VideoSkeleton$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                        count: 12
                    }, void 0, false, {
                        fileName: "[project]/src/pages/Home.jsx",
                        lineNumber: 103,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/pages/Home.jsx",
                    lineNumber: 102,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/pages/Home.jsx",
                lineNumber: 101,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/pages/Home.jsx",
            lineNumber: 100,
            columnNumber: 7
        }, this);
    }
    const showInitialLoading = videosLoading && videosList.length === 0;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$layouts$2f$Layout$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$1_$40$babel$2b$core$40$7$2e$2_002c6875e2cc4925b70c9aa5d4dde4bf$2f$node_modules$2f$next$2f$head$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("title", {
                        children: "اربعین تی وی - تلویزیون اینترنتی جبهه مقاومت"
                    }, void 0, false, {
                        fileName: "[project]/src/pages/Home.jsx",
                        lineNumber: 115,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "description",
                        content: "تماشای ویدیوهای اربعین و جبهه مقاومت در اربعین تی وی"
                    }, void 0, false, {
                        fileName: "[project]/src/pages/Home.jsx",
                        lineNumber: 116,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        property: "og:title",
                        content: "اربعین تی وی"
                    }, void 0, false, {
                        fileName: "[project]/src/pages/Home.jsx",
                        lineNumber: 117,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        property: "og:description",
                        content: "تماشای ویدیوهای اربعین و جبهه مقاومت"
                    }, void 0, false, {
                        fileName: "[project]/src/pages/Home.jsx",
                        lineNumber: 118,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        property: "og:image",
                        content: "/vite.svg"
                    }, void 0, false, {
                        fileName: "[project]/src/pages/Home.jsx",
                        lineNumber: 119,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "twitter:card",
                        content: "summary_large_image"
                    }, void 0, false, {
                        fileName: "[project]/src/pages/Home.jsx",
                        lineNumber: 120,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("link", {
                        rel: "canonical",
                        href: `${siteUrl}/`
                    }, void 0, false, {
                        fileName: "[project]/src/pages/Home.jsx",
                        lineNumber: 121,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/Home.jsx",
                lineNumber: 114,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "min-h-screen bg-gradient-to-b from-slate-50 to-white",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto max-w-7xl px-3 sm:px-4 md:px-6 py-6 sm:py-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "sticky top-[57px] sm:top-[61px] md:top-[73px] z-40 -mx-3 sm:-mx-4 md:-mx-6 px-3 sm:px-4 md:px-6 py-3 backdrop-blur-md border-b border-slate-200/80 mb-6",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CategoryChips$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                channels: channelsList,
                                activeChannelId: activeChannelId,
                                onSelect: handleChannelSelect,
                                isLoading: channelsLoading,
                                isRefetch: channelsRefetch
                            }, void 0, false, {
                                fileName: "[project]/src/pages/Home.jsx",
                                lineNumber: 126,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/pages/Home.jsx",
                            lineNumber: 125,
                            columnNumber: 11
                        }, this),
                        activeChannelId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between gap-3 px-4 py-3 rounded-2xl bg-indigo-50 border border-indigo-100 shadow-sm mb-6",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm text-slate-600 flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$iconsax$2d$react$40$0$2e$0$2e$8_react$40$19$2e$2$2e$0$2f$node_modules$2f$iconsax$2d$react$2f$dist$2f$esm$2f$ArrowLeft2$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft2$3e$__["ArrowLeft2"], {
                                        size: 16,
                                        className: "text-slate-400"
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/Home.jsx",
                                        lineNumber: 138,
                                        columnNumber: 17
                                    }, this),
                                    "نمایش ویدیوهای ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        className: "text-slate-900",
                                        children: activeChannelName || videosData?.pages?.flatMap((page)=>page.items || page.data || [])[0]?.channel_name
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/Home.jsx",
                                        lineNumber: 139,
                                        columnNumber: 32
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/Home.jsx",
                                lineNumber: 137,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/pages/Home.jsx",
                            lineNumber: 136,
                            columnNumber: 13
                        }, this),
                        showInitialLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-6",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$VideoSkeleton$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                count: PAGE_SIZE
                            }, void 0, false, {
                                fileName: "[project]/src/pages/Home.jsx",
                                lineNumber: 146,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/pages/Home.jsx",
                            lineNumber: 145,
                            columnNumber: 13
                        }, this) : videosError ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col items-center justify-center py-16 px-4 rounded-2xl bg-slate-50 border border-slate-200",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mb-4",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-2xl",
                                        children: "⚠"
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/Home.jsx",
                                        lineNumber: 151,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/Home.jsx",
                                    lineNumber: 150,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-red-600 font-medium mb-2",
                                    children: "خطا در دریافت ویدیوها"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/Home.jsx",
                                    lineNumber: 153,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleRefresh,
                                    className: "text-indigo-600 hover:text-indigo-700 font-medium px-4 py-2 border border-indigo-200 rounded-xl hover:bg-indigo-50 transition-all",
                                    children: "تلاش مجدد"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/Home.jsx",
                                    lineNumber: 154,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/Home.jsx",
                            lineNumber: 149,
                            columnNumber: 13
                        }, this) : videosList.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col items-center justify-center py-20 px-4 rounded-2xl bg-slate-50 border border-slate-200 border-dashed",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center mb-6 shadow-lg",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$iconsax$2d$react$40$0$2e$0$2e$8_react$40$19$2e$2$2e$0$2f$node_modules$2f$iconsax$2d$react$2f$dist$2f$esm$2f$PlayCircle$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PlayCircle$3e$__["PlayCircle"], {
                                        size: 40,
                                        color: "#f97316"
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/Home.jsx",
                                        lineNumber: 164,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/Home.jsx",
                                    lineNumber: 163,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-lg font-bold text-slate-900 mb-2",
                                    children: activeChannelId ? "ویدیویی یافت نشد" : "شروع کنید!"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/Home.jsx",
                                    lineNumber: 166,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-slate-600 text-center max-w-md",
                                    children: activeChannelId ? "در این کانال فعلاً ویدیویی موجود نیست." : "کانالی انتخاب کنید تا ویدیوهایش را ببینید."
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/Home.jsx",
                                    lineNumber: 169,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/Home.jsx",
                            lineNumber: 162,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "pb-8",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$VideoGrid$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                        items: videosList
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/Home.jsx",
                                        lineNumber: 179,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/Home.jsx",
                                    lineNumber: 178,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    ref: loadMoreRef,
                                    className: "flex justify-center py-4 min-h-16",
                                    children: isFetchingNextPage ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-full",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$VideoSkeleton$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                            count: Math.min(8, PAGE_SIZE)
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/Home.jsx",
                                            lineNumber: 185,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/Home.jsx",
                                        lineNumber: 184,
                                        columnNumber: 19
                                    }, this) : hasNextPage ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm text-slate-500",
                                        children: "برای بارگذاری ویدیوهای بیشتر اسکرول کنید."
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/Home.jsx",
                                        lineNumber: 188,
                                        columnNumber: 19
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm text-slate-400",
                                        children: "همه ویدیوها نمایش داده شدند."
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/Home.jsx",
                                        lineNumber: 190,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/Home.jsx",
                                    lineNumber: 182,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/Home.jsx",
                            lineNumber: 177,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/pages/Home.jsx",
                    lineNumber: 124,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/pages/Home.jsx",
                lineNumber: 123,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/pages/Home.jsx",
        lineNumber: 113,
        columnNumber: 5
    }, this);
}
_s(Home, "bFqoVoHKBHUFN8aX9ahGpfkF+rE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$1_$40$babel$2b$core$40$7$2e$2_002c6875e2cc4925b70c9aa5d4dde4bf$2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useLandingChannels$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useLandingChannels"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useInfiniteLandingVideos$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useInfiniteLandingVideos"]
    ];
});
_c = Home;
const __TURBOPACK__default__export__ = Home;
var _c;
__turbopack_context__.k.register(_c, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/serverAxios.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "serverAxios",
    ()=>serverAxios
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$1_$40$babel$2b$core$40$7$2e$2_002c6875e2cc4925b70c9aa5d4dde4bf$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.1_@babel+core@7.2_002c6875e2cc4925b70c9aa5d4dde4bf/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$axios$40$1$2e$13$2e$2$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/axios@1.13.2/node_modules/axios/lib/axios.js [client] (ecmascript)");
;
const serverAxios = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$axios$40$1$2e$13$2e$2$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].create({
    baseURL: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$1_$40$babel$2b$core$40$7$2e$2_002c6875e2cc4925b70c9aa5d4dde4bf$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].env.API_BASE_URL,
    timeout: 10000
});
const __TURBOPACK__default__export__ = serverAxios;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/pages/[[...username]].js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Home$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/pages/Home.jsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$serverAxios$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/serverAxios.js [client] (ecmascript)");
;
;
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Home$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["default"];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[next]/entry/page-loader.ts { PAGE => \"[project]/pages/[[...username]].js [client] (ecmascript)\" } [client] (ecmascript)", ((__turbopack_context__, module, exports) => {

const PAGE_PATH = "/[[...username]]";
(window.__NEXT_P = window.__NEXT_P || []).push([
    PAGE_PATH,
    ()=>{
        return __turbopack_context__.r("[project]/pages/[[...username]].js [client] (ecmascript)");
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
"[hmr-entry]/hmr-entry.js { ENTRY => \"[project]/pages/[[...username]]\" }", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.r("[next]/entry/page-loader.ts { PAGE => \"[project]/pages/[[...username]].js [client] (ecmascript)\" } [client] (ecmascript)");
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__0_nk3le._.js.map