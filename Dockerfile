FROM node:8.16-alpine

COPY . /data/publish/webpack4

WORKDIR /data/publish/webpack4

RUN npm ci node-sass --sass_binary_site=https://npm.taobao.org/mirrors/node-sass/ \
    && node_modules/.bin/webpack --config=webpack.prod.config.js \
    && rm -rf client \
    && rm -rf node_modules \
    && npm install --production

EXPOSE 4000

CMD ["npm" , "run" , "prod"]