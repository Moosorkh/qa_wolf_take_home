# Base image with Playwright
FROM mcr.microsoft.com/playwright:v1.39.0-focal

# Set working directory
WORKDIR /app

# Set environment variables
ENV NODE_ENV=test
ENV DOCKER=true
ENV PLAYWRIGHT_BROWSERS_PATH=/ms-playwright

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci --production && \
    npm cache clean --force

# Copy project files
COPY . .

# Create directories for test artifacts
RUN mkdir -p reports screenshots videos

# Default command to run tests
CMD ["npm", "start"]