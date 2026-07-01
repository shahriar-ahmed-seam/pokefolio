"use client";

import { useCallback, useSyncExternalStore } from "react";

/** Idiomatic media-query subscription with no setState-in-effect. */
function useMediaQuery(query: string, serverValue = false): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    [query]
  );
  const getSnapshot = () => window.matchMedia(query).matches;
  const getServerSnapshot = () => serverValue;
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

const noopSubscribe = () => () => {};

/** Respects the user's OS-level reduced-motion preference. */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

/** Detects a fine pointer (mouse) so we only render the custom cursor there. */
export function useHasFinePointer(): boolean {
  return useMediaQuery("(pointer: fine)");
}

/** True once mounted on the client — false during SSR (avoids hydration flashes). */
export function useMounted(): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false
  );
}
