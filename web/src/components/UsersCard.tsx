'use client'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { createRandomUser } from "@/actions/db"
import { removeUser } from "@/actions/db"
import { useRealtimeContext } from "@/contexts/realtime-context"

export default function UsersCard() {

  const { users: people } = useRealtimeContext()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Users</CardTitle>
        <CardDescription>Protected data fetching + realtime</CardDescription>
      </CardHeader>
      <CardContent>
        {people.length === 0 && <p>No users (are you authenticated?)</p>}
        <ul className="list-disc list-inside">
          {people.map((person) => (
            <li key={person.PersonID}>
              <form className="inline" action={removeUser.bind(null, person.PersonID)}>
                <button className="hover:line-through">
                  {person.FirstName} {person.LastName} ({person.City})
                </button>
              </form>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter>
        <form action={createRandomUser}>
          <Button>Add user</Button>
        </form>
      </CardFooter>
    </Card>
  )
}