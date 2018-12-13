# Personalstats

A simple tool that lets you query your workflowy database and gather statistics about your entries... 

## Development

Development is done mixed with both stages on AWS Lambda, or trough a local docker-compose configuration. It is however hard to run things that require Cognito (as you will need a user)

However, the free tier for Amazon allows for more than enough room to deploy your version of the app! That's made easy by the deploy script. The only part that needs some configuration are the cognito user & identity pools. 

You will also need to configure environment variables in both the frontend and backend. (both directories have their own `.env.example`)

## Contributing

Feel free to contribute! It's still much work in progress at this moment
