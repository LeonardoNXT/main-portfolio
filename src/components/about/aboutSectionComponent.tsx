import useAboutSectionAnimation from "./hooks/useAboutSectionAnimation";
import { Dispatch, RefObject, SetStateAction, useRef } from "react";
import AboutPartOne from "./components/aboutPartOne";
import AboutPartTwo from "./components/aboutPartTwo";
import AboutPartThree from "./components/aboutPartThree";

export default function AboutSectionComponent({
  LightRaysRef,
  NoiseRef,
  setNoiseIsActive,
}: {
  LightRaysRef: RefObject<HTMLDivElement | null>;
  NoiseRef: RefObject<HTMLDivElement | null>;
  setNoiseIsActive: Dispatch<SetStateAction<boolean>>;
}) {
  const contextRefAboutSection = useRef<HTMLDivElement | null>(null);

  // Passar a uniformsRef para o hook do GSAP
  useAboutSectionAnimation(contextRefAboutSection, LightRaysRef, NoiseRef);

  return (
    <section ref={contextRefAboutSection}>
      <AboutPartOne />
      <AboutPartTwo setNoiseIsActive={setNoiseIsActive} />
      {contextRefAboutSection.current && (
        <AboutPartThree refSection={contextRefAboutSection} />
      )}
    </section>
  );
}
