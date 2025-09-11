FROM node:latest AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install -g @angular/cli
COPY . .
RUN ng build
FROM nginx:latest
COPY --from=build app/dist /usr/share/nginx/html
