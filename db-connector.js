import fastifyPlugin from 'fastify-plugin'
import fastifyMysql from '@fastify/mysql'

async function dbConnector (fastify, options) {
    fastify.register(fastifyMysql, {
        promise: true,
        connectionString: 'mysql://root:root@db/phonebook',
      })
}

export default fastifyPlugin(dbConnector)