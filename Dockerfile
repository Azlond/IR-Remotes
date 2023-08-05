FROM node:20 as build-env
WORKDIR /app
COPY *.* ./
COPY src/ ./src
COPY public/ ./public
RUN npm ci

RUN npx vite build

RUN apt install gcc -y
# RUN cd src/backend/executable/ && gcc -o fan fanRemote.c -lm -lpigpio -pthread -lrt
RUN touch src/backend/executable/fan

FROM node:20
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY src/backend ./src/backend
COPY src/data ./src/data
COPY --from=build-env /app/dist ./dist/
COPY --from=build-env /app/src/backend/executable/fan ./dist/
RUN npm ci

EXPOSE 8002

CMD ["node", "./src/backend/server.js"]