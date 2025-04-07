import { paginate } from "blitz";
import { resolver } from "@blitzjs/rpc";
import db, { Prisma } from "db";

interface GetCalendarsInput
  extends Pick<
    Prisma.CalendarFindManyArgs,
    "where" | "orderBy" | "skip" | "take"
  > {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetCalendarsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: calendars,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.calendar.count({ where }),
      query: (paginateArgs) =>
        db.calendar.findMany({ ...paginateArgs, where, orderBy }),
    });

    return {
      calendars,
      nextPage,
      hasMore,
      count,
    };
  }
);
