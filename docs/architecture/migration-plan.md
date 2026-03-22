# Runtime Architecture Migration Plan

## Goal

Collapse duplicated runtime-adjacent ownership into the canonical path while deleting replaced code immediately.

## Completed in this wave

### Step 1. Architecture truth inventory

- Added `current-state.md`
- Added `debt-inventory.md`

### Step 2. WebMCP type ownership consolidation

- Canonicalized shared WebMCP/runtime-agent type naming to `HugeCode*`
- Converted `apps/code/src/services/webMcpBridgeTypes.ts` from a full duplicate into a package shim
- Migrated `packages/code-workspace-client` mission-control consumers to `HugeCode*`
- Filled missing `HugeCode*` alias exports in the host contract compat layer

### Step 3. Runtime client type ownership consolidation

- Moved the canonical `RuntimeClient` interface into `@ku0/code-runtime-client`
- Converted `apps/code/src/services/runtimeClientTypes.ts` into an app-local generic instantiation shim

### Step 4. App-local runtime helper shim deletion

- Migrated `apps/code` runtime/WebMCP helper imports from local service shims to
  `@ku0/code-runtime-client` and `@ku0/code-runtime-webmcp-client`
- Deleted 15 app-local shim files from `apps/code/src/services`
- Restored `application/runtime/ports/*` as the frontend boundary instead of
  letting package imports leak through the runtime infrastructure aggregator
- Collapsed `packages/code-runtime-webmcp-client/src/webMcpInputSchemaValidationError.ts`
  into a compatibility re-export of the canonical runtime-client implementation

## Next steps

### Step 5. Delete the last app-local runtime client type shim

Target:

- `apps/code/src/services/runtimeClientTypes.ts`
- any remaining app-local aliases that exist only to pin `AppSettings`

Rule:

- if the app file is only a compatibility re-export, migrate imports and delete it
- if the app file still diverges, move the canonical version into the package first, then delete the app copy

### Step 6. Collapse mission-control snapshot/projection fallback logic

Target:

- shared workspace shell reads kernel projection and runtime snapshot truth only
- remove local projection fallback logic that reconstructs equivalent truth from older shapes

### Step 7. Reduce Tauri bridge surface to host adaptation only

Target:

- remove runtime-domain normalization from Tauri adapters where canonical contract types already exist
- keep only transport adaptation and platform-specific error mapping

### Step 8. Shrink public compat surface

Target:

- stop exposing legacy mission-control names to active consumers
- narrow root-level compat exports once downstream imports are migrated

## Validation gates

Minimum for each migration slice:

- touched package `typecheck`
- touched package `test`
- `apps/code` typecheck when shared runtime-client or WebMCP surfaces change

Escalate to:

- `pnpm check:runtime-contract`
- `pnpm ui:contract`
- `pnpm validate`

when transport contracts or app/runtime boundaries move.
