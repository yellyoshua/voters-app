FROM node:12.18-alpine

COPY . .

RUN npm install
RUN npm run build

EXPOSE 3000

CMD [ "npm", "start" ]