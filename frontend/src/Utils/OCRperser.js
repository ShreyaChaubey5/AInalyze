export default function OCRParser(ocrText) {
  if (!ocrText) return {};

  const data = {
    billNumber: "",
    date: "",
    amount: "",
    units: ""
  };

  // Extract amount like ₹2500 or Rs.2500
  const amountMatch = ocrText.match(/(?:₹|Rs\.?)\s?(\d{1,7})/i);
  if (amountMatch) {
    data.amount = amountMatch[1];
  }

  // Extract units like 320 kWh or 320 units
  const unitsMatch = ocrText.match(/(\d{1,5})\s?(kWh|units)/i);
  if (unitsMatch) {
    data.units = unitsMatch[1];
  }

  // Extract date formats like 23/06/2025 or 23-06-2025
  const dateMatch = ocrText.match(/(\d{2}[\/\-]\d{2}[\/\-]\d{4})/);
  if (dateMatch) {
    data.date = dateMatch[1];
  }

  
  return data;
}
