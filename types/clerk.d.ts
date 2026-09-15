import type { Role } from "@/lib/roles";

// Type the `publicMetadata` we store on Clerk users so `user.publicMetadata.role`
// is typed on both the client (`useUser()`) and the server (`clerkClient()`).
declare global {
  interface UserPublicMetadata {
    role?: Role | null;
  }
}

export {};
