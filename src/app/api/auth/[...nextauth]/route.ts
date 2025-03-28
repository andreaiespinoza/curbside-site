import NextAuth, { NextAuthOptions } from "next-auth";
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
        console.log("authorize() called with:", credentials);
        const adminUser = process.env.ADMIN_USER || "admin";
        const adminPass = process.env.ADMIN_PASS || "secret123";

        if (!credentials?.username || !credentials?.password) {
          console.log("No credentials provided");
          return null;
        }

        if (
          credentials.username === adminUser &&
          credentials.password === adminPass
        ) {
          console.log("Authorized!");
          return { id: "1", name: "Admin" };
        } else {
          console.log("Not authorized");
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

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
