# FROM node:16-alpine3.14
# RUN mkdir -p /opt/app
# WORKDIR /opt/app
# RUN adduser -S app
# COPY /. .
# RUN npm install --production
# # RUN npm install --save pm2
# RUN chown -R app /opt/app
# RUN npm prune --production
# USER app
# EXPOSE 3000
# CMD [ "npm", "run", "pm2" ]


# FROM node:16-alpine3.14 as builder
# WORKDIR /app
# COPY . .
# RUN npm install --production
# RUN npm install -g @vercel/ncc
# RUN ncc build app.ts -m -o dist --no-cache
# RUN npm prune --production

# FROM node:16-alpine3.14
# WORKDIR /app
# COPY --from=builder /app/dist/index.js .
# CMD ["node", "index.js"]


FROM node:16-alpine3.14 as builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run ncc-build
RUN rm -rf node_modules
RUN rm package.json
RUN npm install pm2 --production
COPY ./package.json .

FROM node:16-alpine3.14
RUN adduser -S app
USER app
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/processes.prod.json ./processes.json
COPY --from=builder /app/package.json .
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 8686
CMD [ "npm", "run", "pm2" ]