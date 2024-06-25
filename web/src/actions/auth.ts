"use server"

import { signIn, signOut } from "@/lib/auth";
import { AuthError } from "next-auth";

export async function submitSignIn(previousState: any, formData: FormData) {
  try {
    // redirect to home page if sign in is successful
    await signIn("credentials", {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      redirectTo: "/"
    })
  } catch (error: unknown) {
    if (error instanceof AuthError) {
      return "Bad username + password combination"
    }
    throw error
  }
}


export async function signOutAction() {
  await signOut({ redirectTo: "/" })
}