# Base image
FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./


# Copy .env file
COPY .env .

# Install dependencies
RUN npm install

# Bundle app source
COPY . .

# Expose port
EXPOSE 8000

# Command to run the server
CMD ["npm", "start"]

