import React from "react";
import styles from "../styles/Home.module.css";
import { SignedIn, SignedOut } from "@clerk/nextjs";

export const APIRequest = ({
  apiSample,
  endpoint,
  title,
  signedInMessage,
  signedOutMessage,
  description,
  intro,
}) => {
  React.useEffect(() => {
    if (window.Prism) {
      window.Prism.highlightAll();
    }
  });
  const [response, setResponse] = React.useState(
    "// Click above to run the request"
  );
  const makeRequest = async () => {
    setResponse("// Loading...");

    try {
      const res = await fetch(endpoint);
      const body = await res.json();
      setResponse(JSON.stringify(body, null, "  "));
    } catch (e) {
      setResponse(
        "// There was an error with the request. Please contact support@clerk.dev"
      );
    }
  };
  return (
    <div className={styles.backend}>
      <h2>{title}</h2>
      <p>{intro}</p>
      <div className={styles.card}>
        <button
          target="_blank"
          rel="noopener"
          className={styles.cardContent}
          onClick={() => makeRequest()}
        >
          <img src="/icons/server.svg" />
          <div>
            <h3>fetch('{endpoint}')</h3>
            <p>{description}</p>
          </div>
          <div className={styles.arrow}>
            <img src="/icons/download.svg" />
          </div>
        </button>
      </div>
      <h4>
        Response
        <em>
          <SignedIn>{signedInMessage}</SignedIn>
          <SignedOut>{signedOutMessage}</SignedOut>
        </em>
      </h4>
      <pre>
        <code className="language-js">{response}</code>
      </pre>
      <h4>{endpoint}</h4>
      <pre>
        <code className="language-js">{apiSample}</code>
      </pre>
    </div>
  );
};
