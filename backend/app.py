from flask import Flask, jsonify,send_file,abort
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

CERT_PATH=os.path.join(os.path.dirname(__file__),'certificates')

certificates =[
    {'id':1,'name':'Certificate A','file':'certificate_a.pdf'
    },{'id':2,'name':'Certificate B','file':'certificate_b.pdf'}
]
@app.route('/certificates',methods=['GET'])
def list_certficates():
    return jsonify(certificates)
@app.route("/view/<int:cert_id>",methods=['GET'])
def view_certificate(cert_id):
    cert = next((c for c in certificates if c['id'] == cert_id),None)
    if cert:
        file_path = os.path.join(CERT_PATH,cert['file'])
        if os.path.exists(file_path):
            return send_file(file_path,as_attachment=False)
        else:
            abort(404,description="File not found")
    else:
        abort(404,description="Certificate not found")
if __name__ == '__main__':
    app.run(debug=True,port=5000)        