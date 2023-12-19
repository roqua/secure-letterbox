"use client";

import { useState } from "react";

import { PUBLIC_KEY, encrypt } from "@/app/_components/encryptor";

export function EncryptForm() {
  const [message, setMessage] = useState("");
  const [key, setKey] = useState(PUBLIC_KEY);

  return (
    <div className="flex w-1/2 flex-col gap-8 divide-y">
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="flex flex-col gap-2"
      >
        <textarea
          placeholder="Public key"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          className="h-64 w-full rounded-md px-4 py-2 text-black"
        />
        <textarea
          placeholder="Your secret message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="h-64 w-full rounded-md px-4 py-2 text-black"
        />
      </form>
      <div className="flex flex-col gap-4 bg-white/10 p-8">
        <div>
          <div className="mt-4 w-full break-all font-mono">
            {message && encrypt(message)}
          </div>
        </div>
      </div>
    </div>
  );
}
