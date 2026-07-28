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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_object_spread.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_sliced_to_array.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_to_consumable_array.js [client] (ecmascript)");
;
;
;
function connect(param) {
    var addMessageListener = param.addMessageListener, sendMessage = param.sendMessage, _param_onUpdateError = param.onUpdateError, onUpdateError = _param_onUpdateError === void 0 ? console.error : _param_onUpdateError;
    addMessageListener(function(msg) {
        switch(msg.type){
            case 'turbopack-connected':
                handleSocketConnected(sendMessage);
                break;
            default:
                try {
                    if (Array.isArray(msg.data)) {
                        for(var i = 0; i < msg.data.length; i++){
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
    var queued = globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS;
    if (queued != null && !Array.isArray(queued)) {
        throw new Error('A separate HMR handler was already registered');
    }
    globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS = {
        push: function push(param) {
            var _param = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(param, 2), chunkPath = _param[0], callback = _param[1];
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    };
    if (Array.isArray(queued)) {
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        try {
            for(var _iterator = queued[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                var _step_value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(_step.value, 2), chunkPath = _step_value[0], callback = _step_value[1];
                subscribeToChunkUpdate(chunkPath, sendMessage, callback);
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally{
            try {
                if (!_iteratorNormalCompletion && _iterator.return != null) {
                    _iterator.return();
                }
            } finally{
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    }
}
var updateCallbackSets = new Map();
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
    sendJSON(sendMessage, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])({
        type: 'turbopack-subscribe'
    }, resource));
    return function() {
        sendJSON(sendMessage, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])({
            type: 'turbopack-unsubscribe'
        }, resource));
    };
}
function handleSocketConnected(sendMessage) {
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = updateCallbackSets.keys()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var key = _step.value;
            subscribeToUpdates(sendMessage, JSON.parse(key));
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally{
        try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
            }
        } finally{
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
}
// we aggregate all pending updates until the issues are resolved
var chunkListsWithPendingUpdates = new Map();
function aggregateUpdates(msg) {
    var key = resourceKey(msg.resource);
    var aggregated = chunkListsWithPendingUpdates.get(key);
    if (aggregated) {
        aggregated.instruction = mergeChunkListUpdates(aggregated.instruction, msg.instruction);
    } else {
        chunkListsWithPendingUpdates.set(key, msg);
    }
}
function applyAggregatedUpdates() {
    if (chunkListsWithPendingUpdates.size === 0) return;
    hooks.beforeRefresh();
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = chunkListsWithPendingUpdates.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var msg = _step.value;
            triggerUpdate(msg);
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally{
        try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
            }
        } finally{
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
    chunkListsWithPendingUpdates.clear();
    finalizeUpdate();
}
function mergeChunkListUpdates(updateA, updateB) {
    var chunks;
    if (updateA.chunks != null) {
        if (updateB.chunks == null) {
            chunks = updateA.chunks;
        } else {
            chunks = mergeChunkListChunks(updateA.chunks, updateB.chunks);
        }
    } else if (updateB.chunks != null) {
        chunks = updateB.chunks;
    }
    var merged;
    if (updateA.merged != null) {
        if (updateB.merged == null) {
            merged = updateA.merged;
        } else {
            // Since `merged` is an array of updates, we need to merge them all into
            // one, consistent update.
            // Since there can only be `EcmascriptMergeUpdates` in the array, there is
            // no need to key on the `type` field.
            var update = updateA.merged[0];
            for(var i = 1; i < updateA.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateA.merged[i]);
            }
            for(var i1 = 0; i1 < updateB.merged.length; i1++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateB.merged[i1]);
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
        chunks: chunks,
        merged: merged
    };
}
function mergeChunkListChunks(chunksA, chunksB) {
    var chunks = {};
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = Object.entries(chunksA)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var _step_value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(_step.value, 2), chunkPath = _step_value[0], chunkUpdateA = _step_value[1];
            var chunkUpdateB = chunksB[chunkPath];
            if (chunkUpdateB != null) {
                var mergedUpdate = mergeChunkUpdates(chunkUpdateA, chunkUpdateB);
                if (mergedUpdate != null) {
                    chunks[chunkPath] = mergedUpdate;
                }
            } else {
                chunks[chunkPath] = chunkUpdateA;
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally{
        try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
            }
        } finally{
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
    var _iteratorNormalCompletion1 = true, _didIteratorError1 = false, _iteratorError1 = undefined;
    try {
        for(var _iterator1 = Object.entries(chunksB)[Symbol.iterator](), _step1; !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true){
            var _step_value1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(_step1.value, 2), chunkPath1 = _step_value1[0], chunkUpdateB1 = _step_value1[1];
            if (chunks[chunkPath1] == null) {
                chunks[chunkPath1] = chunkUpdateB1;
            }
        }
    } catch (err) {
        _didIteratorError1 = true;
        _iteratorError1 = err;
    } finally{
        try {
            if (!_iteratorNormalCompletion1 && _iterator1.return != null) {
                _iterator1.return();
            }
        } finally{
            if (_didIteratorError1) {
                throw _iteratorError1;
            }
        }
    }
    return chunks;
}
function mergeChunkUpdates(updateA, updateB) {
    if (updateA.type === 'added' && updateB.type === 'deleted' || updateA.type === 'deleted' && updateB.type === 'added') {
        return undefined;
    }
    if (updateB.type === 'total') {
        // A total update replaces the entire chunk, so it supersedes any prior update.
        return updateB;
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
    var entries = mergeEcmascriptChunkEntries(mergedA.entries, mergedB.entries);
    var chunks = mergeEcmascriptChunksUpdates(mergedA.chunks, mergedB.chunks);
    return {
        type: 'EcmascriptMergedUpdate',
        entries: entries,
        chunks: chunks
    };
}
function mergeEcmascriptChunkEntries(entriesA, entriesB) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])({}, entriesA, entriesB);
}
function mergeEcmascriptChunksUpdates(chunksA, chunksB) {
    if (chunksA == null) {
        return chunksB;
    }
    if (chunksB == null) {
        return chunksA;
    }
    var chunks = {};
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = Object.entries(chunksA)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var _step_value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(_step.value, 2), chunkPath = _step_value[0], chunkUpdateA = _step_value[1];
            var chunkUpdateB = chunksB[chunkPath];
            if (chunkUpdateB != null) {
                var mergedUpdate = mergeEcmascriptChunkUpdates(chunkUpdateA, chunkUpdateB);
                if (mergedUpdate != null) {
                    chunks[chunkPath] = mergedUpdate;
                }
            } else {
                chunks[chunkPath] = chunkUpdateA;
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally{
        try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
            }
        } finally{
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
    var _iteratorNormalCompletion1 = true, _didIteratorError1 = false, _iteratorError1 = undefined;
    try {
        for(var _iterator1 = Object.entries(chunksB)[Symbol.iterator](), _step1; !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true){
            var _step_value1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(_step1.value, 2), chunkPath1 = _step_value1[0], chunkUpdateB1 = _step_value1[1];
            if (chunks[chunkPath1] == null) {
                chunks[chunkPath1] = chunkUpdateB1;
            }
        }
    } catch (err) {
        _didIteratorError1 = true;
        _iteratorError1 = err;
    } finally{
        try {
            if (!_iteratorNormalCompletion1 && _iterator1.return != null) {
                _iterator1.return();
            }
        } finally{
            if (_didIteratorError1) {
                throw _iteratorError1;
            }
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
        var _updateA_modules, _updateB_modules;
        var added = [];
        var deleted = [];
        var deletedModules = new Set((_updateA_modules = updateA.modules) !== null && _updateA_modules !== void 0 ? _updateA_modules : []);
        var addedModules = new Set((_updateB_modules = updateB.modules) !== null && _updateB_modules !== void 0 ? _updateB_modules : []);
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        try {
            for(var _iterator = addedModules[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                var moduleId = _step.value;
                if (!deletedModules.has(moduleId)) {
                    added.push(moduleId);
                }
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally{
            try {
                if (!_iteratorNormalCompletion && _iterator.return != null) {
                    _iterator.return();
                }
            } finally{
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
        var _iteratorNormalCompletion1 = true, _didIteratorError1 = false, _iteratorError1 = undefined;
        try {
            for(var _iterator1 = deletedModules[Symbol.iterator](), _step1; !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true){
                var moduleId1 = _step1.value;
                if (!addedModules.has(moduleId1)) {
                    deleted.push(moduleId1);
                }
            }
        } catch (err) {
            _didIteratorError1 = true;
            _iteratorError1 = err;
        } finally{
            try {
                if (!_iteratorNormalCompletion1 && _iterator1.return != null) {
                    _iterator1.return();
                }
            } finally{
                if (_didIteratorError1) {
                    throw _iteratorError1;
                }
            }
        }
        if (added.length === 0 && deleted.length === 0) {
            return undefined;
        }
        return {
            type: 'partial',
            added: added,
            deleted: deleted
        };
    }
    if (updateA.type === 'partial' && updateB.type === 'partial') {
        var _updateA_added, _updateB_added, _updateA_deleted, _updateB_deleted;
        var added1 = new Set((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((_updateA_added = updateA.added) !== null && _updateA_added !== void 0 ? _updateA_added : []).concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((_updateB_added = updateB.added) !== null && _updateB_added !== void 0 ? _updateB_added : [])));
        var deleted1 = new Set((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((_updateA_deleted = updateA.deleted) !== null && _updateA_deleted !== void 0 ? _updateA_deleted : []).concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((_updateB_deleted = updateB.deleted) !== null && _updateB_deleted !== void 0 ? _updateB_deleted : [])));
        if (updateB.added != null) {
            var _iteratorNormalCompletion2 = true, _didIteratorError2 = false, _iteratorError2 = undefined;
            try {
                for(var _iterator2 = updateB.added[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true){
                    var moduleId2 = _step2.value;
                    deleted1.delete(moduleId2);
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally{
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                        _iterator2.return();
                    }
                } finally{
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
        }
        if (updateB.deleted != null) {
            var _iteratorNormalCompletion3 = true, _didIteratorError3 = false, _iteratorError3 = undefined;
            try {
                for(var _iterator3 = updateB.deleted[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true){
                    var moduleId3 = _step3.value;
                    added1.delete(moduleId3);
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally{
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
                        _iterator3.return();
                    }
                } finally{
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }
        }
        return {
            type: 'partial',
            added: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(added1),
            deleted: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(deleted1)
        };
    }
    if (updateA.type === 'added' && updateB.type === 'partial') {
        var _updateA_modules1, _updateB_added1, _updateB_deleted1;
        var modules = new Set((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((_updateA_modules1 = updateA.modules) !== null && _updateA_modules1 !== void 0 ? _updateA_modules1 : []).concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((_updateB_added1 = updateB.added) !== null && _updateB_added1 !== void 0 ? _updateB_added1 : [])));
        var _iteratorNormalCompletion4 = true, _didIteratorError4 = false, _iteratorError4 = undefined;
        try {
            for(var _iterator4 = ((_updateB_deleted1 = updateB.deleted) !== null && _updateB_deleted1 !== void 0 ? _updateB_deleted1 : [])[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true){
                var moduleId4 = _step4.value;
                modules.delete(moduleId4);
            }
        } catch (err) {
            _didIteratorError4 = true;
            _iteratorError4 = err;
        } finally{
            try {
                if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
                    _iterator4.return();
                }
            } finally{
                if (_didIteratorError4) {
                    throw _iteratorError4;
                }
            }
        }
        return {
            type: 'added',
            modules: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(modules)
        };
    }
    if (updateA.type === 'partial' && updateB.type === 'deleted') {
        var _updateB_modules1;
        // We could eagerly return `updateB` here, but this would potentially be
        // incorrect if `updateA` has added modules.
        var modules1 = new Set((_updateB_modules1 = updateB.modules) !== null && _updateB_modules1 !== void 0 ? _updateB_modules1 : []);
        if (updateA.added != null) {
            var _iteratorNormalCompletion5 = true, _didIteratorError5 = false, _iteratorError5 = undefined;
            try {
                for(var _iterator5 = updateA.added[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true){
                    var moduleId5 = _step5.value;
                    modules1.delete(moduleId5);
                }
            } catch (err) {
                _didIteratorError5 = true;
                _iteratorError5 = err;
            } finally{
                try {
                    if (!_iteratorNormalCompletion5 && _iterator5.return != null) {
                        _iterator5.return();
                    }
                } finally{
                    if (_didIteratorError5) {
                        throw _iteratorError5;
                    }
                }
            }
        }
        return {
            type: 'deleted',
            modules: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(modules1)
        };
    }
    // Any other update combination is invalid.
    return undefined;
}
function invariant(_, message) {
    throw new Error("Invariant: ".concat(message));
}
var CRITICAL = [
    'bug',
    'error',
    'fatal'
];
function compareByList(list, a, b) {
    var aI = list.indexOf(a) + 1 || list.length;
    var bI = list.indexOf(b) + 1 || list.length;
    return aI - bI;
}
var chunksWithIssues = new Map();
function emitIssues() {
    var issues = [];
    var deduplicationSet = new Set();
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = chunksWithIssues[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var _step_value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(_step.value, 2), _ = _step_value[0], chunkIssues = _step_value[1];
            var _iteratorNormalCompletion1 = true, _didIteratorError1 = false, _iteratorError1 = undefined;
            try {
                for(var _iterator1 = chunkIssues[Symbol.iterator](), _step1; !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true){
                    var chunkIssue = _step1.value;
                    if (deduplicationSet.has(chunkIssue.formatted)) continue;
                    issues.push(chunkIssue);
                    deduplicationSet.add(chunkIssue.formatted);
                }
            } catch (err) {
                _didIteratorError1 = true;
                _iteratorError1 = err;
            } finally{
                try {
                    if (!_iteratorNormalCompletion1 && _iterator1.return != null) {
                        _iterator1.return();
                    }
                } finally{
                    if (_didIteratorError1) {
                        throw _iteratorError1;
                    }
                }
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally{
        try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
            }
        } finally{
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
    sortIssues(issues);
    hooks.issues(issues);
}
function handleIssues(msg) {
    var key = resourceKey(msg.resource);
    var hasCriticalIssues = false;
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = msg.issues[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var issue = _step.value;
            if (CRITICAL.includes(issue.severity)) {
                hasCriticalIssues = true;
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally{
        try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
            }
        } finally{
            if (_didIteratorError) {
                throw _iteratorError;
            }
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
var SEVERITY_ORDER = [
    'bug',
    'fatal',
    'error',
    'warning',
    'info',
    'log'
];
var CATEGORY_ORDER = [
    'parse',
    'resolve',
    'code generation',
    'rendering',
    'typescript',
    'other'
];
function sortIssues(issues) {
    issues.sort(function(a, b) {
        var first = compareByList(SEVERITY_ORDER, a.severity, b.severity);
        if (first !== 0) return first;
        return compareByList(CATEGORY_ORDER, a.category, b.category);
    });
}
var hooks = {
    beforeRefresh: function beforeRefresh() {},
    refresh: function refresh() {},
    buildOk: function buildOk() {},
    issues: function issues(_issues) {}
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
            var runHooks = chunkListsWithPendingUpdates.size === 0;
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
    var key = resourceKey(resource);
    var callbackSet;
    var existingCallbackSet = updateCallbackSets.get(key);
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
    return function() {
        callbackSet.callbacks.delete(callback);
        if (callbackSet.callbacks.size === 0) {
            callbackSet.unsubscribe();
            updateCallbackSets.delete(key);
        }
    };
}
function triggerUpdate(msg) {
    var key = resourceKey(msg.resource);
    var callbackSet = updateCallbackSets.get(key);
    if (!callbackSet) {
        return;
    }
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = callbackSet.callbacks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var callback = _step.value;
            callback(msg);
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally{
        try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
            }
        } finally{
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
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
"[project]/apps/admin-dashboard/src/store/useAuthStore.ts [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAuthStore",
    ()=>useAuthStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_async_to_generator.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__ = __turbopack_context__.i("[project]/node_modules/tslib/tslib.es6.mjs [client] (ecmascript) <export __generator as _>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/index.mjs [client] (ecmascript) <locals>");
;
;
;
;
var useAuthStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["create"])(function(set, get) {
    return {
        user: null,
        token: null,
        isLoading: false,
        login: function login(email, password) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(function() {
                var mockUser, mockToken;
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, function(_state) {
                    set({
                        isLoading: true
                    });
                    try {
                        // In a real implementation, this would call the auth service
                        // For demo purposes, we'll simulate a successful login
                        mockUser = {
                            id: "admin-123",
                            email: email,
                            firstName: "John",
                            lastName: "Doe",
                            role: "system_admin",
                            permissions: [
                                "read",
                                "write",
                                "delete",
                                "admin"
                            ],
                            status: "active"
                        };
                        mockToken = "mock-jwt-token-" + Date.now();
                        set({
                            user: mockUser,
                            token: mockToken,
                            isLoading: false
                        });
                    } catch (error) {
                        set({
                            isLoading: false
                        });
                        throw error;
                    }
                    return [
                        2
                    ];
                });
            })();
        },
        logout: function logout() {
            set({
                user: null,
                token: null
            });
        },
        register: function register(userData) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(function() {
                var mockUser, mockToken;
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, function(_state) {
                    set({
                        isLoading: true
                    });
                    try {
                        // In a real implementation, this would call the registration endpoint
                        // For demo purposes, we'll simulate a successful registration
                        mockUser = {
                            id: "admin-" + Date.now(),
                            email: userData.email,
                            firstName: userData.firstName,
                            lastName: userData.lastName,
                            role: "system_admin",
                            permissions: [
                                "read",
                                "write",
                                "delete",
                                "admin"
                            ],
                            status: "active"
                        };
                        mockToken = "mock-jwt-token-" + Date.now();
                        set({
                            user: mockUser,
                            token: mockToken,
                            isLoading: false
                        });
                    } catch (error) {
                        set({
                            isLoading: false
                        });
                        throw error;
                    }
                    return [
                        2
                    ];
                });
            })();
        }
    };
});
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/admin-dashboard/src/services/api.ts [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "apiService",
    ()=>apiService,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [client] (ecmascript)");
;
;
// Create axios instance with base URL from environment
var api = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].create({
    baseURL: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].env.REACT_APP_API_URL || "http://localhost:5000/api"
});
// Request interceptor to add auth token
api.interceptors.request.use(function(config) {
    // Only run in browser environment
    if ("TURBOPACK compile-time truthy", 1) {
        var token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = "Bearer ".concat(token);
        }
    }
    return config;
}, function(error) {
    return Promise.reject(error);
});
// Response interceptor for error handling
api.interceptors.response.use(function(response) {
    return response;
}, function(error) {
    var _error_response;
    // Handle 401 Unauthorized errors
    if (((_error_response = error.response) === null || _error_response === void 0 ? void 0 : _error_response.status) === 401) {
        // Redirect to login or handle logout - only in browser
        if ("TURBOPACK compile-time truthy", 1) {
            window.location.href = "/login";
        }
    }
    return Promise.reject(error);
});
const __TURBOPACK__default__export__ = api;
var apiService = {
    // Auth endpoints
    auth: {
        login: function login(credentials) {
            return api.post("/auth/login", credentials);
        },
        register: function register(userData) {
            return api.post("/auth/register", userData);
        },
        logout: function logout() {
            return api.post("/auth/logout");
        }
    },
    // User endpoints
    users: {
        getAll: function getAll(params) {
            return api.get("/users", {
                params: params
            });
        },
        getById: function getById(id) {
            return api.get("/users/".concat(id));
        },
        create: function create(data) {
            return api.post("/users", data);
        },
        update: function update(id, data) {
            return api.put("/users/".concat(id), data);
        },
        delete: function _delete(id) {
            return api.delete("/users/".concat(id));
        },
        deactivate: function deactivate(id) {
            return api.patch("/users/".concat(id, "/deactivate"));
        },
        activate: function activate(id) {
            return api.patch("/users/".concat(id, "/activate"));
        }
    },
    // Role endpoints
    roles: {
        getAll: function getAll(params) {
            return api.get("/roles", {
                params: params
            });
        },
        getById: function getById(id) {
            return api.get("/roles/".concat(id));
        },
        create: function create(data) {
            return api.post("/roles", data);
        },
        update: function update(id, data) {
            return api.put("/roles/".concat(id), data);
        },
        delete: function _delete(id) {
            return api.delete("/roles/".concat(id));
        },
        assignPermissions: function assignPermissions(roleId, permissions) {
            return api.post("/roles/".concat(roleId, "/permissions"), {
                permissions: permissions
            });
        },
        removePermissions: function removePermissions(roleId, permissions) {
            return api.delete("/roles/".concat(roleId, "/permissions"), {
                data: {
                    permissions: permissions
                }
            });
        }
    },
    // Settings endpoints
    settings: {
        getAll: function getAll(params) {
            return api.get("/settings", {
                params: params
            });
        },
        getById: function getById(id) {
            return api.get("/settings/".concat(id));
        },
        update: function update(id, data) {
            return api.put("/settings/".concat(id), data);
        },
        create: function create(data) {
            return api.post("/settings", data);
        },
        reset: function reset(id) {
            return api.post("/settings/".concat(id, "/reset"));
        }
    },
    // Compliance endpoints
    compliance: {
        getReports: function getReports(params) {
            return api.get("/compliance/reports", {
                params: params
            });
        },
        getAuditLogs: function getAuditLogs(params) {
            return api.get("/compliance/audit-logs", {
                params: params
            });
        },
        getHipaaCompliance: function getHipaaCompliance() {
            return api.get("/compliance/hipaa");
        },
        getGdprCompliance: function getGdprCompliance() {
            return api.get("/compliance/gdpr");
        },
        runAudit: function runAudit() {
            return api.post("/compliance/audit");
        }
    },
    // Security endpoints
    security: {
        getAlerts: function getAlerts(params) {
            return api.get("/security/alerts", {
                params: params
            });
        },
        getAccessLogs: function getAccessLogs(params) {
            return api.get("/security/access-logs", {
                params: params
            });
        },
        resolveAlert: function resolveAlert(id) {
            return api.post("/security/alerts/".concat(id, "/resolve"));
        },
        blockIp: function blockIp(ip) {
            return api.post("/security/block-ip", {
                ip: ip
            });
        },
        unblockIp: function unblockIp(ip) {
            return api.delete("/security/block-ip/".concat(ip));
        },
        getFailedLogins: function getFailedLogins(params) {
            return api.get("/security/failed-logins", {
                params: params
            });
        }
    },
    // Analytics endpoints
    analytics: {
        getOverview: function getOverview(params) {
            return api.get("/analytics/overview", {
                params: params
            });
        },
        getUsageMetrics: function getUsageMetrics(params) {
            return api.get("/analytics/usage", {
                params: params
            });
        },
        getPerformanceMetrics: function getPerformanceMetrics(params) {
            return api.get("/analytics/performance", {
                params: params
            });
        },
        getUserGrowth: function getUserGrowth(params) {
            return api.get("/analytics/user-growth", {
                params: params
            });
        },
        exportReport: function exportReport(reportType, params) {
            return api.get("/analytics/export/".concat(reportType), {
                params: params,
                responseType: "blob"
            });
        }
    },
    // Support endpoints
    support: {
        getTickets: function getTickets(params) {
            return api.get("/support/tickets", {
                params: params
            });
        },
        getTicketById: function getTicketById(id) {
            return api.get("/support/tickets/".concat(id));
        },
        createTicket: function createTicket(data) {
            return api.post("/support/tickets", data);
        },
        updateTicket: function updateTicket(id, data) {
            return api.put("/support/tickets/".concat(id), data);
        },
        closeTicket: function closeTicket(id) {
            return api.post("/support/tickets/".concat(id, "/close"));
        },
        assignTicket: function assignTicket(id, assigneeId) {
            return api.put("/support/tickets/".concat(id, "/assign"), {
                assigneeId: assigneeId
            });
        },
        addComment: function addComment(id, comment) {
            return api.post("/support/tickets/".concat(id, "/comments"), {
                comment: comment
            });
        }
    },
    // Billing endpoints
    billing: {
        getInvoices: function getInvoices(params) {
            return api.get("/billing/invoices", {
                params: params
            });
        },
        getInvoiceById: function getInvoiceById(id) {
            return api.get("/billing/invoices/".concat(id));
        },
        createInvoice: function createInvoice(data) {
            return api.post("/billing/invoices", data);
        },
        processPayment: function processPayment(invoiceId, paymentData) {
            return api.post("/billing/invoices/".concat(invoiceId, "/pay"), paymentData);
        },
        getPaymentHistory: function getPaymentHistory(params) {
            return api.get("/billing/payments", {
                params: params
            });
        },
        getFinancialReports: function getFinancialReports(params) {
            return api.get("/billing/reports", {
                params: params
            });
        }
    },
    // Content endpoints
    content: {
        getPages: function getPages(params) {
            return api.get("/content/pages", {
                params: params
            });
        },
        getPageById: function getPageById(id) {
            return api.get("/content/pages/".concat(id));
        },
        createPage: function createPage(data) {
            return api.post("/content/pages", data);
        },
        updatePage: function updatePage(id, data) {
            return api.put("/content/pages/".concat(id), data);
        },
        deletePage: function deletePage(id) {
            return api.delete("/content/pages/".concat(id));
        },
        getFaqs: function getFaqs(params) {
            return api.get("/content/faqs", {
                params: params
            });
        },
        createFaq: function createFaq(data) {
            return api.post("/content/faqs", data);
        },
        updateFaq: function updateFaq(id, data) {
            return api.put("/content/faqs/".concat(id), data);
        },
        deleteFaq: function deleteFaq(id) {
            return api.delete("/content/faqs/".concat(id));
        }
    },
    // Notification endpoints
    notifications: {
        getTemplates: function getTemplates(params) {
            return api.get("/notifications/templates", {
                params: params
            });
        },
        createTemplate: function createTemplate(data) {
            return api.post("/notifications/templates", data);
        },
        updateTemplate: function updateTemplate(id, data) {
            return api.put("/notifications/templates/".concat(id), data);
        },
        deleteTemplate: function deleteTemplate(id) {
            return api.delete("/notifications/templates/".concat(id));
        },
        getLogs: function getLogs(params) {
            return api.get("/notifications/logs", {
                params: params
            });
        },
        sendTestNotification: function sendTestNotification(templateId, recipient) {
            return api.post("/notifications/templates/".concat(templateId, "/test"), {
                recipient: recipient
            });
        }
    },
    // Admin endpoints
    admin: {
        getOverviewStats: function getOverviewStats() {
            return Promise.resolve({
                data: {
                    totalUsers: 1247,
                    activeToday: 89,
                    openTickets: 23,
                    doctors: 45,
                    patients: 892,
                    staff: 180,
                    admins: 12
                }
            });
        },
        getSystemHealth: function getSystemHealth() {
            return Promise.resolve({
                data: {
                    database: {
                        status: "healthy",
                        connections: 24,
                        maxConnections: 100,
                        queryAvgTime: "45ms"
                    },
                    api: {
                        status: "healthy",
                        requestsPerMin: 342,
                        errorRate: "0.2%"
                    },
                    cache: {
                        status: "healthy",
                        hitRate: "85%",
                        memoryUse: "60%"
                    },
                    storage: {
                        status: "healthy",
                        used: 450,
                        available: 550
                    },
                    uptime: "99.9%",
                    avgResponseTime: "120ms"
                }
            });
        },
        getRecentActivity: function getRecentActivity() {
            return Promise.resolve({
                data: [
                    {
                        id: "1",
                        type: "user_created",
                        title: "New user registered",
                        description: "John Doe registered as a new patient",
                        icon: "👤",
                        userName: "System",
                        timestamp: new Date(Date.now() - 3600000).toISOString()
                    },
                    {
                        id: "2",
                        type: "appointment_scheduled",
                        title: "Appointment scheduled",
                        description: "Dr. Smith scheduled a follow-up appointment for patient Jane Wilson",
                        icon: "📅",
                        userName: "Dr. Smith",
                        timestamp: new Date(Date.now() - 7200000).toISOString()
                    },
                    {
                        id: "3",
                        type: "prescription_created",
                        title: "New prescription added",
                        description: "Dr. Johnson prescribed Lisinopril 10mg for patient Robert Chen",
                        icon: "💊",
                        userName: "Dr. Johnson",
                        timestamp: new Date(Date.now() - 10800000).toISOString()
                    },
                    {
                        id: "4",
                        type: "bill_generated",
                        title: "Invoice generated",
                        description: "Invoice #INV-2024-001234 generated for patient Sarah Davis",
                        icon: "💰",
                        userName: "Billing System",
                        timestamp: new Date(Date.now() - 14400000).toISOString()
                    },
                    {
                        id: "5",
                        type: "lab_result_uploaded",
                        title: "Lab results uploaded",
                        description: "Blood test results uploaded for patient Michael Rodriguez",
                        icon: "📊",
                        userName: "Lab Technician",
                        timestamp: new Date(Date.now() - 18000000).toISOString()
                    },
                    {
                        id: "6",
                        type: "user_updated",
                        title: "User profile updated",
                        description: "Administrator updated contact information for nurse Emily Chang",
                        icon: "✏️",
                        userName: "Admin",
                        timestamp: new Date(Date.now() - 21600000).toISOString()
                    }
                ]
            });
        },
        getUserStats: function getUserStats() {
            return Promise.resolve({
                data: {
                    doctors: {
                        total: 45,
                        growth: 12
                    },
                    patients: {
                        total: 892,
                        growth: 8
                    },
                    staff: {
                        total: 180,
                        growth: 5
                    },
                    admins: {
                        total: 12,
                        growth: 0
                    }
                }
            });
        },
        getUsers: function getUsers(params) {
            return Promise.resolve({
                data: [
                    {
                        id: "1",
                        name: "Dr. Sarah Johnson",
                        email: "sarah.johnson@example.com",
                        role: "doctor",
                        status: "active",
                        department: "Cardiology",
                        lastLogin: "2 hours ago",
                        lastActive: "2 hours ago"
                    },
                    {
                        id: "2",
                        name: "Mike Rodriguez",
                        email: "mike.rodriguez@example.com",
                        role: "patient",
                        status: "active",
                        patientId: "PAT-789456",
                        lastLogin: "5 minutes ago",
                        lastActive: "5 minutes ago"
                    },
                    {
                        id: "3",
                        name: "Lisa Chen",
                        email: "lisa.chen@example.com",
                        role: "staff",
                        status: "active",
                        department: "Front Desk",
                        lastLogin: "1 hour ago",
                        lastActive: "1 hour ago"
                    },
                    {
                        id: "4",
                        name: "Admin User",
                        email: "admin@example.com",
                        role: "admin",
                        status: "active",
                        department: "Administration",
                        lastLogin: "30 minutes ago",
                        lastActive: "30 minutes ago"
                    },
                    {
                        id: "5",
                        name: "Dr. Michael Lee",
                        email: "michael.lee@example.com",
                        role: "doctor",
                        status: "active",
                        department: "Neurology",
                        lastLogin: "3 hours ago",
                        lastActive: "3 hours ago"
                    }
                ]
            });
        },
        // System Monitoring Methods
        getSystemMetrics: function getSystemMetrics() {
            return Promise.resolve({
                data: {
                    overallHealth: "healthy",
                    cpuUsage: 45,
                    memoryUsage: 62,
                    diskUsage: 45,
                    networkIO: 12.5
                }
            });
        },
        getSystemAlerts: function getSystemAlerts() {
            return Promise.resolve({
                data: [
                    {
                        id: "1",
                        title: "High Memory Usage on Database Server",
                        description: "Memory usage has exceeded 85% threshold on the primary database server",
                        severity: "warning",
                        timestamp: new Date(Date.now() - 1800000).toISOString(),
                        actionRequired: true
                    },
                    {
                        id: "2",
                        title: "SSL Certificate Expiration Warning",
                        description: "SSL certificate for api.example.com expires in 15 days",
                        severity: "info",
                        timestamp: new Date(Date.now() - 7200000).toISOString(),
                        actionRequired: false
                    }
                ]
            });
        },
        getServicesStatus: function getServicesStatus() {
            return Promise.resolve({
                data: [
                    {
                        id: "1",
                        name: "Database",
                        description: "Primary PostgreSQL database",
                        status: "running",
                        responseTime: 12
                    },
                    {
                        id: "2",
                        name: "API Server",
                        description: "Node.js API server",
                        status: "running",
                        responseTime: 45
                    },
                    {
                        id: "3",
                        name: "Cache Server",
                        description: "Redis cache server",
                        status: "running",
                        responseTime: 5
                    },
                    {
                        id: "4",
                        name: "Message Queue",
                        description: "RabbitMQ message queue",
                        status: "running",
                        responseTime: 8
                    }
                ]
            });
        }
    }
};
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/admin-dashboard/src/App.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_async_to_generator.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_instanceof$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_instanceof.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_object_spread.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_object_spread_props.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_sliced_to_array.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_to_consumable_array.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__ = __turbopack_context__.i("[project]/node_modules/tslib/tslib.es6.mjs [client] (ecmascript) <export __generator as _>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$lib$2f$queryClient$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/query-core/build/lib/queryClient.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$lib$2f$QueryClientProvider$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/lib/QueryClientProvider.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$admin$2d$dashboard$2f$src$2f$store$2f$useAuthStore$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/admin-dashboard/src/store/useAuthStore.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$lib$2f$useQuery$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/lib/useQuery.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$admin$2d$dashboard$2f$src$2f$services$2f$api$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/admin-dashboard/src/services/api.ts [client] (ecmascript)");
;
;
;
;
;
;
;
;
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature(), _s4 = __turbopack_context__.k.signature(), _s5 = __turbopack_context__.k.signature(), _s6 = __turbopack_context__.k.signature(), _s7 = __turbopack_context__.k.signature(), _s8 = __turbopack_context__.k.signature();
;
;
;
;
;
var queryClient = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$lib$2f$queryClient$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["QueryClient"]();
// Dashboard Page with real data fetching
function DashboardPage() {
    var _this = this;
    var _systemHealth_database_status, _systemHealth_database, _systemHealth_database_status1, _systemHealth_database1, _systemHealth_database2, _systemHealth_database3, _systemHealth_database4, _systemHealth_api_status, _systemHealth_api, _systemHealth_api_status1, _systemHealth_api1, _systemHealth_api2, _systemHealth_api3, _systemHealth_cache_status, _systemHealth_cache, _systemHealth_cache_status1, _systemHealth_cache1, _systemHealth_cache2, _systemHealth_cache3, _systemHealth_storage_status, _systemHealth_storage, _systemHealth_storage_status1, _systemHealth_storage1, _systemHealth_storage2, _systemHealth_storage3, _userStats_doctors, _userStats_doctors1, _userStats_doctors2, _userStats_doctors3, _userStats_doctors4, _userStats_patients, _userStats_patients1, _userStats_patients2, _userStats_patients3, _userStats_patients4, _userStats_admins, _userStats_admins1, _userStats_admins2, _userStats_admins3, _userStats_admins4, _userStats_staff, _userStats_staff1, _userStats_staff2, _userStats_staff3, _userStats_staff4;
    _s();
    var _useQuery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$lib$2f$useQuery$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "overviewStats"
        ],
        queryFn: function queryFn() {
            return __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$admin$2d$dashboard$2f$src$2f$services$2f$api$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["apiService"].admin.getOverviewStats().then({
                "DashboardPage.useQuery[_useQuery].queryFn": function(res) {
                    return res.data;
                }
            }["DashboardPage.useQuery[_useQuery].queryFn"]);
        },
        retry: false
    }), overviewStats = _useQuery.data, loadingOverview = _useQuery.isLoading;
    var _useQuery1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$lib$2f$useQuery$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "systemHealth"
        ],
        queryFn: function queryFn() {
            return __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$admin$2d$dashboard$2f$src$2f$services$2f$api$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["apiService"].admin.getSystemHealth().then({
                "DashboardPage.useQuery[_useQuery].queryFn": function(res) {
                    return res.data;
                }
            }["DashboardPage.useQuery[_useQuery].queryFn"]);
        },
        retry: false
    }), tmp = _useQuery1.data, systemHealth = tmp === void 0 ? {
        database: {},
        api: {},
        cache: {},
        storage: {},
        storageUsed: "45%",
        uptime: "99.9%",
        avgResponseTime: "120ms"
    } : tmp, loadingHealth = _useQuery1.isLoading;
    var _useQuery2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$lib$2f$useQuery$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "recentActivity"
        ],
        queryFn: function queryFn() {
            return __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$admin$2d$dashboard$2f$src$2f$services$2f$api$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["apiService"].admin.getRecentActivity().then({
                "DashboardPage.useQuery[_useQuery].queryFn": function(res) {
                    return res.data;
                }
            }["DashboardPage.useQuery[_useQuery].queryFn"]);
        },
        retry: false
    }), tmp1 = _useQuery2.data, recentActivity = tmp1 === void 0 ? [] : tmp1, loadingActivity = _useQuery2.isLoading;
    var _useQuery3 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$lib$2f$useQuery$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "userStats"
        ],
        queryFn: function queryFn() {
            return __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$admin$2d$dashboard$2f$src$2f$services$2f$api$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["apiService"].admin.getUserStats().then({
                "DashboardPage.useQuery[_useQuery].queryFn": function(res) {
                    return res.data;
                }
            }["DashboardPage.useQuery[_useQuery].queryFn"]);
        },
        retry: false
    }), tmp2 = _useQuery3.data, userStats = tmp2 === void 0 ? {} : tmp2, loadingUsers = _useQuery3.isLoading;
    var isLoading = loadingOverview || loadingHealth || loadingActivity || loadingUsers;
    if (isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "dashboard-page",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    children: "Admin Dashboard"
                }, void 0, false, {
                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                    lineNumber: 83,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "loading",
                    children: "Loading dashboard data..."
                }, void 0, false, {
                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                    lineNumber: 84,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
            lineNumber: 82,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "dashboard-page",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                children: "Admin Dashboard"
            }, void 0, false, {
                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                lineNumber: 91,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "stats-grid",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "stat-card",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                children: "Total Users"
                            }, void 0, false, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 95,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "stat-value",
                                children: (overviewStats === null || overviewStats === void 0 ? void 0 : overviewStats.totalUsers) || 0
                            }, void 0, false, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 96,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "stat-label",
                                children: "Registered"
                            }, void 0, false, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 97,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                        lineNumber: 94,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "stat-card",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                children: "Active Today"
                            }, void 0, false, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 100,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "stat-value",
                                children: (overviewStats === null || overviewStats === void 0 ? void 0 : overviewStats.activeToday) || 0
                            }, void 0, false, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 101,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "stat-label",
                                children: "Users"
                            }, void 0, false, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 102,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                        lineNumber: 99,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "stat-card",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                children: "System Uptime"
                            }, void 0, false, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 105,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "stat-value",
                                children: (systemHealth === null || systemHealth === void 0 ? void 0 : systemHealth.uptime) || "99.9%"
                            }, void 0, false, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 106,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "stat-label",
                                children: "Last 30 days"
                            }, void 0, false, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 107,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                        lineNumber: 104,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "stat-card",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                children: "API Response Time"
                            }, void 0, false, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 110,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "stat-value",
                                children: (systemHealth === null || systemHealth === void 0 ? void 0 : systemHealth.avgResponseTime) || "120ms"
                            }, void 0, false, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 111,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "stat-label",
                                children: "Average"
                            }, void 0, false, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 112,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                        lineNumber: 109,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "stat-card",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                children: "Storage Used"
                            }, void 0, false, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 115,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "stat-value",
                                children: (systemHealth === null || systemHealth === void 0 ? void 0 : systemHealth.storageUsed) || "45%"
                            }, void 0, false, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 116,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "stat-label",
                                children: "of Total"
                            }, void 0, false, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 117,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                        lineNumber: 114,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "stat-card",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                children: "Support Tickets"
                            }, void 0, false, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 120,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "stat-value",
                                children: (overviewStats === null || overviewStats === void 0 ? void 0 : overviewStats.openTickets) || 0
                            }, void 0, false, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 121,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "stat-label",
                                children: "Open"
                            }, void 0, false, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 122,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                        lineNumber: 119,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                lineNumber: 93,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "quick-actions",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        children: "Quick Actions"
                    }, void 0, false, {
                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                        lineNumber: 127,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "actions-grid",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "action-btn",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "action-icon",
                                        children: "👥"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 130,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Manage Users"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 131,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 129,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "action-btn",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "action-icon",
                                        children: "📊"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 134,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "View Analytics"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 135,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 133,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "action-btn",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "action-icon",
                                        children: "💾"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 138,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "System Backup"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 139,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 137,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "action-btn",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "action-icon",
                                        children: "🔧"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 142,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Run Diagnostics"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 143,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 141,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "action-btn",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "action-icon",
                                        children: "📋"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 146,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Generate Reports"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 147,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 145,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                        lineNumber: 128,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                lineNumber: 126,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "dashboard-modules",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "module",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                children: "System Health Overview"
                            }, void 0, false, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 154,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "health-grid",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "health-item",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                children: "Database"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 157,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "health-status",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "status ".concat((systemHealth === null || systemHealth === void 0 ? void 0 : (_systemHealth_database = systemHealth.database) === null || _systemHealth_database === void 0 ? void 0 : (_systemHealth_database_status = _systemHealth_database.status) === null || _systemHealth_database_status === void 0 ? void 0 : _systemHealth_database_status.toLowerCase()) || "healthy"),
                                                    children: (systemHealth === null || systemHealth === void 0 ? void 0 : (_systemHealth_database1 = systemHealth.database) === null || _systemHealth_database1 === void 0 ? void 0 : (_systemHealth_database_status1 = _systemHealth_database1.status) === null || _systemHealth_database_status1 === void 0 ? void 0 : _systemHealth_database_status1.toUpperCase()) || "HEALTHY"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                    lineNumber: 159,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 158,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "health-details",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: [
                                                            "Connections: ",
                                                            (systemHealth === null || systemHealth === void 0 ? void 0 : (_systemHealth_database2 = systemHealth.database) === null || _systemHealth_database2 === void 0 ? void 0 : _systemHealth_database2.connections) || 0,
                                                            "/",
                                                            (systemHealth === null || systemHealth === void 0 ? void 0 : (_systemHealth_database3 = systemHealth.database) === null || _systemHealth_database3 === void 0 ? void 0 : _systemHealth_database3.maxConnections) || 100
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 166,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: [
                                                            "Query Avg: ",
                                                            (systemHealth === null || systemHealth === void 0 ? void 0 : (_systemHealth_database4 = systemHealth.database) === null || _systemHealth_database4 === void 0 ? void 0 : _systemHealth_database4.queryAvgTime) || "45ms"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 170,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 165,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 156,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "health-item",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                children: "API Server"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 174,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "health-status",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "status ".concat((systemHealth === null || systemHealth === void 0 ? void 0 : (_systemHealth_api = systemHealth.api) === null || _systemHealth_api === void 0 ? void 0 : (_systemHealth_api_status = _systemHealth_api.status) === null || _systemHealth_api_status === void 0 ? void 0 : _systemHealth_api_status.toLowerCase()) || "healthy"),
                                                    children: (systemHealth === null || systemHealth === void 0 ? void 0 : (_systemHealth_api1 = systemHealth.api) === null || _systemHealth_api1 === void 0 ? void 0 : (_systemHealth_api_status1 = _systemHealth_api1.status) === null || _systemHealth_api_status1 === void 0 ? void 0 : _systemHealth_api_status1.toUpperCase()) || "HEALTHY"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                    lineNumber: 176,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 175,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "health-details",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: [
                                                            "Requests/min: ",
                                                            (systemHealth === null || systemHealth === void 0 ? void 0 : (_systemHealth_api2 = systemHealth.api) === null || _systemHealth_api2 === void 0 ? void 0 : _systemHealth_api2.requestsPerMin) || 0
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 181,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: [
                                                            "Error Rate: ",
                                                            (systemHealth === null || systemHealth === void 0 ? void 0 : (_systemHealth_api3 = systemHealth.api) === null || _systemHealth_api3 === void 0 ? void 0 : _systemHealth_api3.errorRate) || "0.2%"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 182,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 180,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 173,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "health-item",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                children: "Cache Server"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 186,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "health-status",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "status ".concat((systemHealth === null || systemHealth === void 0 ? void 0 : (_systemHealth_cache = systemHealth.cache) === null || _systemHealth_cache === void 0 ? void 0 : (_systemHealth_cache_status = _systemHealth_cache.status) === null || _systemHealth_cache_status === void 0 ? void 0 : _systemHealth_cache_status.toLowerCase()) || "healthy"),
                                                    children: (systemHealth === null || systemHealth === void 0 ? void 0 : (_systemHealth_cache1 = systemHealth.cache) === null || _systemHealth_cache1 === void 0 ? void 0 : (_systemHealth_cache_status1 = _systemHealth_cache1.status) === null || _systemHealth_cache_status1 === void 0 ? void 0 : _systemHealth_cache_status1.toUpperCase()) || "HEALTHY"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                    lineNumber: 188,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 187,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "health-details",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: [
                                                            "Hit Rate: ",
                                                            (systemHealth === null || systemHealth === void 0 ? void 0 : (_systemHealth_cache2 = systemHealth.cache) === null || _systemHealth_cache2 === void 0 ? void 0 : _systemHealth_cache2.hitRate) || "85%"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 195,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: [
                                                            "Memory Use: ",
                                                            (systemHealth === null || systemHealth === void 0 ? void 0 : (_systemHealth_cache3 = systemHealth.cache) === null || _systemHealth_cache3 === void 0 ? void 0 : _systemHealth_cache3.memoryUse) || "60%"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 196,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 194,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 185,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "health-item",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                children: "Storage Service"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 200,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "health-status",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "status ".concat((systemHealth === null || systemHealth === void 0 ? void 0 : (_systemHealth_storage = systemHealth.storage) === null || _systemHealth_storage === void 0 ? void 0 : (_systemHealth_storage_status = _systemHealth_storage.status) === null || _systemHealth_storage_status === void 0 ? void 0 : _systemHealth_storage_status.toLowerCase()) || "healthy"),
                                                    children: (systemHealth === null || systemHealth === void 0 ? void 0 : (_systemHealth_storage1 = systemHealth.storage) === null || _systemHealth_storage1 === void 0 ? void 0 : (_systemHealth_storage_status1 = _systemHealth_storage1.status) === null || _systemHealth_storage_status1 === void 0 ? void 0 : _systemHealth_storage_status1.toUpperCase()) || "HEALTHY"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                    lineNumber: 202,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 201,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "health-details",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: [
                                                            "Used: ",
                                                            (systemHealth === null || systemHealth === void 0 ? void 0 : (_systemHealth_storage2 = systemHealth.storage) === null || _systemHealth_storage2 === void 0 ? void 0 : _systemHealth_storage2.used) || "0",
                                                            " GB"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 209,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: [
                                                            "Available: ",
                                                            (systemHealth === null || systemHealth === void 0 ? void 0 : (_systemHealth_storage3 = systemHealth.storage) === null || _systemHealth_storage3 === void 0 ? void 0 : _systemHealth_storage3.available) || "0",
                                                            " GB"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 210,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 208,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 199,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 155,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                        lineNumber: 153,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "module",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                children: "User Activity (Last 24 Hours)"
                            }, void 0, false, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 217,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "activity-list",
                                children: recentActivity.slice(0, 8).map(function(activity) {
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "activity-item",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "activity-icon",
                                                children: activity.icon || "📝"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 221,
                                                columnNumber: 17
                                            }, _this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "activity-content",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                        children: activity.title
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 223,
                                                        columnNumber: 19
                                                    }, _this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: activity.description
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 224,
                                                        columnNumber: 19
                                                    }, _this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                                        children: activity.userName
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 225,
                                                        columnNumber: 19
                                                    }, _this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 222,
                                                columnNumber: 17
                                            }, _this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "activity-meta",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("time", {
                                                        children: new Date(activity.timestamp).toLocaleTimeString()
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 228,
                                                        columnNumber: 19
                                                    }, _this),
                                                    activity.type && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "activity-type ".concat(activity.type),
                                                        children: activity.type
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 230,
                                                        columnNumber: 21
                                                    }, _this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 227,
                                                columnNumber: 17
                                            }, _this)
                                        ]
                                    }, activity.id, true, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 220,
                                        columnNumber: 15
                                    }, _this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 218,
                                columnNumber: 11
                            }, this),
                            !recentActivity || recentActivity.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "no-activity",
                                children: "No recent activity"
                            }, void 0, false, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 237,
                                columnNumber: 13
                            }, this) : null
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                        lineNumber: 216,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "module",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                children: "User Statistics"
                            }, void 0, false, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 242,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "user-stats-grid",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "stat-card",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                children: "Doctors"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 245,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "stat-value",
                                                children: (userStats === null || userStats === void 0 ? void 0 : (_userStats_doctors = userStats.doctors) === null || _userStats_doctors === void 0 ? void 0 : _userStats_doctors.total) || 0
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 246,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "stat-label",
                                                children: "Registered"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 247,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "stat-change",
                                                children: (userStats === null || userStats === void 0 ? void 0 : (_userStats_doctors1 = userStats.doctors) === null || _userStats_doctors1 === void 0 ? void 0 : _userStats_doctors1.growth) !== undefined ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "change ".concat((userStats === null || userStats === void 0 ? void 0 : (_userStats_doctors2 = userStats.doctors) === null || _userStats_doctors2 === void 0 ? void 0 : _userStats_doctors2.growth) >= 0 ? "positive" : "negative"),
                                                    children: [
                                                        (userStats === null || userStats === void 0 ? void 0 : (_userStats_doctors3 = userStats.doctors) === null || _userStats_doctors3 === void 0 ? void 0 : _userStats_doctors3.growth) >= 0 ? "+" : "",
                                                        userStats === null || userStats === void 0 ? void 0 : (_userStats_doctors4 = userStats.doctors) === null || _userStats_doctors4 === void 0 ? void 0 : _userStats_doctors4.growth,
                                                        "%"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                    lineNumber: 250,
                                                    columnNumber: 19
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "change",
                                                    children: "N/A"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                    lineNumber: 257,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 248,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 244,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "stat-card",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                children: "Patients"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 262,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "stat-value",
                                                children: (userStats === null || userStats === void 0 ? void 0 : (_userStats_patients = userStats.patients) === null || _userStats_patients === void 0 ? void 0 : _userStats_patients.total) || 0
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 263,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "stat-label",
                                                children: "Registered"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 264,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "stat-change",
                                                children: (userStats === null || userStats === void 0 ? void 0 : (_userStats_patients1 = userStats.patients) === null || _userStats_patients1 === void 0 ? void 0 : _userStats_patients1.growth) !== undefined ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "change ".concat((userStats === null || userStats === void 0 ? void 0 : (_userStats_patients2 = userStats.patients) === null || _userStats_patients2 === void 0 ? void 0 : _userStats_patients2.growth) >= 0 ? "positive" : "negative"),
                                                    children: [
                                                        (userStats === null || userStats === void 0 ? void 0 : (_userStats_patients3 = userStats.patients) === null || _userStats_patients3 === void 0 ? void 0 : _userStats_patients3.growth) >= 0 ? "+" : "",
                                                        userStats === null || userStats === void 0 ? void 0 : (_userStats_patients4 = userStats.patients) === null || _userStats_patients4 === void 0 ? void 0 : _userStats_patients4.growth,
                                                        "%"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                    lineNumber: 267,
                                                    columnNumber: 19
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "change",
                                                    children: "N/A"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                    lineNumber: 274,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 265,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 261,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "stat-card",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                children: "Administrators"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 279,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "stat-value",
                                                children: (userStats === null || userStats === void 0 ? void 0 : (_userStats_admins = userStats.admins) === null || _userStats_admins === void 0 ? void 0 : _userStats_admins.total) || 0
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 280,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "stat-label",
                                                children: "Registered"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 281,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "stat-change",
                                                children: (userStats === null || userStats === void 0 ? void 0 : (_userStats_admins1 = userStats.admins) === null || _userStats_admins1 === void 0 ? void 0 : _userStats_admins1.growth) !== undefined ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "change ".concat((userStats === null || userStats === void 0 ? void 0 : (_userStats_admins2 = userStats.admins) === null || _userStats_admins2 === void 0 ? void 0 : _userStats_admins2.growth) >= 0 ? "positive" : "negative"),
                                                    children: [
                                                        (userStats === null || userStats === void 0 ? void 0 : (_userStats_admins3 = userStats.admins) === null || _userStats_admins3 === void 0 ? void 0 : _userStats_admins3.growth) >= 0 ? "+" : "",
                                                        userStats === null || userStats === void 0 ? void 0 : (_userStats_admins4 = userStats.admins) === null || _userStats_admins4 === void 0 ? void 0 : _userStats_admins4.growth,
                                                        "%"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                    lineNumber: 284,
                                                    columnNumber: 19
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "change",
                                                    children: "N/A"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                    lineNumber: 291,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 282,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 278,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "stat-card",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                children: "Staff"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 296,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "stat-value",
                                                children: (userStats === null || userStats === void 0 ? void 0 : (_userStats_staff = userStats.staff) === null || _userStats_staff === void 0 ? void 0 : _userStats_staff.total) || 0
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 297,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "stat-label",
                                                children: "Registered"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 298,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "stat-change",
                                                children: (userStats === null || userStats === void 0 ? void 0 : (_userStats_staff1 = userStats.staff) === null || _userStats_staff1 === void 0 ? void 0 : _userStats_staff1.growth) !== undefined ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "change ".concat((userStats === null || userStats === void 0 ? void 0 : (_userStats_staff2 = userStats.staff) === null || _userStats_staff2 === void 0 ? void 0 : _userStats_staff2.growth) >= 0 ? "positive" : "negative"),
                                                    children: [
                                                        (userStats === null || userStats === void 0 ? void 0 : (_userStats_staff3 = userStats.staff) === null || _userStats_staff3 === void 0 ? void 0 : _userStats_staff3.growth) >= 0 ? "+" : "",
                                                        userStats === null || userStats === void 0 ? void 0 : (_userStats_staff4 = userStats.staff) === null || _userStats_staff4 === void 0 ? void 0 : _userStats_staff4.growth,
                                                        "%"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                    lineNumber: 301,
                                                    columnNumber: 19
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "change",
                                                    children: "N/A"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                    lineNumber: 308,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 299,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 295,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 243,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                        lineNumber: 241,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                lineNumber: 152,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
        lineNumber: 90,
        columnNumber: 5
    }, this);
}
_s(DashboardPage, "X310q/Xj1O8zATl+q2RVxlmc1eU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$lib$2f$useQuery$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["useQuery"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$lib$2f$useQuery$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["useQuery"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$lib$2f$useQuery$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["useQuery"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$lib$2f$useQuery$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
_c = DashboardPage;
function UserManagementPage() {
    var _this = this;
    _s1();
    var _React_useState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].useState("all"), 2), userType = _React_useState[0], setUserType = _React_useState[1];
    var _React_useState1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].useState(""), 2), searchTerm = _React_useState1[0], setSearchTerm = _React_useState1[1];
    var _React_useState2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].useState("name"), 2), sortBy = _React_useState2[0], setSortBy = _React_useState2[1];
    var _React_useState3 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].useState([]), 2), users = _React_useState3[0], setUsers = _React_useState3[1];
    var _React_useState4 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].useState(true), 2), loading = _React_useState4[0], setLoading = _React_useState4[1];
    var _React_useState5 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].useState(null), 2), error = _React_useState5[0], setError = _React_useState5[1];
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "UserManagementPage.useEffect": function() {
            var loadUsers = function loadUsers() {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])({
                    "UserManagementPage.useEffect.loadUsers": function() {
                        var response, usersWithLastActive, err, message;
                        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, {
                            "UserManagementPage.useEffect.loadUsers": function(_state) {
                                switch(_state.label){
                                    case 0:
                                        _state.trys.push([
                                            0,
                                            2,
                                            3,
                                            4
                                        ]);
                                        return [
                                            4,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$admin$2d$dashboard$2f$src$2f$services$2f$api$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["apiService"].admin.getUsers({
                                                userType: userType,
                                                searchTerm: searchTerm,
                                                sortBy: sortBy
                                            })
                                        ];
                                    case 1:
                                        response = _state.sent();
                                        // Map lastLogin to lastActive for display purposes
                                        usersWithLastActive = response.data.map({
                                            "UserManagementPage.useEffect.loadUsers": function(user) {
                                                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])({}, user), {
                                                    lastActive: user.lastLogin
                                                });
                                            }
                                        }["UserManagementPage.useEffect.loadUsers"]);
                                        setUsers(usersWithLastActive);
                                        setError(null);
                                        return [
                                            3,
                                            4
                                        ];
                                    case 2:
                                        err = _state.sent();
                                        message = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_instanceof$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(err, Error) ? err.message : String(err);
                                        setError(message || "Failed to load users");
                                        return [
                                            3,
                                            4
                                        ];
                                    case 3:
                                        setLoading(false);
                                        return [
                                            7
                                        ];
                                    case 4:
                                        return [
                                            2
                                        ];
                                }
                            }
                        }["UserManagementPage.useEffect.loadUsers"]);
                    }
                }["UserManagementPage.useEffect.loadUsers"])();
            };
            loadUsers();
        }
    }["UserManagementPage.useEffect"], [
        userType,
        searchTerm,
        sortBy
    ]);
    var handleSearchChange = function handleSearchChange(e) {
        setSearchTerm(e.target.value);
    };
    var handleFilterChange = function handleFilterChange(e) {
        setUserType(e.target.value);
    };
    var handleSortChange = function handleSortChange(e) {
        setSortBy(e.target.value);
    };
    var handleStatusChange = function handleStatusChange(userId, newStatus) {
        // Update user status logic would go here
        alert("Changing status for user ".concat(userId, " to ").concat(newStatus));
    };
    var handleDeleteUser = function handleDeleteUser(userId) {
        if (window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
            // Delete user logic would go here
            alert("Deleting user ".concat(userId));
        // In reality, you would call the API and then remove from state
        }
    };
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "page-container",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    children: "User Management"
                }, void 0, false, {
                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                    lineNumber: 395,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "page-content",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "loading",
                        children: "Loading users..."
                    }, void 0, false, {
                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                        lineNumber: 397,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                    lineNumber: 396,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
            lineNumber: 394,
            columnNumber: 7
        }, this);
    }
    if (error) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "page-container",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    children: "User Management"
                }, void 0, false, {
                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                    lineNumber: 406,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "page-content",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "error-message",
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                        lineNumber: 408,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                    lineNumber: 407,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
            lineNumber: 405,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "page-container",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                children: "User Management"
            }, void 0, false, {
                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                lineNumber: 416,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "page-content",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "user-header",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "search-filter",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    placeholder: "Search users...",
                                    value: searchTerm,
                                    onChange: handleSearchChange,
                                    className: "search-input"
                                }, void 0, false, {
                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                    lineNumber: 420,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                    value: userType,
                                    onChange: handleFilterChange,
                                    className: "filter-select",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "all",
                                            children: "All Users"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                            lineNumber: 428,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "doctor",
                                            children: "Doctors"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                            lineNumber: 429,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "patient",
                                            children: "Patients"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                            lineNumber: 430,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "admin",
                                            children: "Administrators"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                            lineNumber: 431,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "staff",
                                            children: "Staff Members"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                            lineNumber: 432,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                    lineNumber: 427,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                    value: sortBy,
                                    onChange: handleSortChange,
                                    className: "sort-select",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "name",
                                            children: "Name (A-Z)"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                            lineNumber: 435,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "recent",
                                            children: "Recently Active"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                            lineNumber: 436,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "status",
                                            children: "Status"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                            lineNumber: 437,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "role",
                                            children: "Role"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                            lineNumber: 438,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                    lineNumber: 434,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "btn-primary",
                                    onClick: function onClick() {
                                        // Add new user
                                        alert("Add new user functionality would go here");
                                    },
                                    children: "Add User"
                                }, void 0, false, {
                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                    lineNumber: 440,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                            lineNumber: 419,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                        lineNumber: 418,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "user-stats-summary",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "stat-item",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Total Users:"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 454,
                                        columnNumber: 13
                                    }, this),
                                    " ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: users.length
                                    }, void 0, false, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 454,
                                        columnNumber: 39
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 453,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "stat-item",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Active Today:"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 457,
                                        columnNumber: 13
                                    }, this),
                                    " ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: users.filter(function(u) {
                                            return u.isActiveToday;
                                        }).length
                                    }, void 0, false, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 457,
                                        columnNumber: 40
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 456,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "stat-item",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Verified Accounts:"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 460,
                                        columnNumber: 13
                                    }, this),
                                    " ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: users.filter(function(u) {
                                            return u.isVerified;
                                        }).length
                                    }, void 0, false, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 461,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 459,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "stat-item",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Pending Verification:"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 464,
                                        columnNumber: 13
                                    }, this),
                                    " ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: users.filter(function(u) {
                                            return !u.isVerified && u.requiresVerification;
                                        }).length
                                    }, void 0, false, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 465,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 463,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                        lineNumber: 452,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "users-table",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                children: "Name"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 473,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                children: "Email"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 474,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                children: "Role"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 475,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                children: "Status"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 476,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                children: "Last Active"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 477,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                children: "Actions"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 478,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 472,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                    lineNumber: 471,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                    children: users.map(function(user) {
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            className: user.status === "active" ? "active-row" : user.status === "inactive" ? "inactive-row" : "pending-row",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "user-info",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "user-avatar",
                                                                children: user.name.charAt(0).toUpperCase()
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 495,
                                                                columnNumber: 23
                                                            }, _this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "user-name",
                                                                children: user.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 496,
                                                                columnNumber: 23
                                                            }, _this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 494,
                                                        columnNumber: 21
                                                    }, _this)
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                    lineNumber: 493,
                                                    columnNumber: 19
                                                }, _this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    children: user.email
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                    lineNumber: 499,
                                                    columnNumber: 19
                                                }, _this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "role-badge ".concat(user.role.toLowerCase()),
                                                        children: user.role.charAt(0).toUpperCase() + user.role.slice(1)
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 501,
                                                        columnNumber: 21
                                                    }, _this)
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                    lineNumber: 500,
                                                    columnNumber: 19
                                                }, _this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "status-badge ".concat(user.status.toLowerCase()),
                                                        children: user.status.charAt(0).toUpperCase() + user.status.slice(1)
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 506,
                                                        columnNumber: 21
                                                    }, _this)
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                    lineNumber: 505,
                                                    columnNumber: 19
                                                }, _this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    children: user.lastActive ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "last-active",
                                                        children: user.lastActive === "today" ? "Today" : user.lastActive === "yesterday" ? "Yesterday" : user.lastActive
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 512,
                                                        columnNumber: 23
                                                    }, _this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "last-active",
                                                        children: "Never"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 520,
                                                        columnNumber: 23
                                                    }, _this)
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                    lineNumber: 510,
                                                    columnNumber: 19
                                                }, _this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "actions-cell",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "action-buttons",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                className: "btn-action btn-sm",
                                                                onClick: function onClick() {
                                                                    // View user details
                                                                    alert("Viewing details for user ".concat(user.id));
                                                                },
                                                                children: "Details"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 525,
                                                                columnNumber: 23
                                                            }, _this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                className: "btn-action btn-sm btn-outline",
                                                                onClick: function onClick() {
                                                                    // Edit user
                                                                    alert("Editing user ".concat(user.id));
                                                                },
                                                                children: "Edit"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 534,
                                                                columnNumber: 23
                                                            }, _this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                value: user.status,
                                                                onChange: function onChange(e) {
                                                                    return handleStatusChange(user.id, e.target.value);
                                                                },
                                                                className: "status-select",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: "active",
                                                                        children: "Active"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                        lineNumber: 548,
                                                                        columnNumber: 25
                                                                    }, _this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: "inactive",
                                                                        children: "Inactive"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                        lineNumber: 549,
                                                                        columnNumber: 25
                                                                    }, _this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: "suspended",
                                                                        children: "Suspended"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                        lineNumber: 550,
                                                                        columnNumber: 25
                                                                    }, _this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: "pending",
                                                                        children: "Pending Verification"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                        lineNumber: 551,
                                                                        columnNumber: 25
                                                                    }, _this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 543,
                                                                columnNumber: 23
                                                            }, _this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                className: "btn-action btn-sm btn-danger",
                                                                onClick: function onClick() {
                                                                    handleDeleteUser(user.id);
                                                                },
                                                                children: "Delete"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 553,
                                                                columnNumber: 23
                                                            }, _this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 524,
                                                        columnNumber: 21
                                                    }, _this)
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                    lineNumber: 523,
                                                    columnNumber: 19
                                                }, _this)
                                            ]
                                        }, user.id, true, {
                                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                            lineNumber: 483,
                                            columnNumber: 17
                                        }, _this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                    lineNumber: 481,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                            lineNumber: 470,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                        lineNumber: 469,
                        columnNumber: 9
                    }, this),
                    users.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "empty-state",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                children: "No Users Found"
                            }, void 0, false, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 571,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "No users match your current filters."
                            }, void 0, false, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 572,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "btn-primary",
                                onClick: function onClick() {
                                    // Add new user
                                    alert("Add new user functionality would go here");
                                },
                                children: "Add First User"
                            }, void 0, false, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 573,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                        lineNumber: 570,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                lineNumber: 417,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
        lineNumber: 415,
        columnNumber: 5
    }, this);
}
_s1(UserManagementPage, "RGnN5SvhdXThfEB412ZUnRNpW5Y=");
_c1 = UserManagementPage;
// System Monitoring Page
function SystemMonitoringPage() {
    var _this = this;
    var _metrics_overallHealth, _metrics_overallHealth1;
    _s2();
    var _useQuery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$lib$2f$useQuery$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "systemMetrics"
        ],
        queryFn: function queryFn() {
            return __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$admin$2d$dashboard$2f$src$2f$services$2f$api$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["apiService"].admin.getSystemMetrics().then({
                "SystemMonitoringPage.useQuery[_useQuery].queryFn": function(res) {
                    return res.data;
                }
            }["SystemMonitoringPage.useQuery[_useQuery].queryFn"]);
        },
        retry: false
    }), tmp = _useQuery.data, metrics = tmp === void 0 ? {} : tmp, loadingMetrics = _useQuery.isLoading;
    var _useQuery1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$lib$2f$useQuery$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "systemAlerts"
        ],
        queryFn: function queryFn() {
            return __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$admin$2d$dashboard$2f$src$2f$services$2f$api$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["apiService"].admin.getSystemAlerts().then({
                "SystemMonitoringPage.useQuery[_useQuery].queryFn": function(res) {
                    return res.data;
                }
            }["SystemMonitoringPage.useQuery[_useQuery].queryFn"]);
        },
        retry: false
    }), tmp1 = _useQuery1.data, alerts = tmp1 === void 0 ? [] : tmp1, loadingAlerts = _useQuery1.isLoading;
    var _useQuery2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$lib$2f$useQuery$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "servicesStatus"
        ],
        queryFn: function queryFn() {
            return __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$admin$2d$dashboard$2f$src$2f$services$2f$api$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["apiService"].admin.getServicesStatus().then({
                "SystemMonitoringPage.useQuery[_useQuery].queryFn": function(res) {
                    return res.data;
                }
            }["SystemMonitoringPage.useQuery[_useQuery].queryFn"]);
        },
        retry: false
    }), tmp2 = _useQuery2.data, services = tmp2 === void 0 ? [] : tmp2, loadingServices = _useQuery2.isLoading;
    var isLoading = loadingMetrics || loadingAlerts || loadingServices;
    if (isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "page-container",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    children: "System Monitoring"
                }, void 0, false, {
                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                    lineNumber: 620,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "page-content",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "loading",
                        children: "Loading system data..."
                    }, void 0, false, {
                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                        lineNumber: 622,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                    lineNumber: 621,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
            lineNumber: 619,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "page-container",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                children: "System Monitoring"
            }, void 0, false, {
                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                lineNumber: 630,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "page-content",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "monitoring-header",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "monitoring-stats",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "stat-card",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                children: "Overall Health"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 635,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "stat-value",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "status-health ".concat((metrics === null || metrics === void 0 ? void 0 : (_metrics_overallHealth = metrics.overallHealth) === null || _metrics_overallHealth === void 0 ? void 0 : _metrics_overallHealth.toLowerCase()) || "healthy"),
                                                    children: (metrics === null || metrics === void 0 ? void 0 : (_metrics_overallHealth1 = metrics.overallHealth) === null || _metrics_overallHealth1 === void 0 ? void 0 : _metrics_overallHealth1.toUpperCase()) || "HEALTHY"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                    lineNumber: 637,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 636,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 634,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "stat-card",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                children: "CPU Usage"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 645,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "stat-value",
                                                children: [
                                                    (metrics === null || metrics === void 0 ? void 0 : metrics.cpuUsage) || "0",
                                                    "%"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 646,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 644,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "stat-card",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                children: "Memory Usage"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 649,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "stat-value",
                                                children: [
                                                    (metrics === null || metrics === void 0 ? void 0 : metrics.memoryUsage) || "0",
                                                    "%"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 650,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 648,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "stat-card",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                children: "Disk Usage"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 653,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "stat-value",
                                                children: [
                                                    (metrics === null || metrics === void 0 ? void 0 : metrics.diskUsage) || "0",
                                                    "%"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 654,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 652,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "stat-card",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                children: "Network I/O"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 657,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "stat-value",
                                                children: [
                                                    (metrics === null || metrics === void 0 ? void 0 : metrics.networkIO) || "0",
                                                    " MB/s"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 658,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 656,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 633,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "btn-outline",
                                onClick: function onClick() {
                                    // Refresh metrics
                                    alert("Refreshing system metrics...");
                                },
                                children: "Refresh Data"
                            }, void 0, false, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 661,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                        lineNumber: 632,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "monitoring-modules",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "monitoring-module",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        children: "Service Status"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 674,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "services-list",
                                        children: services.map(function(service) {
                                            var _service_status, _service_status1, _service_status2;
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "service-item ".concat(((_service_status = service.status) === null || _service_status === void 0 ? void 0 : _service_status.toLowerCase()) || "unknown"),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "service-info",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                children: service.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 689,
                                                                columnNumber: 23
                                                            }, _this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                children: service.description
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 690,
                                                                columnNumber: 23
                                                            }, _this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 688,
                                                        columnNumber: 21
                                                    }, _this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "service-status",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "status ".concat(((_service_status1 = service.status) === null || _service_status1 === void 0 ? void 0 : _service_status1.toLowerCase()) || "unknown"),
                                                                children: ((_service_status2 = service.status) === null || _service_status2 === void 0 ? void 0 : _service_status2.toUpperCase()) || "UNKNOWN"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 693,
                                                                columnNumber: 23
                                                            }, _this),
                                                            service.responseTime && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "response-time",
                                                                children: [
                                                                    service.responseTime,
                                                                    "ms"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 697,
                                                                columnNumber: 25
                                                            }, _this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 692,
                                                        columnNumber: 21
                                                    }, _this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "service-actions",
                                                        children: [
                                                            service.status !== "running" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                className: "btn-action btn-sm",
                                                                onClick: function onClick() {
                                                                    alert("Restarting service ".concat(service.name));
                                                                },
                                                                children: "Restart"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 702,
                                                                columnNumber: 25
                                                            }, _this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                className: "btn-action btn-sm btn-outline",
                                                                onClick: function onClick() {
                                                                    alert("View logs for ".concat(service.name));
                                                                },
                                                                children: "View Logs"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 711,
                                                                columnNumber: 23
                                                            }, _this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 700,
                                                        columnNumber: 21
                                                    }, _this)
                                                ]
                                            }, service.id, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 684,
                                                columnNumber: 19
                                            }, _this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 675,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 673,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "monitoring-module",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        children: "Active Alerts"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 727,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "alerts-list",
                                        children: alerts.length > 0 ? alerts.map(function(alertItem) {
                                            var _alertItem_severity, _alertItem_severity1;
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "alert-item alert-".concat(((_alertItem_severity = alertItem.severity) === null || _alertItem_severity === void 0 ? void 0 : _alertItem_severity.toLowerCase()) || "info"),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "alert-header",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                children: alertItem.title
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 745,
                                                                columnNumber: 25
                                                            }, _this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "alert-severity",
                                                                children: ((_alertItem_severity1 = alertItem.severity) === null || _alertItem_severity1 === void 0 ? void 0 : _alertItem_severity1.toUpperCase()) || "INFO"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 746,
                                                                columnNumber: 25
                                                            }, _this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 744,
                                                        columnNumber: 23
                                                    }, _this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "alert-body",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                children: alertItem.description
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 751,
                                                                columnNumber: 25
                                                            }, _this),
                                                            alertItem.metadata && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "alert-metadata",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                                                    children: Object.entries(alertItem.metadata).map(function(param) {
                                                                        var _param = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(param, 2), k = _param[0], v = _param[1];
                                                                        return "".concat(k, ": ").concat(v);
                                                                    }).join(", ")
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                    lineNumber: 754,
                                                                    columnNumber: 29
                                                                }, _this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 753,
                                                                columnNumber: 27
                                                            }, _this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 750,
                                                        columnNumber: 23
                                                    }, _this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "alert-footer",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                                                className: "alert-time",
                                                                children: new Date(alertItem.timestamp).toLocaleString()
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 763,
                                                                columnNumber: 25
                                                            }, _this),
                                                            alertItem.actionRequired && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                className: "btn-action btn-sm",
                                                                onClick: function onClick() {
                                                                    alert("Taking action on alert ".concat(alertItem.id));
                                                                },
                                                                children: "Take Action"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 767,
                                                                columnNumber: 27
                                                            }, _this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                className: "btn-action btn-sm btn-outline",
                                                                onClick: function onClick() {
                                                                    alert("Acknowledging alert ".concat(alertItem.id));
                                                                },
                                                                children: "Acknowledge"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 776,
                                                                columnNumber: 25
                                                            }, _this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 762,
                                                        columnNumber: 23
                                                    }, _this)
                                                ]
                                            }, alertItem.id, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 740,
                                                columnNumber: 21
                                            }, _this);
                                        }) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "no-alerts",
                                            children: "No active alerts"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                            lineNumber: 789,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 728,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 726,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "monitoring-module",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        children: "Performance Trends"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 795,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "trends-chart",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "chart-placeholder",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                    children: "CPU & Memory Usage (Last 24h)"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                    lineNumber: 798,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    children: "Chart visualization would go here"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                    lineNumber: 799,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "chart-controls",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            className: "btn-outline btn-sm",
                                                            onClick: function onClick() {
                                                                alert("Export chart data");
                                                            },
                                                            children: "Export Data"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                            lineNumber: 801,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            className: "btn-outline btn-sm",
                                                            onClick: function onClick() {
                                                                alert("Change time range");
                                                            },
                                                            children: "Time Range"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                            lineNumber: 809,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                    lineNumber: 800,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                            lineNumber: 797,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 796,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 794,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                        lineNumber: 672,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "monitoring-actions",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "btn-primary",
                                onClick: function onClick() {
                                    alert("Running system diagnostics...");
                                },
                                children: "Run Diagnostics"
                            }, void 0, false, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 824,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "btn-outline",
                                onClick: function onClick() {
                                    alert("Generating system health report...");
                                },
                                children: "Generate Report"
                            }, void 0, false, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 832,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "btn-outline",
                                onClick: function onClick() {
                                    alert("Opening maintenance mode...");
                                },
                                children: "Maintenance Mode"
                            }, void 0, false, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 840,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                        lineNumber: 823,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                lineNumber: 631,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
        lineNumber: 629,
        columnNumber: 5
    }, this);
}
_s2(SystemMonitoringPage, "auZSHZpQPortFbjjNcp9HLboY+Y=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$lib$2f$useQuery$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["useQuery"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$lib$2f$useQuery$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["useQuery"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$lib$2f$useQuery$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
_c2 = SystemMonitoringPage;
// Reports & Analytics Page
function ReportsAnalyticsPage() {
    var _dailyActiveUsers, _pageViews, _apiCalls, _avgResponseTime, _errorRate, _uptime, _loginAttempts, _failedLogins, _blockedIPs;
    _s3();
    var _React_useState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].useState("usage"), 2), reportType = _React_useState[0], setReportType = _React_useState[1];
    var _React_useState1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].useState("last7days"), 2), dateRange = _React_useState1[0], setDateRange = _React_useState1[1];
    var _React_useState2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].useState(null), 2), reportData = _React_useState2[0], setReportData = _React_useState2[1];
    var _React_useState3 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].useState(false), 2), loading = _React_useState3[0], setLoading = _React_useState3[1];
    var generateReport = function generateReport() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(function() {
            var _reportType, reportDataMap, mockData;
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, function(_state) {
                setLoading(true);
                try {
                    ;
                    // Simulate API call
                    reportDataMap = {
                        usage: {
                            last7days: {
                                dailyActiveUsers: [
                                    120,
                                    135,
                                    110,
                                    142,
                                    158,
                                    165,
                                    140
                                ],
                                pageViews: [
                                    2400,
                                    2650,
                                    2100,
                                    2980,
                                    3200,
                                    3400,
                                    2800
                                ],
                                apiCalls: [
                                    15000,
                                    16500,
                                    14000,
                                    18200,
                                    20500,
                                    22000,
                                    18500
                                ]
                            },
                            last30days: {
                                weeklyActiveUsers: [
                                    850,
                                    920,
                                    880,
                                    950
                                ],
                                monthlyGrowth: 12.5,
                                peakConcurrentUsers: 450
                            }
                        },
                        performance: {
                            last7days: {
                                avgResponseTime: [
                                    120,
                                    115,
                                    130,
                                    110,
                                    105,
                                    100,
                                    115
                                ],
                                errorRate: [
                                    0.2,
                                    0.1,
                                    0.3,
                                    0.1,
                                    0.0,
                                    0.2,
                                    0.1
                                ],
                                uptime: [
                                    99.8,
                                    99.9,
                                    99.7,
                                    99.9,
                                    100.0,
                                    99.8,
                                    99.9
                                ]
                            },
                            last30days: {
                                avgResponseTime: 115,
                                errorRate: 0.15,
                                uptime: 99.85
                            }
                        },
                        security: {
                            last7days: {
                                loginAttempts: [
                                    450,
                                    480,
                                    420,
                                    520,
                                    580,
                                    610,
                                    550
                                ],
                                failedLogins: [
                                    25,
                                    30,
                                    20,
                                    35,
                                    40,
                                    45,
                                    35
                                ],
                                blockedIPs: [
                                    5,
                                    8,
                                    3,
                                    12,
                                    15,
                                    18,
                                    10
                                ]
                            },
                            last30days: {
                                totalLoginAttempts: 18500,
                                securityIncidents: 3,
                                dataBreaches: 0
                            }
                        },
                        financial: {},
                        compliance: {}
                    };
                    // Using any type to bypass TypeScript strictness for this mock data
                    mockData = ((_reportType = reportDataMap[reportType]) === null || _reportType === void 0 ? void 0 : _reportType[dateRange]) || {};
                    // Explicitly type the reportData state to avoid TypeScript errors
                    setReportData(mockData || null);
                } catch (error) {
                    console.error("Error generating report:", error);
                    alert("Failed to generate report. Please try again.");
                } finally{
                    setLoading(false);
                }
                return [
                    2
                ];
            });
        })();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "page-container",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                children: "Reports & Analytics"
            }, void 0, false, {
                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                lineNumber: 921,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "page-content",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "report-controls",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "control-group",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "reportType",
                                        children: "Report Type:"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 925,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        id: "reportType",
                                        value: reportType,
                                        onChange: function onChange(e) {
                                            return setReportType(e.target.value);
                                        },
                                        className: "form-select",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "usage",
                                                children: "Usage Statistics"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 932,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "performance",
                                                children: "Performance Metrics"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 933,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "security",
                                                children: "Security Reports"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 934,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "financial",
                                                children: "Financial Reports"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 935,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "compliance",
                                                children: "Compliance Reports"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 936,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 926,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 924,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "control-group",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "dateRange",
                                        children: "Date Range:"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 940,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        id: "dateRange",
                                        value: dateRange,
                                        onChange: function onChange(e) {
                                            return setDateRange(e.target.value);
                                        },
                                        className: "form-select",
                                        children: [
                                            reportType === "usage" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "last7days",
                                                        children: "Last 7 Days"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 949,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "last30days",
                                                        children: "Last 30 Days"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 950,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "last90days",
                                                        children: "Last 90 Days"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 951,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "ytd",
                                                        children: "Year to Date"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 952,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true),
                                            reportType === "performance" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "last7days",
                                                        children: "Last 7 Days"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 957,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "last30days",
                                                        children: "Last 30 Days"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 958,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "last90days",
                                                        children: "Last 90 Days"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 959,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true),
                                            reportType === "security" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "last7days",
                                                        children: "Last 7 Days"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 964,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "last30days",
                                                        children: "Last 30 Days"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 965,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "last90days",
                                                        children: "Last 90 Days"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 966,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true),
                                            reportType === "financial" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "last30days",
                                                        children: "Last 30 Days"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 971,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "last90days",
                                                        children: "Last 90 Days"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 972,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "ytd",
                                                        children: "Year to Date"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 973,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true),
                                            reportType === "compliance" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "last30days",
                                                        children: "Last 30 Days"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 978,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "last90days",
                                                        children: "Last 90 Days"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 979,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "ytd",
                                                        children: "Year to Date"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 980,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 941,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 939,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "btn-primary",
                                onClick: generateReport,
                                disabled: loading,
                                children: loading ? "Generating..." : "Generate Report"
                            }, void 0, false, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 985,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                        lineNumber: 923,
                        columnNumber: 9
                    }, this),
                    reportData && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "report-results",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                children: [
                                    reportType.charAt(0).toUpperCase() + reportType.slice(1),
                                    " Report -",
                                    dateRange.replace(/([A-Z])/g, " $1").toUpperCase()
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 992,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "report-content",
                                children: [
                                    reportType === "usage" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "report-section",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                        children: "Daily Active Users"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1000,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "chart-placeholder",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            children: ((_dailyActiveUsers = reportData.dailyActiveUsers) === null || _dailyActiveUsers === void 0 ? void 0 : _dailyActiveUsers.join(", ")) || "No data"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                            lineNumber: 1002,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1001,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 999,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "report-section",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                        children: "Page Views"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1006,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "chart-placeholder",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            children: ((_pageViews = reportData.pageViews) === null || _pageViews === void 0 ? void 0 : _pageViews.join(", ")) || "No data"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                            lineNumber: 1008,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1007,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1005,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "report-section",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                        children: "API Calls"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1012,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "chart-placeholder",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            children: ((_apiCalls = reportData.apiCalls) === null || _apiCalls === void 0 ? void 0 : _apiCalls.join(", ")) || "No data"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                            lineNumber: 1014,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1013,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1011,
                                                columnNumber: 19
                                            }, this),
                                            reportData.monthlyGrowth && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "report-section",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                        children: "Monthly Growth"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1019,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                            children: [
                                                                reportData.monthlyGrowth,
                                                                "%"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                            lineNumber: 1021,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1020,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1018,
                                                columnNumber: 21
                                            }, this),
                                            reportData.peakConcurrentUsers && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "report-section",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                        children: "Peak Concurrent Users"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1027,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: reportData.peakConcurrentUsers
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 1029,
                                                                columnNumber: 25
                                                            }, this),
                                                            " users"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1028,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1026,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true),
                                    reportType === "performance" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "report-section",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                        children: "Average Response Time (ms)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1038,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "chart-placeholder",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            children: ((_avgResponseTime = reportData.avgResponseTime) === null || _avgResponseTime === void 0 ? void 0 : _avgResponseTime.join(", ")) || "No data"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                            lineNumber: 1040,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1039,
                                                        columnNumber: 21
                                                    }, this),
                                                    reportData.avgResponseTime !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "report-summary",
                                                        children: [
                                                            "Average:",
                                                            " ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: [
                                                                    reportData.avgResponseTime.reduce(function(a, b) {
                                                                        return a + b;
                                                                    }, 0) / reportData.avgResponseTime.length,
                                                                    "ms"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 1045,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1043,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1037,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "report-section",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                        children: "Error Rate (%)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1056,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "chart-placeholder",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            children: ((_errorRate = reportData.errorRate) === null || _errorRate === void 0 ? void 0 : _errorRate.join(", ")) || "No data"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                            lineNumber: 1058,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1057,
                                                        columnNumber: 21
                                                    }, this),
                                                    reportData.errorRate !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "report-summary",
                                                        children: [
                                                            "Average:",
                                                            " ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: [
                                                                    (reportData.errorRate.reduce(function(a, b) {
                                                                        return a + b;
                                                                    }, 0) / reportData.errorRate.length).toFixed(2),
                                                                    "%"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 1063,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1061,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1055,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "report-section",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                        children: "System Uptime (%)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1076,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "chart-placeholder",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            children: ((_uptime = reportData.uptime) === null || _uptime === void 0 ? void 0 : _uptime.join(", ")) || "No data"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                            lineNumber: 1078,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1077,
                                                        columnNumber: 21
                                                    }, this),
                                                    reportData.uptime !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "report-summary",
                                                        children: [
                                                            "Average:",
                                                            " ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: [
                                                                    (reportData.uptime.reduce(function(a, b) {
                                                                        return a + b;
                                                                    }, 0) / reportData.uptime.length).toFixed(2),
                                                                    "%"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 1083,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1081,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1075,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true),
                                    reportType === "security" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "report-section",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                        children: "Login Attempts"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1098,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "chart-placeholder",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            children: ((_loginAttempts = reportData.loginAttempts) === null || _loginAttempts === void 0 ? void 0 : _loginAttempts.join(", ")) || "No data"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                            lineNumber: 1100,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1099,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1097,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "report-section",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                        children: "Failed Login Attempts"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1104,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "chart-placeholder",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            children: ((_failedLogins = reportData.failedLogins) === null || _failedLogins === void 0 ? void 0 : _failedLogins.join(", ")) || "No data"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                            lineNumber: 1106,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1105,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1103,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "report-section",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                        children: "Blocked IP Addresses"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1110,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "chart-placeholder",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            children: ((_blockedIPs = reportData.blockedIPs) === null || _blockedIPs === void 0 ? void 0 : _blockedIPs.join(", ")) || "No data"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                            lineNumber: 1112,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1111,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1109,
                                                columnNumber: 19
                                            }, this),
                                            reportData.securityIncidents !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "report-section",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                        children: "Security Incidents"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1117,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: reportData.securityIncidents
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 1119,
                                                                columnNumber: 25
                                                            }, this),
                                                            " incidents"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1118,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1116,
                                                columnNumber: 21
                                            }, this),
                                            reportData.dataBreaches !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "report-section",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                        children: "Data Breaches"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1125,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: reportData.dataBreaches
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 1127,
                                                                columnNumber: 25
                                                            }, this),
                                                            " breaches"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1126,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1124,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true),
                                    reportType === "financial" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "report-section",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                        children: "Monthly Revenue"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1136,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                            children: "$245,000"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                            lineNumber: 1138,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1137,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1135,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "report-section",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                        children: "Monthly Expenses"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1142,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                            children: "$198,000"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                            lineNumber: 1144,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1143,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1141,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "report-section",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                        children: "Net Income"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1148,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                            children: "$47,000"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                            lineNumber: 1150,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1149,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1147,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "report-section",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                        children: "ROI"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1154,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                            children: "12.3%"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                            lineNumber: 1156,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1155,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1153,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true),
                                    reportType === "compliance" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "report-section",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                        children: "HIPAA Compliance Score"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1164,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                            children: "98.5%"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                            lineNumber: 1166,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1165,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1163,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "report-section",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                        children: "Data Privacy Compliance"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1170,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                            children: "Compliant"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                            lineNumber: 1172,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1171,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1169,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "report-section",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                        children: "Audit Trail Completeness"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1176,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                            children: "99.2%"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                            lineNumber: 1178,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1177,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1175,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 996,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                        lineNumber: 991,
                        columnNumber: 11
                    }, this),
                    !reportData && !loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "report-placeholder",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: 'Select report type and date range, then click "Generate Report" to view results.'
                        }, void 0, false, {
                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                            lineNumber: 1189,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                        lineNumber: 1188,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                lineNumber: 922,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
        lineNumber: 920,
        columnNumber: 5
    }, this);
}
_s3(ReportsAnalyticsPage, "GvRJKf/fQh0Bu8AdwFytIFJtLqw=");
_c3 = ReportsAnalyticsPage;
// Settings Page for System Admin
function SettingsPage() {
    _s4();
    var _React_useState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].useState("general"), 2), activeTab = _React_useState[0], setActiveTab = _React_useState[1];
    var _React_useState1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].useState(false), 2), loading = _React_useState1[0], setLoading = _React_useState1[1];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "page-container",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                children: "System Settings"
            }, void 0, false, {
                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                lineNumber: 1204,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "page-content",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "settings-tabs",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "".concat(activeTab === "general" ? "active" : ""),
                                onClick: function onClick() {
                                    return setActiveTab("general");
                                },
                                children: "General Settings"
                            }, void 0, false, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 1207,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "".concat(activeTab === "security" ? "active" : ""),
                                onClick: function onClick() {
                                    return setActiveTab("security");
                                },
                                children: "Security Settings"
                            }, void 0, false, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 1213,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "".concat(activeTab === "integrations" ? "active" : ""),
                                onClick: function onClick() {
                                    return setActiveTab("integrations");
                                },
                                children: "Integrations"
                            }, void 0, false, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 1219,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "".concat(activeTab === "notifications" ? "active" : ""),
                                onClick: function onClick() {
                                    return setActiveTab("notifications");
                                },
                                children: "Notification Settings"
                            }, void 0, false, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 1225,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "".concat(activeTab === "backup" ? "active" : ""),
                                onClick: function onClick() {
                                    return setActiveTab("backup");
                                },
                                children: "Backup & Recovery"
                            }, void 0, false, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 1231,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                        lineNumber: 1206,
                        columnNumber: 9
                    }, this),
                    activeTab === "general" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "settings-section",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                children: "General System Settings"
                            }, void 0, false, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 1241,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                className: "settings-form",
                                onSubmit: function onSubmit(e) {
                                    e.preventDefault();
                                    // Save settings logic
                                    alert("General settings saved");
                                    setLoading(true);
                                    setTimeout(function() {
                                        return setLoading(false);
                                    }, 1000);
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "form-group",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                htmlFor: "systemName",
                                                children: "System Name:"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1253,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                id: "systemName",
                                                defaultValue: "UPCHAR Platform",
                                                className: "form-input"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1254,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 1252,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "form-group",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                htmlFor: "organization",
                                                children: "Organization:"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1262,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                id: "organization",
                                                defaultValue: "UPCHAR Healthcare Systems",
                                                className: "form-input"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1263,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 1261,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "form-group",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                htmlFor: "contactEmail",
                                                children: "Contact Email:"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1271,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "email",
                                                id: "contactEmail",
                                                defaultValue: "admin@upchar.com",
                                                className: "form-input"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1272,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 1270,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "form-group",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                htmlFor: "timezone",
                                                children: "System Timezone:"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1280,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                id: "timezone",
                                                className: "form-input",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "UTC",
                                                        children: "UTC"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1282,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "EST",
                                                        children: "Eastern Standard Time"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1283,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "PST",
                                                        children: "Pacific Standard Time"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1284,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "GMT",
                                                        children: "Greenwich Mean Time"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1285,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1281,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 1279,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "form-group",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                htmlFor: "dateFormat",
                                                children: "Date Format:"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1289,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                id: "dateFormat",
                                                className: "form-input",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "MM/DD/YYYY",
                                                        children: "MM/DD/YYYY"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1291,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "DD/MM/YYYY",
                                                        children: "DD/MM/YYYY"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1292,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "YYYY-MM-DD",
                                                        children: "YYYY-MM-DD"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1293,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1290,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 1288,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "form-group",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                htmlFor: "language",
                                                children: "Default Language:"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1297,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                id: "language",
                                                className: "form-input",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "en",
                                                        children: "English"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1299,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "es",
                                                        children: "Spanish"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1300,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "fr",
                                                        children: "French"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1301,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "de",
                                                        children: "German"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1302,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1298,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 1296,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "form-actions",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "submit",
                                                className: "btn-primary",
                                                disabled: loading,
                                                children: loading ? "Saving..." : "Save Settings"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1306,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: "btn-outline",
                                                children: "Reset to Defaults"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1309,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 1305,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 1242,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                        lineNumber: 1240,
                        columnNumber: 11
                    }, this),
                    activeTab === "security" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "settings-section",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                children: "Security Settings"
                            }, void 0, false, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 1319,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "security-settings",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "setting-group",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                children: "Authentication"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1322,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "setting-item",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        htmlFor: "passwordPolicy",
                                                        children: "Password Policy"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1324,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                        id: "passwordPolicy",
                                                        className: "form-select",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "standard",
                                                                children: "Standard (8+ chars)"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 1326,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "strong",
                                                                children: "Strong (12+ chars, numbers, special)"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 1327,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "strict",
                                                                children: "Strict (16+ chars, uppercase, lowercase, numbers, special)"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 1328,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1325,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1323,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "setting-item",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        htmlFor: "mfaRequirement",
                                                        children: "Multi-Factor Authentication"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1334,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                        id: "mfaRequirement",
                                                        className: "form-select",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "optional",
                                                                children: "Optional"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 1336,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "requiredForAdmins",
                                                                children: "Required for Admins"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 1337,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "requiredForAll",
                                                                children: "Required for All Users"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 1338,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1335,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1333,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "setting-item",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        htmlFor: "sessionTimeout",
                                                        children: "Session Timeout"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1342,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                        id: "sessionTimeout",
                                                        className: "form-select",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "15",
                                                                children: "15 minutes"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 1344,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "30",
                                                                children: "30 minutes"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 1345,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "60",
                                                                children: "1 hour"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 1346,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "240",
                                                                children: "4 hours"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 1347,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "1440",
                                                                children: "24 hours"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 1348,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1343,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1341,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "setting-item",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        htmlFor: "loginAttempts",
                                                        children: "Max Login Attempts"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1352,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                        id: "loginAttempts",
                                                        className: "form-select",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "3",
                                                                children: "3 attempts"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 1354,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "5",
                                                                children: "5 attempts"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 1355,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "10",
                                                                children: "10 attempts"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 1356,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1353,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1351,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 1321,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "setting-group",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                children: "Data Protection"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1361,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "setting-item",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        htmlFor: "dataEncryption",
                                                        children: "Data Encryption at Rest"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1363,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                        id: "dataEncryption",
                                                        className: "form-select",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "enabled",
                                                                children: "Enabled"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 1365,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "disabled",
                                                                children: "Disabled"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 1366,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1364,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1362,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "setting-item",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        htmlFor: "dataEncryption",
                                                        children: "Data Encryption in Transit"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1370,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                        id: "dataEncryption",
                                                        className: "form-select",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "enabled",
                                                                children: "Enabled"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 1372,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "disabled",
                                                                children: "Disabled"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 1373,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1371,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1369,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "setting-item",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        htmlFor: "backupEncryption",
                                                        children: "Backup Encryption"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1377,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                        id: "backupEncryption",
                                                        className: "form-select",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "enabled",
                                                                children: "Enabled"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 1379,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "disabled",
                                                                children: "Disabled"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 1380,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1378,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1376,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "setting-item",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        htmlFor: "auditLogging",
                                                        children: "Audit Logging"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1384,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                        id: "auditLogging",
                                                        className: "form-select",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "enabled",
                                                                children: "Enabled"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 1386,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "disabled",
                                                                children: "Disabled"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 1387,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1385,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1383,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 1360,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "setting-group",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                children: "Access Control"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1392,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "setting-item",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        htmlFor: "ipWhitelisting",
                                                        children: "IP Whitelisting"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1394,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                        id: "ipWhitelisting",
                                                        className: "form-select",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "none",
                                                                children: "None"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 1396,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "adminOnly",
                                                                children: "Admin Only"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 1397,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "custom",
                                                                children: "Custom List"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 1398,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1395,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1393,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "setting-item",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        htmlFor: "rateLimiting",
                                                        children: "Rate Limiting"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1402,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                        id: "rateLimiting",
                                                        className: "form-select",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "disabled",
                                                                children: "Disabled"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 1404,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "enabled",
                                                                children: "Enabled"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 1405,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1403,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1401,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "setting-item",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        htmlFor: "contentFiltering",
                                                        children: "Content Filtering"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1409,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                        id: "contentFiltering",
                                                        className: "form-select",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "disabled",
                                                                children: "Disabled"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 1411,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "enabled",
                                                                children: "Enabled"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 1412,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1410,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1408,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "form-actions",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "submit",
                                                        className: "btn-primary",
                                                        disabled: loading,
                                                        children: loading ? "Saving..." : "Save Settings"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1416,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        className: "btn-outline",
                                                        children: "Reset to Defaults"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1419,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1415,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 1391,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 1320,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                        lineNumber: 1318,
                        columnNumber: 11
                    }, this),
                    activeTab === "integrations" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "settings-section",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                children: "Third-Party Integrations"
                            }, void 0, false, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 1430,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "integrations-list",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "integration-item",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                children: "Electronic Health Records (EHR)"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1433,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "integration-status",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "status connected",
                                                    children: "Connected"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                    lineNumber: 1435,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1434,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "integration-details",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: "Provider:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 1439,
                                                                columnNumber: 21
                                                            }, this),
                                                            " Epic Systems"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1438,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: "Last Sync:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 1442,
                                                                columnNumber: 21
                                                            }, this),
                                                            " Today, 2:30 AM"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1441,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: "Records Synced:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 1445,
                                                                columnNumber: 21
                                                            }, this),
                                                            " 12,450"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1444,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1437,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "integration-actions",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: "btn-action",
                                                        onClick: function onClick() {
                                                            alert("Force sync with EHR system");
                                                        },
                                                        children: "Force Sync"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1449,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: "btn-action",
                                                        onClick: function onClick() {
                                                            alert("View integration logs");
                                                        },
                                                        children: "View Logs"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1457,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: "btn-action",
                                                        onClick: function onClick() {
                                                            alert("Configure EHR integration settings");
                                                        },
                                                        children: "Configure"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1465,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1448,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 1432,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "integration-item",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                children: "Medical Billing System"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1476,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "integration-status",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "status connected",
                                                    children: "Connected"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                    lineNumber: 1478,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1477,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "integration-details",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: "Provider:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 1482,
                                                                columnNumber: 21
                                                            }, this),
                                                            " Medisoft"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1481,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: "Last Sync:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 1485,
                                                                columnNumber: 21
                                                            }, this),
                                                            " Today, 1:15 AM"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1484,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: "Claims Processed:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 1488,
                                                                columnNumber: 21
                                                            }, this),
                                                            " 8,920"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1487,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1480,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "integration-actions",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: "btn-action",
                                                        onClick: function onClick() {
                                                            alert("Force sync with billing system");
                                                        },
                                                        children: "Force Sync"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1492,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: "btn-action",
                                                        onClick: function onClick() {
                                                            alert("View integration logs");
                                                        },
                                                        children: "View Logs"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1500,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: "btn-action",
                                                        onClick: function onClick() {
                                                            alert("Configure billing integration settings");
                                                        },
                                                        children: "Configure"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1508,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1491,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 1475,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "integration-item",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                children: "Laboratory Information System (LIS)"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1519,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "integration-status",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "status connected",
                                                    children: "Connected"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                    lineNumber: 1521,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1520,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "integration-details",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: "Provider:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 1525,
                                                                columnNumber: 21
                                                            }, this),
                                                            " Cerner Lab"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1524,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: "Last Sync:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 1528,
                                                                columnNumber: 21
                                                            }, this),
                                                            " Today, 3:00 AM"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1527,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: "Test Results:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 1531,
                                                                columnNumber: 21
                                                            }, this),
                                                            " 15,680"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1530,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1523,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "integration-actions",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: "btn-action",
                                                        onClick: function onClick() {
                                                            alert("Force sync with LIS system");
                                                        },
                                                        children: "Force Sync"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1535,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: "btn-action",
                                                        onClick: function onClick() {
                                                            alert("View integration logs");
                                                        },
                                                        children: "View Logs"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1543,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: "btn-action",
                                                        onClick: function onClick() {
                                                            alert("Configure LIS integration settings");
                                                        },
                                                        children: "Configure"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1551,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1534,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 1518,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "integration-item",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                children: "Pharmacy Management System"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1562,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "integration-status",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "status connected",
                                                    children: "Connected"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                    lineNumber: 1564,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1563,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "integration-details",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: "Provider:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 1568,
                                                                columnNumber: 21
                                                            }, this),
                                                            " McKesson Pharmacy"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1567,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: "Last Sync:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 1571,
                                                                columnNumber: 21
                                                            }, this),
                                                            " Today, 2:45 AM"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1570,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: "Prescriptions Processed:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 1574,
                                                                columnNumber: 21
                                                            }, this),
                                                            " 22,150"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1573,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1566,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "integration-actions",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: "btn-action",
                                                        onClick: function onClick() {
                                                            alert("Force sync with pharmacy system");
                                                        },
                                                        children: "Force Sync"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1578,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: "btn-action",
                                                        onClick: function onClick() {
                                                            alert("View integration logs");
                                                        },
                                                        children: "View Logs"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1586,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: "btn-action",
                                                        onClick: function onClick() {
                                                            alert("Configure pharmacy integration settings");
                                                        },
                                                        children: "Configure"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1594,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1577,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 1561,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "integration-item",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                children: "Appointment Scheduling System"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1605,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "integration-status",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "status connected",
                                                    children: "Connected"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                    lineNumber: 1607,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1606,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "integration-details",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: "Provider:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 1611,
                                                                columnNumber: 21
                                                            }, this),
                                                            " Zocdoc Healthcare"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1610,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: "Last Sync:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 1614,
                                                                columnNumber: 21
                                                            }, this),
                                                            " Yesterday, 11:30 PM"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1613,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: "Appointments Synced:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 1617,
                                                                columnNumber: 21
                                                            }, this),
                                                            " 5,420"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1616,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1609,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "integration-actions",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: "btn-action",
                                                        onClick: function onClick() {
                                                            alert("Force sync with scheduling system");
                                                        },
                                                        children: "Force Sync"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1621,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: "btn-action",
                                                        onClick: function onClick() {
                                                            alert("View integration logs");
                                                        },
                                                        children: "View Logs"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1629,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: "btn-action",
                                                        onClick: function onClick() {
                                                            alert("Configure scheduling integration settings");
                                                        },
                                                        children: "Configure"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1637,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1620,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 1604,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 1431,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "btn-primary",
                                onClick: function onClick() {
                                    alert("Add new integration");
                                },
                                children: "Add Integration"
                            }, void 0, false, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 1648,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                        lineNumber: 1429,
                        columnNumber: 11
                    }, this),
                    activeTab === "notifications" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "settings-section",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                children: "Notification Settings"
                            }, void 0, false, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 1661,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "notification-preferences",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "preference-group",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                children: "Email Notifications"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1664,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "preference-item",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    htmlFor: "emailSystemAlerts",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "checkbox",
                                                            id: "emailSystemAlerts",
                                                            checked: true
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                            lineNumber: 1667,
                                                            columnNumber: 21
                                                        }, this),
                                                        "System Alerts"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                    lineNumber: 1666,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1665,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "preference-item",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    htmlFor: "emailSecurityAlerts",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "checkbox",
                                                            id: "emailSecurityAlerts",
                                                            checked: true
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                            lineNumber: 1673,
                                                            columnNumber: 21
                                                        }, this),
                                                        "Security Alerts"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                    lineNumber: 1672,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1671,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "preference-item",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    htmlFor: "emailWeeklyReports",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "checkbox",
                                                            id: "emailWeeklyReports",
                                                            checked: false
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                            lineNumber: 1679,
                                                            columnNumber: 21
                                                        }, this),
                                                        "Weekly Reports"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                    lineNumber: 1678,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1677,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "preference-item",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    htmlFor: "emailMonthlyReports",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "checkbox",
                                                            id: "emailMonthlyReports",
                                                            checked: true
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                            lineNumber: 1685,
                                                            columnNumber: 21
                                                        }, this),
                                                        "Monthly Reports"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                    lineNumber: 1684,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1683,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 1663,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "preference-group",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                children: "In-App Notifications"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1691,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "preference-item",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    htmlFor: "inAppSystemUpdates",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "checkbox",
                                                            id: "inAppSystemUpdates",
                                                            checked: true
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                            lineNumber: 1694,
                                                            columnNumber: 21
                                                        }, this),
                                                        "System Updates"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                    lineNumber: 1693,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1692,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "preference-item",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    htmlFor: "inAppMessageAlerts",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "checkbox",
                                                            id: "inAppMessageAlerts",
                                                            checked: true
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                            lineNumber: 1700,
                                                            columnNumber: 21
                                                        }, this),
                                                        "Message Alerts"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                    lineNumber: 1699,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1698,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "preference-item",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    htmlFor: "inAppReminders",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "checkbox",
                                                            id: "inAppReminders",
                                                            checked: false
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                            lineNumber: 1706,
                                                            columnNumber: 21
                                                        }, this),
                                                        "Reminders"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                    lineNumber: 1705,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1704,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 1690,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "preference-group",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                children: "Notification Channels"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1712,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "preference-item",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    htmlFor: "slackIntegration",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "checkbox",
                                                            id: "slackIntegration",
                                                            checked: false
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                            lineNumber: 1715,
                                                            columnNumber: 21
                                                        }, this),
                                                        "Slack Notifications"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                    lineNumber: 1714,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1713,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "preference-item",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    htmlFor: "emailNotifications",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "checkbox",
                                                            id: "emailNotifications",
                                                            checked: true
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                            lineNumber: 1721,
                                                            columnNumber: 21
                                                        }, this),
                                                        "Email Notifications"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                    lineNumber: 1720,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1719,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "preference-item",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    htmlFor: "smsNotifications",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "checkbox",
                                                            id: "smsNotifications",
                                                            checked: false
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                            lineNumber: 1727,
                                                            columnNumber: 21
                                                        }, this),
                                                        "SMS Notifications"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                    lineNumber: 1726,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1725,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "preference-item",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    htmlFor: "webhookNotifications",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "checkbox",
                                                            id: "webhookNotifications",
                                                            checked: false
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                            lineNumber: 1733,
                                                            columnNumber: 21
                                                        }, this),
                                                        "Webhook Notifications"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                    lineNumber: 1732,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1731,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 1711,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "form-actions",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "submit",
                                                className: "btn-primary",
                                                disabled: loading,
                                                children: loading ? "Saving..." : "Save Settings"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1739,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: "btn-outline",
                                                children: "Reset to Defaults"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1742,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 1738,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 1662,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                        lineNumber: 1660,
                        columnNumber: 11
                    }, this),
                    activeTab === "backup" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "settings-section",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                children: "Backup & Recovery"
                            }, void 0, false, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 1752,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "backup-status",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "backup-item",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                children: "Last Backup"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1755,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        children: "Date:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1757,
                                                        columnNumber: 19
                                                    }, this),
                                                    " Today, 2:00 AM"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1756,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        children: "Type:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1760,
                                                        columnNumber: 19
                                                    }, this),
                                                    " Full Backup"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1759,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        children: "Size:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1763,
                                                        columnNumber: 19
                                                    }, this),
                                                    " 45.2 GB"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1762,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        children: "Location:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1766,
                                                        columnNumber: 19
                                                    }, this),
                                                    " Primary Storage"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1765,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 1754,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "backup-item",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                children: "Backup Schedule"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1770,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        children: "Frequency:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1772,
                                                        columnNumber: 19
                                                    }, this),
                                                    " Daily"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1771,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        children: "Time:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1775,
                                                        columnNumber: 19
                                                    }, this),
                                                    " 2:00 AM"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1774,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        children: "Retention:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1778,
                                                        columnNumber: 19
                                                    }, this),
                                                    " 30 days"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1777,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 1769,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "backup-item",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                children: "Disaster Recovery"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1782,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        children: "RPO:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1784,
                                                        columnNumber: 19
                                                    }, this),
                                                    " 4 hours"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1783,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        children: "RTO:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1787,
                                                        columnNumber: 19
                                                    }, this),
                                                    " 2 hours"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1786,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        children: "Secondary Site:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1790,
                                                        columnNumber: 19
                                                    }, this),
                                                    " Active"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1789,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 1781,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 1753,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "backup-actions",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "btn-primary",
                                        onClick: function onClick() {
                                            alert("Initiate manual backup");
                                        },
                                        children: "Backup Now"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 1795,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "btn-outline",
                                        onClick: function onClick() {
                                            alert("Test disaster recovery plan");
                                        },
                                        children: "Test Recovery"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 1803,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "btn-outline",
                                        onClick: function onClick() {
                                            alert("Modify backup schedule");
                                        },
                                        children: "Modify Schedule"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 1811,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 1794,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                        lineNumber: 1751,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                lineNumber: 1205,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
        lineNumber: 1203,
        columnNumber: 5
    }, this);
}
_s4(SettingsPage, "B8XEwGbiTalrhjnkgfMUX/zotT8=");
_c4 = SettingsPage;
// Chat Page
function ChatPage() {
    var _this = this;
    var _conversations_find_participants_, _conversations_find, _conversations_find_participants_1, _conversations_find1;
    _s5();
    var _React_useState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].useState([]), 2), conversations = _React_useState[0], setConversations = _React_useState[1];
    var _React_useState1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].useState([]), 2), messages = _React_useState1[0], setMessages = _React_useState1[1];
    var _React_useState2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].useState(""), 2), inputValue = _React_useState2[0], setInputValue = _React_useState2[1];
    var _React_useState3 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].useState(null), 2), selectedConversationId = _React_useState3[0], setSelectedConversationId = _React_useState3[1];
    var _React_useState4 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].useState(false), 2), isLoading = _React_useState4[0], setIsLoading = _React_useState4[1];
    var _React_useState5 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].useState([]), 2), typingUsers = _React_useState5[0], setTypingUsers = _React_useState5[1];
    var messagesEndRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].useRef(null);
    // Load messages for a conversation
    var loadMessages = function loadMessages(conversationId) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(function() {
            var mockMessages;
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, function(_state) {
                setIsLoading(true);
                try {
                    // In a real app, this would call an API
                    // For now, we'll simulate with mock data
                    mockMessages = [
                        {
                            id: "1",
                            conversationId: conversationId,
                            senderId: "staff1",
                            content: "Patient in room 305 needs immediate attention",
                            timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString()
                        },
                        {
                            id: "2",
                            conversationId: conversationId,
                            senderId: "user",
                            content: "On my way to check on them now",
                            timestamp: new Date(Date.now() - 8 * 60 * 1000).toISOString()
                        },
                        {
                            id: "3",
                            conversationId: conversationId,
                            senderId: "staff1",
                            content: "Thanks, they're experiencing chest pain",
                            timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString()
                        }
                    ];
                    setMessages(mockMessages);
                } catch (error) {
                    console.error("Failed to load messages:", error);
                } finally{
                    setIsLoading(false);
                }
                return [
                    2
                ];
            });
        })();
    };
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "ChatPage.useEffect": function() {
            // Load conversations
            var loadConversations = function loadConversations() {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])({
                    "ChatPage.useEffect.loadConversations": function() {
                        var mockConversations;
                        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, {
                            "ChatPage.useEffect.loadConversations": function(_state) {
                                setIsLoading(true);
                                try {
                                    // In a real app, this would call an API
                                    // For now, we'll simulate with mock data
                                    mockConversations = [
                                        {
                                            id: "1",
                                            participants: [
                                                {
                                                    id: "staff1",
                                                    name: "Dr. Smith",
                                                    role: "physician"
                                                }
                                            ],
                                            lastMessage: "Patient in room 305 needs immediate attention",
                                            lastUpdated: new Date(Date.now() - 5 * 60 * 1000),
                                            unreadCount: 2
                                        },
                                        {
                                            id: "2",
                                            participants: [
                                                {
                                                    id: "staff2",
                                                    name: "Nurse Johnson",
                                                    role: "nurse"
                                                }
                                            ],
                                            lastMessage: "Medication administered for patient in ICU",
                                            lastUpdated: new Date(Date.now() - 2 * 60 * 1000),
                                            unreadCount: 0
                                        },
                                        {
                                            id: "3",
                                            participants: [
                                                {
                                                    id: "staff3",
                                                    name: "Dr. Williams",
                                                    role: "surgeon"
                                                }
                                            ],
                                            lastMessage: "OR 2 is ready for the 3PM procedure",
                                            lastUpdated: new Date(Date.now() - 30 * 60 * 1000),
                                            unreadCount: 0
                                        }
                                    ];
                                    setConversations(mockConversations);
                                    if (mockConversations.length > 0) {
                                        setSelectedConversationId(mockConversations[0].id);
                                        loadMessages(mockConversations[0].id);
                                    }
                                } catch (error) {
                                    console.error("Failed to load conversations:", error);
                                } finally{
                                    setIsLoading(false);
                                }
                                return [
                                    2
                                ];
                            }
                        }["ChatPage.useEffect.loadConversations"]);
                    }
                }["ChatPage.useEffect.loadConversations"])();
            };
            loadConversations();
        }
    }["ChatPage.useEffect"], []);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "ChatPage.useEffect": function() {
            if (selectedConversationId) {
                loadMessages(selectedConversationId);
            }
        }
    }["ChatPage.useEffect"], [
        selectedConversationId
    ]);
    // Simulate typing indicator (would be replaced with real-time updates)
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "ChatPage.useEffect": function() {
            if (selectedConversationId) {
                var typingInterval = setInterval({
                    "ChatPage.useEffect.typingInterval": function() {
                        // Simulate random typing indicators
                        if (Math.random() > 0.7) {
                            setTypingUsers([
                                "Someone is typing..."
                            ]);
                        } else {
                            setTypingUsers([]);
                        }
                    }
                }["ChatPage.useEffect.typingInterval"], 3000);
                return ({
                    "ChatPage.useEffect": function() {
                        return clearInterval(typingInterval);
                    }
                })["ChatPage.useEffect"];
            }
        }
    }["ChatPage.useEffect"], [
        selectedConversationId
    ]);
    // Scroll to bottom when messages change
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "ChatPage.useEffect": function() {
            if (messagesEndRef.current) {
                messagesEndRef.current.scrollIntoView({
                    behavior: "smooth"
                });
            }
        }
    }["ChatPage.useEffect"], [
        messages
    ]);
    var sendMessage = function sendMessage(e) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(function() {
            var newMessage;
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, function(_state) {
                e.preventDefault();
                if (!inputValue.trim() || !selectedConversationId) return [
                    2
                ];
                try {
                    // In a real app, this would call an API
                    // For now, we'll simulate the message sending
                    newMessage = {
                        id: Date.now().toString(),
                        conversationId: selectedConversationId,
                        senderId: "user",
                        content: inputValue,
                        timestamp: new Date().toISOString()
                    };
                    setMessages(function(prev) {
                        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(prev).concat([
                            newMessage
                        ]);
                    });
                    setInputValue("");
                    // Scroll to bottom after sending
                    if (messagesEndRef.current) {
                        messagesEndRef.current.scrollIntoView({
                            behavior: "smooth"
                        });
                    }
                } catch (error) {
                    console.error("Failed to send message:", error);
                    alert("Failed to send message. Please try again.");
                }
                return [
                    2
                ];
            });
        })();
    };
    // Handle Enter key press
    var handleKeyPress = function handleKeyPress(e) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage(e); // Actually send the message when Enter is pressed
        }
    };
    if (isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "page-container",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    children: "Messages"
                }, void 0, false, {
                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                    lineNumber: 2001,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "page-content",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "loading",
                        children: "Loading messages..."
                    }, void 0, false, {
                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                        lineNumber: 2003,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                    lineNumber: 2002,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
            lineNumber: 2000,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "page-container",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                children: "Messages"
            }, void 0, false, {
                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                lineNumber: 2011,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "page-content",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "chat-container",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "chat-sidebar",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    children: "Conversations"
                                }, void 0, false, {
                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                    lineNumber: 2015,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "btn-primary",
                                    onClick: function onClick() {
                                        // Start new conversation
                                        alert("Start new conversation functionality would go here");
                                    },
                                    children: "New Message"
                                }, void 0, false, {
                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                    lineNumber: 2016,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "conversations-list",
                                    children: conversations.length > 0 ? conversations.map(function(conversation) {
                                        var _conversation_participants_, _conversation_participants_1;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "conversation-item ".concat(conversation.id === selectedConversationId ? "active" : ""),
                                            onClick: function onClick() {
                                                return setSelectedConversationId(conversation.id);
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "conversation-avatar",
                                                    children: ((_conversation_participants_ = conversation.participants[0]) === null || _conversation_participants_ === void 0 ? void 0 : _conversation_participants_.name.charAt(0).toUpperCase()) || "?"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                    lineNumber: 2033,
                                                    columnNumber: 21
                                                }, _this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "conversation-info",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                            children: ((_conversation_participants_1 = conversation.participants[0]) === null || _conversation_participants_1 === void 0 ? void 0 : _conversation_participants_1.name) || "Unknown User"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                            lineNumber: 2037,
                                                            columnNumber: 23
                                                        }, _this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "conversation-preview",
                                                            children: conversation.lastMessage || "No messages yet"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                            lineNumber: 2038,
                                                            columnNumber: 23
                                                        }, _this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                    lineNumber: 2036,
                                                    columnNumber: 21
                                                }, _this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "conversation-meta",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                                            children: conversation.lastUpdated ? new Date(conversation.lastUpdated).toLocaleTimeString() : ""
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                            lineNumber: 2043,
                                                            columnNumber: 23
                                                        }, _this),
                                                        conversation.unreadCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "unread-badge",
                                                            children: conversation.unreadCount
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                            lineNumber: 2049,
                                                            columnNumber: 25
                                                        }, _this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                    lineNumber: 2042,
                                                    columnNumber: 21
                                                }, _this)
                                            ]
                                        }, conversation.id, true, {
                                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                            lineNumber: 2028,
                                            columnNumber: 19
                                        }, _this);
                                    }) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "empty-state",
                                        children: "No conversations yet. Start a new conversation!"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 2055,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                    lineNumber: 2025,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                            lineNumber: 2014,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "chat-main",
                            children: !selectedConversationId ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "chat-empty",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        children: "Select a conversation to get started"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 2062,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: "Choose a conversation from the list or start a new one."
                                    }, void 0, false, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 2063,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 2061,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "chat-header",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "chat-user-info",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "chat-user-avatar",
                                                        children: ((_conversations_find = conversations.find(function(c) {
                                                            return c.id === selectedConversationId;
                                                        })) === null || _conversations_find === void 0 ? void 0 : (_conversations_find_participants_ = _conversations_find.participants[0]) === null || _conversations_find_participants_ === void 0 ? void 0 : _conversations_find_participants_.name.charAt(0).toUpperCase()) || "?"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 2069,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "chat-user-details",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                children: ((_conversations_find1 = conversations.find(function(c) {
                                                                    return c.id === selectedConversationId;
                                                                })) === null || _conversations_find1 === void 0 ? void 0 : (_conversations_find_participants_1 = _conversations_find1.participants[0]) === null || _conversations_find_participants_1 === void 0 ? void 0 : _conversations_find_participants_1.name) || "Unknown User"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 2076,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "chat-user-status",
                                                                children: "Online"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 2080,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 2075,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 2068,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "chat-actions",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: "btn-icon",
                                                        onClick: function onClick() {
                                                            // Video call
                                                            alert("Start video call");
                                                        },
                                                        children: "📹"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 2084,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: "btn-icon",
                                                        onClick: function onClick() {
                                                            // Audio call
                                                            alert("Start audio call");
                                                        },
                                                        children: "📞"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 2093,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: "btn-icon",
                                                        onClick: function onClick() {
                                                            // Contact info
                                                            alert("View contact info");
                                                        },
                                                        children: "ℹ️"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 2102,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 2083,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 2067,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "chat-window",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "chat-messages",
                                            children: [
                                                function() {
                                                    var groupedMessages = messages.reduce(function(groups, message) {
                                                        var date = new Date(message.timestamp).toDateString();
                                                        if (!groups[date]) {
                                                            groups[date] = [];
                                                        }
                                                        groups[date].push(message);
                                                        return groups;
                                                    }, {});
                                                    return Object.keys(groupedMessages).map(function(date) {
                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].Fragment, {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "message-date-header",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: new Date(date).toLocaleDateString(undefined, {
                                                                            weekday: "long",
                                                                            year: "numeric",
                                                                            month: "long",
                                                                            day: "numeric"
                                                                        })
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                        lineNumber: 2134,
                                                                        columnNumber: 29
                                                                    }, _this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                    lineNumber: 2133,
                                                                    columnNumber: 27
                                                                }, _this),
                                                                groupedMessages[date].map(function(message, msgIndex) {
                                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "message ".concat(message.senderId === "user" ? "message-sent" : "message-received"),
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "message-content",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                    children: message.content
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                                    lineNumber: 2151,
                                                                                    columnNumber: 33
                                                                                }, _this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                                                                    className: "message-time",
                                                                                    children: new Date(message.timestamp).toLocaleTimeString([], {
                                                                                        hour: "2-digit",
                                                                                        minute: "2-digit"
                                                                                    })
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                                    lineNumber: 2152,
                                                                                    columnNumber: 33
                                                                                }, _this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                            lineNumber: 2150,
                                                                            columnNumber: 31
                                                                        }, _this)
                                                                    }, "".concat(date, "-").concat(msgIndex), false, {
                                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                        lineNumber: 2146,
                                                                        columnNumber: 29
                                                                    }, _this);
                                                                })
                                                            ]
                                                        }, date, true, {
                                                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                            lineNumber: 2131,
                                                            columnNumber: 25
                                                        }, _this);
                                                    });
                                                }(),
                                                typingUsers.map(function(user, index) {
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "typing-indicator",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "typing-dot"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 2168,
                                                                columnNumber: 25
                                                            }, _this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "typing-dot"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 2169,
                                                                columnNumber: 25
                                                            }, _this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "typing-dot"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 2170,
                                                                columnNumber: 25
                                                            }, _this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: user
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 2171,
                                                                columnNumber: 25
                                                            }, _this)
                                                        ]
                                                    }, index, true, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 2167,
                                                        columnNumber: 23
                                                    }, _this);
                                                }),
                                                messages.length === 0 && typingUsers.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    ref: messagesEndRef,
                                                    className: "chat-empty",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: "No messages yet. Start the conversation!"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 2177,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                    lineNumber: 2176,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                            lineNumber: 2115,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 2114,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                        onSubmit: sendMessage,
                                        className: "chat-input-form",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "chat-input-wrapper",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "chat-input-actions",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            className: "btn-icon",
                                                            onClick: function onClick() {
                                                                // Emoji picker
                                                                alert("Emoji picker would open here");
                                                            },
                                                            children: "😊"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                            lineNumber: 2186,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            className: "btn-icon",
                                                            onClick: function onClick() {
                                                                // File attachment
                                                                alert("File picker would open here");
                                                            },
                                                            children: "📎"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                            lineNumber: 2196,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                    lineNumber: 2185,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "text",
                                                    value: inputValue,
                                                    onChange: function onChange(e) {
                                                        return setInputValue(e.target.value);
                                                    },
                                                    onKeyPress: handleKeyPress,
                                                    placeholder: "Type a message...",
                                                    className: "chat-input"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                    lineNumber: 2207,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "submit",
                                                    className: "btn-primary",
                                                    children: "Send"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                    lineNumber: 2215,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                            lineNumber: 2184,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 2183,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 2066,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                            lineNumber: 2059,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                    lineNumber: 2013,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                lineNumber: 2012,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
        lineNumber: 2010,
        columnNumber: 5
    }, this);
}
_s5(ChatPage, "JZNLFNE8ETNVE1eCgn59p//Nf9U=");
_c5 = ChatPage;
// Login Page
function LoginPage(props) {
    _s6();
    var _React_useState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].useState(""), 2), email = _React_useState[0], setEmail = _React_useState[1];
    var _React_useState1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].useState(""), 2), password = _React_useState1[0], setPassword = _React_useState1[1];
    var _React_useState2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].useState(false), 2), loading = _React_useState2[0], setLoading = _React_useState2[1];
    var _React_useState3 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].useState(null), 2), error = _React_useState3[0], setError = _React_useState3[1];
    var handleSubmit = function handleSubmit(e) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(function() {
            var err;
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, function(_state) {
                switch(_state.label){
                    case 0:
                        e.preventDefault();
                        setLoading(true);
                        setError(null);
                        _state.label = 1;
                    case 1:
                        _state.trys.push([
                            1,
                            3,
                            4,
                            5
                        ]);
                        return [
                            4,
                            props.onLogin(email, password)
                        ];
                    case 2:
                        _state.sent();
                        return [
                            3,
                            5
                        ];
                    case 3:
                        err = _state.sent();
                        setError(err.message || "Login failed");
                        return [
                            3,
                            5
                        ];
                    case 4:
                        setLoading(false);
                        return [
                            7
                        ];
                    case 5:
                        return [
                            2
                        ];
                }
            });
        })();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "auth-container",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "auth-card",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    children: "System Administrator Sign In"
                }, void 0, false, {
                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                    lineNumber: 2252,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: handleSubmit,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "form-group",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    htmlFor: "email",
                                    children: "Email"
                                }, void 0, false, {
                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                    lineNumber: 2255,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "email",
                                    id: "email",
                                    name: "email",
                                    value: email,
                                    onChange: function onChange(e) {
                                        return setEmail(e.target.value);
                                    },
                                    required: true,
                                    className: "form-input"
                                }, void 0, false, {
                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                    lineNumber: 2256,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                            lineNumber: 2254,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "form-group",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    htmlFor: "password",
                                    children: "Password"
                                }, void 0, false, {
                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                    lineNumber: 2267,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "password",
                                    id: "password",
                                    name: "password",
                                    value: password,
                                    onChange: function onChange(e) {
                                        return setPassword(e.target.value);
                                    },
                                    required: true,
                                    className: "form-input"
                                }, void 0, false, {
                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                    lineNumber: 2268,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                            lineNumber: 2266,
                            columnNumber: 11
                        }, this),
                        error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "error-message",
                            children: error
                        }, void 0, false, {
                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                            lineNumber: 2278,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "submit",
                            disabled: loading,
                            className: "auth-button",
                            children: loading ? "Signing in..." : "Sign In"
                        }, void 0, false, {
                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                            lineNumber: 2279,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                    lineNumber: 2253,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "auth-footer",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            "Don't have an account? ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: "/register",
                                children: "Register"
                            }, void 0, false, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 2285,
                                columnNumber: 36
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                        lineNumber: 2284,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                    lineNumber: 2283,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
            lineNumber: 2251,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
        lineNumber: 2250,
        columnNumber: 5
    }, this);
}
_s6(LoginPage, "DQMkLzgr019TSFpIeybKF66BVd8=");
_c6 = LoginPage;
function RegisterPage() {
    _s7();
    var _React_useState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].useState(""), 2), email = _React_useState[0], setEmail = _React_useState[1];
    var _React_useState1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].useState(""), 2), firstName = _React_useState1[0], setFirstName = _React_useState1[1];
    var _React_useState2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].useState(""), 2), lastName = _React_useState2[0], setLastName = _React_useState2[1];
    var _React_useState3 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].useState(""), 2), password = _React_useState3[0], setPassword = _React_useState3[1];
    var _React_useState4 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].useState(""), 2), confirmPassword = _React_useState4[0], setConfirmPassword = _React_useState4[1];
    var _React_useState5 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].useState(""), 2), error = _React_useState5[0], setError = _React_useState5[1];
    var _React_useState6 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].useState(false), 2), loading = _React_useState6[0], setLoading = _React_useState6[1];
    var register = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$admin$2d$dashboard$2f$src$2f$store$2f$useAuthStore$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["useAuthStore"])().register;
    var handleSubmit = function handleSubmit(e) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(function() {
            var err;
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, function(_state) {
                switch(_state.label){
                    case 0:
                        e.preventDefault();
                        if (password !== confirmPassword) {
                            setError("Passwords do not match");
                            return [
                                2
                            ];
                        }
                        setLoading(true);
                        setError("");
                        _state.label = 1;
                    case 1:
                        _state.trys.push([
                            1,
                            3,
                            4,
                            5
                        ]);
                        return [
                            4,
                            register({
                                email: email,
                                firstName: firstName,
                                lastName: lastName,
                                password: password
                            })
                        ];
                    case 2:
                        _state.sent();
                        // On success, redirect to login
                        window.location.href = "/login";
                        return [
                            3,
                            5
                        ];
                    case 3:
                        err = _state.sent();
                        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_instanceof$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(err, Error)) {
                            setError(err.message || "Registration failed");
                        } else {
                            setError(String(err) || "Registration failed");
                        }
                        return [
                            3,
                            5
                        ];
                    case 4:
                        setLoading(false);
                        return [
                            7
                        ];
                    case 5:
                        return [
                            2
                        ];
                }
            });
        })();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "page-container",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                children: "Register"
            }, void 0, false, {
                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                lineNumber: 2338,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "page-content",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: handleSubmit,
                    className: "auth-form",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "form-group",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    htmlFor: "email",
                                    children: "Email:"
                                }, void 0, false, {
                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                    lineNumber: 2342,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "email",
                                    id: "email",
                                    value: email,
                                    onChange: function onChange(e) {
                                        return setEmail(e.target.value);
                                    },
                                    required: true,
                                    className: "form-input"
                                }, void 0, false, {
                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                    lineNumber: 2343,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                            lineNumber: 2341,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "form-group",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    htmlFor: "firstName",
                                    children: "First Name:"
                                }, void 0, false, {
                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                    lineNumber: 2353,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    id: "firstName",
                                    value: firstName,
                                    onChange: function onChange(e) {
                                        return setFirstName(e.target.value);
                                    },
                                    required: true,
                                    className: "form-input"
                                }, void 0, false, {
                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                    lineNumber: 2354,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                            lineNumber: 2352,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "form-group",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    htmlFor: "lastName",
                                    children: "Last Name:"
                                }, void 0, false, {
                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                    lineNumber: 2364,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    id: "lastName",
                                    value: lastName,
                                    onChange: function onChange(e) {
                                        return setLastName(e.target.value);
                                    },
                                    required: true,
                                    className: "form-input"
                                }, void 0, false, {
                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                    lineNumber: 2365,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                            lineNumber: 2363,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "form-group",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    htmlFor: "password",
                                    children: "Password:"
                                }, void 0, false, {
                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                    lineNumber: 2375,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "password",
                                    id: "password",
                                    value: password,
                                    onChange: function onChange(e) {
                                        return setPassword(e.target.value);
                                    },
                                    required: true,
                                    minLength: 8,
                                    className: "form-input"
                                }, void 0, false, {
                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                    lineNumber: 2376,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                            lineNumber: 2374,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "form-group",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    htmlFor: "confirmPassword",
                                    children: "Confirm Password:"
                                }, void 0, false, {
                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                    lineNumber: 2387,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "password",
                                    id: "confirmPassword",
                                    value: confirmPassword,
                                    onChange: function onChange(e) {
                                        return setConfirmPassword(e.target.value);
                                    },
                                    required: true,
                                    minLength: 8,
                                    className: "form-input"
                                }, void 0, false, {
                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                    lineNumber: 2388,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                            lineNumber: 2386,
                            columnNumber: 11
                        }, this),
                        error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "error-message",
                            children: error
                        }, void 0, false, {
                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                            lineNumber: 2398,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "submit",
                            disabled: loading,
                            className: "auth-button",
                            children: loading ? "Registering..." : "Register"
                        }, void 0, false, {
                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                            lineNumber: 2399,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "auth-footer",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: [
                                    "Already have an account? ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: "/login",
                                        children: "Sign In"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 2404,
                                        columnNumber: 40
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 2403,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                            lineNumber: 2402,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                    lineNumber: 2340,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                lineNumber: 2339,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
        lineNumber: 2337,
        columnNumber: 5
    }, this);
}
_s7(RegisterPage, "aytWsHVK/wPOneHo6jhexI5A2HY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$admin$2d$dashboard$2f$src$2f$store$2f$useAuthStore$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["useAuthStore"]
    ];
});
_c7 = RegisterPage;
function NotFoundPage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "page-container",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                children: "Page Not Found"
            }, void 0, false, {
                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                lineNumber: 2416,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "page-content",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    children: "The page you're looking for doesn't exist."
                }, void 0, false, {
                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                    lineNumber: 2418,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                lineNumber: 2417,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
        lineNumber: 2415,
        columnNumber: 5
    }, this);
}
_c8 = NotFoundPage;
var queryClientInstance = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$lib$2f$queryClient$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["QueryClient"]();
function App() {
    _s8();
    var _useAuthStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$admin$2d$dashboard$2f$src$2f$store$2f$useAuthStore$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["useAuthStore"])(), user = _useAuthStore.user, login = _useAuthStore.login, logout = _useAuthStore.logout;
    if (!user) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$lib$2f$QueryClientProvider$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["QueryClientProvider"], {
            client: queryClientInstance,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "App",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "page-container",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            children: "Admin Dashboard"
                        }, void 0, false, {
                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                            lineNumber: 2434,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "page-content",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "Please sign in to access the dashboard."
                            }, void 0, false, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 2436,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                            lineNumber: 2435,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                    lineNumber: 2433,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                lineNumber: 2432,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
            lineNumber: 2431,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$lib$2f$QueryClientProvider$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["QueryClientProvider"], {
        client: queryClientInstance,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "App",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                    className: "app-header",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "header-content",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "header-logo",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "logo-text",
                                    children: "UPCHAR Admin"
                                }, void 0, false, {
                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                    lineNumber: 2450,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 2449,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                                className: "header-nav",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "nav-link",
                                        type: "button",
                                        children: "Dashboard"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 2453,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "nav-link",
                                        type: "button",
                                        children: "User Management"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 2456,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "nav-link",
                                        type: "button",
                                        children: "System Monitoring"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 2459,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "nav-link",
                                        type: "button",
                                        children: "Reports & Analytics"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 2462,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "nav-link",
                                        type: "button",
                                        children: "Settings"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 2465,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "nav-link",
                                        type: "button",
                                        children: "Chat"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 2468,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: logout,
                                        className: "btn-logout",
                                        children: "Logout"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 2471,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 2452,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                        lineNumber: 2448,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                    lineNumber: 2447,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                    className: "app-main",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DashboardPage, {}, void 0, false, {
                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                        lineNumber: 2479,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                    lineNumber: 2478,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
            lineNumber: 2446,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
        lineNumber: 2445,
        columnNumber: 5
    }, this);
}
_s8(App, "B2tENisX3xDsoIM4qq5FNEy9msI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$admin$2d$dashboard$2f$src$2f$store$2f$useAuthStore$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["useAuthStore"]
    ];
});
_c9 = App;
const __TURBOPACK__default__export__ = App;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9;
__turbopack_context__.k.register(_c, "DashboardPage");
__turbopack_context__.k.register(_c1, "UserManagementPage");
__turbopack_context__.k.register(_c2, "SystemMonitoringPage");
__turbopack_context__.k.register(_c3, "ReportsAnalyticsPage");
__turbopack_context__.k.register(_c4, "SettingsPage");
__turbopack_context__.k.register(_c5, "ChatPage");
__turbopack_context__.k.register(_c6, "LoginPage");
__turbopack_context__.k.register(_c7, "RegisterPage");
__turbopack_context__.k.register(_c8, "NotFoundPage");
__turbopack_context__.k.register(_c9, "App");
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/admin-dashboard/pages/index.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [client] (ecmascript)");
// @ts-nocheck
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$admin$2d$dashboard$2f$src$2f$App$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/admin-dashboard/src/App.tsx [client] (ecmascript)");
;
;
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$admin$2d$dashboard$2f$src$2f$App$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"];
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[next]/entry/page-loader.ts { PAGE => \"[project]/apps/admin-dashboard/pages/index.tsx [client] (ecmascript)\" } [client] (ecmascript)", ((__turbopack_context__, module, exports) => {

var PAGE_PATH = "/";
(window.__NEXT_P = window.__NEXT_P || []).push([
    PAGE_PATH,
    function() {
        return __turbopack_context__.r("[project]/apps/admin-dashboard/pages/index.tsx [client] (ecmascript)");
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
"[hmr-entry]/hmr-entry.js { ENTRY => \"[project]/apps/admin-dashboard/pages/index\" }", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.r("[next]/entry/page-loader.ts { PAGE => \"[project]/apps/admin-dashboard/pages/index.tsx [client] (ecmascript)\" } [client] (ecmascript)");
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__0v3d903._.js.map