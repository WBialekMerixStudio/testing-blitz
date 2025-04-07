import { resolver } from "@blitzjs/rpc";
import db from "db";
import { CreateCalendarSchema } from "../schemas";

export default resolver.pipe(
  resolver.zod(CreateCalendarSchema),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const calendar = await db.calendar.create({ data: input });

    return calendar;
  }
);
