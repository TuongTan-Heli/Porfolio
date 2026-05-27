import { animate, motion, useMotionValue } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";

type ExperienceCarouselProps<T> = {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  className?: string;
  prevButtonLabel?: string;
  nextButtonLabel?: string;
  showControls?: boolean;
};

const FADE_PREV =
  "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.2) 25%, rgba(0,0,0,0.5) 55%, black 80%)";
const FADE_NEXT =
  "linear-gradient(to left, transparent 0%, rgba(0,0,0,0.2) 25%, rgba(0,0,0,0.5) 55%, black 80%)";

const SLIDE_TRANSITION = {
  type: "spring" as const,
  stiffness: 42,
  damping: 26,
  mass: 1.5,
};

export default function ExperienceCarousel<T>({
  items,
  renderItem,
  className = "",
  prevButtonLabel = "Previous",
  nextButtonLabel = "Next",
  showControls = true,
}: ExperienceCarouselProps<T>) {
  const n = items.length;
  const canNavigate = n > 1;

  const cardMeasureRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const gapPx = 36;
  //space between cards is 36px, so step is card width + gap
  const stepPx = cardWidth + gapPx;
  const centerOffset = (viewportWidth - cardWidth) / 2;
  //card should be started at center, so offset by center - index * step
  const xForIndex = (idx: number) => centerOffset - idx * stepPx;

  const trackX = useMotionValue(0);
  const hasPositioned = useRef(false);

  useEffect(() => {
    setActiveIndex(0);
    hasPositioned.current = false;
  }, [items]);

  useEffect(() => {
    const cardEl = cardMeasureRef.current;
    const viewEl = viewportRef.current;
    if (!cardEl || !viewEl) return;

    const update = () => {
      setCardWidth(cardEl.getBoundingClientRect().width);
      setViewportWidth(viewEl.getBoundingClientRect().width);
    };
    update();

    const ro = new ResizeObserver(() => update());
    ro.observe(cardEl);
    ro.observe(viewEl);
    return () => ro.disconnect();
  }, []);

  // Animate from current position — never snap with trackX.set() before animating
  useEffect(() => {
    if (cardWidth === 0) return;
    const target = xForIndex(activeIndex);

    //
    if (!hasPositioned.current) {
      trackX.set(target);
      hasPositioned.current = true;
      return;
    }

    const controls = animate(trackX, target, SLIDE_TRANSITION);
    return () => controls.stop();
  }, [activeIndex, cardWidth, viewportWidth, centerOffset, stepPx]);

  const goPrev = () => setActiveIndex((p) => Math.max(0, p - 1));
  const goNext = () => setActiveIndex((p) => Math.min(n - 1, p + 1));
  const atStart = activeIndex === 0;
  const atEnd = activeIndex === n - 1;

  const dragBounds = useMemo(() => {
    if (!canNavigate || cardWidth === 0) return { left: 0, right: 0 };
    return { left: xForIndex(n - 1), right: xForIndex(0) };
  }, [canNavigate, n, stepPx, cardWidth, centerOffset]);

  const getFadeWrapperStyle = (idx: number): CSSProperties => {
    const rel = idx - activeIndex;
    const base: CSSProperties = {
      width: "100%",
      WebkitMaskSize: "100% 100%",
      maskSize: "100% 100%",
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat",
    };

    if (rel === -1) {
      return {
        ...base,
        WebkitMaskImage: FADE_PREV,
        maskImage: FADE_PREV,
      };
    }
    if (rel === 1) {
      return {
        ...base,
        WebkitMaskImage: FADE_NEXT,
        maskImage: FADE_NEXT,
      };
    }
    return base;
  };

  if (n === 0) return null;

  return (
    <div className={`relative w-full ${className}`}>
      {canNavigate && showControls && (
        <>
          <button
            type="button"
            aria-label={prevButtonLabel}
            onClick={goPrev}
            disabled={atStart}
            className={`fixed left-0 top-0 h-svh w-12 z-50 lg:block sm:hidden flex items-center justify-center text-white backdrop-blur-sm transition-opacity duration-200 ${
              atStart ? "opacity-20 cursor-not-allowed" : "opacity-80 hover:opacity-100"
            }`}
            style={{ background: "linear-gradient(90deg, rgba(0,0,0,0.35), rgba(0,0,0,0))" }}
          >
            <span className="select-none font-semibold tracking-tight">{`<`}</span>
          </button>
          <button
            type="button"
            aria-label={nextButtonLabel}
            onClick={goNext}
            disabled={atEnd}
            className={`fixed right-0 top-0 h-svh w-12 z-50 lg:block sm:hidden flex items-center justify-center text-white backdrop-blur-sm transition-opacity duration-200 ${
              atEnd ? "opacity-20 cursor-not-allowed" : "opacity-80 hover:opacity-100"
            }`}
            style={{ background: "linear-gradient(270deg, rgba(0,0,0,0.35), rgba(0,0,0,0))" }}
          >
            <span className="select-none font-semibold tracking-tight">{`>`}</span>
          </button>
        </>
      )}

      <div ref={cardMeasureRef} className="w-full">
        <div
          ref={viewportRef}
          className="relative -mx-12 w-[calc(100%+6rem)] overflow-visible"
        >
          <motion.div
            className="flex touch-pan-y"
            style={{ x: trackX, gap: `${gapPx}px`, touchAction: "pan-y" }}
            drag={canNavigate ? "x" : false}
            dragConstraints={dragBounds}
            dragElastic={0.06}
            dragMomentum={false}
            onDragEnd={(_, info) => {
              if (!canNavigate) return;
              const { offset, velocity } = info;
              const swiped =
                Math.abs(offset.x) > Math.min(80, stepPx * 0.15) ||
                Math.abs(velocity.x) > 380;

              if (swiped) {
                if (offset.x < 0 && !atEnd) goNext();
                else if (offset.x > 0 && !atStart) goPrev();
                else animate(trackX, xForIndex(activeIndex), SLIDE_TRANSITION);
                return;
              }

              const offsetX = centerOffset - trackX.get();
              const nearest = Math.max(
                0,
                Math.min(n - 1, Math.round(offsetX / stepPx))
              );
              setActiveIndex(nearest);
            }}
          >
            {items.map((item, idx) => (
              <div key={idx} className="shrink-0" style={{ width: cardWidth }}>
                <div style={getFadeWrapperStyle(idx)}>{renderItem(item, idx)}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
