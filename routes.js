import {addSchema, putSchema} from './Schema.js'

async function routes (fastify, options) {

    fastify.get('/', async (request, reply) => {
        return { route: '127.0.0.1:3000/client' }
    })

    fastify.get('/contacts', async (request, reply) => {
        try{
            const [rows, fields] = await fastify.mysql.query(
              'SELECT * FROM contacts',
            )
              reply.send(rows)
          }
          catch(error){
            reply.send(error)
          }
    })

    fastify.post("/contacts", addSchema, async (request, reply) => {
        try{
          const {name, number} = request.body;
          const result = await fastify.mysql.query(
            "INSERT INTO contacts (name, number) VALUES (?, ?)",
            [name, number],
          );
          reply.send(result);
        }
        catch(error){
          reply.send(error);
        }
    });

    // name is not unique had to use id to update a record
    fastify.put("/contacts/:id", putSchema, async (request, reply) => {
      try{
        const id = parseInt(request.params.id)
        const {name, number} = request.body;
        let result;
        if (name == ""){
          console.log(`name: ${name}, number: ${number}`);
          result = await fastify.mysql.query(
            "UPDATE contacts set number=? WHERE id = ?", 
            [number,id]
          );
        }
        else if (number == ""){
          result = await fastify.mysql.query(
            "UPDATE contacts set name=? WHERE id = ?", 
            [name,id]
          );
        }
        else {
          result = await fastify.mysql.query(
            "UPDATE contacts set name=?, number=? WHERE id = ?", 
            [name,number,id]
          );
        }
        if(result[0].affectedRows == 0){
          let err = new Error("id not found");
          err.statusCode = 404;
          throw err;
        }
        reply.send(result);
      }
      catch(error){
        reply.send(error);
      }
    })

    fastify.get('/contacts/:name', async (request, reply) => {
      try{
        const [rows, fields] = await fastify.mysql.query(
            'SELECT name, number FROM contacts where name like ?', [`%${request.params.name}%`]
          )
            reply.send(rows)
        }
        catch(error){
          reply.send(error)
        }
    })
    
    fastify.delete("/contacts/:id", async (request, reply) => {
      try{
        const id = parseInt(request.params.id)
        const result = await fastify.mysql.query(
          "DELETE FROM contacts WHERE id = ?", id
        );
        if(result[0].affectedRows == 0){
          let err = new Error("id not found");
          err.statusCode = 404;
          throw err;
        }
        reply.send(result);
      }
      catch(error){
        reply.send(error);
      }
    })

  fastify.get("/client", async (request, reply) => {
    return reply.sendFile('test.html');
  })

  fastify.get("/client/add", async (request, reply) => {
    return reply.sendFile('test.html');
  })

  fastify.get("/client/edit/:id", async (request, reply) => {
    return reply.sendFile('test.html');
  })
}

export default routes