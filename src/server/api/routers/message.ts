import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { messages } from "@/server/db/schema";

export const messageRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ senderEmail: z.string().email(), message: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return ctx.db.insert(messages).values({
        senderEmail: input.senderEmail,
        encryptedMessage: input.message,
      });
    }),
});
