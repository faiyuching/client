# Dockerfile for React client

FROM node:12.19.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN CI=true

RUN npm install --silent

COPY . .

EXPOSE 3000

CMD ["npm","start"]