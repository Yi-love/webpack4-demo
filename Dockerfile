FROM node:8.4
COPY . /webpack4
WORKDIR /webpack4
RUN npm install -g webpack webpack-cli && npm install && webpack
EXPOSE 4000
CMD ["node","server/index.js"]