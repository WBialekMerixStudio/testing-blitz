import { resolver } from "@blitzjs/rpc";
import db from "db";
import { DeleteCalendarSchema } from "../schemas";

export default resolver.pipe(
  resolver.zod(DeleteCalendarSchema),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const calendar = await db.calendar.deleteMany({ where: { id } });

    return calendar;
  }
);
