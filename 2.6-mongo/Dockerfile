FROM node:alpine
WORKDIR /code

COPY package*.json ./
RUN npm install
COPY *.js ./
COPY middleware/ ./middleware/
COPY models/ ./models/
COPY routes/ ./routes/
COPY views/ ./views/

CMD ["npm", "run", "start"]