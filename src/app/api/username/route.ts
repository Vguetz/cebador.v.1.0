import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { UsernameValidator } from '@/lib/validators/username'
import { z } from 'zod'

export async function PATCH(req: Request) {
  try {
    const session = await getAuthSession()

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 })
    }

    const body = await req.json()
    const { name } = UsernameValidator.parse(body)

    // check if username is taken
    const username = await db.user.findFirst({
      where: {
        username: name,
      },
    })

    if (username) {
      return new Response('Ese nombre esta usado, no seas rancio elegí otro.', { status: 409 })
    }

    // update username
    await db.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        username: name,
      },
    })

    return new Response('OK')
  } catch (error) {
    (error)

    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 })
    }

    return new Response(
      'No te pudimos cambiar el nombre, a llorar al cuartito e intentá más tarde.',
      { status: 500 }
    )
  }
}
