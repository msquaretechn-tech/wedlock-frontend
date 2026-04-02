# Use a Node.js image that meets the required version
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build production
RUN npm run build

# Set the timezone to India Standard Time (IST)
ENV TZ=Asia/Kolkata

# Install tzdata to handle timezone configuration (using apk for Alpine)
RUN apk add --no-cache curl tzdata && \
    cp /usr/share/zoneinfo/${TZ} /etc/localtime && \
    echo ${TZ} > /etc/timezone

# Expose the application port
EXPOSE 5173

# Command to run the application
CMD ["npx", "serve", "-s", "dist", "-l", "5173"]