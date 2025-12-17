import { useEffect, useState } from "react";
import EventsOverTime from "./EventsOverTime";
import type { EventsOverTimeStat } from "../types/EventsOverTime";
import type { EventTypeStat } from "../types/EventsType";
import EventsType from "./EventsType";
import TopProducts from "./TopProducts";
import type { TopProductStat } from "../types/TopProductStat";


  


export const AnalyticsDashboard: React.FC = () => {
  const [eventTypes, setEventTypes] = useState<EventTypeStat[]>([]);
  const [topProducts, setTopProducts] = useState<TopProductStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [eventsOverTime, setEventsOverTime] = useState<EventsOverTimeStat[]>([]);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const [typesRes, productsRes, timeseriesRes] = await Promise.all([
          fetch("http://localhost:5000/stats/event-types"),
          fetch("http://localhost:5000/stats/top-products"),
          fetch("http://localhost:5000/stats/events-over-time?days=7"),
        ]);
        const typesData = await typesRes.json();
        const productsData = await productsRes.json();
        const timeseriesData = await timeseriesRes.json();

        setEventTypes(typesData);
        setTopProducts(productsData);
        setEventsOverTime(timeseriesData);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);


  return (
    <div className="px-8 py-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">ShopLite Analytics</h1>

      {loading && <p className="text-gray-500">Loading charts…</p>}

      {!loading && (
        <section id="analytics-dashboard" className="grid grid-cols-2 gap-4">
          {/* Time-series chart */}
          <EventsOverTime eventsOverTime={eventsOverTime} />

          {/* Event types chart */}
          <EventsType eventTypes={eventTypes} />

           {/* Top products chart */}
           <TopProducts topProducts={topProducts} />
        </section>
      )}
    </div>
  );
};
