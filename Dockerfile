FROM node:20-alpine AS build

WORKDIR usr/src/app

COPY package*.json ./

RUN npm install
#RUN npm install electron --save-dev
#RUN npm install -D tailwindcss postcss autoprefixer
#npm install tailwind-scrollbar-hide

COPY . .

RUN npm run build

EXPOSE 4200

CMD ["npm", "start"]


