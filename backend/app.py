from flask import Flask, jsonify, send_file, abort, send_from_directory
from flask_cors import CORS
import os

# Serve the static files from the React build directory
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}} )

@app.route('/')
def health_check():
    return "Health check v2 OK"

CERT_PATH = os.path.join(os.path.dirname(__file__), 'certificates')

def get_certificates():
    """Scan CERT_PATH and return list of certificates as dicts: {id, name, file}.

    IDs are 1-based and the list is sorted alphabetically by filename for stability.
    """
    try:
        entries = sorted(
            [f for f in os.listdir(CERT_PATH) if os.path.isfile(os.path.join(CERT_PATH, f))]
        )
    except Exception:
        entries = []

    certs = []
    for idx, fname in enumerate(entries, start=1):
        certs.append({
            'id': idx,
            'name': os.path.splitext(fname)[0],
            'file': fname,
        })
    return certs

@app.route('/certificates', methods=['GET'])
def list_certficates():
    return jsonify(get_certificates())

@app.route("/view/<int:cert_id>",methods=['GET'])
def view_certificate(cert_id):
    cert = next((c for c in get_certificates() if c['id'] == cert_id), None)
    if not cert:
        abort(404, description="Certificate not found")

    file_path = os.path.join(CERT_PATH, cert['file'])
    if os.path.exists(file_path):
        return send_file(file_path, as_attachment=False)
    abort(404, description="File not found")

if __name__ == '__main__':
    app.run(debug=True,port=5000)        