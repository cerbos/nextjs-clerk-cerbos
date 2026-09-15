"use client";

import Image from "next/image";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import APIRequest from "@/components/APIRequest";
import CerbosPolicy from "@/components/CerbosPolicy";
import RoleSelect from "@/components/RoleSelect";
import { getResourcesSample } from "@/lib/samples";
import styles from "@/styles/Home.module.css";

export default function CerbosDemo() {
  const { user } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress ?? "your account";

  return (
    <div>
      <RoleSelect />

      <div className={styles.exampleLinks}>
        <div className={styles.card}>
          <a href="#resource-access" className={styles.cardContent}>
            <Image src="/icons/server.svg" alt="" width={24} height={24} />
            <h3>Resource Access Demo</h3>
            <div></div>
          </a>
        </div>
        <div className={styles.card}>
          <a href="#route-guard" className={styles.cardContent}>
            <Image src="/icons/lock.svg" alt="" width={24} height={24} />
            <h3>Route Guard Demo</h3>
            <div></div>
          </a>
        </div>
      </div>

      <CerbosPolicy />

      <section id="resource-access" className={styles.section}>
        <APIRequest
          apiSample={getResourcesSample}
          endpoint="/api/getResources"
          title="Access API authorized by Cerbos"
          intro={`Now that you are authenticated as ${email}, the following makes a request to the API endpoint of a sample CRM application. This will call Cerbos to check that you are authorized based on the resources being requested. The result will be returned below demonstrating the authorization decision from Cerbos.`}
          signedInMessage="You are signed in so the actions for two contact resources will be returned based on Cerbos policies"
          description="Retrieve what permissions a user has on resources based upon Cerbos policies. The backend will make an authorization call to the Cerbos instance using your Clerk identity and two sample resources."
        />
      </section>

      <section id="route-guard" className={styles.section}>
        <div className={styles.backend}>
          <h2>Demo: Guarded Routes</h2>
          <p>
            For this demo set a <b>role</b> on your Clerk user above and attempt
            to access the routes below. The{" "}
            <code className={styles.code}>admin</code> role has access to all
            routes, while the <code className={styles.code}>user</code> role
            only has access to documents it authored.
          </p>
          <div className={styles.card}>
            <Link href="/documents/1" className={styles.cardContent}>
              <Image src="/icons/lock.svg" alt="" width={24} height={24} />
              <div>
                <h3>A route only the admin role can access</h3>
                <p>
                  This route is <b>only</b> accessible by users with the{" "}
                  <code className={styles.code}>admin</code> role.
                </p>
              </div>
              <div className={styles.arrow}>
                <Image src="/icons/arrow-right.svg" alt="" width={24} height={24} />
              </div>
            </Link>
          </div>
          <div className={styles.card}>
            <Link href="/documents/2" className={styles.cardContent}>
              <Image src="/icons/external-link.svg" alt="" width={24} height={24} />
              <div>
                <h3>A route the user who owns the resource can access</h3>
                <p>
                  This route is accessible by users with the{" "}
                  <code className={styles.code}>admin</code> role, or by the
                  document&apos;s author.
                </p>
                <p>
                  It is &quot;guarded&quot; by the{" "}
                  <code className={styles.code}>id</code> of the user matching
                  the <code className={styles.code}>author</code> attribute of
                  the <b>document</b> resource.
                </p>
              </div>
              <div className={styles.arrow}>
                <Image src="/icons/arrow-right.svg" alt="" width={24} height={24} />
              </div>
            </Link>
          </div>
          <div className={styles.card}>
            <Link href="/documents/3" className={styles.cardContent}>
              <Image src="/icons/document.svg" alt="" width={24} height={24} />
              <div>
                <h3>A route the user does not own</h3>
                <p>
                  This route is &quot;guarded&quot; by the{" "}
                  <code className={styles.code}>id</code> of the{" "}
                  <code className={styles.code}>author</code> of the{" "}
                  <b>document</b> resource, so only the{" "}
                  <code className={styles.code}>admin</code> role can access it.
                </p>
              </div>
              <div className={styles.arrow}>
                <Image src="/icons/arrow-right.svg" alt="" width={24} height={24} />
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
