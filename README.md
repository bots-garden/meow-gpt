# Meow-GPT

## Run all in containers

```bash
HTTP_PORT=8888 LLM=deepseek-coder OLLAMA_BASE_URL=http://ollama-service:11434 docker compose --profile container up
# or LLM=deepseek-coder OLLAMA_BASE_URL=http://ollama-service:11434 docker compose --profile container watch
```
> The first time only, you must wait for the complete downloading of the model.

## Use the native Ollama install

> To do for the first time only:
```bash
LLM=deepseek-coder
ollama pull ${LLM}
```

```bash
HTTP_PORT=8888 LLM=deepseek-coder OLLAMA_BASE_URL=http://host.docker.internal:11434 docker compose --profile webapp up
# or LLM=deepseek-coder OLLAMA_BASE_URL=http://host.docker.internal:11434 docker compose --profile webapp watch
```

## Use a specific env file

```bash
docker compose --env-file deepseek-coder-instruct.env --profile webapp up
```

```bash
ollama pull gemma:2b-instruct
docker compose --env-file gemma-2b-instruct.env --profile webapp up
```

## Open the Web UI

http://localhost:8888

## Development

```bash
cd webapp
# yarn install
LLM=deepseek-coder
OLLAMA_BASE_URL=http://localhost:11434 
node index.mjs
```