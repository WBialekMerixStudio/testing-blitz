"use client";
import { Suspense } from "react";
import updateFamilyCalendar from "../mutations/updateFamilyCalendar";
import getFamilyCalendar from "../queries/getFamilyCalendar";
import { UpdateFamilyCalendarSchema } from "../schemas";
import { FORM_ERROR, FamilyCalendarForm } from "./FamilyCalendarForm";
import { useMutation, useQuery } from "@blitzjs/rpc";
import { useRouter } from "next/navigation";

export const EditFamilyCalendar = ({
  familyCalendarId,
}: {
  familyCalendarId: number;
}) => {
  const [familyCalendar, { setQueryData }] = useQuery(
    getFamilyCalendar,
    { id: familyCalendarId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  );
  const [updateFamilyCalendarMutation] = useMutation(updateFamilyCalendar);
  const router = useRouter();
  return (
    <>
      <div>
        <h1>Edit FamilyCalendar {familyCalendar.id}</h1>
        <pre>{JSON.stringify(familyCalendar, null, 2)}</pre>
        <Suspense fallback={<div>Loading...</div>}>
          <FamilyCalendarForm
            submitText="Update FamilyCalendar"
            schema={UpdateFamilyCalendarSchema}
            initialValues={familyCalendar}
            onSubmit={async (values) => {
              try {
                const updated = await updateFamilyCalendarMutation({
                  ...values,
                  id: familyCalendar.id,
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
