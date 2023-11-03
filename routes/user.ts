import fastify, { FastifyInstance } from 'fastify'
import { string, z } from 'zod'
import crypto, { randomUUID } from 'node:crypto'
import { knex } from '../src/database'
import { checkSessionIdExists } from '../src/middlewares/check-session-id-exists'

export async function userRoutes(app: FastifyInstance) {
  app.addHook('preHandler', async (request, reply) => {
    console.log(`[${request.method}] ${request.url}`)
  })
  app.get(
    '/',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request, reply) => {
      const { sessionId } = request.cookies

      const user = await knex('users').where('session_id', sessionId).select()

      return { user }
    },
  )
  app.post('/', async (request, reply) => {
    const createUserBodySchema = z.object({
      name: string(),
    })

    const { name } = createUserBodySchema.parse(request.body)

    let sessionId = request.cookies.sessionId

    if (!sessionId) {
      sessionId = randomUUID()

      reply.cookie('sessionId', sessionId, {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      })
    }

    await knex('users').insert({
      id: crypto.randomUUID(),
      name,
      session_id: sessionId,
    })

    return reply.status(201).send()
  })
}
