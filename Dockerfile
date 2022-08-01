FROM node:16.16.0-alpine

ARG WORKDIR
ARG API_URL

ENV HOME=/${WORKDIR} \
    LANG=C.UTF-8 \
    TZ=Asia/Tokyo \
	# コンテナのNuxt.jsをブラウザから参照するためにバインド
    HOST=0.0.0.0 \
    API_URL=${API_URL}

RUN echo ${CONTAINER_PORT}

WORKDIR ${HOME}