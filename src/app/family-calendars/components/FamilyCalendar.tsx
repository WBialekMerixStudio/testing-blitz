"use client"
import { useMutation, useQuery } from "@blitzjs/rpc"
import Link from "next/link"
import { useRouter } from "next/navigation"
import deleteFamilyCalendar from "../mutations/deleteFamilyCalendar"
import getFamilyCalendar from "../queries/getFamilyCalendar"

export const FamilyCalendar = ({ familyCalendarId }: { familyCalendarId: number }) => {
  const router = useRouter()
  const [deleteFamilyCalendarMutation] = useMutation(deleteFamilyCalendar)
  const [familyCalendar] = useQuery(getFamilyCalendar, {
    id: familyCalendarId,
  })

  return (
    <>
      <div>
        <h1>Project {familyCalendar.id}</h1>
        <pre>{JSON.stringify(familyCalendar, null, 2)}</pre>

        <Link href={`/family-calendars/${familyCalendar.id}/edit`}>Edit</Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteFamilyCalendarMutation({ id: familyCalendar.id })
              router.push("/family-calendars")
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}
