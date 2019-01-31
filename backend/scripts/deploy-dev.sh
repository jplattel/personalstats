printf " - Syncing application to API Gateway (dev)...\n"
chalice deploy --profile joostplattel --api-gateway-stage dev > /dev/null
