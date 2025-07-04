export default function UploadProgress({ progress }) {
  return (
    <div className="w-full bg-gray-200 h-4 rounded overflow-hidden">
      <div
        className="bg-blue-600 h-4 transition-all duration-200"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}
