from flask import Flask, render_template, request, redirect, url_for, flash
import csv
from werkzeug.utils import secure_filename
import os

UPLOAD_FOLDER = 'TestUpload'
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}
app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
def processFile(file):
    print(file)
    pass

@app.route('/fileHandle', methods=['POST'])
def mainProcessingAPI():
    if request.method == 'POST':
        # check if the post request has the file part
        if 'file' not in request.files:
            flash('No file part')
            return redirect(request.url)
        file = request.files['file']
        # If the user does not select a file, the browser submits an
        # empty file without a filename.
        if file.filename == '':
            flash('No selected file')
            return redirect(request.url)
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            return ('Yo')

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/', methods=['POST','GET'])
def mainApp():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(host='localhost',port=5000, debug=True)