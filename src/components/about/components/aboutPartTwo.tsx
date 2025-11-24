export default function AboutPartTwo() {
  return (
    <div className="relative">
      <div className="w-full h-[580vh] font-aeonik  flex-col bg-[#000] relative init-about">
        <div className="w-screen sticky flex justify-center items-center h-screen top-0">
          <div className="w-full h-full  grid grid-cols-20 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="w-full h-full bg-gradient-to-b bg-[#000] relative border-x-1 border-[#0a0a0a] lines-3"
              ></div>
            ))}
          </div>
          <div className="absolute w-screen h-screen overflow-hidden">
            <div className="absolute w-full h-full circle-content overflow-hidden">
              <svg
                width="full"
                height="full"
                viewBox="0 0 200 200"
                className="absolute rotate-90"
              >
                <circle
                  className="circle "
                  cx="100"
                  cy="100"
                  r="10"
                  stroke="#0a0a0a"
                  strokeWidth="0.4"
                  fill="none"
                />
              </svg>
              <svg
                width="full"
                height="full"
                viewBox="0 0 200 200"
                className="absolute rotate-90"
              >
                <circle
                  className="circle "
                  cx="100"
                  cy="100"
                  r="40"
                  stroke="#0a0a0a"
                  strokeWidth="0.4"
                  fill="none"
                />
              </svg>
              <svg
                width="full"
                height="full"
                viewBox="0 0 200 200"
                className="absolute rotate-90"
              >
                <circle
                  className="circle"
                  cx="100"
                  cy="100"
                  r="80"
                  stroke="#0a0a0a"
                  strokeWidth="0.4"
                  fill="none"
                />
              </svg>
            </div>
          </div>

          <div className=" flex justify-center items-center w-screen h-screen absolute overflow-hidden">
            <div className="absolute w-0 aspect-square bg-[#0a0a0a] rounded-full circle-fill z-10"></div>
            <div className="absolute w-0 aspect-square bg-[#030303] rounded-full circle-fill z-10"></div>
            <div className="absolute w-0 aspect-square bg-[#000] rounded-full circle-fill circle-transition z-10"></div>
            <p className="text-[#333] absolute z-15 text-5xl opacity font-canopee welcome">
              Cada projeto começa com uma história.
            </p>

            <div className=""></div>
            <div className="absolute w-full h-full" aria-hidden="true">
              <p
                aria-hidden="true"
                className="text-[5vw] text-[#111] absolute bottom-[0px] z-10 left-50 font-migra w-max spin-slow letter-1 translate-[100%] opacity-0"
              >
                N
              </p>
              <p
                aria-hidden="true"
                className="text-[5vw] text-[#222] absolute bottom-0 z-10 right-50 font-migra spin-slow letter-2 translate-[100%] opacity-0"
              >
                w
              </p>
              <p
                aria-hidden="true"
                className="text-[5vw] text-[#000] bottom-0 absolute w-max left-1/2 z-10 translate-x-[-50%] font-migra spin-mid letter-3 translate-[100%] opacity-0"
              >
                a
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
