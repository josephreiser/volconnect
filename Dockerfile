FROM nginx:stable-alpine

COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 80

