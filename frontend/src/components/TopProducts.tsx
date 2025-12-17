import { Bar, Legend, BarChart, CartesianGrid, YAxis, ResponsiveContainer, XAxis, Tooltip } from 'recharts'
import type { TopProductStat } from "../types/TopProductStat";

const TopProducts = ({ topProducts }: { topProducts: TopProductStat[] }) => {
  return (
    <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Top products by purchases</h2>
        {topProducts.length === 0 ? (
            <p className="text-gray-600">No purchase events yet.</p>
        ) : (
            <>
            <div className="w-full h-[320px] bg-white p-4 rounded-lg shadow mb-4">
                <ResponsiveContainer>
                <BarChart data={topProducts}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="purchases" name="Purchases" fill="#16a34a" />
                </BarChart>
                </ResponsiveContainer>
            </div>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
                {topProducts.map((p) => (
                <li key={p.productId}>
                    <span className="font-medium">{p.name}</span> – {p.purchases} purchases, 
                    revenue: <span className="font-semibold">${p.revenue.toFixed(2)}</span>
                </li>
                ))}
            </ul>
            </>
        )}
    </section>
  )
}

export default TopProducts
