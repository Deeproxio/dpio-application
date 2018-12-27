FROM node:10-alpine as build

COPY package.json package-lock.json ./

RUN npm ci && mkdir /app && mv ./node_modules ./app

WORKDIR /app

COPY . .

RUN npm run build:all

FROM node:10-alpine as environment

COPY package.json package-lock.json ./

RUN npm install --only=production && mkdir /app && mv ./node_modules ./app

COPY --from=build /app/dist /app/dist

WORKDIR /app

ENTRYPOINT node ./dist/server.js