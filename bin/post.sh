#!/bin/bash

# make script exit when a command fails
set -e

# enable tracing with -x or disable it with +x (useful for debugging)
# tracing prints each line of the script as it executes
set -x

HEROKU_HOST="guarded-eyrie-86246.herokuapp.com"
LOCALHOST="localhost:${PORT}"
HOST=${HEROKU_HOST:=${LOCALHOST}}

echo ""
echo "Calling service at ${HOST} to post to Slack..."
curl -X POST ${HOST}/post
echo "Done"
