export default function AnamolyAlert({ currentAmount, limit }) {
  // Ensure currentAmount is treated as a string
  const amountNumber = parseInt(String(currentAmount).replace(/[^0-9]/g, ''));

  if (amountNumber > limit) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        ⚠️ Alert: Your spending has exceeded the limit of ₹{limit}.
      </div>
    );
  }

  return null;
}
