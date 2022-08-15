# Spin up a container only for building, it won't be pushed anywhere
FROM registry.access.redhat.com/ubi8/nodejs-16-minimal as builder

COPY ./ ./
USER root
RUN npm install && \
    npm run build && \
    npm install -g serve
EXPOSE 3544
CMD ["serve","-s","-l","3544", "build"]