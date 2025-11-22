export default function SummaryCard({ title, amount, tip }) {
  return (
    <div className="p-4 bg-white rounded-xl shadow space-y-1">
      <h2 className="font-medium text-gray-700">{title}</h2>
      
      {amount !== undefined && (
        <p className="text-2xl font-bold text-blue-600">{amount}</p>
      )}
      
      {tip && (
        <p className="text-sm text-green-600 mt-1">{tip}</p>
      )}
    </div>
  );
}

