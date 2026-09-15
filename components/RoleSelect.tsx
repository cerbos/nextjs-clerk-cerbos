"use client";

import { useState, useTransition, type ChangeEvent } from "react";
import { useUser } from "@clerk/nextjs";
import { updateRole } from "@/app/actions";
import { ROLES, isRole } from "@/lib/roles";
import styles from "@/styles/Home.module.css";

export default function RoleSelect() {
  const { user } = useUser();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const role = user?.publicMetadata.role;
  const currentRole = isRole(role) ? role : "";

  const onChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const nextRole = event.currentTarget.value;
    startTransition(async () => {
      try {
        await updateRole(nextRole);
        // Refresh the client-side user so `publicMetadata.role` reflects the change.
        await user?.reload();
        setError(null);
      } catch {
        setError("Could not update your role. Please try again.");
      }
    });
  };

  return (
    <div className={styles.backend}>
      <h2>Demo: Set your Role</h2>
      <p>
        For this demo set a role on your Clerk user. This is stored in the{" "}
        <code>publicMetadata</code> field of your user profile and passed into
        Cerbos for use in authorization.
      </p>
      <select
        value={currentRole}
        onChange={onChange}
        disabled={pending || !user}
        className={styles.roleSelect}
        aria-label="Role"
      >
        <option value="">Select a role</option>
        {ROLES.map((r) => (
          <option key={r} value={r}>
            {r.charAt(0).toUpperCase() + r.slice(1)}
          </option>
        ))}
      </select>
      {error ? <p role="alert">{error}</p> : null}
      <p>
        Once you change the role, re-run the request below to see the impact
        on the authorization result.
      </p>
    </div>
  );
}
