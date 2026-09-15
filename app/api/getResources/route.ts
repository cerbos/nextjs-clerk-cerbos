import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { cerbos } from "@/lib/cerbos";
import { rolesFromMetadata } from "@/lib/roles";

export async function GET() {
  const { isAuthenticated, userId } = await auth();
  if (!isAuthenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const client = await clerkClient();
  const user = await client.users.getUser(userId);

  const result = await cerbos.checkResources({
    principal: {
      id: userId,
      roles: rolesFromMetadata(user.publicMetadata, ["user"]), // roles from the Clerk profile
      attr: { email: user.primaryEmailAddress?.emailAddress ?? "" },
    },
    resources: [
      {
        resource: {
          kind: "contact",
          id: "1",
          attr: { owner: userId, lastUpdated: "2020-11-10" }, // owned by the current user
        },
        actions: ["read", "create", "update", "delete"],
      },
      {
        resource: {
          kind: "contact",
          id: "2",
          attr: { owner: "someone-else", lastUpdated: "2020-11-10" },
        },
        actions: ["read", "create", "update", "delete"],
      },
    ],
  });

  // Return the per-resource decisions for the demo UI. In a real app you would
  // use `result.isAllowed({ resource, action })` to make decisions instead.
  return NextResponse.json(
    result.results.map(({ resource, actions }) => ({ resource, actions })),
  );
}
