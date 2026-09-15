"use client";

import Image from "next/image";
import { useState } from "react";
import CodeBlock from "@/components/CodeBlock";
import styles from "@/styles/Home.module.css";

interface ResourceResult {
  resource: { kind: string; id: string };
  actions: Record<string, string>;
}

interface Props {
  apiSample: string;
  endpoint: string;
  title: string;
  intro: string;
  description: string;
  signedInMessage: string;
}

const Effect = ({ effect }: { effect: string | undefined }) => (
  <span aria-label={effect === "EFFECT_ALLOW" ? "allowed" : "denied"}>
    {effect === "EFFECT_ALLOW" ? "✅" : "❌"}
  </span>
);

export default function APIRequest({
  apiSample,
  endpoint,
  title,
  intro,
  description,
  signedInMessage,
}: Props) {
  const [response, setResponse] = useState("// Click above to run the request");
  const [results, setResults] = useState<ResourceResult[]>([]);

  const makeRequest = async () => {
    setResponse("// Loading...");
    try {
      const res = await fetch(endpoint);
      const body = await res.json();
      setResults(res.ok && Array.isArray(body) ? body : []);
      setResponse(JSON.stringify(body, null, 2));
    } catch {
      setResults([]);
      setResponse("// There was an error with the request.");
    }
  };

  return (
    <div className={styles.backend}>
      <h2>Demo: {title}</h2>
      <p>{intro}</p>
      <div className={styles.card}>
        <button type="button" className={styles.cardContent} onClick={makeRequest}>
          <Image src="/icons/server.svg" alt="" width={24} height={24} />
          <div>
            <h3>fetch(&apos;{endpoint}&apos;)</h3>
            <p>{description}</p>
          </div>
          <div className={styles.arrow}>
            <Image src="/icons/download.svg" alt="" width={24} height={24} />
          </div>
        </button>
      </div>
      <h4>
        Response
        <em>{signedInMessage}</em>
      </h4>

      {results.length > 0 && (
        <table className={styles.responseTable}>
          <thead>
            <tr>
              <th>Resource</th>
              <th>Read</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r) => (
              <tr key={r.resource.id}>
                <td>{r.resource.id}</td>
                <td>
                  <Effect effect={r.actions.read} />
                </td>
                <td>
                  <Effect effect={r.actions.update} />
                </td>
                <td>
                  <Effect effect={r.actions.delete} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <CodeBlock code={response} language="json" />
      <h4>{endpoint}</h4>
      <CodeBlock code={apiSample} language="typescript" />
    </div>
  );
}
