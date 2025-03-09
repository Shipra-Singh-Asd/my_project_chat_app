# Use Node.js for building the app
FROM node:22.11.0 as build
WORKDIR /app
COPY client/package.json client/package-lock.json ./
RUN npm install
COPY . .
RUN npm run build


# Use Nginx to serve the built React app
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
