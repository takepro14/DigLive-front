FROM node:16.16.0-alpine

ARG WORKDIR
ARG APP_NAME
ARG API_URL
ARG IMAGE_URL

ENV APP_NAME      $APP_NAME
ENV API_URL       $API_URL
ENV IMAGE_URL     $IMAGE_URL
ENV LANG          C.UTF-8
ENV TZ            Asia/Tokyo
ENV HOST          0.0.0.0

WORKDIR ${WORKDIR}

COPY package*.json ./

RUN apk update && \
    apk upgrade && \
    npm install -g n && \
    yarn install &&\
    rm -rf /var/cache/apk/*

COPY . ./

EXPOSE ${CONTAINER_PORT}