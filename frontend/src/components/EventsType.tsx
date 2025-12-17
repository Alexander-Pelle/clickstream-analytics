import { Bar, Legend, BarChart, CartesianGrid, Tooltip, YAxis, ResponsiveContainer, XAxis } from 'recharts'
import type { EventTypeStat } from "../types/EventsType";

const EventsType = ({ eventTypes }: { eventTypes: EventTypeStat[] }) => {
  return (
    <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Events by type</h2>
        {eventTypes.length === 0 ? (
            <p className="text-gray-600">No events yet. Interact with the shop first.</p>
        ) : (
            <div className="w-full h-[300px] bg-white p-4 rounded-lg shadow">
            <ResponsiveContainer>
                <BarChart data={eventTypes}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="eventType" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" name="Count" fill="#2563eb" />
                </BarChart>
            </ResponsiveContainer>
            </div>
        )}
    </section>
  )
}

export default EventsType
