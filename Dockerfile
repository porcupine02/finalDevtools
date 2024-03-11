FROM node:18-alpine
FROM jenkins/jenkins  
USER jenkins  
RUN curl -L \  
  "https://github.com/docker/compose/releases/download/1.25.3/docker-compose-$(uname -s)-$(uname -m)" \  
  -o /usr/local/bin/docker-compose \  
  && chmod +x /usr/local/bin/docker-compose  
RUN apk add --no-cache docker-compose

WORKDIR /finaldevtools

EXPOSE 8081

COPY package.json package-lock.json ./

RUN npm install --silent

COPY . ./

CMD ["npm", "run", "dev"]