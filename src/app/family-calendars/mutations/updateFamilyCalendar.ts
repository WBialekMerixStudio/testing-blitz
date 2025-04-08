import { resolver } from "@blitzjs/rpc"
import db from "db"
import { UpdateFamilyCalendarSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(UpdateFamilyCalendarSchema),
  resolver.authorize(),
  async ({ id, ...data }, ctx) => {
    const userId = ctx.session.userId

    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const familyCalendar = await db.familyCalendar.update({
      where: { id },
      data: {
        ...data,
        superAdmin: {
          connect: {
            id: userId,
          },
        },
      },
    })

    return familyCalendar
  }
)
