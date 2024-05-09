from flask import Flask, render_template, request, redirect, url_for, flash
from werkzeug.utils import secure_filename
import os
UPLOAD_FOLDER = 'TestUpload'
ALLOWED_EXTENSIONS = {'csv'}
app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
subjectList = []
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
        self.attendedLectureHours+=hours    
        self.totalHours += hours
    def calcMissedPercentage(self):
        percentage = (self.attendedLectureHours / self.totalHours) * 100
        return percentage
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
        return (f"{self.subjectName} - {self.calcMissedPercentage()}")
def processFile(file):
    counter = -1
    path = f"TestUpload/{file}"
    file = open(path, 'r').readlines()
    for x in file:
        instanceData = {
            "Present" : False,
            "SubName" : "",
            "SubId" : "",
            "HourAmmount" : 0,
        }
        x.replace('"','')
        mainList = x.split(',')
        count = 0
        for entity in mainList:
            count+=1
            if count == 2:
                if entity == "Authorised":
                    instanceData['Present'] = True
            if count == 5:
                fullName = entity
                nameList = fullName.strip().split('|')
                if len(subjectList) == 0:
                    sub = Subject(fullName[1],fullName[0])
                    subjectList.append(sub)
                    instanceData['SubFound'] = fullName[1]
                    instanceData['SubId'] = fullName[0]
                else:
                    for name in subjectList:
                        res = name.compareName(fullName[1])
                        if res == False:
                            sub = Subject(fullName[1],fullName[0])
                            subjectList.append(sub)
                            instanceData['SubName'] = fullName[1]
                            instanceData['SubId'] = fullName[0]

                if count == 9:
                    instanceData['HourAmmount'] = int(entity)
                    for subject in subjectList:
                        if subject.compareName(instanceData['SubName']) == True and subject.compareId(instanceData['SubId']) == True:
                            if instanceData['Present'] == True:
                                subject.addAttended(instanceData['HourAmmount'])
                            else:
                                subject.addMissed(instanceData['HourAmmount'])
        for subject in subjectList:
            print(f"{subject.returnReport()}")

def processRow(row):
    counter = 0
    for x in row:
        z = x.replace('"', '')
        counter += 1
        print(f"{counter} - {z}")
def setInstanceCounter():
    f = open('instanceCounter.txt','r')
    fileCont = int(f.read())
    f.close()
    print(f"{fileCont} - {type(fileCont)}")
    fileCont+=1 
    fileCont = str(fileCont)
    open('instanceCounter.txt','w').write(fileCont)
    return fileCont
@app.route('/fileHandle', methods=['GET','POST'])
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
            return ('Yo')
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