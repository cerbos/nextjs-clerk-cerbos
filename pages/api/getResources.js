import { requireSession, users } from "@clerk/nextjs/api";
const { Cerbos } = require("@cerbos/sdk");
const cerbos = new Cerbos({
  hostname: "https://demo-express-clerk-cerbos-pdp-qh5dbmiiva-uk.a.run.app/", // The Cerbos PDP instance
});

export default requireSession(async (req, res) => {
  const user = await users.getUser(req.session.userId);

  const roles = user.publicMetadata.role
    ? [user.publicMetadata.role]
    : ["user"];

  const cerbosPayload = {
    principal: {
      id: req.session.userId,
      roles, //roles from Clerk profile
      attr: {
        email: user.email,
      },
    },
    resource: {
      kind: "contact",
      instances: {
        "id#1": {
          attr: {
            owner: req.session.userId,
            lastUpdated: new Date(2020, 10, 10),
          },
        },
        "id#2": {
          attr: {
            owner: "test2",
            lastUpdated: new Date(2020, 10, 12),
          },
        },
      },
    },
    actions: ["read", "update", "delete"],
  };

  const result = await cerbos.check(cerbosPayload);
  delete result.resp.meta;
  res.json(result.resp);
});
