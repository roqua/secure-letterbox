import JSEncrypt from "jsencrypt";
import invariant from "tiny-invariant";

export const PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA1vaQqS46xJQdA0YIFuZx
6u97m3tUYejedrotIepyrZIhmo1x7aaZgRsPE8CuzPXLGhbUnqQyffK+IMx3FFfh
QroyHnpvjVOkQ1T3RhlbjfQMQKSGDW7/9BWATC5D52AGLOSJ7wcjkrRBduCh+1Zq
Gl9+QcFMBsb0I54Z79pgL6VoMI2nn9M5hKqDvyo8IEJvMQOWxaXsH02v6AcLj4XD
AUCqed7yW6xtUgFVxzqWRaTbstqs402XgZsapw6CvSRQDLQ1OfL8SsRYNtw3mj8+
qAhGAYCc/TPc+RFAbsCS4k2xnEYav8kw8n3zW7FerAXDgwEPQFQy5nduZJGpt1Z/
b8ivSHGAMPPcfiXTHLiQfKbdLclRxrmSfbOGtZ9i4r5+fJ1SnRnJObXJDVFr62bu
U3xWvO4XOVnALeUKU+mhCdC+WaMRRY7BuSqWA56hTvAKbda9EAccRO09gRf82r7L
4CB8Wk1zGf558eiYtMBp0S91LF9r6wi++PTLLnJ+KJugL+JYFYhnii8yVVr6m2Dn
fcMTIefgPbu3K++2Vp7u5x8iUSNxCK1efCydM7j/kZGTDWMxbmQ5ZStbn3yQn9Ns
Zh3XekaH1LqCKhI0SZwtOczVkKykZJv4kLAsN9prb0ge4WWMUeAAd5avYSEALczc
CoRMk6yGIGGGcxkxN9JKfJkCAwEAAQ==
-----END PUBLIC KEY-----`;

export function encrypt(message: string, key = PUBLIC_KEY) {
  const encryptor = new JSEncrypt();
  encryptor.setPublicKey(key);
  const encrypted = encryptor.encrypt(message);
  // console.log("Encrypting", message, "returned", encrypted);
  invariant(encrypted, "Encryption failed");
  return encrypted;
}

export function decrypt(message: string, key: string) {
  const encryptor = new JSEncrypt();
  encryptor.setPrivateKey(key);
  const decrypted = encryptor.decrypt(message);
  // console.log("Decrypting", { message, decrypted, key });
  return decrypted || "Decryption failed";
}
