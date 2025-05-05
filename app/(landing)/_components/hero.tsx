import React from "react";
import { Section } from "./section";
import { WaitlistButton } from "./waitlist-button";
import Image from "next/image";

export default function HeroSection() {
  return (
    <Section>
      {/* <Button className="relative px-8 py-6 bg-zinc-900 text-white font-medium rounded-full border-0 hover:bg-zinc-800 transform translate-y-[-4px] translate-x-[-4px]"></Button> */}
      <div className="mb-3 inline-flex items-center px-3 py-1 rounded-full border border-gray-300 bg-white">
        <span className="text-xl mr-1">😀</span>
        <span className="text-black font-medium">Sans carte de membre</span>
      </div>
      <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none  text-gray-900  md:text-5xl lg:text-6xl dark:text-white">
        Commandez vos boissons préférées en gros livrées chez vous.
      </h1>
      <p className="mb-8 text-lg font-normal text-gray-500 lg:text-2xl sm:px-16 xl:px-48 dark:text-gray-400">
        Gazeuses, sportives, jus et bières en packs pour la maison comme pour
        vos événements.
      </p>
      <WaitlistButton />
      <div className="mt-10 flex justify-center">
        <Image
          src="/img/grospack-img.png"
          width={400}
          height={400}
          alt="App image"
          className="rounded-xl shadow-lg"
          quality={100} // améliore la qualité
        />
      </div>
    </Section>
  );
}
