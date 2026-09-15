import CodeBlock from "@/components/CodeBlock";
import { contactPolicy } from "@/lib/samples";
import styles from "@/styles/Home.module.css";

export default function CerbosPolicy() {
  return (
    <div className={styles.backend}>
      <h2>Example Cerbos Policy</h2>
      <p>The sample policy deployed to the PDP states that:</p>
      <ul>
        <li>
          Principals with the role of <code>admin</code> or <code>user</code>{" "}
          are allowed to do the <b>create</b> or <b>read</b> actions.
        </li>
        <li>
          Principals with the role of <code>admin</code> are allowed to do the{" "}
          <b>update</b> and <b>delete</b> actions.
        </li>
        <li>
          Principals with the role of <code>user</code> whose ID matches the
          owner attribute of the resource are allowed to do the <b>update</b>{" "}
          and <b>delete</b> actions.
        </li>
      </ul>
      <CodeBlock code={contactPolicy} language="yaml" />
    </div>
  );
}
