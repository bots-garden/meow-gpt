import Fastify from 'fastify'
import path from 'path'
import fastifyStatic from '@fastify/static'

import { ChatOllama } from "@langchain/community/chat_models/ollama"
import { StringOutputParser } from "@langchain/core/output_parsers"

import { RunnableWithMessageHistory } from "@langchain/core/runnables"

import { ConversationSummaryMemory } from "langchain/memory"

import { 
  SystemMessagePromptTemplate, 
  HumanMessagePromptTemplate, 
  MessagesPlaceholder, // 👋
  ChatPromptTemplate 
} from "@langchain/core/prompts"

let ollama_base_url = process.env.OLLAMA_BASE_URL
let llm_name = process.env.LLM

const model = new ChatOllama({
  baseUrl: ollama_base_url,
  model: llm_name, 
  temperature: 0,
  repeatPenalty: 1,
  verbose: true,
})

const memory = new ConversationSummaryMemory({
  memoryKey: "history",
  llm: model,
})

var controller = new AbortController()



const fastify = Fastify({
  logger: true
})

// Serve public/index.html
fastify.register(fastifyStatic, {
  root: path.join(import.meta.dirname, 'public'),
})

const { ADDRESS = '0.0.0.0', PORT = '8080' } = process.env;

fastify.delete('/clear-history', async (request, reply) => {
  console.log("👋 clear conversation summary")
  memory.clear()
  return "👋 conversation summary is empty"
})

fastify.get('/message-history', async (request, reply) => {
  return memory.chatHistory.getMessages()
})

fastify.delete('/cancel-request', async (request, reply) => {
  console.log("👋 cancel request")
  controller.abort()
  // recreate the abort controller
  var controller = new AbortController()
  return "👋 request aborted"
})

fastify.post('/prompt', async (request, reply) => {
  const system = request.body["system"]
  const question = request.body["question"]


  const prompt = ChatPromptTemplate.fromMessages([
    SystemMessagePromptTemplate.fromTemplate(`{system}`),
    new MessagesPlaceholder("history"),
    HumanMessagePromptTemplate.fromTemplate(
      `{question}`
    )
  ])


  const outputParser = new StringOutputParser()

  model.bind({ signal: controller.signal })

  const chain = prompt.pipe(model).pipe(outputParser)
  
  const chainWithHistory = new RunnableWithMessageHistory({
    runnable: chain,
    memory: memory,
    getMessageHistory: (_sessionId) => memory.chatHistory,
    inputMessagesKey: "question",
    historyMessagesKey: "history",
  })

  const config = { configurable: { sessionId: "1" } }

  let stream = await chainWithHistory.stream({
    system: system,
    question: question,
  }, config)
  
  reply.header('Content-Type', 'application/octet-stream')
  return reply.send(stream)
  
})

const start = async () => {
  try {
    await fastify.listen({ host: ADDRESS, port: parseInt(PORT, 10)  })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${ADDRESS}:${PORT}`)

}
start()

