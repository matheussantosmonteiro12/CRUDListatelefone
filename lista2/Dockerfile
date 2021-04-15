FROM node:alpine

WORKDIR /lista2/app

COPY package*.json ./

RUN npm install -g npm@7.9.0

COPY . . 

EXPOSE 3000

CMD npm start
