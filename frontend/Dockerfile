FROM node:carbon-jessie

# Create app directory
RUN mkdir -p /code
COPY package.json /code

WORKDIR /code

# Install app dependencies
COPY . /code

RUN yarn install

CMD [ "yarn", "serve" ]
