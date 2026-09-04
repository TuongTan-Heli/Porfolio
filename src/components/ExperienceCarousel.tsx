import { useEffect, useState } from "react";
import ExperienceItem from "./ExperienceItem";

type ExperienceCarouselProps<T> = {
  items: T[];
  className?: string;
  prevButtonLabel?: string;
  nextButtonLabel?: string;
  showControls?: boolean;
};


export default function ExperienceCarousel<T>({
  items,
  className = "",
  prevButtonLabel = "Previous",
  nextButtonLabel = "Next",
  showControls = true,
}: ExperienceCarouselProps<T>) {

  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    setActiveIndex(0);
  }, [items]);

  const goPrev = () => {
    if (activeIndex === 0) return;

    setDirection(-1);
    setActiveIndex((p) => Math.max(0, p - 1));
  };
  const goNext = () => {
    if (activeIndex === items.length - 1) return;

    setDirection(1);
    setActiveIndex((p) => Math.min(items.length - 1, p + 1));
  };

  const selectItem = (index: number) => {
    if (index === activeIndex) return;

    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  if (!items.length) {
    return null;
  }


  return (
    <section className={`${className}`}>
      <div className="flex gap-2 overflow-hidden">
        {items.map((item, index) => {
          const isActive = index === activeIndex;

          return (
            <ExperienceItem
              key={`${(item as any).id}-${index}`}
              exp={item}
              index={index}
              isActive={isActive}
              direction={direction}
              setActiveIndex={selectItem}
              goPrev={goPrev}
              goNext={goNext}
            />
          );
        })}
      </div>


      {/* Controls */}
      {showControls && items.length > 1 && (
        <div className="mt-5 flex items-center justify-center">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={goPrev}
              disabled={activeIndex === 0}
              className="
                rounded-full
                border border-neutral-800
                px-4 py-2
                text-sm text-neutral-400
                transition
                hover:border-neutral-600
                hover:text-white
                disabled:cursor-not-allowed
                disabled:opacity-30
              "
            >
              ← {prevButtonLabel}
            </button>

            <button
              type="button"
              onClick={goNext}
              disabled={activeIndex === items.length - 1}
              className="
                rounded-full
                border border-neutral-800
                px-4 py-2
                text-sm text-neutral-400
                transition
                hover:border-neutral-600
                hover:text-white
                disabled:cursor-not-allowed
                disabled:opacity-30
              "
            >
              {nextButtonLabel} →
            </button>
          </div>

          {/* Position */}
          <span className="text-xs text-neutral-600">
            {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(items.length).padStart(2, "0")}
          </span>
        </div>
      )}
    </section>
  );
}
