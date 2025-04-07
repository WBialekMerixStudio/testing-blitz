import { paginate } from "blitz";
import { resolver } from "@blitzjs/rpc";
import db, { Prisma } from "db";

interface GetFamilyCalendarsInput
  extends Pick<
    Prisma.FamilyCalendarFindManyArgs,
    "where" | "orderBy" | "skip" | "take"
  > {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetFamilyCalendarsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: familyCalendars,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.familyCalendar.count({ where }),
      query: (paginateArgs) =>
        db.familyCalendar.findMany({ ...paginateArgs, where, orderBy }),
    });

    return {
      familyCalendars,
      nextPage,
      hasMore,
      count,
    };
  }
);
