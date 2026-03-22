import { invoke } from "@tauri-apps/api/core";
import { getErrorMessage } from "@ku0/code-runtime-client/runtimeClientErrorUtils";
import {
  createRuntimeRpcInvokerWithCandidates,
  invokeTauriRaw,
} from "@ku0/code-runtime-client/runtimeClientTransportCore";
import { detectRuntimeMode } from "./runtimeClientMode";
import { createRpcRuntimeClient } from "./runtimeClientRpcClient";
import {
  resolveCapabilitiesSnapshotByMode,
  resolveTauriRuntimeRpcMethodCandidates,
  resolveWebRuntimeRpcMethodCandidates,
} from "./runtimeClientCapabilitiesProbe";
import { rejectUnavailable } from "@ku0/code-runtime-client/runtimeClientTransportShared";
export {
  RuntimeRpcMethodUnsupportedError,
  RuntimeUnavailableError,
} from "@ku0/code-runtime-client/runtimeClientTransportShared";
import { createUnavailableRuntimeClient } from "@ku0/code-runtime-client/runtimeClientUnavailable";
import type { AppSettings } from "../types";
import type { RuntimeCapabilitiesSummary, RuntimeClient } from "./runtimeClient";
import { invokeWebRuntimeRaw } from "./runtimeClientWebTransport";

export async function readRuntimeCapabilitiesSummary(): Promise<RuntimeCapabilitiesSummary> {
  const mode = detectRuntimeMode();
  if (mode === "unavailable") {
    return {
      mode,
      methods: [],
      features: [],
      wsEndpointPath: null,
      error: null,
    };
  }

  try {
    const snapshot = await resolveCapabilitiesSnapshotByMode(mode);
    return {
      mode,
      methods: snapshot ? [...snapshot.methods] : [],
      features: snapshot ? [...snapshot.features] : [],
      wsEndpointPath: snapshot?.wsEndpointPath ?? null,
      error: null,
    };
  } catch (error) {
    return {
      mode,
      methods: [],
      features: [],
      wsEndpointPath: null,
      error: getErrorMessage(error) || "Runtime capabilities unavailable.",
    };
  }
}

const unavailableClient = createUnavailableRuntimeClient<AppSettings>(rejectUnavailable);

const webRuntimeClient = createRpcRuntimeClient(
  createRuntimeRpcInvokerWithCandidates(invokeWebRuntimeRaw, resolveWebRuntimeRpcMethodCandidates)
);

const tauriClient = createRpcRuntimeClient(
  createRuntimeRpcInvokerWithCandidates(
    (method, params) => invokeTauriRaw(invoke, method, params),
    resolveTauriRuntimeRpcMethodCandidates
  )
);

export function getRuntimeClient(): RuntimeClient {
  const mode = detectRuntimeMode();

  if (mode === "tauri") {
    return tauriClient;
  }
  if (mode === "runtime-gateway-web") {
    return webRuntimeClient;
  }
  return unavailableClient;
}
