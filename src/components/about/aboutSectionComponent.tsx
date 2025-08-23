import useAboutSectionAnimation from "./hooks/useAboutSectionAnimation";

import { RefObject, useRef } from "react";

export default function AboutSectionComponent({
  LightRaysRef,
}: {
  LightRaysRef: RefObject<HTMLDivElement | null>;
}) {
  const contextRefAboutSection = useRef<HTMLDivElement | null>(null);
  useAboutSectionAnimation(contextRefAboutSection, LightRaysRef);
  return (
    <section ref={contextRefAboutSection}>
      <div className="w-full h-[300vh] bg-[#000000] relative aboutsection">
        <div className="w-full h-screen sticky top-0 left-0 flex justify-center items-center">
          <p className="text-[20vw] font-canopee text-[#ffffff3a] opacity-0 abouttext">
            About
          </p>
        </div>
      </div>
    </section>
  );
}
