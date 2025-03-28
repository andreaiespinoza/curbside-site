// app/api/auth/[...nextauth]/authOptions.ts
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const adminUser = process.env.ADMIN_USER || "admin";
        const adminPass = process.env.ADMIN_PASS || "secret123";

        if (!credentials?.username || !credentials?.password) {
          return null;
        }
        if (
          credentials.username === adminUser &&
          credentials.password === adminPass
        ) {
          return { id: "1", name: "Admin" };
        } else {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "dev_secret",
};
