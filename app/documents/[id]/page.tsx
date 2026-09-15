import Image from "next/image";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import CodeBlock from "@/components/CodeBlock";
import { cerbos } from "@/lib/cerbos";
import {
  CURRENT_USER_AUTHOR,
  getDocumentAttributesById,
  getDocumentById,
} from "@/lib/db";
import { rolesFromMetadata } from "@/lib/roles";
import { documentPageSample } from "@/lib/samples";
import styles from "@/styles/Home.module.css";

export default async function DocumentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // `proxy.ts` already redirects signed-out visitors, but protect here too so
  // the page never renders without a user.
  const { userId } = await auth.protect();
  const client = await clerkClient();
  const user = await client.users.getUser(userId);

  // Query only the minimal attributes needed for the authorization check.
  const attributes = await getDocumentAttributesById(id);
  if (!attributes) {
    notFound();
  }

  // ** fake the ownership of the document for the purposes of this demo **
  if (attributes.author === CURRENT_USER_AUTHOR) {
    attributes.author = userId;
  }

  const allowed = await cerbos.isAllowed({
    principal: { id: userId, roles: rolesFromMetadata(user.publicMetadata) },
    resource: { kind: "document", id, attr: attributes },
    action: "view",
  });

  if (!allowed) {
    return (
      <div className={styles.container}>
        <div className={styles.main}>
          <h1 className={styles.title}>403 - Forbidden</h1>
          <p className={styles.description}>
            Cerbos denied the <code>view</code> action on document {id} for
            your current role.
          </p>
        </div>
      </div>
    );
  }

  // Access granted: load the full document for the page.
  const document = await getDocumentById(id);
  if (!document) {
    notFound();
  }

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.document}>
          <h1 className={styles.title}>{document.title}</h1>
          <p>{document.blurb}</p>
          <Image src={`/icons/${document.icon}.svg`} alt="" width={200} height={200} />

          <h4>The server component for this document page:</h4>
          <CodeBlock code={documentPageSample} language="typescript" />
        </div>
      </div>
    </div>
  );
}
