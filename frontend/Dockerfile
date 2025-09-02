# Use an official Node.js runtime as a parent image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to leverage Docker cache
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application's source code
COPY . .

# Make port 5173 available to the world outside this container
EXPOSE 5173

# Define the command to run your app
CMD ["npm", "run", "dev", "--", "--host"]

