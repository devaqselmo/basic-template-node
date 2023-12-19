FROM node:20.10.0-alpine

WORKDIR /source

COPY package.json .

RUN pnpm install

COPY . .

CMD ["pnpm", "start:dev"]