// Source snippets rendered on the demo pages. Keep these in sync with the
// real implementations in `app/api/getResources/route.ts`,
// `app/documents/[id]/page.tsx` and `cerbos/policies/contact.yaml`.

export const getResourcesSample = `import { auth, clerkClient } from "@clerk/nextjs/server";
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
  // use \`result.isAllowed({ resource, action })\` to make decisions instead.
  return NextResponse.json(
    result.results.map(({ resource, actions }) => ({ resource, actions })),
  );
}
`;

export const documentPageSample = `import { auth, clerkClient } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import { cerbos } from "@/lib/cerbos";
import { getDocumentAttributesById, getDocumentById } from "@/lib/db";
import { rolesFromMetadata } from "@/lib/roles";

export default async function DocumentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Redirects to sign-in if there is no signed-in user.
  const { userId } = await auth.protect();
  const client = await clerkClient();
  const user = await client.users.getUser(userId);

  // Query only the minimal attributes needed for the authorization check.
  const attributes = await getDocumentAttributesById(id);
  if (!attributes) {
    notFound();
  }

  const allowed = await cerbos.isAllowed({
    principal: { id: userId, roles: rolesFromMetadata(user.publicMetadata) },
    resource: { kind: "document", id, attr: attributes },
    action: "view",
  });

  if (!allowed) {
    return <Forbidden />;
  }

  // Access granted: load the full document for the page.
  const document = await getDocumentById(id);
  return <Document document={document} />;
}
`;

export const contactPolicy = `---
apiVersion: api.cerbos.dev/v1
resourcePolicy:
  version: default
  resource: contact
  rules:
    - actions: ["read", "create"]
      effect: EFFECT_ALLOW
      roles:
        - admin
        - user

    - actions: ["update", "delete"]
      effect: EFFECT_ALLOW
      roles:
        - admin

    - actions: ["update", "delete"]
      effect: EFFECT_ALLOW
      roles:
        - user
      condition:
        match:
          expr: request.resource.attr.owner == request.principal.id
`;
