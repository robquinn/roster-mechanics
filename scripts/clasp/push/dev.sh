#! /bin/sh
# Script To Push FormApp

# set scriptId and rootDir to the "Roster Mechanics (Form Hire/Update)" script for clasp
clasp settings scriptId $GOOGLE_FORM_HIRE_UPDATE_SCRIPT_ID_DEV
clasp settings rootDir $GOOGLE_FORM_HIRE_UPDATE_DIR
clasp settings projectId $GOOGLE_PROJECT_ID

# push the script with clasp
clasp push --force

# set scriptId and rootDir to the "Roster Mechanics (Form Suspend)" script for clasp
clasp settings scriptId $GOOGLE_FORM_SUSPEND_SCRIPT_ID_DEV
clasp settings rootDir $GOOGLE_FORM_SUSPEND_DIR
clasp settings projectId $GOOGLE_PROJECT_ID

# push the script with clasp
clasp push --force

# set scriptId and rootDir to the "Roster Mechanics (Form Delete)" script for clasp
clasp settings scriptId $GOOGLE_FORM_DELETE_SCRIPT_ID_DEV
clasp settings rootDir $GOOGLE_FORM_DELETE_DIR
clasp settings projectId $GOOGLE_PROJECT_ID

# push the script with clasp
clasp push --force

# set scriptId and rootDir to the "Roster Mechanics (Sheet)" script for clasp
clasp settings scriptId $GOOGLE_WORKBOOK_SCRIPT_ID_DEV
clasp settings rootDir $GOOGLE_WORKBOOK_DIR
clasp settings projectId $GOOGLE_PROJECT_ID

# push the script with clasp
clasp push --force
