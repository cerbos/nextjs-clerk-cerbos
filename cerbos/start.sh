docker run -i -t -p 3592:3592 \
  -v $(pwd)/config:/config \
  -v $(pwd)/policies:/policies \
  ghcr.io/cerbos/cerbos:0.9.1 \
  server --config=/config/conf.yaml
