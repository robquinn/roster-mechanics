#! /bin/bash

# Script to reset .clasp.json

# Remove the values from env vars in .env
perl -i -pe 's/(\s*\"[a-zA-Z0-9]+\"\s*:\s*\")([a-zA-Z0-9\-\_\/]*)(\",?)/\1THIS_VALUE_GETS_INJECTED_FROM_ENV_FILE\3/g' .clasp.json
