import { Metadata } from "next"
import Link from "next/link"
import { Suspense } from "react"
import { invoke } from "src/app/blitz-server"
import getFamilyCalendar from "../queries/getFamilyCalendar"
import { FamilyCalendar } from "../components/FamilyCalendar"

export async function generateMetadata(props: FamilyCalendarPageProps): Promise<Metadata> {
  const params = await props.params
  const FamilyCalendar = await invoke(getFamilyCalendar, {
    id: Number(params.familyCalendarId),
  })
  return {
    title: `FamilyCalendar ${FamilyCalendar.id} - ${FamilyCalendar.name}`,
  }
}

type FamilyCalendarPageProps = {
  params: Promise<{ familyCalendarId: string }>
}

export default async function Page(props: FamilyCalendarPageProps) {
  const params = await props.params

  return (
    <div>
      <p>
        <Link href={"/family-calendars"}>FamilyCalendars</Link>
      </p>
      <Suspense fallback={<div>Loading...</div>}>
        <FamilyCalendar familyCalendarId={Number(params.familyCalendarId)} />
      </Suspense>
    </div>
  )
}
