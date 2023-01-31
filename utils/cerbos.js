import { GRPC } from "@cerbos/grpc";

// Use "localhost:3593" and `{ tls: false }` to connect with Cerbos local server
export const cerbos = new GRPC(
  "demo-express-clerk-cerbos-pdp-qh5dbmiiva-uk.a.run.app",
  { tls: true }
);
