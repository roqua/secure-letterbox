import { env } from "@/env";

export async function sendEmail(to: string, subject: string, html: string) {
  // ...
  await fetch("https://api.eu.sparkpost.com/api/v1/transmissions", {
    method: "POST",
    headers: {
      Authorization: env.SPARKPOST_API_KEY,
      ContentType: "application/json",
    },
    body: JSON.stringify({
      recipients: [{ address: { email: to } }],
      content: {
        from: { name: "RoQua Secure Letterbox", email: "noreply@roqua.nl" },
        subject: "RoQua Secure Letterbox - " + subject,
        html: html,
      },
    }),
  });
}
