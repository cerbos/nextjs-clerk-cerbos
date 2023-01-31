import { clerkClient, getAuth, buildClerkProps } from "@clerk/nextjs/server";
import Prism from "../../components/Prism";
import { getDocumentById, getDocumentAttributesById } from "../../db";
import { cerbos } from "../../utils/cerbos";
import styles from "../../styles/Home.module.css";

export async function getServerSideProps({ req, params }) {
  // fetch the user from the session
  const { userId } = getAuth(req);
  const user = userId ? await clerkClient.users.getUser(userId) : null;

  // cerbos requires an array of `roles` so we just wrap `role` in an array
  const roles = user.publicMetadata.role ? [user.publicMetadata.role] : [];

  // query for the minimal infomation needed to pass to cerbos for an authorization check
  const documentAttrs = await getDocumentAttributesById(params.id);

  // if we can't find a document matching the route param id, throw a 404
  if (!documentAttrs) {
    return {
      props: {
        error: {
          message: "Document not found",
          statusCode: 404,
        },
      },
    };
  }

  // ** fake the ownership of the document for the purposes of this demo **
  if (documentAttrs?.author === "tbd") {
    documentAttrs.author = userId;
  }

  const isAllowed = await cerbos.isAllowed({
    principal: { id: user.id, roles },
    resource: {
      kind: "document",
      id: params.id,
      attributes: documentAttrs,
    },
    action: "view",
  });

  if (!isAllowed) {
    return {
      props: {
        error: {
          message: "Forbidden",
          statusCode: 403,
        },
      },
    };
  }

  // get the full document for the page
  const document = await getDocumentById(params.id);

  return {
    props: {
      data: document,
      ...buildClerkProps(req),
    },
  };
}

export default function DocumentRoute({ data }) {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.document}>
          <h1 className={styles.title}>{data.title}</h1>
          <p>{data.blurb}</p>
          {data.icon ? <img src={`/icons/${data.icon}.svg`} alt="" /> : null}

          <h4>The load function for this document page:</h4>
          <Prism
            source={`export let loader: LoaderFunction = async (args) => {
    // fetch the user from the session
    const user = await requireUser(args);
  
    // cerbos requires an array of \`roles\` so we just wrap \`role\` in an array
    const roles = user.publicMetadata.role ? [user.publicMetadata.role as string] : [];
    const { params } = args;
  
    if (!params.id) {
      throw json('Document ID required', { status: 400 });
    }
  
    // query for the minimal infomation needed to pass to cerbos for an authorization check
    const documentAttrs = await getDocumentAttributesById(params.id);
  
    // if we can't find a document matching the route param id, throw a 404
    if (!documentAttrs) {
      throw json('Not Found', { status: 404 });
    }
  
    // ** fake the ownership of the document for the purposes of this demo **
    if (documentAttrs?.author === 'tbd') {
      documentAttrs.author = user.id;
    }
  
    const isAllowed = await cerbos.isAllowed({
      principal: { id: user.id, roles },
      resource: {
        kind: 'document',
        id: params.id,
        attributes: documentAttrs,
      },
      action: 'view',
    });
  
    if (!isAllowed) {
      throw json('Forbidden', { status: 403 });
    }
  
    // get the full document for the page
    const document = await getDocumentById(params.id);
  
    return json(document);
  };
  `}
          />
        </div>
      </main>
    </div>
  );
}
