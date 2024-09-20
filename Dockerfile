FROM node:lts

WORKDIR /app

COPY package*.json ./  yarn.lock ./

RUN yarn

COPY . .

RUN yarn build

EXPOSE ${APP_PORT}

RUN yarn prisma migrate dev && yarn prisma generate dev

CMD ["yarn", "start:prod"]
