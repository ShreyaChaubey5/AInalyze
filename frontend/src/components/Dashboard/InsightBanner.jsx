export default function InsightBanner({ text }) {
  return (
    <div className="flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-xl shadow-sm">
      💡 <span className="font-medium">Insight:</span> {text}
    </div>
  );
}
