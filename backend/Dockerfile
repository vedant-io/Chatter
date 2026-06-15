# Use an official Node.js runtime as a parent image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install production dependencies
RUN npm ci --omit=dev

# Copy the rest of the application's source code
COPY . .

# Ensure the app runs in production mode
ENV NODE_ENV=production

# Make port 5000 available
EXPOSE 5000

# Run the app
CMD ["node", "src/index.js"]
