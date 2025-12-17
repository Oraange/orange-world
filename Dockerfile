FROM node:24-alpine

WORKDIR /app

COPY package*.json ./

RUN npm config set strict-ssl false
RUN npm install --verbose

COPY . .

EXPOSE 4173

CMD ["vite", "build", "--host"]
