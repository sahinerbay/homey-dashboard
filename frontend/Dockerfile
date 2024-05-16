FROM node:18 AS builder

ARG REACT_APP_HSL_KEY
ARG REACT_APP_HSL_STOP_ID_FIRST
ARG REACT_APP_HSL_STOP_ID_SECOND
ARG REACT_APP_HSL_TRAIN_STOP_ID
ARG REACT_APP_LOCAL_API_URL
ARG REACT_APP_LOCAL_API_PORT
ARG PORT
ARG ENV

WORKDIR /app
COPY package*.json ./
RUN npm config set registry http://registry.npmjs.org/
RUN npm ci --noproxy registry.npmjs.org --maxsockets=1
COPY ./ ./

RUN sh create-env-file.sh REACT_APP_LOCAL_API_URL=$REACT_APP_LOCAL_API_URL \
  REACT_APP_LOCAL_API_PORT=$REACT_APP_LOCAL_API_PORT \
  REACT_APP_HSL_KEY=$REACT_APP_HSL_KEY \
  REACT_APP_HSL_STOP_ID_FIRST=$REACT_APP_HSL_STOP_ID_FIRST \
  REACT_APP_HSL_STOP_ID_SECOND=$REACT_APP_HSL_STOP_ID_SECOND \
  REACT_APP_HSL_TRAIN_STOP_ID=$REACT_APP_HSL_TRAIN_STOP_ID \
  PORT=$PORT \
  TZ=$TZ
RUN npm run build

FROM nginx:1.24-alpine
WORKDIR /app
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]
