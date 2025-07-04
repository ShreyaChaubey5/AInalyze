from flask import Flask, request, jsonify
import spacy
import re

app = Flask(__name__)

# Load spaCy English model
nlp = spacy.load("en_core_web_sm")


# Function to extract amount intelligently
def extract_amount(text):
    # Improved regex for ₹, Rs., INR detection with amounts like 20, 100.50 etc.
    amount_pattern = r"(?:₹|Rs\.?|INR)?\s*([0-9]+(?:\.[0-9]{1,2})?)"
    matches = re.findall(amount_pattern, text)

    if matches:
        # Convert to float and return highest amount
        amounts = [float(m) for m in matches]
        return max(amounts)
    return None


# Optional: Extract entities using spaCy (Company names, dates, etc.)
def extract_entities(text):
    doc = nlp(text)
    entities = [(ent.text, ent.label_) for ent in doc.ents]
    return entities


@app.route("/analyze-text", methods=["POST"])
def analyze_text():
    data = request.json
    text = data.get("text", "")

    if not text:
        return jsonify({"error": "No text provided"}), 400

    amount = extract_amount(text)
    entities = extract_entities(text)

    return jsonify({
        "amount": amount,
        "entities": entities,
        "rawText": text
    })


if __name__ == "__main__":
    app.run(port=5000, debug=True)
