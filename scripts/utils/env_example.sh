#! /bin/bash
# Script to generate .env.example

# Env Vars NOT to remove values from
keepEnvVars=(
  "GOOGLE_SHEET_ADMIN_NAME"
  "GOOGLE_SHEET_GENERAL_NAME"
  "GOOGLE_SHEET_SUSPENSION_NAME"
  "GOOGLE_SHEET_PSEUDO_NAME"
  "GOOGLE_WORKBOOK_DIR"
  "GOOGLE_FORM_HIRE_UPDATE_DIR"
  "GOOGLE_FORM_SUSPEND_DIR"
  "GOOGLE_FORM_DELETE_DIR"
  "OAUTH2_SCRIPT_LIBRARY_ID"
  "GAS_DELETED_USERS_CACHE_ID"
  "GAS_DELETED_USERS_CACHE_TYPE"
  "GAS_DELETED_USERS_CACHE_SCOPE"
  "GAS_USERS_CACHE_ID"
  "GAS_USERS_CACHE_TYPE"
  "GAS_USERS_CACHE_SCOPE"
)

envVarsStr=""

for i in "${!keepEnvVars[@]}"; do
  if [ $i -eq 0 ]; then
    envVarsStr="${keepEnvVars[$i]}"
  else
    envVarsStr="${keepEnvVars[$i]}|${envVarsStr}"
  fi
done

regex="/($envVarsStr)=.*/!s/(.*\=\")(.*)(\")/\1\3/g"

# Remove the values from env vars in .env
sed -r "$regex" .env >.env.example
