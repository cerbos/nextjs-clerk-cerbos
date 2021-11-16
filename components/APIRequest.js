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
  const [responseData, setResponseData] = React.useState({});
  const makeRequest = async () => {
    setResponse("// Loading...");

    try {
      const res = await fetch(endpoint);
      const body = await res.json();
      setResponseData(body);
      setResponse(JSON.stringify(body, null, "  "));
    } catch (e) {
      setResponse(
        "// There was an error with the request. Please contact support@clerk.dev"
      );
    }
  };
  return (
    <div className={styles.backend}>
      <h2>Demo: {title}</h2>
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
      {responseData.resourceInstances && (
        <table className={styles.responseTable}>
          <thead>
            <tr>
              <td>Resource</td>
              <td>Read</td>
              <td>Update</td>
              <td>Delete</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>id#1</td>
              <td>
                {responseData.resourceInstances["id#1"]?.actions?.read ==
                "EFFECT_ALLOW"
                  ? "✅"
                  : "❌"}
              </td>
              <td>
                {responseData.resourceInstances["id#1"]?.actions?.update ==
                "EFFECT_ALLOW"
                  ? "✅"
                  : "❌"}
              </td>
              <td>
                {responseData.resourceInstances["id#1"]?.actions?.delete ==
                "EFFECT_ALLOW"
                  ? "✅"
                  : "❌"}
              </td>
            </tr>
            <tr>
              <td>id#2</td>
              <td>
                {responseData.resourceInstances["id#2"]?.actions?.read ==
                "EFFECT_ALLOW"
                  ? "✅"
                  : "❌"}
              </td>
              <td>
                {responseData.resourceInstances["id#2"]?.actions?.update ==
                "EFFECT_ALLOW"
                  ? "✅"
                  : "❌"}
              </td>
              <td>
                {responseData.resourceInstances["id#2"]?.actions?.delete ==
                "EFFECT_ALLOW"
                  ? "✅"
                  : "❌"}
              </td>
            </tr>
          </tbody>
        </table>
      )}
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
