FROM node:8.6.0

RUN wget https://download.docker.com/linux/static/stable/x86_64/docker-17.09.0-ce.tgz &&\
    tar xzvf docker-17.09.0-ce.tgz &&\
    cp docker/* /usr/bin/ &&\
    rm -rf docker-17.09.0-ce.tgz

RUN curl -L https://github.com/docker/compose/releases/download/1.16.1/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose &&\
    chmod +x /usr/local/bin/docker-compose

ENV NPM_CONFIG_LOGLEVEL warn

RUN npm install --global gulp jspm

RUN mkdir /opt/app

    chmod
#COPY web /opt/app

WORKDIR /opt/app


#RUN npm install &&\
#    jspm install
