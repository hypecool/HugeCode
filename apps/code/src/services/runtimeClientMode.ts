import { detectBrowserRuntimeMode } from "@ku0/shared/runtimeGatewayBrowser";
import type { RuntimeClientMode } from "./runtimeClient";
import { getConfiguredWebRuntimeGatewayProfile } from "./runtimeWebGatewayConfig";

export function detectRuntimeMode(): RuntimeClientMode {
  return detectBrowserRuntimeMode(getConfiguredWebRuntimeGatewayProfile());
}
