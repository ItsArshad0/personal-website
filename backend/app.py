from flask import Flask, jsonify, send_file, abort, request
from flask_cors import CORS
import os, logging, traceback

app = Flask(__name__)

# Use a restrictive origin in production (e.g. ["https://your-frontend.com"])
CORS(app,
     resources={r"/*": {"origins": "*"}},
     supports_credentials=True,
     methods=["GET", "POST", "OPTIONS", "HEAD"],
     allow_headers=["Content-Type", "Authorization", "X-Requested-With"],
     expose_headers=["Content-Disposition"],
     max_age=3600)

logging.basicConfig(level=logging.INFO)

@app.route('/')
def health_check():
    return "Health check v2 OK"

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CERT_PATH = os.path.join(BASE_DIR, 'certificates')

def get_certificates():
    try:
        entries = sorted(
            [f for f in os.listdir(CERT_PATH) if os.path.isfile(os.path.join(CERT_PATH, f))]
        )
    except Exception as e:
        app.logger.error("Failed to list certificates: %s\n%s", e, traceback.format_exc())
        entries = []

    certs = []
    for idx, fname in enumerate(entries, start=1):
        certs.append({
            'id': idx,
            'name': os.path.splitext(fname)[0],
            'file': fname,
        })
    return certs

@app.route('/certificates', methods=['GET', 'OPTIONS'])
def list_certficates():
    # Flask-CORS will add proper headers; we also accept OPTIONS here to be explicit
    if request.method == 'OPTIONS':
        return ('', 204)
    return jsonify(get_certificates())

@app.route("/view/<int:cert_id>", methods=['GET', 'OPTIONS'])
def view_certificate(cert_id):
    if request.method == 'OPTIONS':
        return ('', 204)

    cert = next((c for c in get_certificates() if c['id'] == cert_id), None)
    if not cert:
        abort(404, description="Certificate not found")

    file_path = os.path.join(CERT_PATH, cert['file'])
    if os.path.exists(file_path):
        # send_file will set Content-Type; expose Content-Disposition with CORS above
        return send_file(file_path, as_attachment=False)
    abort(404, description="File not found")

if __name__ == '__main__':
    # host='0.0.0.0' to accept external requests (containers / remote machines)
    # Remove ssl_context in production — use a real TLS reverse proxy (nginx) instead.
    app.run(host='0.0.0.0', port=5000, debug=True)   # for quick dev
    # For local HTTPS dev (only): app.run(host='0.0.0.0', port=5001, ssl_context='adhoc', debug=True)
