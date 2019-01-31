printf " - Syncing application to API Gateway (prod)...\n"
chalice deploy --profile joostplattel --api-gateway-stage prod > /dev/null
