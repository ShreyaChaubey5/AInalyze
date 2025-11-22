import { useState } from "react";

export default function Settings() {
  const [limit, setLimit] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    
    // TODO: Send limit to backend or Firebase here
    console.log("Saved limit:", limit);
    setSaved(true);

    // Reset confirmation message after 3 sec
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-md mx-auto mt-8 bg-white p-6 rounded-lg shadow">
      <h1 className="text-2xl font-bold text-blue-600 mb-4">Settings</h1>

      <form onSubmit={handleSave}>
        <label className="block mb-2 text-gray-700">Monthly Bill Limit (₹)</label>
        <input
          type="number"
          placeholder="Enter your limit"
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save
        </button>
      </form>

      {saved && (
        <p className="text-green-600 mt-3">Limit saved successfully!</p>
      )}
    </div>
  );
}
