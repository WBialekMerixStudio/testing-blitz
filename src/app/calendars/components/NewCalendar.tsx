"use client";
import { FORM_ERROR, CalendarForm } from "./CalendarForm";
import { CreateCalendarSchema } from "../schemas";
import { useMutation } from "@blitzjs/rpc";
import createCalendar from "../mutations/createCalendar";
import { useRouter } from "next/navigation";

export function New__ModelName() {
  const [createCalendarMutation] = useMutation(createCalendar);
  const router = useRouter();
  return (
    <CalendarForm
      submitText="Create Calendar"
      schema={CreateCalendarSchema}
      initialValues={{
        familyCalendar_id: "test3",
        user_uuid: "test3",
        name: "test3",
        isPrivate: true,
      }}
      onSubmit={async (values) => {
        try {
          console.log("values", values);
          const calendar = await createCalendarMutation(values);
          console.log("calendar", calendar);

          router.push(`/calendars/${calendar.id}`);
        } catch (error: any) {
          console.error(error);
          return {
            [FORM_ERROR]: error.toString(),
          };
        }
      }}
    />
  );
}
