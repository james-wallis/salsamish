FROM node:12-alpine as build
WORKDIR /app
ADD package.json /app
RUN yarn install
COPY . /app
# Remove symlinked directory and re-create it
RUN rm -r  /app/public/images/employees && mkdir /app/public/images/employees && yarn build

FROM node:12-alpine
WORKDIR /app
COPY --from=build /app/package.json /app/yarn.lock /app/
RUN yarn install
COPY --from=build /app/.next/ /app/.next
COPY --from=build /app/public /app/public
EXPOSE 4000
CMD ["yarn", "start"]
