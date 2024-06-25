"use client"

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useActionState } from "react";
import { signOutAction, submitSignIn } from "../../actions/auth";
import Link from "next/link";

import { auth } from "@/lib/auth";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { ArrowUpRight } from "lucide-react";


export default function LoginForm() {

  const [error, action, loading] = useActionState(submitSignIn, null)

  return (
    <div className="flex flex-col max-w-lg p-10">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Authentication States</CardTitle>
          <CardDescription>Server action + auth state + logout</CardDescription>
        </CardHeader>
        <CardContent>
          <p><strong>Error:</strong> {`${error}`}</p>
          <p><strong>Currently loading:</strong> {loading ? "true" : "false"}</p>
        </CardContent>
      </Card>

      <form
        className="flex flex-col gap-2"
        action={action}
      >
        <Input type="username" placeholder="Email" name="email" />
        <Input type="password" placeholder="Password" name="password" />
        <Button type="submit">Sign in</Button>
      </form>

      <hr className="mb-4 mt-16" />

      <form
        action={signOutAction}
        className="flex gap-4"
      >
        <Button type="submit">Sign out</Button>
        <Link href={"/"}>
          <Button variant={"ghost"}>
            <span>
              Go home <ArrowUpRight className="inline" width={15} />
            </span>
          </Button>
        </Link>
      </form>
    </div>
  )
}