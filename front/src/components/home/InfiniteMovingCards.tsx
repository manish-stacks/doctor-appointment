import { CSSProperties, useEffect, useRef, useState } from "react";

interface infinite {
  items: {
    image: string;
    name: string;
    role: string;
    text: string;
  }[];
  direction: string;
  speed: string;
}
export function InfiniteMovingCards({ items, direction = "left", speed = "fast" }: infinite) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  }, []);

  const [start, setStart] = useState(false);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      setStart(true);
    }
  }

  const speedValue = {
    fast: 20,
    normal: 40,
    slow: 60,
  }[speed] ?? 40;

  return (
    <div
      ref={containerRef}
      className="scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]"
    >
      <ul
        ref={scrollerRef}
        className={`flex min-w-full gap-4 py-4 w-max ${start ? "animate-scroll" : ""
          }`}
        style={{
          "--duration": `${speedValue}s`,
          "--direction": direction === "left" ? "forwards" : "reverse",
        } as CSSProperties}
      >
        {items.map((testimonial, idx) => (
          <li
            key={idx}
            className="w-[350px] max-w-full relative rounded-lg border flex-shrink-0 border-slate-700 px-8 py-6 md:w-[450px] bg-white"
            style={{
              background: "linear-gradient(180deg, var(--slate-800), var(--slate-900))",
            }}
          >
            <blockquote>
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="rounded-full w-12 h-12 object-cover"
                />
                <div>
                  <p className="text-lg font-semibold text-gray-800">{testimonial.name}</p>
                  <p className="text-gray-500">{testimonial.role}</p>
                </div>
              </div>
              <p className="mt-4 text-gray-600">"{testimonial.text}"</p>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
}