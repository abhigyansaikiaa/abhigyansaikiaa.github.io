import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export default function Features() {
  return (
    <section className=" py-16 md:py-32 dark:bg-transparent">
      <h2 className="text-center text-5xl font-semibold mb-10">
        Bringing Stories To Motion
      </h2>
      <p className="text-muted-foreground mx-auto text-center mb-2 text-xl">
        2d animation projects
      </p>
      <p className="text-muted-foreground max-w-md text-center mx-auto mb-16 px-6 lg:max-w-3xl">
        From brand ads to explainer videos, educational content to original
        stories, our 2D animations are designed to do more than just look good.
        They simplify, engage, and leave an impression.
      </p>
      <div className="mx-auto max-w-2xl px-6 lg:max-w-5xl">
        <div className="mx-auto grid gap-4 lg:grid-cols-2">
          <FeatureCard className="p-0 w-full">
            <iframe
              width="100%"
              height="500px"
              src="https://www.youtube.com/embed/dn-T3-YFZtw?si=8RA6BBkXCjqZXMjk"
              title="YouTube video player"
              frameBorder={0}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="aspect-76/59"
            ></iframe>
          </FeatureCard>

          <FeatureCard className="p-0 w-full">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/WF-f7H6TIhQ?si=kX0IbsybYUaeg0BM"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </FeatureCard>

          <FeatureCard className="p-0 w-full lg:col-span-2">
            <iframe
              width="100%"
              height="315"
              src="https://www.youtube.com/embed/Ku8pZH4Ll28?si=wVxyHvtJhHuLAtMP"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </FeatureCard>
        </div>
      </div>
    </section>
  );
}

interface FeatureCardProps {
  children: ReactNode;
  className?: string;
}

export const FeatureCard = ({ children, className }: FeatureCardProps) => (
  <Card
    className={cn("group relative rounded-none shadow-zinc-950/5", className)}
  >
    <CardDecorator />
    {children}
  </Card>
);

const CardDecorator = () => (
  <>
    <span className="border-primary absolute -left-0.5 -top-0.5 block size-2 border-l-2 border-t-2"></span>
    <span className="border-primary absolute -right-0.5 -top-0.5 block size-2 border-r-2 border-t-2"></span>
    <span className="border-primary absolute -bottom-0.5 -left-0.5 block size-2 border-b-2 border-l-2"></span>
    <span className="border-primary absolute -bottom-0.5 -right-0.5 block size-2 border-b-2 border-r-2"></span>
  </>
);
