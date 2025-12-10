import os
import logging
import traceback
from flask import Flask, jsonify, send_file, abort, request
from flask_cors import CORS
FRONTEND_ORIGIN="http://your-bucket.s3-website-ap-south-1.amazonaws.com"
FRONTEND_ORIGIN = os.environ.get("FRONTEND_ORIGIN", "*")

# If you set ALLOW_ALL_ORIGINS="true" it will force "*"
ALLOW_ALL_ORIGINS = os.environ.get("ALLOW_ALL_ORIGINS", "false").lower() == "true"

# Path to certificates directory (relative to this file)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CERT_PATH = os.path.join(BASE_DIR, "certificates")

# ---------- App setup ----------
app = Flask(__name__)
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# CORS setup
if ALLOW_ALL_ORIGINS:
    cors_origins = "*"
else:
    cors_origins = FRONTEND_ORIGIN

# Use flask-cors to handle preflight and actual responses
CORS(app,
     resources={r"/*": {"origins": cors_origins}},
     supports_credentials=False,
     expose_headers=["Content-Disposition", "Content-Length"])

# ---------- Utilities ----------
def get_certificates():
    """
    List files in the certificates directory and return a list of dicts:
    { id, name, file }
    """
    certs = []
    try:
        # Ensure directory exists
        if not os.path.isdir(CERT_PATH):
            logger.warning("Certificates directory not found: %s", CERT_PATH)
            return certs

        entries = sorted(
            [f for f in os.listdir(CERT_PATH) if os.path.isfile(os.path.join(CERT_PATH, f))]
        )
        for idx, fname in enumerate(entries, start=1):
            certs.append({
                "id": idx,
                "name": os.path.splitext(fname)[0],
                "file": fname,
            })
    except Exception as e:
        logger.error("Failed to list certificates: %s\n%s", e, traceback.format_exc())
    return certs

# ---------- Routes ----------
@app.before_request
def log_request():
    logger.info("%s %s from %s", request.method, request.path, request.remote_addr)

@app.route("/", methods=["GET"])
def health_check():
    return "Health check OK", 200

@app.route("/certificates", methods=["GET", "OPTIONS"])
def list_certificates():
    # Support preflight explicitly, though flask-cors normally does this
    if request.method == "OPTIONS":
        return ("", 200)
    return jsonify(get_certificates()), 200

@app.route("/view/<int:cert_id>", methods=["GET"])
def view_certificate(cert_id):
    cert = next((c for c in get_certificates() if c["id"] == cert_id), None)
    if not cert:
        abort(404, description="Certificate not found")

    file_path = os.path.join(CERT_PATH, cert["file"])
    if os.path.exists(file_path):
        # send_file will set Content-Type; CORS exposes Content-Disposition if needed
        # as_attachment=False will render inline when possible
        return send_file(file_path, as_attachment=False)
    abort(404, description="File not found")

# ---------- Error handlers ----------
@app.errorhandler(404)
def handle_404(e):
    return jsonify({"error": str(e)}), 404

@app.errorhandler(500)
def handle_500(e):
    logger.error("Internal server error: %s\n%s", e, traceback.format_exc())
    return jsonify({"error": "Internal server error"}), 500

# WSGI entrypoint expected by Gunicorn/EB: 'app'
if __name__ == "__main__":
    # Development server (do not use in production)
    # It binds to 0.0.0.0 so it's reachable from other machines if the instance allows the port.
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)), debug=True)
