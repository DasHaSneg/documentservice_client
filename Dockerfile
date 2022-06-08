FROM node:14

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

EXPOSE 80 8080 3000

CMD ["yarn", "run", "start"]