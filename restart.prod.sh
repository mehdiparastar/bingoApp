#!/bin/bash
docker-compose -f docker-compose.prod.yml down

sleep 5

docker image prune -f
docker container prune -f
docker volume prune -f
docker system prune -f

sleep 5

echo "starting app..."

docker-compose -f docker-compose.prod.yml up --build -d

sleep 5

echo "app started."