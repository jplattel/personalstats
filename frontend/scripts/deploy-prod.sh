echo "Building for development..."
vue-cli-service build --mode production
echo "Deploying to personalstats.nl..."
aws s3 sync dist s3://personalstats.nl --acl public-read --delete --profile joostplattel
