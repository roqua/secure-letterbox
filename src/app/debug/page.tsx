import Image from "next/image";
import Logo from "../../../public/roqua.svg";
import { DecryptForm } from "./decrypt_form";
import { EncryptForm } from "./encrypt_form";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center overflow-y-scroll text-white">
      <div className="container flex flex-col items-center justify-center gap-4 px-4 py-4 ">
        <Image src={Logo as string} alt="RoQua" width={200} height={200} />
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Secure Letterbox
        </h1>
      </div>
      <div className="flex w-full gap-4 p-4">
        <EncryptForm />
        <DecryptForm />
      </div>
    </main>
  );
}
