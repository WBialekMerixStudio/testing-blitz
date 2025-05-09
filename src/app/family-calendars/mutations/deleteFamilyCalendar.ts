import { resolver } from "@blitzjs/rpc";
import db from "db";
import { DeleteFamilyCalendarSchema } from "../schemas";

export default resolver.pipe(
  resolver.zod(DeleteFamilyCalendarSchema),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const familyCalendar = await db.familyCalendar.deleteMany({
      where: { id },
    });

    return familyCalendar;
  }
);
