type SentryMetricsOptions = {
  attributes?: Record<string, string>;
};

type SentryCaptureContext = {
  tags?: Record<string, string>;
  extra?: Record<string, unknown>;
};

let sentryReactModulePromise: Promise<typeof import("@sentry/react") | null> | null = null;

function loadSentryReactModule() {
  if (!sentryReactModulePromise) {
    sentryReactModulePromise = import("@sentry/react").catch(() => null);
  }
  return sentryReactModulePromise;
}

export function recordSentryMetric(
  metricName: string,
  value: number,
  options?: SentryMetricsOptions
) {
  void loadSentryReactModule().then((sentry) => {
    sentry?.metrics?.count?.(metricName, value, options);
  });
}

export function captureSentryException(error: unknown, context?: SentryCaptureContext) {
  const normalizedError = error instanceof Error ? error : new Error(String(error));
  void loadSentryReactModule().then((sentry) => {
    sentry?.captureException?.(normalizedError, context);
  });
}

export function __resetSentryModuleForTests() {
  sentryReactModulePromise = null;
}
