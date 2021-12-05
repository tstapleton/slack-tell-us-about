#!/bin/bash

# make script exit when a command fails
set -e

# enable tracing with -x or disable it with +x (useful for debugging)
# tracing prints each line of the script as it executes
set -x

HOST=$([ "${HEROKU_APP_NAME}" ] && echo "${HEROKU_APP_NAME}.herokuapp.com" || echo "localhost:${PORT}")

echo ""
echo "Calling service at ${HOST} to post to Slack..."
curl -X POST ${HOST}/rest/post
echo "Done"
