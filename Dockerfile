FROM node:18.17.0-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . /app/

ENV PORT=3000

EXPOSE 3000

CMD ["node", "server.js"]