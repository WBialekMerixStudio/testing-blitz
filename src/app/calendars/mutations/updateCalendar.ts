import { resolver } from "@blitzjs/rpc";
import db from "db";
import { UpdateCalendarSchema } from "../schemas";

export default resolver.pipe(
  resolver.zod(UpdateCalendarSchema),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const calendar = await db.calendar.update({ where: { id }, data });

    return calendar;
  }
);
