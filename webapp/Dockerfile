FROM node:21-bookworm as builder
ARG OLLAMA_BASE_URL
ENV OLLAMA_BASE_URL=${OLLAMA_BASE_URL}
ARG LLM
ENV LLM=${LLM}
WORKDIR /app
COPY package.json .
RUN yarn install

FROM node:21-alpine
COPY --from=builder /app/node_modules /app/node_modules
WORKDIR /app
COPY . .

CMD ["yarn", "start"]



