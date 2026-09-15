export const ROLES = ["admin", "user"] as const;

export type Role = (typeof ROLES)[number];

export function isRole(value: unknown): value is Role {
  return typeof value === "string" && (ROLES as readonly string[]).includes(value);
}

// Cerbos expects an array of roles. This demo stores a single `role` in the
// Clerk user's public metadata, so wrap it (falling back if none is set).
export function rolesFromMetadata(
  metadata: UserPublicMetadata | undefined,
  fallback: Role[] = [],
): Role[] {
  const role = metadata?.role;
  return isRole(role) ? [role] : fallback;
}
