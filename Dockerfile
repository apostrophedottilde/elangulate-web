# build stage
FROM node:9.11.1-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html/dist
COPY --from=build-stage /app/public/index.html /usr/share/nginx/html
COPY --from=build-stage /app/src/assets /usr/share/nginx/html/src/assets
COPY --from=build-stage /app/certs /certs
COPY --from=build-stage /app/nginx.config /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]