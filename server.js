import Fastify from 'fastify'
//import mysql from "mysql2"
import dbConnector from './db-connector.js'
import routes from './routes.js'
import fStatic from '@fastify/static'
import path from 'path'
import {fileURLToPath}  from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const fastify = Fastify({
  logger: true
})


fastify.register(dbConnector)
fastify.register(routes)

fastify.register(fStatic,{root: path.join(__dirname, 'public')})


const start = async () => {
    try {
      await fastify.listen({ port: 3000 ,host: "0.0.0.0"})
    } catch (err) {
      fastify.log.error(err)
      process.exit(1)
    }
  };

  start();