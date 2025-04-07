"use client";
import { FORM_ERROR, FamilyCalendarForm } from "./FamilyCalendarForm";
import { CreateFamilyCalendarSchema } from "../schemas";
import { useMutation } from "@blitzjs/rpc";
import createFamilyCalendar from "../mutations/createFamilyCalendar";
import { useRouter } from "next/navigation";

export function New__ModelName() {
  const [createFamilyCalendarMutation] = useMutation(createFamilyCalendar);
  const router = useRouter();
  return (
    <FamilyCalendarForm
      submitText="Create FamilyCalendar"
      schema={CreateFamilyCalendarSchema}
      onSubmit={async (values) => {
        try {
          const familyCalendar = await createFamilyCalendarMutation(values);
          router.push(`/family-calendars/${familyCalendar.id}`);
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
