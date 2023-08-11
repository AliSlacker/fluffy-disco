import Fastify from 'fastify'
import fastifyMysql from '@fastify/mysql'

const fastify = Fastify({
  logger: true
})

fastify.register(fastifyMysql, {
  promise: true,
  host: '127.0.0.1',
  user: 'root',
  database: 'phonebook'
})

fastify.post("/add-contact", async (request, reply) => {
  const { name, number } = request.body;
  const connection = await fastify.mysql.getConnection()
  const result = connection.query(
    "INSERT INTO contacts (name, number) VALUES (?, ?)",
    [name, number],
  );
  connection.release();
  reply.send(result);

});

fastify.get('/', async (request, reply) => {
  const connection = await fastify.mysql.getConnection()
  const [rows, fields] = await connection.query(
    'SELECT * FROM contacts',
  )
  connection.release()
  reply.send(rows[1])
})


const start = async () => {
    try {
      await fastify.listen({ port: 3000 ,host: "0.0.0.0"})
    } catch (err) {
      fastify.log.error(err)
      process.exit(1)
    }
  };

  start();