#!/bin/bash

# Testing
PATH_DIRECTORIES=(
    '/var' '/var/lib' 
    '/var/lib/docker' 
    '/var/lib/docker/volumes'
)
VOLUME_DIRECTORIES=(
    "/var/lib/docker/volumes/${PROJECT_NAME}_static_volume" 
    "/var/lib/docker/volumes/${PROJECT_NAME}_media_volume" 
    "/var/lib/docker/volumes/${PROJECT_NAME}_logs_volume" 
)

for path_directory in ${PATH_DIRECTORIES[@]}; do
    sudo chown :staticgroup $path_directory
    sudo chmod g+x $path_directory
done

for volume_directory in ${VOLUME_DIRECTORIES[@]}; do
    sudo chown -R :staticgroup $volume_directory
    sudo chmod -R g+xwr $volume_directory
done
# Testing

# Collect static files
python3 manage.py collectstatic --noinput

# Run migrations
python3 manage.py makemigrations
python3 manage.py migrate

exec "$@"