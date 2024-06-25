import { auth } from "@/lib/auth"

export default async function SessionStatus() {

  const session = await auth()

  return (
    <div>
      <strong>Email:</strong>
      <p>{session?.user?.email ?? "No user logged in"}</p>
    </div>
  )
}