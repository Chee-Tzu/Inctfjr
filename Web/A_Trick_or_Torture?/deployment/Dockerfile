FROM node:20

WORKDIR /home/app
COPY  ./src /home/app/
RUN npm install

EXPOSE 9021

CMD ["npm", "start"]