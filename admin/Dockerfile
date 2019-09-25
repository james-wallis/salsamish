FROM node:8-alpine as build
WORKDIR /app
ADD package.json /app
RUN yarn install
COPY . /app
RUN yarn build

FROM node:8-alpine
WORKDIR /app
COPY --from=build /app/package.json /app/package.json
RUN yarn install
COPY --from=build /app/build /app/build
COPY --from=build /app/server /app/server
EXPOSE 3001
CMD ["yarn", "production"]