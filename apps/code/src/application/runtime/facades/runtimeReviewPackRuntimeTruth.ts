import { useEffect, useState } from "react";
import type { HugeCodeReviewPackSummary } from "@ku0/code-runtime-host-contract";
import { getRuntimeReviewV2 } from "../ports/tauriRuntimeJobs";
import type { MissionControlProjection } from "./runtimeMissionControlFacade";
import type { ReviewPackSelectionState } from "./runtimeReviewPackSurfaceFacade";

export type RuntimeReviewPackRuntimeTruthState = {
  reviewPack: HugeCodeReviewPackSummary | null;
  loading: boolean;
  error: string | null;
};

export function useRuntimeReviewPackRuntimeTruth(input: {
  projection: MissionControlProjection | null;
  selection: ReviewPackSelectionState;
}): RuntimeReviewPackRuntimeTruthState {
  const [reviewPack, setReviewPack] = useState<HugeCodeReviewPackSummary | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runId = input.selection.selectedRunId;

  useEffect(() => {
    if (!input.projection || !runId) {
      setReviewPack(null);
      setLoading(false);
      setError(null);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);
    void getRuntimeReviewV2({ runId })
      .then((nextReviewPack) => {
        if (cancelled) {
          return;
        }
        setReviewPack(nextReviewPack ?? null);
        setError(null);
      })
      .catch((nextError) => {
        if (cancelled) {
          return;
        }
        setReviewPack(null);
        setError(nextError instanceof Error ? nextError.message : String(nextError));
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [input.projection, runId]);

  return {
    reviewPack,
    loading,
    error,
  };
}
