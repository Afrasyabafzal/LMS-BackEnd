FROM node:16.3.0-alpine
WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY package.json ./

RUN npm install 
RUN npm install express --save

COPY . ./

EXPOSE 5000

CMD ["npm", "run", "start"]

