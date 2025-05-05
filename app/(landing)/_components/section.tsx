import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

export type SectionProps = PropsWithChildren<{ className?: string }>;

export const Section = (props: SectionProps) => {
  return (
    <section className={cn(props.className)}>
      <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
        {props.children}
      </div>
    </section>
  );
};
