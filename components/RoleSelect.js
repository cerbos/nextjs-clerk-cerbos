import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import styles from "../styles/Home.module.css";

const RoleSelect = () => {
  const { user } = useUser();
  const [currentRole, setCurrentRole] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCurrentRole(user.publicMetadata?.role);
  }, []);

  const setRole = async (role) => {
    setLoading(true);

    try {
      await fetch("/api/updateRole", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role }),
      });
      setCurrentRole(role);
    } catch (e) {}
    setLoading(false);
  };

  return (
    <div className={styles.backend}>
      <h2>Demo: Set your Role</h2>
      <p>
        For this demo set a role on your Clerk user - this is stored in the
        publicMetadata field of your user profile and passed into Cerbos for use
        in authorization.
      </p>
      <select
        value={currentRole}
        onChange={(e) => {
          setRole(e.currentTarget.value);
        }}
        disabled={loading}
        className={styles.roleSelect}
      >
        <option value="">Select a role</option>
        <option value="admin">Admin</option>
        <option value="user">User</option>
      </select>
      <p>
        Once you change the role, re-run the below request to see the impact on
        the authorization result.
      </p>
    </div>
  );
};

export default RoleSelect;
