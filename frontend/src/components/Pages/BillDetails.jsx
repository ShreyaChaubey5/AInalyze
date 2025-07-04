import formatDate from "../../Utils/formatDate";
import { useLocation, useNavigate } from "react-router-dom";

export default function BillDetails() {
  const location = useLocation();
  const navigate = useNavigate();

  // Bill data is expected to be passed via state from previous page
  const bill = location.state?.bill;

  if (!bill) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-red-600">No bill selected!</h1>
        <button onClick={() => navigate("/dashboard")} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-8 p-6 bg-white shadow rounded space-y-4">
      <h1 className="text-2xl font-bold text-blue-600 mb-4">Bill Details</h1>

      <div>
        <p className="font-semibold">Bill Number:</p>
        <p>{bill.billNumber || "N/A"}</p>
      </div>

      <div>
        <p className="font-semibold">Date:</p>
        <p>{formatDate(bill.date)}</p>
      </div>

      <div>
        <p className="font-semibold">Amount:</p>
        <p className="text-green-700 font-bold">₹{bill.amount}</p>
      </div>

      <div>
        <p className="font-semibold">Units Consumed:</p>
        <p>{bill.units} kWh</p>
      </div>

      {bill.fileUrl && (
        <div>
          <p className="font-semibold">Bill Document:</p>
          <iframe
            src={bill.fileUrl}
            title="Bill Preview"
            className="w-full h-64 border"
          ></iframe>
        </div>
      )}

      <button onClick={() => navigate(-1)} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Back
      </button>
    </div>
  );
}
