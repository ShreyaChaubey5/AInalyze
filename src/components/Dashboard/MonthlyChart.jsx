import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function MonthlyChart({ bills }) {

  // Safeguard against undefined
  const safeBills = Array.isArray(bills) ? bills : [];

  // Prepare monthly totals
  const monthlyTotals = Array(12).fill(0);

  safeBills.forEach(bill => {
  if (bill.createdAt) {
    const billDate =
      typeof bill.createdAt === "string"
        ? new Date(bill.createdAt)
        : bill.createdAt._seconds
        ? new Date(bill.createdAt._seconds * 1000)
        : null;

    if (billDate && !isNaN(billDate)) {
      const month = billDate.getMonth();
      monthlyTotals[month] += parseFloat(bill.amount || 0);
    }
  }
});

  

  const data = monthlyTotals.map((total, index) => ({
    name: new Date(0, index).toLocaleString('default', { month: 'short' }),
    total: total
  }));

  return (
    <div className="bg-white p-4 rounded-xl shadow h-64">
      <h2 className="text-lg font-semibold mb-4">Monthly Spending Trend</h2>
      <ResponsiveContainer width="100%" height="80%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip formatter={(value) => `₹${value}`} />
          <Line type="monotone" dataKey="total" stroke="#3B82F6" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
