FROM node:18-alpine

WORKDIR /app/api

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001

CMD ["node", "app.js"]