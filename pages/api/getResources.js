import { requireSession, users } from "@clerk/nextjs/api";
import { GRPC as Cerbos } from "@cerbos/grpc";
const cerbos = new Cerbos(
  "demo-express-clerk-cerbos-pdp-qh5dbmiiva-uk.a.run.app",
  {
    tls: true,
  }
);

export default requireSession(async (req, res) => {
  const user = await users.getUser(req.session.userId);

  const roles = user.publicMetadata.role
    ? [user.publicMetadata.role]
    : ["user"];

  const cerbosPayload = {
    principal: {
      id: req.session.userId,
      roles, //roles from Clerk profile
      attributes: {
        email: user.email,
      },
    },
    resources: [
      {
        resource: {
          kind: "contact",
          id: "1",
          attributes: {
            owner: req.session.userId,
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
});
