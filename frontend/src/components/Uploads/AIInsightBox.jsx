export default function AllInsightBox({ insights }) {
  if (!insights || insights.length === 0) {
    return (
      <div className="p-4 bg-yellow-100 text-yellow-800 rounded">
        No AI insights available yet. Upload a bill to see analysis.
      </div>
    );
  }

  return (
    <div className="p-4 bg-white shadow rounded space-y-3">
      <h2 className="text-xl font-bold text-blue-600 mb-2">AI Insights</h2>

      {insights.map((insight, index) => (
        <div
          key={index}
          className="p-3 border border-gray-200 rounded bg-gray-50"
        >
          <p className="text-gray-700">{insight}</p>
        </div>
      ))}
    </div>
  );
}
