import fastify, { FastifyInstance } from 'fastify'
import { boolean, string, z } from 'zod'
import crypto, { randomUUID } from 'node:crypto'
import { knex } from '../src/database'
import { checkSessionIdExists } from '../src/middlewares/check-session-id-exists'
import { json } from 'stream/consumers'

export async function mealsRoutes(app: FastifyInstance) {
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

      const meals = await knex('meals').where('session_id', sessionId).select()

      return { meals }
    },
  )

  app.get(
    '/:id',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request, reply) => {
      const { sessionId } = request.cookies

      const { id } = request.params

      const meals = await knex('meals')
        .where('session_id', sessionId)
        .where('id', '=', id)
        .select()

      return { meals }
    },
  )

  app.get(
    '/metrics',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request, reply) => {
      const { sessionId } = request.cookies

      const metrics = await knex('meals')
        .select(
          knex.raw('count(*) as totalMeals'),
          knex.raw('count(*) filter (where in_dient = true) as totalInTheDiet'),
          knex.raw('count(*) filter (where in_dient = false) as totalOffDiet'),
        )
        .where({ session_id: sessionId })

      return { metrics }
    },
  )

  app.post('/', async (request, reply) => {
    const createMealsBodySchema = z.object({
      name: string(),
      description: string(),
      in_dient: boolean(),
    })

    const { name, description, in_dient } = createMealsBodySchema.parse(
      request.body,
    )

    let sessionId = request.cookies.sessionId

    if (!sessionId) {
      sessionId = randomUUID()

      reply.cookie('sessionId', sessionId, {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      })
    }

    await knex('meals').insert({
      id: crypto.randomUUID(),
      name,
      description,
      in_dient,
      session_id: sessionId,
    })

    return reply.status(201).send()
  })

  app.put('/:id', async (request, reply) => {
    const updateMealsBodySchema = z.object({
      name: string(),
      description: string(),
      inDient: boolean(),
    })

    const { id } = request.params

    const { sessionId } = request.cookies

    const { name, description, inDient } = updateMealsBodySchema.parse(
      request.body,
    )

    await knex('meals')
      .update({ name })
      .update({ description })
      .update({ in_dient: inDient })
      .where('session_id', '=', sessionId)
      .where('id', '=', id)

    return reply.status(204).send()
  })

  app.delete('/:id', async (request, reply) => {
    const { id } = request.params
    const { sessionId } = request.cookies

    await knex('meals').where('id', id).del()

    return reply.status(204).send()
  })
}
