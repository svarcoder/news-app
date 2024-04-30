# Use official Node.js image as base
FROM node:14-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN yarn

# Copy the rest of the application
COPY . .

# Build the React app
RUN yarn build

# Expose port 3000 (default for React development server)
EXPOSE 3000

# Command to run the React app
CMD ["npm", "start"]
