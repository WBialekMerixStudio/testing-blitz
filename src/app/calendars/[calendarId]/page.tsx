import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { invoke } from "src/app/blitz-server";
import getCalendar from "../queries/getCalendar";
import { Calendar } from "../components/Calendar";

export async function generateMetadata(
  props: CalendarPageProps
): Promise<Metadata> {
  const params = await props.params;
  const Calendar = await invoke(getCalendar, { id: Number(params.calendarId) });
  return {
    title: `Calendar ${Calendar.id} - ${Calendar.name}`,
  };
}

type CalendarPageProps = {
  params: Promise<{ calendarId: string }>;
};

export default async function Page(props: CalendarPageProps) {
  const params = await props.params;
  return (
    <div>
      <p>
        <Link href={"/calendars"}>Calendars</Link>
      </p>
      <Suspense fallback={<div>Loading...</div>}>
        <Calendar calendarId={Number(params.calendarId)} />
      </Suspense>
    </div>
  );
}
