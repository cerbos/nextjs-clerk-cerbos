docker run -i -t -p 3592:3592 -p 3593:3593 \
  -v $(pwd)/config:/config \
  -v $(pwd)/policies:/policies \
  ghcr.io/cerbos/cerbos:0.18.0 \
  server --config=/config/conf.yaml
