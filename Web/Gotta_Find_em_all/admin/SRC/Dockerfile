FROM node:20

COPY  ./src /home/app/

WORKDIR /home/app/src

RUN npm install

EXPOSE 1410

CMD ["npm", "start"]