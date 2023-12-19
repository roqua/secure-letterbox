import JSEncrypt from "jsencrypt";
import invariant from "tiny-invariant";

export const PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQChDjdJXHp4bMtRsoPA49uXZYAi
eTm/dPKHJd+oLWLxvo7Ae9wrtt3TrDjKHLlboLWDlEyxFEGrl/gMwJiU6x/Inxqc
1/B+P8i6BDebQWXqWOFn6leG/uC4faohRDlmhWRwrk5ddVuzpieQzd7tPVDVB5tx
r+RBLOmU90xAnlscBwIDAQAB
-----END PUBLIC KEY-----`;

export function encrypt(message: string) {
  const encryptor = new JSEncrypt();
  encryptor.setPublicKey(PUBLIC_KEY);
  const encrypted = encryptor.encrypt(message);
  invariant(encrypted, "Encryption failed");
  return encrypted;
}
