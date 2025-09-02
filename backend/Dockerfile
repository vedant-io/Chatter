# Use an official Node.js runtime as a parent image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to leverage Docker cache
COPY package*.json ./

# Install app dependencies
# Use --only=production in a real production environment
RUN npm install

# Copy the rest of the application's source code
COPY . .

# Make port 5000 available to the world outside this container
EXPOSE 5000

# Define the command to run your app
# For production, it's better to use a script that runs "node ./src/index.js"
CMD ["npm", "run", "dev"]
