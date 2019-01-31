#!/bin/bash

# Deploy frontend
printf "Deploying \033[34mfrontend\033[0m...\n"
cd frontend
sh scripts/deploy-$1.sh

# Move back to project root
cd ..

# Deploy backend
printf "Deploying \033[34mbackend\033[0m...\n"
cd backend
sh scripts/deploy-$1.sh