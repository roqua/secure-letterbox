import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const messageRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ senderEmail: z.string().email(), message: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return ctx.db.message.create({
        data: {
          senderEmail: input.senderEmail,
          encryptedMessage: input.message
        },
      });
    }),
});
