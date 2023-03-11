FROM node:16.3.0-alpine
WORKDIR /usr/src/app


COPY package.json ./

RUN npm install 
RUN npm install express --save

COPY . ./

EXPOSE 5000

CMD ["npm", "run", "start"]

