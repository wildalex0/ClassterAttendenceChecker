from flask import Flask, render_template, request, redirect, url_for, flash
from werkzeug.utils import secure_filename
import os
import json
import datetime
from math import floor
UPLOAD_FOLDER = 'TestUpload'
ALLOWED_EXTENSIONS = {'csv'}
app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
subjectList = []
finalJson = {}
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
    path = f"AttendencePerDate/{date.day}-{date.month}-{date.year}-{readInstanceCounter()}.json"
    json.dump(finalJson,open(path,'w'),indent=6)
    
def processFile(file):
    path = f"TestUpload/{file}"
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
            if mainList[1] == "Authorised":
                instanceData['Present'] = True
            
            nameList = mainList[4]
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
            instanceData['HourAmount'] = int(line[9])
            if instanceData['Present']:
                subjectList[instanceData['Subindex']].addAttended(instanceData['HourAmount'])
            else:
                subjectList[instanceData['Subindex']].addMissed(instanceData['HourAmount'])
    for x in subjectList:
        rp = x.returnReport()
        finalJson.update({rp[0] : rp[1]})
    writeReport()    
def processRow(row):
    counter = 0
    for x in row:
        z = x.replace('"', '')
        counter += 1
        print(f"{counter} - {z}")
def readInstanceCounter():
    f = open('instanceCounter.txt','r')
    fileCont = int(f.read())
    f.close()
    return fileCont
def setInstanceCounter():
    fileCont = readInstanceCounter()
    print(f"{fileCont} - {type(fileCont)}")
    fileCont+=1 
    fileCont = str(fileCont)
    open('instanceCounter.txt','w').write(fileCont)
    return fileCont
@app.route('/fileAPI',methods=['GET','POST'])
def returnJSON():
    return finalJson

@app.route('/result', methods=['GET','POST'])
def mainProcessingAPI():
    if request.method == 'POST':
        # check if the post request has the file part
        if 'file' not in request.files:
            flash('No file part')
            return ('Please Enter A file')
        file = request.files['file']
        if file and allowed_file(file.filename):
            filename = f"{setInstanceCounter()}_{secure_filename(file.filename)}"
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            processFile(filename)

            return render_template('result.html')
        else:
             return render_template('error.html'), {"Refresh": "3; url=http://localhost:5000/"}

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/', methods=['POST','GET'])
def mainApp():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(host='localhost',port=5000, debug=True)