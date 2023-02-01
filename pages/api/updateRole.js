import { getAuth, clerkClient } from "@clerk/nextjs/server";

export default async function handler(req, res) {
  const { userId } = getAuth(req);
  clerkClient.users.updateUser(userId, {
    publicMetadata: {
      role: req.body.role,
    },
  });
  const data = { userId, role: req.body.role };

  return res.status(200).json({ data });
}
