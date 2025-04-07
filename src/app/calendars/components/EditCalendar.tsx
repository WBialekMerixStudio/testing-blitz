"use client";
import { Suspense } from "react";
import updateCalendar from "../mutations/updateCalendar";
import getCalendar from "../queries/getCalendar";
import { UpdateCalendarSchema } from "../schemas";
import { FORM_ERROR, CalendarForm } from "./CalendarForm";
import { useMutation, useQuery } from "@blitzjs/rpc";
import { useRouter } from "next/navigation";

export const EditCalendar = ({ calendarId }: { calendarId: number }) => {
  const [calendar, { setQueryData }] = useQuery(
    getCalendar,
    { id: calendarId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  );
  const [updateCalendarMutation] = useMutation(updateCalendar);
  const router = useRouter();
  return (
    <>
      <div>
        <h1>Edit Calendar {calendar.id}</h1>
        <pre>{JSON.stringify(calendar, null, 2)}</pre>
        <Suspense fallback={<div>Loading...</div>}>
          <CalendarForm
            submitText="Update Calendar"
            schema={UpdateCalendarSchema}
            initialValues={calendar}
            onSubmit={async (values) => {
              try {
                const updated = await updateCalendarMutation({
                  ...values,
                  id: calendar.id,
                });
                await setQueryData(updated);
                router.refresh();
              } catch (error: any) {
                console.error(error);
                return {
                  [FORM_ERROR]: error.toString(),
                };
              }
            }}
          />
        </Suspense>
      </div>
    </>
  );
};
