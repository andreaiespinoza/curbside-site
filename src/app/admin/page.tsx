// src/app/admin/page.tsx (Server Component)
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions"; 
import AdminPanel from "./AdminPanel";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    // If not logged in, redirect to sign-in (NextAuth built-in page)
    redirect("/api/auth/signin?callbackUrl=/admin");
  }

  // If logged in, render the AdminPanel (a client component we'll define next)
  return <AdminPanel />;
}
