"use client"

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useActionState } from "react";
import { signOutAction, submitSignIn } from "../actions/actions";


export default function LoginForm() {

  const [error, action, loading] = useActionState(submitSignIn, null)

  return (
    <div className="flex flex-col gap-5 ">
      <form
        className="flex flex-col gap-2"
        action={action}
      >
        <p>{`${error}`}</p>
        {loading && <p>Loading...</p>}

        <Input type="username" placeholder="Email" name="email" />
        <Input type="password" placeholder="Password" name="password" />
        <Button type="submit">Sign in</Button>
      </form>

      <form
        action={signOutAction}
      >
        <Button type="submit">Sign out</Button>
      </form>
    </div>
  )
}