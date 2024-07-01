from flask import Flask, render_template, request, flash, redirect, make_response
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
import json
import datetime
from math import floor
UPLOAD_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), "TestUpload")
ALLOWED_EXTENSIONS = {'csv'}
app = Flask(__name__)
CORS(app)
app.secret_key = 'your_secret_key_here' 
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
subjectList = []
folderList = ["AttendencePerDate", "TestUpload"]
finalJson = {}
#User defined Args (Default args are usually inputted & defined.)
class Subject():
    def __init__(self, subjectName, subjectId):
        self.subjectName = subjectName
        self.subjectId = subjectId
        self.missedLectureHours = 0
        self.attendedLectureHours = 0
        self.totalHours = 0
    def addMissed(self,hours):
        self.missedLectureHours+=hours
        self.totalHours+= hours

    def addAttended(self,hours):
        self.attendedLectureHours+= hours    
        self.totalHours += hours

    def calcMissedPercentage(self):
        if self.totalHours > 0:
            percentage = (self.attendedLectureHours / self.totalHours) * 100
            return percentage
        else:
            return -1
    def compareName(self,inputName):
        if (self.subjectName == inputName):
            return(True)
        else:
            return(False)
    def compareId(self,inputId):
        if (self.subjectId == inputId):
            return(True)
        else:
            return(False)
    def returnReport(self):
        return ([self.subjectName, floor(self.calcMissedPercentage())])
def writeReport():
    date = datetime.datetime.now()
    path = f"{os.path.join(os.path.dirname(os.path.abspath(__file__)))}/AttendencePerDate/{date.day}-{date.month}-{date.year}-{readInstanceCounter()}.json"
    json.dump(finalJson,open(path,'w'),indent=6)
  
def processFile(file):
    print(mainArgs)
    authIndex = mainArgs[0]
    nameIndex = mainArgs[1]
    hrsIndex = mainArgs[2]
    try:
        path = f"{app.config['UPLOAD_FOLDER']}/{file}"
        with open(path, 'r') as f:
            next(f)  # Skip the first line
            for line in f:
                instanceData = {
                    "Present": False,
                    "subCreated": False,
                    "HourAmount": 0,
                    "Subindex" : -1
                }
                line = line.replace('"', '').rstrip('\n')
                mainList = line.split(',')
                if mainList[authIndex] == "Authorised":
                    instanceData['Present'] = True
                
                nameList = mainList[nameIndex]
                nameList = nameList.replace(nameList[0],"",1).split('|')
                if not subjectList:  # Checking if subjectList is empty
                    sub = Subject(nameList[1], nameList[0])
                    subjectList.append(sub)
                    instanceData['SubFound'] = nameList[1]
                    instanceData['SubId'] = nameList[0]
                    instanceData['Subindex'] = 0
                else:
                    found = False
                    index = -1
                    for name in subjectList:
                        index += 1
                        if name.compareName(nameList[1]) == True:
                            instanceData['Subindex'] = index
                            found = True
                            break
                    if not found:  # If the name was not found in subjectList
                        sub = Subject(nameList[1], nameList[0])
                        subjectList.append(sub)
                        instanceData['SubName'] = nameList[1]
                        instanceData['SubId'] = nameList[0]
                        instanceData['Subindex'] = len(subjectList)-1
                
                instanceData['HourAmount'] = int(line[hrsIndex])
                if instanceData['Present']:
                    subjectList[instanceData['Subindex']].addAttended(instanceData['HourAmount'])
                else:
                    subjectList[instanceData['Subindex']].addMissed(instanceData['HourAmount'])
        for x in subjectList:
            rp = x.returnReport()
            finalJson.update({rp[0] : rp[1]})
        writeReport()
        return(1)
    except:
        print("Error Found")
        return(0)
def processRow(row):
    counter = 0
    for x in row:
        z = x.replace('"', '')
        counter += 1
        print(f"{counter} - {z}")
def readInstanceCounter():
    path =  os.path.join(os.path.dirname(os.path.abspath(__file__)),'instanceCounter.txt')
    try:
        f = open(path,'r')
        fileCont = int(f.read())
        f.close()
        return fileCont
    except FileNotFoundError:
        f = open(path,'w')
        fileCont = int(f.write("0"))
        f.close()
        return fileCont
def appendArgs(args):
    y = args.split('-')
    global mainArgs
    mainArgs = []
    for x in y:
        mainArgs.append(int(x))
    if (len(mainArgs) != 3):
        mainArgs = [1,4,9]

        

    
def setInstanceCounter():
    fileCont = readInstanceCounter()
    print(f"{fileCont} - {type(fileCont)}")
    fileCont+=1 
    fileCont = str(fileCont)
    open('instanceCounter.txt','w').write(fileCont)
    return fileCont
def checkFolderStruct():
    currentPath = os.path.dirname(os.path.abspath(__file__))
    for x in  folderList:
        testPath = os.path.join(os.path.dirname(os.path.abspath(__file__)), x)
        if(os.path.exists(testPath)):
            files = os.listdir(testPath)
            for file in files:
                file_path = os.path.join(testPath, file)
                
                # Check if it's a file before deleting
                if os.path.isfile(file_path):
                    os.remove(file_path)
        else:
            print(f"File Not Found")
            os.mkdir(os.path.join(currentPath, x))
    return (True)

@app.route('/fileAPI',methods=['GET','POST'])
def returnJSON():
    return finalJson
@app.route('/api/result', methods=['GET','POST'])
def mainProcessingAPI():
    if request.method == 'POST':
        checkFolderStruct()
        appendArgs(request.form['args'])
        # check if the post request has the file part
        if 'file' not in request.files:
            flash('No file part')
            return ('Please Enter A file')
        file = request.files['file']
        print(file.filename)
        if file and allowed_file(file.filename):
            filename = f"{setInstanceCounter()}_{secure_filename(file.filename)}"
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            if(processFile(filename) == 0):
                return redirect("http://localhost:3000/error")
            return redirect("http://localhost:3000/result")
        else:
            response = make_response(redirect("http://localhost:3000/error"))
            response.headers["Refresh"] = "3; url=http://localhost:3000"
            return response

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/', methods=['POST','GET'])
def mainApp():
    return redirect("http://localhost:3000/")

if __name__ == '__main__':
    app.run(host='localhost',port=5000, debug=True)