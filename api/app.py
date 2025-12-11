import os
import logging
from flask import Flask, jsonify
from flask_cors import CORS

# ---------- App setup ----------
app = Flask(__name__)
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# CORS setup
# Use flask-cors to handle preflight and actual responses
CORS(app,
     resources={r"/*": {"origins": "*"}},
     supports_credentials=False,
     expose_headers=["Content-Disposition", "Content-Length"])

# ---------- Routes ----------
@app.before_request
def log_request():
    logger.info("%s %s from %s", request.method, request.path, request.remote_addr)

@app.route("/", methods=["GET"])
def health_check():
    return "OK", 200

# ---------- Error handlers ----------
@app.errorhandler(404)
def handle_404(e):
    return jsonify({"error": str(e)}), 404

@app.errorhandler(500)
def handle_500(e):
    logger.error("Internal server error: %s", e) # Simplified logging
    return jsonify({"error": "Internal server error"}), 500

# WSGI entrypoint expected by Gunicorn/EB: 'app'
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)), debug=True)
