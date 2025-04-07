import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { FamilyCalendarsList } from "./components/FamilyCalendarsList";

export const metadata: Metadata = {
  title: "FamilyCalendars",
  description: "List of familyCalendars",
};

export default function Page() {
  return (
    <div>
      <p>
        <Link href={"/family-calendars/new"}>Create FamilyCalendar</Link>
      </p>
      <Suspense fallback={<div>Loading...</div>}>
        <FamilyCalendarsList />
      </Suspense>
    </div>
  );
}
