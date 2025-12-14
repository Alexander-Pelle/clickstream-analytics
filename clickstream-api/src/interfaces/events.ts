export interface ClickStreamEvent {
    sessionId: string;
    eventType: string;
    userId?: string | null;
    timestamp: number;
    page: string;
    element: string;
    metadata?: Record<string, string>;
}