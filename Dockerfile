FROM node:9.2.0-alpine

EXPOSE 7852

WORKDIR /home/node/app

COPY index.js /home/node/app/
COPY package.json /home/node/app/
COPY package-lock.json /home/node/app/
COPY src /home/node/app/src

RUN npm install

CMD node index.js
