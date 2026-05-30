#!/bin/bash
set -e
echo "=== Deploying staging ==="
git fetch saas
git checkout develop
git pull saas develop
docker-compose -f docker-compose.staging.yml down
docker-compose -f docker-compose.staging.yml up -d --build
echo "=== Staging deployed ==="
echo "Visit: https://staging.trypronto.app"
