# Spin up a container only for building, it won't be pushed anywhere
FROM registry.access.redhat.com/ubi8/nodejs-16-minimal as builder

COPY ./ ./
RUN npm run build && \
    npm install -g serve
EXPOSE 3000
CMD ["serve","-s", "build"]