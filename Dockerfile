FROM node:16 as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM nginx:alpine
COPY --from=node /app/dist/dashboard-db /usr/share/nginx/html
