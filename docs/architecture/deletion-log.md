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

- `apps/code/src/services/runtimeClientTypes.ts` remains because it still instantiates the shared generic `RuntimeClient` with app-local `AppSettings`
