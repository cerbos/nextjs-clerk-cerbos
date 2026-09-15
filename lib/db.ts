// A fake document repository. `getDocumentAttributesById()` returns only the
// minimal attributes needed for a Cerbos authorization check, so the full
// document is only loaded once access has been granted.

export interface Document {
  id: string;
  title: string;
  author: string;
  blurb: string;
  icon: string;
}

export type DocumentAttributes = Pick<Document, "id" | "author">;

// Sentinel author value that is replaced with the current user's ID at request
// time, so every signed-in user "owns" document 2 for the purposes of the demo.
export const CURRENT_USER_AUTHOR = "tbd";

const documents: Document[] = [
  {
    id: "1",
    title: "Secret Admin Document",
    author: "only-admins",
    blurb:
      "Congratulations! You've successfully accessed the admin only resource route.",
    icon: "lock",
  },
  {
    id: "2",
    title: "My Very Important Document",
    author: CURRENT_USER_AUTHOR,
    blurb:
      "This document is available to the author and any user with the 'admin' role.",
    icon: "unlock",
  },
  {
    id: "3",
    title: "A Document",
    author: "not-the-current-user",
    blurb:
      "This document is available to its author and any user with the 'admin' role.",
    icon: "lock",
  },
];

export async function getDocumentById(id: string): Promise<Document | undefined> {
  return documents.find((doc) => doc.id === id);
}

export async function getDocumentAttributesById(
  id: string,
): Promise<DocumentAttributes | undefined> {
  const doc = await getDocumentById(id);
  return doc ? { id: doc.id, author: doc.author } : undefined;
}
