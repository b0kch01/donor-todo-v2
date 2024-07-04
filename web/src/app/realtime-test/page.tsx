'use client'

import { useRealtimeContext } from "@/contexts/realtime-context";
import { Person } from "@prisma/client";


export default function RealtimeTest() {
  const { users } = useRealtimeContext()

  return (

    <div>
      <h1>Realtime Test</h1>
      <ul>
        {users.map((user: Person) => (
          <li key={user.PersonID}>{user.FirstName}</li>
        ))}
      </ul>
    </div>
  )
}
