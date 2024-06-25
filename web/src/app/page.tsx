import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import UsersCard from "@/components/UsersCard";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { signOutAction } from "../actions/auth";
import SessionStatus from "../components/SessionStatus";
import { Suspense } from "react";

export default async function Home() {

  return (
    <main className="flex flex-wrap p-10 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Transplant Coordination POC</CardTitle>
          <CardDescription>Authentication + Realtime</CardDescription>
        </CardHeader>
        <CardContent>
          <SessionStatus />
        </CardContent>
        <CardFooter className="gap-4">
          <form action={signOutAction}>
            <Button type="submit">Sign out</Button>
          </form>
          <Link href={"/login"}>
            <Button variant={"ghost"}>
              <span>
                Goto <code>/login</code> <ArrowUpRight className="inline" width={15} />
              </span>
            </Button>
          </Link>
        </CardFooter>
      </Card>

      <Suspense fallback={<div>Intentionally long loading...</div>}>
        <UsersCard />
      </Suspense>

    </main>
  );
}
