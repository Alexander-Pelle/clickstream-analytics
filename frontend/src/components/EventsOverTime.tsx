import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

import type { EventsOverTimeStat } from "../types/EventsOverTime";

const EventsOverTime = ({ eventsOverTime }: { eventsOverTime: EventsOverTimeStat[] }) => {
  return (
    <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
            Events over time (last 7 days)
        </h2>
        {eventsOverTime.length === 0 ? (
            <p className="text-gray-600">
            No events in this time range yet.
            </p>
        ) : (
            <div className="w-full h-[300px] bg-white p-4 rounded-lg shadow">
            <ResponsiveContainer>
                <LineChart data={eventsOverTime}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Line
                    type="monotone"
                    dataKey="count"
                    name="Events"
                    dot
                />
                </LineChart>
            </ResponsiveContainer>
            </div>
        )}
    </section>
  )
}

export default EventsOverTime
