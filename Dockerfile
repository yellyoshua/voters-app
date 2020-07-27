FROM node:12.18-alpine

COPY . .

ENV NODE_ENV=production

RUN npm install
RUN npm run build

EXPOSE 3000

CMD [ "npm", "start" ]