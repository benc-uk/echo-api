FROM node:10-alpine
WORKDIR /app
COPY index.js .
COPY swagger.json .
EXPOSE 8080
ENTRYPOINT [ "node", "index.js" ]