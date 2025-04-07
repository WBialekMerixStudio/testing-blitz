import { Metadata } from "next";
import { Suspense } from "react";
import { invoke } from "src/app/blitz-server";
import getFamilyCalendar from "../../queries/getFamilyCalendar";
import { EditFamilyCalendar } from "../../components/EditFamilyCalendar";

type EditFamilyCalendarPageProps = {
  params: Promise<{ familyCalendarId: string }>;
};

export async function generateMetadata(
  props: EditFamilyCalendarPageProps
): Promise<Metadata> {
  const params = await props.params;
  const FamilyCalendar = await invoke(getFamilyCalendar, {
    id: Number(params.familyCalendarId),
  });
  return {
    title: `Edit FamilyCalendar ${FamilyCalendar.id} - ${FamilyCalendar.name}`,
  };
}

export default async function Page(props: EditFamilyCalendarPageProps) {
  const params = await props.params;
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditFamilyCalendar
          familyCalendarId={Number(params.familyCalendarId)}
        />
      </Suspense>
    </div>
  );
}
