FROM node:8
RUN apt-get update
# RUN apt-get install -y automake autoconf libtool dpkg nasm libpng-dev
WORKDIR /
RUN mkdir /app
WORKDIR /app
ADD package.json /app
RUN yarn install
COPY . /app
RUN yarn build
EXPOSE 3001
CMD ["yarn", "production"]