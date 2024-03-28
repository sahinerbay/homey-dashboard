# In the first stage, it will use node:18 as base 
# then install the dependencies and dev dependencies 
# and copy the application.
FROM node:18 AS builder
WORKDIR /app
COPY ./package*.json ./
RUN npm ci --noproxy registry.npmjs.org --maxsockets=1
COPY ./ ./
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
# install only the required dependencies
RUN npm install --only=production
COPY --from=builder ./app/build ./
CMD ["node", "--experimental-specifier-resolution", "node", "index.js"]
