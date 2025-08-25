# Build with Node
FROM node:20-alpine AS build

WORKDIR /admin-interface
COPY . .

RUN apk add --no-cache python3 make g++

RUN npm ci
ENV CI=true
ENV BROWSER=none
ENV PORT=2000

RUN npm run build

# Serve with Nginx
FROM nginx:alpine

COPY --from=build /admin-interface/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
