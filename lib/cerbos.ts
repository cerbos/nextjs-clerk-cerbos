import { GRPC } from "@cerbos/grpc";

// The Cerbos PDP this app authorizes against. Defaults to the hosted demo PDP.
// To use a local instance started with `cerbos/start.sh`, set in `.env.local`:
//   CERBOS_PDP_ADDRESS=localhost:3593
//   CERBOS_PDP_TLS=false
const address =
  process.env.CERBOS_PDP_ADDRESS ??
  "demo-express-clerk-cerbos-pdp-qh5dbmiiva-uk.a.run.app";

const tls = process.env.CERBOS_PDP_TLS !== "false";

export const cerbos = new GRPC(address, { tls });
