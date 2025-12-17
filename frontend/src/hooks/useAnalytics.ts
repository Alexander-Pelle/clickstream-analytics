import { useCallback } from "react";

type AnalyticsEvent = {
  eventType: string;
  element: string;
  metadata?: Record<string, any>;
};

function getOrCreateSessionId(): string {
  const key = "sessionId";
  let sessionId = window.localStorage.getItem(key);
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    window.localStorage.setItem(key, sessionId);
  }
  return sessionId;
}

export function useAnalytics(pagePath: string) {
  return useCallback(
    (event: AnalyticsEvent) => {
      const payload = {
        sessionId: getOrCreateSessionId(),
        eventType: event.eventType,
        timestamp: Date.now(),       // number (ms since epoch)
        page: pagePath,
        element: event.element,
        metadata: event.metadata ?? {},
      };

      fetch("http://localhost:5000/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).catch(() => {
        // swallow for now; you can log if you want
      });
    },
    [pagePath]
  );
}
