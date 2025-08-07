#!/bin/bash

# Testing
chown -R root:www-data /app/statifiles
chown -R o+rx /appa/staticfiles
# Testing

# Collect static files
python3 manage.py collectstatic --noinput

# Run migrations
python3 manage.py makemigrations
python3 manage.py migrate

exec "$@"