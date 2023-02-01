import { getAuth, clerkClient } from "@clerk/nextjs/server";
import { cerbos } from "../../utils/cerbos";

export default async function handler(req, res) {
  const { userId } = getAuth(req);

  const user = await clerkClient.users.getUser(userId);

  const roles = user?.publicMetadata?.role
    ? [user?.publicMetadata?.role]
    : ["user"];

  const email = user?.emailAddresses.find(
    (e) => e.id === user.primaryEmailAddressId
  )?.emailAddress;

  const cerbosPayload = {
    principal: {
      id: userId,
      roles, //roles from Clerk profile
      attributes: {
        email: email,
      },
    },
    resources: [
      {
        resource: {
          kind: "contact",
          id: "1",
          attributes: {
            owner: userId,
            lastUpdated: new Date(2020, 10, 10),
          },
        },
        actions: ["read", "create", "update", "delete"],
      },

      {
        resource: {
          kind: "contact",
          id: "2",
          attributes: {
            owner: "test2",
            lastUpdated: new Date(2020, 10, 10),
          },
        },
        actions: ["read", "create", "update", "delete"],
      },
    ],
  };
  console.log(cerbosPayload);

  const result = await cerbos.checkResources(cerbosPayload);
  res.json(result.results);
}
