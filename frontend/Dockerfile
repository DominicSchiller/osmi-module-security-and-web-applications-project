FROM node:16.15-alpine3.14 as builder
WORKDIR /app
COPY package*.json /app/
RUN npm install -g ionic
# RUN apk --no-cache add --virtual native-deps \
#   g++ gcc libgcc libstdc++ linux-headers make python3 && \
#   npm install --quiet node-gyp -g &&\
#   npm install --quiet && \
#   apk del native-deps
RUN apk add g++ make python3
RUN npm install
COPY ./ /app/
RUN ionic build --prod

# deploy
FROM nginx:1.21-alpine
EXPOSE 80
#COPY ./conf/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/www/ /usr/share/nginx/html