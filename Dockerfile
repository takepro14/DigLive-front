FROM node:16.16.0-alpine

ARG WORKDIR
ARG API_URL

ENV HOME=/${WORKDIR} \
    LANG=C.UTF-8 \
    TZ=Asia/Tokyo \
    # コンテナのNuxt.jsをブラウザから参照するためにバインド
    HOST=0.0.0.0 \
    API_URL=${API_URL}

WORKDIR ${HOME}
# 追加
RUN apk update && \
    apk upgrade && \
    npm install -g n && \
    yarn install &&\
    rm -rf /var/cache/apk/*
ADD . ${HOME}
EXPOSE 3000
RUN yarn run build
CMD ["yarn", "start"]