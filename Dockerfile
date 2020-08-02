FROM node:12.18-alpine

COPY . .


RUN npm install --save
RUN npm run build

ENV NODE_ENV=production
EXPOSE 3000

CMD [ "npm", "start" ]