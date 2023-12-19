# RoQua's secure inbox

This application is designed to let third parties easily send us API tokens and other credentials in a secure way. It is configured to encrypt messages using our RSA public key. The server simply doesn't know the private key, we decrypt messages locally as needed.

## Dev setup

```
pnpm i @vercel/postgres
pnpm i -g vercel@latest

pnpm install
createdb secure-letterbox-dev
pnpm db:push
```

## generating keys

```
openssl genrsa -out rsa_1024_priv.pem 1024
openssl rsa -pubout -in rsa_1024_priv.pem -out rsa_1024_pub.pem
```

