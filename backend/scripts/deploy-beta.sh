printf " - Syncing application to API Gateway (beta)...\n"
chalice deploy --profile joostplattel --api-gateway-stage beta > /dev/null
