import Fastify from 'fastify'
//import mysql from "mysql2"
import dbConnector from './db-connector.js'
import routes from './routes.js'

const fastify = Fastify({
  logger: true
})


fastify.register(dbConnector)
fastify.register(routes)


const start = async () => {
    try {
      await fastify.listen({ port: 3000 ,host: "0.0.0.0"})
    } catch (err) {
      fastify.log.error(err)
      process.exit(1)
    }
  };

  start();