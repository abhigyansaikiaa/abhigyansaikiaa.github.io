import React from "react";
import { Timeline } from "@/components/ui/timeline";
import { FeatureCard } from "./features";
import PhraseAnimation from "@/components/common/phrase-reveal";

export function TimelineDemo() {
  const data = [
    {
      title: "SaaS Product Video Editing",
      content: (
        <div>
          <h3 className="text-xs font-normal text-neutral-800 md:text-3xl dark:text-neutral-200">
            <PhraseAnimation phrase="Showcase  Your  Product  in  Motion" />
          </h3>
          <p className="mb-8 text-xs text-muted-foreground md:text-lg mt-1.5">
            <PhraseAnimation phrase="Transform your SaaS product into captivating demo videos. From feature highlights to onboarding tutorials, we create motion edits that convert viewers into customers and drive product adoption." />
          </p>
          <div className="mx-auto grid gap-4 lg:grid-cols-2">
            <FeatureCard className="p-0 w-full">
              <iframe
                src="https://www.youtube.com/embed/eJDezE1DYPY?si=S70ttnnq2b5Yljj5"
                loading="lazy"
                title="YouTube video player"
                frameBorder={0}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="aspect-[20/16]"
              ></iframe>
            </FeatureCard>

            <FeatureCard className="p-0 w-full">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/ll8A79dL4NM?si=RuhQhcfA99L2XFNv"
                loading="lazy"
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
                height="250"
                src="https://www.youtube.com/embed/5tZu_mHkBCY?si=2aP9aBEoXgL8RLL3"
                loading="lazy"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </FeatureCard>
          </div>
        </div>
      ),
    },
    {
      title: "2D Animation & Storytelling ",
      content: (
        <div>
          <h3 className="text-xs font-normal text-neutral-800 md:text-3xl dark:text-neutral-200">
            <PhraseAnimation phrase="Bringing  Stories  To  Motion" />
          </h3>
          <p className="mb-8 text-xs text-muted-foreground md:text-lg mt-1.5">
            <PhraseAnimation phrase="From original stories to scroll-stopping brand ads, transform concepts into 2D animations that simplify your message and capture your audience's attention instantly." />
          </p>
          <div className="mx-auto grid gap-4 lg:grid-cols-2">
            <FeatureCard className="p-0 w-full">
              <iframe
                src="https://www.youtube.com/embed/dn-T3-YFZtw?si=8RA6BBkXCjqZXMjk"
                loading="lazy"
                title="YouTube video player"
                frameBorder={0}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="aspect-[20/16]"
              ></iframe>
            </FeatureCard>

            <FeatureCard className="p-0 w-full">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/WF-f7H6TIhQ?si=kX0IbsybYUaeg0BM"
                loading="lazy"
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
                height="250"
                src="https://www.youtube.com/embed/Ku8pZH4Ll28?si=wVxyHvtJhHuLAtMP"
                loading="lazy"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </FeatureCard>
          </div>
        </div>
      ),
    },
    // {
    //   title: "High-Impact Reels  for  Real Growth",
    //   content: (
    //     <div>
    //       <h3 className="text-xs font-normal text-neutral-800 md:text-3xl dark:text-neutral-200">
    //         <PhraseAnimation phrase="Fast.   Clean.   Hooked  from  the  first  second" />
    //       </h3>
    //       <p className="mb-8 text-xs text-muted-foreground md:text-lg mt-1.5">
    //         <PhraseAnimation phrase="fast, clean 2D reels designed to win the first second. Every edit is focused on holding attention and driving growth for your channel or brand." />
    //       </p>
    //       <div className="mx-auto grid gap-4 lg:grid-cols-3">
    //         <FeatureCard className="p-0 w-full">
    //           <div>
    //             <iframe
    //               loading="lazy"
    //               title="Youtube Video"
    //               src="https://www.youtube.com/embed/OlR9TWUJlSM"
    //               frameBorder="0"
    //               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    //               allowFullScreen
    //               className="w-full aspect-[9/16]"
    //             />
    //           </div>
    //         </FeatureCard>

    //         <FeatureCard className="p-0 w-full">
    //           <iframe
    //             width="100%"
    //             height="100%"
    //             src="https://www.youtube.com/embed/CpAIy_TVZqo"
    //             title="YouTube video player"
    //             frameBorder="0"
    //             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    //             referrerPolicy="strict-origin-when-cross-origin"
    //             allowFullScreen
    //           ></iframe>
    //         </FeatureCard>

    //         <FeatureCard className="p-0 w-full">
    //           <iframe
    //             width="100%"
    //             height="100%"
    //             src="https://www.youtube.com/embed/-h2KSW2kpxE"
    //             title="YouTube video player"
    //             frameBorder="0"
    //             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    //             referrerPolicy="strict-origin-when-cross-origin"
    //             allowFullScreen
    //             className="w-full aspect-[9/16]"
    //           ></iframe>
    //         </FeatureCard>
    //         {/* <FeatureCard className="p-0 w-full">
    //           <iframe
    //             width="100%"
    //             height="100%"
    //             src="https://www.youtube.com/embed/mvPQwLOXbB4"
    //             title="YouTube video player"
    //             frameBorder="0"
    //             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    //             referrerPolicy="strict-origin-when-cross-origin"
    //             allowFullScreen
    //             className="w-full aspect-[9/16]"
    //           ></iframe>
    //         </FeatureCard> */}
    //       </div>
    //     </div>
    //   ),
    // },
    // {
    //   title: "Our Video Editing Process",
    //   content: (
    //     <div>
    //       <img
    //         src="https://framerusercontent.com/images/3j4k9lOKgq5gCTabInH0bUlT0I.png?scale-down-to=2048"
    //         alt=""
    //       />
    //     </div>
    //   ),
    // },
  ];
  return (
    <div className="relative w-full overflow-clip mt-10">
      <Timeline data={data} />
    </div>
  );
}
