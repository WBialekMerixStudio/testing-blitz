import { resolver } from "@blitzjs/rpc";
import db from "db";
import { UpdateFamilyCalendarSchema } from "../schemas";

export default resolver.pipe(
  resolver.zod(UpdateFamilyCalendarSchema),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const familyCalendar = await db.familyCalendar.update({
      where: { id },
      data,
    });

    return familyCalendar;
  }
);
