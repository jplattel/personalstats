echo "Building frontend for production..."
npm run build-prod > /dev/null

echo "Deploying to personalstats.nl..."
aws s3 sync dist s3://personalstats.nl --acl public-read --delete --profile joostplattel

echo "Invalidating cloudfront cache..."
aws cloudfront create-invalidation --distribution-id E3JJQ3OB31KR7J --paths "/*" --profile joostplattel