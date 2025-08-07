#!/bin/bash

# Change permissions of volumes inside container
# Will be copied over to host server
# Just make sure host container has permissions through
# /var/lib/docker/volumes
VOLUMES=(
    "/app/staticfiles"
    "/app/media"
    "/app/logs"
)

for dir in "${VOLUMES[@]}"; do
    mkdir -p "$dir"
    chmod -R g+rwX "$dir"
done

touch /app/logs/django_logs.txt

# Collect static files
python3 manage.py collectstatic --noinput

# Run migrations
python3 manage.py makemigrations
python3 manage.py migrate

exec "$@"