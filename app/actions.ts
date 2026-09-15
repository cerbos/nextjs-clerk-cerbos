"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { isRole } from "@/lib/roles";

// Stores the selected role in the Clerk user's public metadata, which is then
// passed to Cerbos as the principal's roles on every authorization check.
export async function updateRole(role: string): Promise<void> {
  const { isAuthenticated, userId } = await auth();
  if (!isAuthenticated) {
    throw new Error("Unauthorized");
  }
  if (role !== "" && !isRole(role)) {
    throw new Error("Invalid role");
  }

  const client = await clerkClient();
  await client.users.updateUserMetadata(userId, {
    publicMetadata: { role: role === "" ? null : role },
  });
}
