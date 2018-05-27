FROM node:8.4
COPY . /webpack4
WORKDIR /webpack4
RUN npm install
Run webpack
EXPOSE 3000
CMD npm run develop