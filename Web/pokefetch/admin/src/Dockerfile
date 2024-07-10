# Use the official Node.js 16 image as base
FROM node:16-buster-slim

# Set the working directory to /app
WORKDIR /app

# Copy package.json to the working directory
COPY package.json /app

# Install dependencies
RUN npm install

# Copy the application code to the working directory
COPY . /app

# Expose port 1337 for the application
EXPOSE 1337

# Define the command to run the application
CMD ["npm", "start"]