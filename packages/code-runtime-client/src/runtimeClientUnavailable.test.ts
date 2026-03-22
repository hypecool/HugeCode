import { describe, expect, it } from "vitest";
import { createUnavailableRuntimeClient } from "./runtimeClientUnavailable";

describe("@ku0/code-runtime-client unavailable runtime client", () => {
  it("routes all operations through the injected unavailable handler", async () => {
    const operations: string[] = [];
    const client = createUnavailableRuntimeClient(async <T>(operation: string): Promise<T> => {
      operations.push(operation);
      throw new Error(`Unavailable: ${operation}`);
    });

    await expect(client.health()).rejects.toThrow("Unavailable: health check");
    await expect(client.runtimeRunStart({ prompt: "ship it" } as never)).rejects.toThrow(
      "Unavailable: start runtime run"
    );
    await expect(client.appSettingsGet()).rejects.toThrow("Unavailable: read app settings");

    expect(operations).toEqual(["health check", "start runtime run", "read app settings"]);
  });
});
