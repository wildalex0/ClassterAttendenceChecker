from flask import Flask

app = Flask(__name__)
@app.route("/api/python")
def hello_world():
    return("<p>hello world</p>")