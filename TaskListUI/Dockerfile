FROM node:latest AS builder

RUN mkdir -p /usr/src/app/TaskList/src

#copy sources
COPY src /usr/src/app/TaskList/src
COPY public /usr/src/app/TaskList/public
COPY package.json /usr/src/app/TaskList/
COPY babel.config.json /usr/src/app/TaskList/
COPY tsconfig.json /usr/src/app/TaskList/
COPY webpack.* /usr/src/app/TaskList/
COPY nginx /usr/src/app/TaskList/

WORKDIR /usr/src/app/TaskList
#install packages
RUN npm install
#run webpack
RUN ./node_modules/.bin/webpack --config webpack.production.js

FROM nginx AS runner

WORKDIR /usr/src/app/TaskList

RUN apt-get update
RUN apt-get install --assume-yes curl
#copy build artefacts from previous step
COPY --from=builder usr/src/app/TaskList/dist/build.js /usr/share/nginx/html
COPY --from=builder usr/src/app/TaskList/dist/index.html /usr/share/nginx/html
COPY nginx/nginx-tasklist.conf  /etc/nginx/conf.d/default.conf

EXPOSE 80

STOPSIGNAL SIGQUIT

CMD ["nginx", "-g", "daemon off;"]