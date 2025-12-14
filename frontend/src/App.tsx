import { useEffect, useState } from "react";
import useClickTracker from "./hooks/useClickTracker";

type PageStat = { page: string; count: number };
type Summary = {
  total: number;
  byPage: PageStat[];
};

function App() {
  const track = useClickTracker();
  const [summary, setSummary] = useState<Summary | null>(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const loadSummary = async () => {
    try {
      const res = await fetch("http://localhost:5000/stats/summary");
      const data = await res.json();
      setSummary(data);
      setIsInitialLoad(false);
    } catch (error) {
      console.error("Error loading summary:", error);
      setIsInitialLoad(false);
    }
  };

  useEffect(() => {
    loadSummary();
  }, []);

  const handleClick = async (name: string) => {
    track(name, { label: name });
    // Delay slightly to allow the event to be saved, then refresh stats
    setTimeout(() => {
      loadSummary();
    }, 100);
  };

  return (
    <div
      style={{
        padding: "2rem",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        maxWidth: 800,
        justifyContent: "center",
        alignItems: "center",
        margin: "0 auto",
      }}
    >
      <h1>Clickstream Demo</h1>

      <p>Click these buttons – each click is sent to the Express API and stored.</p>

      <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem" }}>
        <button onClick={() => handleClick("primary-cta")}>Primary CTA</button>
        <button onClick={() => handleClick("secondary-cta")}>Secondary CTA</button>
        <button onClick={() => handleClick("nav-home")}>Nav: Home</button>
      </div>

      <hr />

      <h2>Stats</h2>
      {isInitialLoad && !summary && <p>Loading stats…</p>}
      {summary && (
        <>
          <p>
            <strong>Total events:</strong> {summary.total}
          </p>
          <h3>By page</h3>
          {summary.byPage.length === 0 && <p>No data yet. Start clicking!</p>}
          {summary.byPage.length > 0 && (
            <ul>
              {summary.byPage.map((p) => (
                <li key={p.page}>
                  <code>{p.page}</code>: {p.count} clicks
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}

export default App;
