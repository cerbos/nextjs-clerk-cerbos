import Prism from "prismjs";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-yaml";
import "prismjs/components/prism-json";

export type CodeLanguage = "typescript" | "javascript" | "yaml" | "json";

// Highlights source with Prism at render time (on the server for server
// components, in the browser for client components) so no CDN scripts are
// needed.
export default function CodeBlock({
  code,
  language,
}: {
  code: string;
  language: CodeLanguage;
}) {
  const html = Prism.highlight(code, Prism.languages[language], language);

  return (
    <pre className={`language-${language}`} tabIndex={0}>
      <code
        className={`language-${language}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </pre>
  );
}
