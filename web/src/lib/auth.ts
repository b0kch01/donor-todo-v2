import NextAuth, { User } from "next-auth";
import Credentials from "next-auth/providers/credentials"

async function getUserFromDb(email: unknown, password: unknown): Promise<User | null> {
  if (email === "1" && password === "1") {
    return { id: "9ef3k12oji", name: "Nathan Choi", email: "nhchoi@stanford.edu" } as User;
  }
  return null;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  debug: false,
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {}
      },
      authorize: async (credentials) => {
        const user = await getUserFromDb(credentials.email, credentials.password);

        if (!user) {
          throw new Error("No user found");
        }

        return user;
      },

    })
  ],
  pages: {
    signIn: "/login",
  }
})