FROM node:lts-alpine
WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY package.json ./

RUN npm install 
RUN npm install express --save

COPY . ./

EXPOSE 4000

CMD ["npm", "run", "start"]

