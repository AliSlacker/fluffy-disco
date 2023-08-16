async function routes (fastify, options) {

    fastify.get('/', async (request, reply) => {
        return { route: '/contacts' }
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

    const addSchema = {
      schema: {
        body: {
          type: 'object',
          required: ['name', 'number'],
          properties: {
            name: { type: 'string', pattern: "\\S+" }, //pattern for non empty strings
            number: { type: 'string', pattern: "^\\d+$" } //pattern for string containing only numbers
          }
        }
      }
    }

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
    fastify.put("/contacts/:id", addSchema, async (request, reply) => {
      try{
        const id = parseInt(request.params.id)
        const {name, number} = request.body
        const result = await fastify.mysql.query(
          "UPDATE contacts set name=?, number=? WHERE id = ?", 
          [name,number,id]
        );
        reply.send(result);
      }
      catch(error){
        reply.send(error);
      }
    })

    fastify.get('/contacts/:name', async (request, reply) => {
      try{
        const [rows, fields] = await fastify.mysql.query(
            'SELECT number FROM contacts where name=?', [request.params.name]
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
        reply.send(result);
      }
      catch(error){
        reply.send(error);
      }
    })
}

export default routes