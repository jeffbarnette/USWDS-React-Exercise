# Create the app directory, install dependencies, and copy in the source code
FROM node:14.15.4-alpine3.12 AS local

RUN mkdir /home/node/app/ && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY --chown=node:node package.json yarn.lock ./
USER node
RUN yarn install && yarn cache clean
COPY --chown=node:node . .

# Create production build
FROM local AS build
ENV SASS_PATH=node_modules
RUN yarn build

# Serve over the latest nginx
FROM nginx:1.19.6-alpine

# Copy the build folder to the root path of nginx
COPY --from=build /home/node/app/build /usr/share/nginx/html

# In order to use react router, replace the default nginx config file
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]