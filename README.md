# Attendence Percentage Calculator - Designed Classter System.

**Can** be used with other portals too, assuming a the format in the Template provided is followed, or the settings in the UI is set accordingly.

Feel free to use this project as you will, there are potential bugs that might be present, so please let me know and I'll do my best to improve upon it

# Setting Up Project

1. Have both Python 3.12 and Node downloaded

2.  Run the following command:
      ```
      pip install -r backend\requirements.txt
      ```
3. Run the following command, within the front-end-ui folder:
   ```
   npm install
   ```
5. Run the following commands to launch both the backend and front-end.
   ```
   npm run dev
   python backend\main.py
   ```
# Snapshots

**Home Screen**
CSV can be uploaded in the template that is downloadable, or in a custom template. It is crucial that under present attendence, **Authorised** is written.
![image](https://github.com/wildalex0/ClassterAttendenceChecker/assets/129412733/8ebad1b5-6a30-4c02-ad1e-bb4ac4df2d7d)

**Result Screen**
Each unique subject is listed, with an attendence percentage listed next to it. Depending on how close the percentage is to the cutoff some text is displayed.
![image](https://github.com/wildalex0/ClassterAttendenceChecker/assets/129412733/8bbe0883-baa9-4d20-bc6f-4d54cb06e36e)

**Settings Screen**
The settings screen can configure the CSV reading settings, when it comes to the columns in which the data is read. The default is left as to make sure that everything functions as designed. The Cutoff listed translates to the Results page, in which the different text is based off. The default '70%' relates to the MCAST course cutoff.
![image](https://github.com/wildalex0/ClassterAttendenceChecker/assets/129412733/ea9fb05a-207e-4dda-bcc9-761e29cdfccc)

**CSV Template**
To relate the settings page, to the template:
**Authorised Index** : Column B - Filters by Authorised, otherwise marks as absent
**Name Index** : Column F - Subject Name, splits the name into two thus the name being after ``` | ```
**Hours Index** : Column J - Number of hours, can be interchanged with Coulmn I aswell. Important to note that if a non-number is present the program will not work

**Additional Note**: It is highly recommended to edit the CSV in an application like VSCode or Notepad++ rather than Excel, as to prevent trailing commas and removed ```" "```
![image](https://github.com/wildalex0/ClassterAttendenceChecker/assets/129412733/1460ceb2-141d-4e35-a8c6-6636ca405e1c)



