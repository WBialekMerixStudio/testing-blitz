import { Metadata } from "next";
import { Suspense } from "react";
import { invoke } from "src/app/blitz-server";
import getCalendar from "../../queries/getCalendar";
import { EditCalendar } from "../../components/EditCalendar";

type EditCalendarPageProps = {
  params: Promise<{ calendarId: string }>;
};

export async function generateMetadata(
  props: EditCalendarPageProps
): Promise<Metadata> {
  const params = await props.params;
  const Calendar = await invoke(getCalendar, { id: Number(params.calendarId) });
  return {
    title: `Edit Calendar ${Calendar.id} - ${Calendar.name}`,
  };
}

export default async function Page(props: EditCalendarPageProps) {
  const params = await props.params;
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditCalendar calendarId={Number(params.calendarId)} />
      </Suspense>
    </div>
  );
}
