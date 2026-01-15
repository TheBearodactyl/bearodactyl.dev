FROM rust:alpine AS builder
RUN apk add --no-cache musl-dev pkgconfig openssl-dev
WORKDIR /build
COPY . .
RUN cargo build --release --target x86_64-unknown-linux-musl || cargo build --release

FROM alpine:latest
RUN apk add --no-cache ca-certificates libgcc
RUN addgroup -g 1000 bearo && adduser -D -s /bin/sh -u 1000 -G bearo bearo
WORKDIR /app
COPY --from=builder --chown=bearo:bearo /build/target/x86_64-unknown-linux-musl/release/bearo-dev ./bearo-dev
USER bearo
EXPOSE 23791
ENV ROCKET_ADDRESS=0.0.0.0
ENV ROCKET_PORT=23791

CMD ["./bearo-dev"]
