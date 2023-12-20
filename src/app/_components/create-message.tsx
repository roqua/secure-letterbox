"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "@/trpc/react";
import { PUBLIC_KEY, encrypt } from "./encryptor";

export function CreatePost() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const createMessage = api.message.create.useMutation({
    onSuccess: () => {
      router.refresh();
      setEmail("");
      setMessage("");
    },
  });

  return (
    <div className="flex w-1/2 flex-col gap-8 divide-y">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createMessage.mutate({
            senderEmail: email,
            message: encrypt(message),
          });
        }}
        className="flex flex-col gap-2"
      >
        <input
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-md px-4 py-2 text-black"
        />
        <textarea
          placeholder="Your secret message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="h-64 w-full rounded-md px-4 py-2 text-black"
        />
        <button
          type="submit"
          className="rounded-full bg-white/40 px-10 py-3 font-semibold transition hover:bg-white/20"
          disabled={createMessage.isLoading}
        >
          {createMessage.isLoading ? "Submitting..." : "Send us a message"}
        </button>
      </form>

      <div className="flex flex-col gap-4 bg-white/10 p-8">
        <h2 className="text-xl font-bold">Hoe werkt deze pagina?</h2>
        <div>
          Alle berichten worden versleuteld opgeslagen in de database (uw
          emailadres bewaren we onversleuteld). Hiervoor gebruiken we een
          4096-bits RSA sleutelpaar.
        </div>
        {message && (
          <div>
            Op basis daarvan versleuteld uw bericht naar:
            <div className="mt-4 w-full break-all rounded-md bg-black/20 p-4 font-mono">
              {encrypt(message)}
            </div>
          </div>
        )}
        <div>
          U kunt deze versleutelde waarde opslaan met het formulier hierboven,
          maar u mag dit ook naar ons emailen.
        </div>
        <div>
          U kunt ook zelf versleutelde berichten maken. Onze publieke sleutel
          is:
          <pre className="mt-4 break-all font-mono">{PUBLIC_KEY}</pre>
        </div>
      </div>
    </div>
  );
}
