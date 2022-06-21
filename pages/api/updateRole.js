import { requireSession, users } from "@clerk/nextjs/api";

export default requireSession(async (req, res) => {
  await users.updateUser(req.session.userId, {
    publicMetadata: {
      role: req.body.role,
    },
  });
  res.json({ ok: true });
});
