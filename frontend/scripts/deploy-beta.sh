

printf " - Building frontend for beta...\n"
npm run build-beta > /dev/null

printf " - Syncing with S3 on beta.personalstats.nl\n"
aws s3 sync dist s3://beta.personalstats.nl --acl public-read --delete --profile joostplattel > /dev/null

echo "Invalidating cloudfront cache..."
aws cloudfront create-invalidation --distribution-id E2HOGIW2B8Q0OR --paths "/*" --profile joostplattel