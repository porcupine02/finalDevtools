FROM node:18-alpine

RUN apk add --no-cache docker-compose

WORKDIR /finaldevtools

EXPOSE 8081

COPY package.json package-lock.json ./

RUN npm install --silent

COPY . ./

CMD ["npm", "run", "dev"]