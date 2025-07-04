export default function formatDate(dateStr) {
  if (!dateStr) return "";

  const date = new Date(dateStr);

  if (isNaN(date.getTime())) {
    return dateStr; // If invalid date, return as-is
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}
