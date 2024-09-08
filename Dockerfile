# Use an official Node.js runtime as a parent image
FROM node:20-alpine

# # Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

COPY lerna.json ./

# Copy the rest of the application code
COPY . .

# Install dependencies
RUN npm install

RUN npm run build:frontend

COPY packages/frontend/dist packages/backend/public

# Expose the backend port
EXPOSE 5000

# Define the command to run the application
CMD ["npm", "start"]
