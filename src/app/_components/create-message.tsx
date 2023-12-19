"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "@/trpc/react";

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
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createMessage.mutate({ senderEmail: email, message });
      }}
      className="flex flex-col gap-2"
    >
      <input
        type="email"
        placeholder="Your email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full rounded-full px-4 py-2 text-black"
      />
      <input
        type="text"
        placeholder="Your secret message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full rounded-full px-4 py-2 text-black"
      />
      <button
        type="submit"
        className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
        disabled={createMessage.isLoading}
      >
        {createMessage.isLoading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
