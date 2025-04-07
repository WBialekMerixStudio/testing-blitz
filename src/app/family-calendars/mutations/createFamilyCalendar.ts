import { resolver } from "@blitzjs/rpc";
import db from "db";
import { CreateFamilyCalendarSchema } from "../schemas";

export default resolver.pipe(
  resolver.zod(CreateFamilyCalendarSchema),
  resolver.authorize(),
  async (input, ctx) => {
    // Get the current user from session context
    const userId = ctx.session.userId;
    
    if (!userId) throw new Error("You must be logged in to create a family calendar");
    
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const familyCalendar = await db.familyCalendar.create({ 
      data: {
        ...input,
        superAdmin: {
          connect: {
            id: userId
          }
        }
      } 
    });

    return familyCalendar;
  }
);
