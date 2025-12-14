import {useCallback, useMemo} from 'react'

const useClickTracker = () => {
  // Generate a session ID once per component mount
  const sessionId = useMemo(() => {
    return `session-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  }, []);

  return useCallback((elementName: string, metadata?: Record<string, any>) => {
    const payload = {
      sessionId,
      timestamp: Date.now(),
      page: window.location.pathname,
      element: elementName,
      userId: null,
      eventType: "click",
      metadata: metadata ?? {},
    }
    fetch("http://localhost:5000/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }).catch(error => {
      console.error("Error sending click event:", error);
    });
  }, [sessionId]);
}

export default useClickTracker
