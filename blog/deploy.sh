
echo "Building the blog"
hugo

echo "Deploying a new version to blog.personalstats.nl..."
aws s3 sync public s3://blog.personalstats.nl --acl public-read --delete --profile joostplattel

echo "Invalidating cloudfront cache..."
aws cloudfront create-invalidation --distribution-id E29JU26M9XN3IF --paths "/*" --profile joostplattel