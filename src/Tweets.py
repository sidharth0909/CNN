from flask import Flask, jsonify
from flask_cors import CORS  # Import CORS
import requests
import xmltodict

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

GDACS_RSS_URL = "https://www.gdacs.org/xml/rss.xml"

@app.route("/api/disasters", methods=["GET"])
def get_disasters():
    try:
        response = requests.get(GDACS_RSS_URL)
        if response.status_code != 200:
            return jsonify({"error": "Failed to fetch disaster data"}), 500

        # Convert XML to dictionary
        data = xmltodict.parse(response.content)
        items = data["rss"]["channel"]["item"]

        # Extract necessary details
        disasters = []
        for item in items[:4]:  # Get top 5 recent disasters
            disaster = {
                "title": item["title"],
                "description": item["description"],
                "link": item["link"],
                "pubDate": item["pubDate"],
                "severity": item.get("gdacs:severity", {}).get("#text", "Unknown"),
                "alertlevel": item.get("gdacs:alertlevel", "Unknown"),
                "image": item.get("enclosure", {}).get("@url", ""),
                "latitude": item["geo:Point"]["geo:lat"],
                "longitude": item["geo:Point"]["geo:long"]
            }
            disasters.append(disaster)

        return jsonify(disasters)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5001)
