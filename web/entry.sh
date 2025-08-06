#!/bin/bash

set -x  # <-- this turns on shell debug logging

echo "Running as $(whoami)"
echo "Starting command: $@"

# Collect static files
python3 manage.py collectstatic --noinput

# Run migrations
python3 manage.py makemigrations
python3 manage.py migrate

exec "$@"