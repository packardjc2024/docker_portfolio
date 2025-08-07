#!/bin/bash

# Testing
VOLUMES=(
    "/app/staticfiles"
    "/app/media"
    "/app/logs"
)

for dir in "${VOLUMES[@]}"; do
    mkdir -p "$dir"
    chmod -R g+rwX "$dir"
done

# LOG_FILE="/app/logs/django_logs.txt"
# touch "$LOG_FILE"
# chown root:staticgroup "$LOG_FILE"
# chmod g+rw "$LOG_FILE"
# Testing

# Collect static files
python3 manage.py collectstatic --noinput

# Run migrations
python3 manage.py makemigrations
python3 manage.py migrate

exec "$@"