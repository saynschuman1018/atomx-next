FROM node:14-alpine as builder

EXPOSE 3000

ARG STORYBLOK_API_TOKEN

ENV NEXT_PUBLIC_STORYBLOK_API_TOKEN ${STORYBLOK_API_TOKEN}

WORKDIR /app

RUN apk add --no-cache python make g++

COPY . /app

RUN yarn && yarn build

RUN apk del python make g++

CMD ["yarn", "start"]
