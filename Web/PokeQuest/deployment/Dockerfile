
FROM node:17-alpine

RUN addgroup -S appgroup && adduser -S appuser -G appgroup
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN chown -R appuser:appgroup /app
RUN chmod -R a-w /app

EXPOSE 4321
USER appuser
CMD ["npm", "start"]

