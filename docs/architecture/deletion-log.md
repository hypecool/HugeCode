# Runtime Deletion Log

## 2026-03-22

### Step 4. App-local runtime helper shim deletion

- Deleted `apps/code/src/services/runtimeClientCapabilitiesContract.ts`
- Deleted `apps/code/src/services/runtimeClientErrorUtils.ts`
- Deleted `apps/code/src/services/runtimeClientMethodSets.ts`
- Deleted `apps/code/src/services/runtimeClientTransportShared.ts`
- Deleted `apps/code/src/services/runtimeClientWebRequestTimeouts.ts`
- Deleted `apps/code/src/services/runtimeClientWebRetryUtils.ts`
- Deleted `apps/code/src/services/runtimeErrorClassifier.ts`
- Deleted `apps/code/src/services/runtimeEventChannelDiagnostics.ts`
- Deleted `apps/code/src/services/runtimeEventStabilityMetrics.ts`
- Deleted `apps/code/src/services/runtimeMessageCodes.ts`
- Deleted `apps/code/src/services/runtimeMessageEnvelope.ts`
- Deleted `apps/code/src/services/webMcpBridgeTypes.ts`
- Deleted `apps/code/src/services/webMcpInputSchemaValidationError.ts`
- Deleted `apps/code/src/services/webMcpModelInputSchemas.ts`
- Deleted `apps/code/src/services/webMcpToolInputSchemaValidation.ts`

Path count reduced:

- `apps/code/src/services` runtime/WebMCP shim files: 15 removed
- `packages/code-runtime-webmcp-client` duplicate error implementation: 1 collapsed into a package re-export

Residual bridges left intentionally:

- none in `apps/code/src/services` for package-owned runtime/WebMCP helper contracts

### Step 5. Final app-local runtime-client type shim deletion

- Deleted `apps/code/src/services/runtimeClientTypes.ts`
- Folded the app-specific `RuntimeClient<AppSettings>` specialization into `apps/code/src/services/runtimeClient.ts`

Path count reduced:

- `apps/code/src/services` runtime/WebMCP shim files: 1 more removed

### Step 6. Host-contract internal canonical naming shift

- Migrated `packages/code-runtime-host-contract/src/codeRuntimeRpc.ts` off direct `HypeCode*` mission-control type imports
- Switched the active runtime RPC contract source to consume `HugeCode*` aliases internally while preserving the public compatibility surface

### Step 7. Host-contract root export cleanup

- Deleted `packages/code-runtime-host-contract/src/hugeCodeMissionControlCompat.ts`
- Renamed its surviving canonical `HugeCode*` exports into `packages/code-runtime-host-contract/src/hugeCodeMissionControl.ts`
- Removed `HypeCode*` mission-control exports from the package root entrypoint

### Step 8. Host-contract mission-control compat deletion

- Deleted `packages/code-runtime-host-contract/src/hypeCodeMissionControl.ts`
- Removed the `@ku0/code-runtime-host-contract/hypeCodeMissionControl` subpath export
- Replaced alias-based `HugeCode*` mission-control definitions with canonical source definitions

### Step 9. WebMCP schema-validation compat deletion

- Deleted `packages/code-runtime-webmcp-client/src/webMcpInputSchemaValidationError.ts`
- Removed the `@ku0/code-runtime-webmcp-client/webMcpInputSchemaValidationError` subpath export
- Migrated the last active app consumer to `@ku0/code-runtime-client/webMcpInputSchemaValidationError`

### Step 10. Runtime RPC helper de-compat

- Moved provider canonicalization helpers into `packages/code-runtime-host-contract/src/codeRuntimeRpc.ts`
- Moved method-not-found helper ownership into `packages/code-runtime-host-contract/src/codeRuntimeRpc.ts`
- Migrated runtime-client and app callers off the `codeRuntimeRpcCompat` subpath for those helpers

### Step 11. Runtime RPC compat subpath deletion

- Removed the `@ku0/code-runtime-host-contract/codeRuntimeRpcCompat` package export
- Migrated remaining cross-package compat imports to the canonical root entrypoint

### Step 12. App-local unavailable runtime client deletion

- Deleted `apps/code/src/services/runtimeClientUnavailable.ts`
- Added `packages/code-runtime-client/src/runtimeClientUnavailable.ts` as the canonical unavailable-runtime constructor
- Migrated `apps/code/src/services/runtimeClientTransport.ts` to shared candidate-invocation and Tauri transport helpers from `@ku0/code-runtime-client`

### Step 13. App-local runtime capabilities probe core deletion

- Migrated `apps/code/src/services/runtimeClientCapabilitiesProbe.ts` to `@ku0/code-runtime-client/runtimeClientCapabilitiesProbeCore`
- Deleted app-local duplicates of runtime capabilities cache lifecycle, probe normalization, and advertised-method assertions
