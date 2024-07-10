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

# Move the flag to root
RUN mv flag.png /

# Expose port 1337 for the application
EXPOSE 1337

# Create a non-root user for running the application
RUN addgroup --system appgroup && adduser --system --ingroup appgroup appuser

# Change ownership of the /app directory to the non-root user
RUN chown -R appuser:appgroup /app

# Set flag.png as read-only and change its ownership to non-root user
RUN chown appuser:appgroup /flag.png && chmod 400 /flag.png

# Set the permissions for directories
RUN chmod -R 555 /app
RUN chmod -R 755 /app/public/assets

# Switch to the non-root user to run the application
USER appuser

# Define the command to run the application
CMD ["npm", "start"]
