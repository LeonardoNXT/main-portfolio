import useAboutSectionAnimation from "./hooks/useAboutSectionAnimation";
import { Dispatch, RefObject, SetStateAction, useRef } from "react";
import AboutPartOne from "./components/aboutPartOne";
import AboutPartTwo from "./components/aboutPartTwo";
import AboutPartThree from "./components/aboutPartThree";
import useSize from "@/app/hooks/useSize";

export default function AboutSectionComponent({
  lightRaysActive,
  LightRaysRef,
  NoiseRef,
  setNoiseIsActive,
  setLightRaysActive,
}: {
  LightRaysRef: RefObject<HTMLDivElement | null>;
  NoiseRef: RefObject<HTMLDivElement | null>;
  setNoiseIsActive: Dispatch<SetStateAction<boolean>>;
  setLightRaysActive: Dispatch<SetStateAction<boolean>>;
  lightRaysActive: boolean;
}) {
  const contextRefAboutSection = useRef<HTMLDivElement | null>(null);

  const size = useSize();

  // Passar a uniformsRef para o hook do GSAP
  useAboutSectionAnimation(
    contextRefAboutSection,
    LightRaysRef,
    NoiseRef,
    size
  );

  return (
    <section ref={contextRefAboutSection}>
      <AboutPartOne
        setLightRaysActive={setLightRaysActive}
        state={lightRaysActive}
        heightScreen={size.height}
      />
      <AboutPartTwo setNoiseIsActive={setNoiseIsActive} size={size} />
      {contextRefAboutSection.current && (
        <AboutPartThree refSection={contextRefAboutSection} />
      )}
    </section>
  );
}
