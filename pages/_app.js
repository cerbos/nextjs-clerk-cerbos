import "../styles/globals.css";
import { ClerkProvider, Show } from "@clerk/nextjs";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import Head from "next/head";
import Script from "next/script";
import Link from "next/link";
import Error from "next/error";

/**
 * List pages you want to be publicly accessible, or leave empty if
 * every page requires authentication. Use this naming strategy:
 *  "/"              for pages/index.js
 *  "/foo"           for pages/foo/index.js
 *  "/foo/bar"       for pages/foo/bar.js
 *  "/foo/[...bar]"  for pages/foo/[...bar].js
 */
const publicPages = ["/", "/sign-in/[[...index]]", "/sign-up/[[...index]]"];

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();

  /**
   * If the current route is listed as public, render it directly.
   * Otherwise, use Clerk to require authentication.
   */
  return (
    <ClerkProvider {...pageProps} afterSignOutUrl="/">
      <Script src="https://cdn.jsdelivr.net/npm/prismjs@1/components/prism-core.min.js" />
      <Script src="https://cdn.jsdelivr.net/npm/prismjs@1/plugins/autoloader/prism-autoloader.min.js" />
      <Layout>
        {pageProps.error ? (
          <Error
            statusCode={pageProps.error.statusCode}
            title={pageProps.error.message}
          />
        ) : publicPages.includes(router.pathname) ? (
          <Component {...pageProps} />
        ) : (
          <>
            <Show when="signed-in">
              <Component {...pageProps} />
            </Show>
            <Show when="signed-out">
              <main>
                <p>
                  Please <Link href="/sign-in">sign in</Link> to access this
                  page.
                </p>
              </main>
            </Show>
          </>
        )}
      </Layout>
    </ClerkProvider>
  );
};

export default MyApp;
