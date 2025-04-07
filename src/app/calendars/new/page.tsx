import { Metadata } from "next";
import { Suspense } from "react";
import { New__ModelName } from "../components/NewCalendar";

export const metadata: Metadata = {
  title: "New Calendar",
  description: "Create a new Calendar",
};

export default function Page() {
  return (
    <div>
      <h1>Create New Calendar</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <New__ModelName />
      </Suspense>
    </div>
  );
}
