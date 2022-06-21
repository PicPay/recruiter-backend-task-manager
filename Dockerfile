FROM node:14-alpine

WORKDIR /opt/app

RUN apk add -q python3 gcc g++ make

COPY ./ /opt/app

RUN npm i -g pnpm

RUN pnpm i

ENV NODE_ENV production

RUN pnpm build

EXPOSE 8080
CMD [ "pnpm", "start"]
