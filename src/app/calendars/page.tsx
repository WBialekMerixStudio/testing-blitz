import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { CalendarsList } from "./components/CalendarsList";

export const metadata: Metadata = {
  title: "Calendars",
  description: "List of calendars",
};

export default function Page() {
  return (
    <div>
      <p>
        <Link href={"/calendars/new"}>Create Calendar</Link>
      </p>
      <Suspense fallback={<div>Loading...</div>}>
        <CalendarsList />
      </Suspense>
    </div>
  );
}
