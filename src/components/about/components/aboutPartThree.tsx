import { RefObject } from "react";
import Scene from "../threeJs/scene";

export default function AboutPartThree({
  refSection,
}: {
  refSection: RefObject<HTMLDivElement | null>;
}) {
  return (
    <div className="bg-[#ebebeb] h-full mid-about-1">
      <div className="h-[1000vh] w-screen relative">
        <div className="w-full h-screen sticky top-0 opacity-0 opacity-handler">
          <Scene refSection={refSection} />
        </div>
      </div>
    </div>
  );
}
