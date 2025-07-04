export default function RecentBills({ bills }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">Recent Bills</h2>
      {bills.length === 0 ? (
        <p className="text-gray-500">No bills uploaded yet.</p>
      ) : (
        <ul className="space-y-2">
          {bills.map((bill, index) => {
            // Handle amount display
            const displayAmount =
              bill.amount === null || bill.amount === undefined
                ? "N/A"
                : `₹${bill.amount}`;

            // Handle date display
            let displayDate = "Date Unknown";
            if (bill.createdAt) {
              const dateObj =
                typeof bill.createdAt === "string"
                  ? new Date(bill.createdAt)
                  : bill.createdAt._seconds
                  ? new Date(bill.createdAt._seconds * 1000)
                  : null;

              if (dateObj) displayDate = dateObj.toLocaleString();
            }

            return (
              <li
                key={index}
                className="flex justify-between items-center border-b pb-1"
              >
                <div>
                  <p className="font-medium">{bill.billName || "Bill"}</p>
                  <p className="text-xs text-gray-500">
                    {displayAmount} &nbsp; | &nbsp;
                    {displayDate}
                  </p>
                </div>

                {bill.imageUrl && (
                  <img
                    src={bill.imageUrl}
                    alt="Bill"
                    className="w-10 h-10 object-cover rounded"
                  />
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
