import { Dispatch, SetStateAction, useEffect } from "react";
import { Bidimension } from "../scene";

export default function useOffset(
  setOffset: Dispatch<SetStateAction<Bidimension>>
) {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const middleWidth = window.innerWidth / 2;
      const middlePX = e.clientX - middleWidth;
      const middleHeight = window.innerHeight / 2;
      const middlePY = e.clientY - middleHeight;

      setOffset({
        x: middlePX / middleWidth / 5,
        y: middlePY / middleHeight / 5,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // cleanup → remove listener quando o componente desmontar
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [setOffset]);
}
