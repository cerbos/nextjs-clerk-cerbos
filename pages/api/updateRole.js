import { requireSession, users } from "@clerk/nextjs/api";
const { Cerbos } = require("@cerbos/sdk");

export default requireSession(async (req, res) => {
  await users.updateUser(req.session.userId, {
    publicMetadata: {
      role: req.body.role,
    },
  });
  res.json({ ok: true });
});
