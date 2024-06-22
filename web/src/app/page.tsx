import { Button } from "@/components/ui/button";

import { auth } from "@/lib/auth";
import Link from "next/link";
import { signOutAction } from "./actions/actions";

export default async function Home() {

  const session = await auth()

  return (
    <main className="p-6">

      Your email: {session?.user?.email ?? "No user logged in"}

      <br></br>
      <Link href={"/login"}>Login Page</Link>
      <br></br>
      <form
        action={signOutAction}
      >
        <Button type="submit">Sign out</Button>
      </form>

    </main>
  );
}
