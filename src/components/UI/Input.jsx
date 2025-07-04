export default function Input({ label, type = "text", placeholder, value, onChange, name, required = false }) {
  return (
    <div className="mb-4">
      {label && (
        <label className="block mb-1 text-gray-700 font-medium" htmlFor={name}>
          {label}
        </label>
      )}
      <input
        type={type}
        name={name}
        id={name}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
}
