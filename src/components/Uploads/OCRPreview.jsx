export default function OCRPreview({ fileUrl, extractedText }) {
  if (!fileUrl) {
    return (
      <div className="p-4 bg-yellow-100 text-yellow-800 rounded">
        No file uploaded yet. Please upload your bill.
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold text-blue-600 mb-2">Bill Preview</h2>

      {/* File preview */}
      {fileUrl.endsWith(".pdf") ? (
        <iframe
          src={fileUrl}
          title="Bill PDF"
          className="w-full h-96 border rounded"
        ></iframe>
      ) : (
        <img
          src={fileUrl}
          alt="Bill Preview"
          className="w-full max-h-96 object-contain border rounded"
        />
      )}

      {/* OCR Text */}
      <div>
        <h3 className="font-semibold text-gray-700 mb-1">Extracted Text:</h3>
        <div className="p-2 bg-gray-100 border rounded max-h-64 overflow-auto text-sm">
          {extractedText || "No text extracted yet."}
        </div>
      </div>
    </div>
  );
}
