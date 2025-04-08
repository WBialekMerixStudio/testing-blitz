"use client";

import { useMutation, useQuery } from "@blitzjs/rpc";
import Link from "next/link";
import { useRouter } from "next/navigation";
import deleteCalendar from "../mutations/deleteCalendar";
import getCalendar from "../queries/getCalendar";

export const Calendar = ({ calendarId }: { calendarId: number }) => {
  const router = useRouter();
  const [deleteCalendarMutation] = useMutation(deleteCalendar);
  const [calendar] = useQuery(getCalendar, { id: calendarId });

  return (
    <>
      <div>
        <h1>Project {calendar.id}</h1>
        <pre>{JSON.stringify(calendar, null, 2)}</pre>

        <Link href={`/calendars/${calendar.id}/edit`}>Edit</Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteCalendarMutation({ id: calendar.id });
              router.push("/calendars");
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  );
};
