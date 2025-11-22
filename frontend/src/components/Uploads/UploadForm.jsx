// import { useState } from "react";

// export default function UploadForm({ onFileUpload }) {
//   const [file, setFile] = useState(null);
//   const [uploaded, setUploaded] = useState(false);

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//     setUploaded(false);
//   };

//   const handleUpload = (e) => {
//     e.preventDefault();
//     if (!file) return alert("Please select a file first.");

//     // TODO: Firebase Storage upload logic here
//     console.log("Uploading file:", file);

//     // Simulate success for now
//     setUploaded(true);

//     // Optionally pass file to parent
//     if (onFileUpload) {
//       const fileUrl = URL.createObjectURL(file); // Temporary local preview
//       onFileUpload(fileUrl);
//     }

//     setFile(null);
//   };

//   return (
//     <form onSubmit={handleUpload} className="space-y-4">
//       <input
//         type="file"
//         accept=".pdf,.jpg,.jpeg,.png"
//         onChange={handleFileChange}
//         className="block w-full border border-gray-300 rounded px-3 py-2"
//       />

//       <button
//         type="submit"
//         className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//       >
//         Upload
//       </button>
import { useState } from "react";

export default function UploadForm({ onFileSelect }) {
  const [file, setFile] = useState(null);
  const [uploaded, setUploaded] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setUploaded(false);
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a file first.");

    console.log("Selected file:", file);
    setUploaded(true);
    // Pass actual file to parent component
    if (onFileSelect) {
      onFileSelect(file);
    }

    setFile(null);
  };

  return (
    <form onSubmit={handleUpload} className="space-y-4">
      <input
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        onChange={handleFileChange}
        className="block w-full border border-gray-300 rounded px-3 py-2"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Upload
      </button>
       {uploaded && (
        <p className="text-green-600">File uploaded successfully!</p>
      )}
    </form>
  );
}


     
//     </form>
//   );
// }
