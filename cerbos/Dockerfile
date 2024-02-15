FROM ghcr.io/cerbos/cerbos:0.33.0-amd64
COPY policies /policies
COPY config /config
ENTRYPOINT ["/cerbos"]
CMD ["server", "--config=/config/conf.docker.yaml"]
