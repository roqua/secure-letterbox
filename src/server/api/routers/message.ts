import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { messages } from "@/server/db/schema";
import { sendEmail } from "@/server/mailer";

export const messageRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ senderEmail: z.string().email(), message: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.transaction(async (tx) => {
        const record = await tx
          .insert(messages)
          .values({
            senderEmail: input.senderEmail,
            encryptedMessage: input.message,
          })
          .returning({ insertedId: messages.id });

        await sendEmail(
          input.senderEmail,
          "Message sent",
          "Your message has been sent!",
        );

        await sendEmail(
          "support@roqua.nl",
          `New message from ${input.senderEmail} in secure letterbox: ${record[0]?.insertedId}`,
          "Someone sent a message to the secure letterbox.",
        );
      });
    }),
});
