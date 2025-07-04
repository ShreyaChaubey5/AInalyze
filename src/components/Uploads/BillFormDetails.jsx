import { useState } from "react";

export default function BillFormDetail({ initialData, onSave }) {
  const [formData, setFormData] = useState({
    billNumber: initialData.billNumber || "",
    date: initialData.date || "",
    totalUnits: initialData.totalUnits || "",
    amountDue: initialData.amountDue || "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData); // Calls handleSaveBill from UploadBill.jsx
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block font-medium">Bill Number:</label>
        <input
          type="text"
          name="billNumber"
          value={formData.billNumber}
          onChange={handleChange}
          className="border rounded p-2 w-full"
        />
      </div>

      <div>
        <label className="block font-medium">Date:</label>
        <input
          type="text"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="border rounded p-2 w-full"
        />
      </div>

      <div>
        <label className="block font-medium">Total Units (kWh):</label>
        <input
          type="text"
          name="totalUnits"
          value={formData.totalUnits}
          onChange={handleChange}
          className="border rounded p-2 w-full"
        />
      </div>

      <div>
        <label className="block font-medium">Amount Due (₹):</label>
        <input
          type="text"
          name="amountDue"
          value={formData.amountDue}
          onChange={handleChange}
          className="border rounded p-2 w-full"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Save Bill
      </button>
    </form>
  );
}
