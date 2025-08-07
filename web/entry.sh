#!/bin/bash

# Testing
VOLUMES=(
    "/app/staticfiles"
    "/app/media"
    "/app/logs"
)

for dir in "${VOLUMES[@]}"; do
    mkdir -p "$dir"
    chown -R root:www-data "$dir"
    chmod -R g+rwX "$dir"
done
# Testing

# Collect static files
python3 manage.py collectstatic --noinput

# Run migrations
python3 manage.py makemigrations
python3 manage.py migrate

exec "$@"