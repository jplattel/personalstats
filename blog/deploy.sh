
echo "Deploying a new version of the blog to blog.personalstats.nl..."
aws s3 sync public s3://blog.personalstats.nl --acl public-read --delete --profile joostplattel

# echo "Invalidating cloudfront cache..."
# aws cloudfront create-invalidation --distribution-id E3JJQ3OB31KR7J --paths "/*" --profile joostplattel