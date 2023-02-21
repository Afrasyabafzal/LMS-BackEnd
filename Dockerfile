FROM node:lts-alpine
WORKDIR /app

# ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./

RUN npm install 
RUN npm install express --save

COPY . ./

EXPOSE 3000

CMD ["npm", "run", "start"]

