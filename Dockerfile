FROM ubuntu:18.04

ENV NODE_VERSION 12.20.0
LABEL author="Tuhina Chatterjee"

RUN apt-get update
RUN apt-get install npm -y
WORKDIR /morff-frontend

ADD . /morff-frontend

RUN cd /morff-frontend && npm install && npm run build

ENV NODE_ENV production

EXPOSE 3000

ENTRYPOINT ["node","server"]
