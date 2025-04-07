import { NotFoundError } from "blitz";
import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

const GetFamilyCalendar = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
});

export default resolver.pipe(
  resolver.zod(GetFamilyCalendar),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const familyCalendar = await db.familyCalendar.findFirst({ where: { id } });

    if (!familyCalendar) throw new NotFoundError();

    return familyCalendar;
  }
);
