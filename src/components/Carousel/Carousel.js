import React, { useEffect, useMemo, useState, useCallback, useRef } from "react";
import styled from "styled-components";

// components
import { CodeBlockWithCopy } from "../Code/Code";

// animations
import SlideInBottom from "../../animations/SlideInBottom";

const Wrapper = styled.section`
  margin: 2.2rem 0;
  background: ${({ theme }) => theme.background};
  border-radius: 1.5rem;
  border: 2px solid ${({ theme }) => theme.secondary};
  overflow: hidden;
  animation: ${SlideInBottom} 0.5s forwards;
`;

const Header = styled.div`
  padding: 1.8rem 1.8rem 0;
`;

const Intro = styled.div`
  padding-left: 2rem;
  border-left: 4px solid ${({ theme }) => theme.secondary};
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.2rem;
`;

const Title = styled.div`
  color: ${({ theme }) => theme.text};
  font-size: clamp(1.8rem, 2.2vw, 2.3rem);
  font-weight: 600;
  line-height: 1.6;

  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Count = styled.div`
  flex-shrink: 0;
  color: ${({ theme }) => theme.text};
  opacity: 0.7;
  font-size: 1.3rem;
  white-space: nowrap;

  border: 2px solid ${({ theme }) => theme.secondary};
  border-radius: 1.2rem;
  padding: 0.4rem 0.8rem;
`;

const Description = styled.div`
  color: ${({ theme }) => theme.text};
  opacity: 0.9;
  font-size: clamp(1.6rem, 1.8vw, 1.9rem);
  line-height: 2.3;
  margin-top: 0.6rem;
`;

const Stage = styled.div`
  position: relative;
  padding: 1.4rem 6.2rem 1.8rem;
  outline: none;

  @media only screen and (max-width: 700px) {
    padding: 1.2rem 5.4rem 1.6rem;
  }
`;

const Viewport = styled.div`
  overflow: hidden;
  border-radius: 1.2rem;

  height: ${({ $height }) => ($height ? `${$height}px` : "auto")};
  transition: height 240ms ease;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const Track = styled.div`
  display: flex;
  width: 100%;
  transform: translateX(${({ $index }) => `-${$index * 100}%`});
  will-change: transform;

  transition: transform 240ms ease;

  align-items: flex-start;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const Slide = styled.div`
  flex: 0 0 100%;
  width: 100%;
`;

const CodeFrame = styled.div`
  border-radius: 1.2rem;

  & > * {
    width: 100%;
  }

  & pre {
    margin: 0;
  }
`;

const ImageFrame = styled.div`
  border-radius: 1.2rem;
  overflow: hidden;

  & img {
    width: 100%;
    height: auto;
    display: block;

    object-fit: contain;
    image-rendering: auto;
  }
`;

const NavBtn = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);

  width: 4.2rem;
  height: 4.2rem;
  border-radius: 999px;

  border: 2px solid ${({ theme }) => theme.secondary};
  background: transparent;
  color: ${({ theme }) => theme.text};

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 2rem;
  cursor: pointer;

  z-index: 10;

  box-shadow:
    0 10px 26px rgba(0, 0, 0, 0.22),
    0 2px 8px rgba(0, 0, 0, 0.16);

  transition:
    transform 160ms ease,
    box-shadow 160ms ease,
    opacity 160ms ease,
    background-color 160ms ease;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: ${({ theme }) => theme.secondary};
    opacity: 0.12;
    pointer-events: none;
  }

  & > span {
    position: relative;
    z-index: 1;
    line-height: 1;
    transform: translateY(-0.05em);
  }

  &:hover {
    transform: translateY(-50%) translateY(-2px);
    box-shadow:
      0 14px 34px rgba(0, 0, 0, 0.26),
      0 4px 12px rgba(0, 0, 0, 0.18);
  }

  &:active {
    transform: translateY(-50%) translateY(0px);
    box-shadow:
      0 8px 18px rgba(0, 0, 0, 0.22),
      0 2px 8px rgba(0, 0, 0, 0.14);
  }

  &:focus-visible {
    outline: none;
    box-shadow:
      0 0 0 0.3rem ${({ theme }) => theme.secondary},
      0 10px 26px rgba(0, 0, 0, 0.22);
  }

  &:disabled {
    opacity: 0.35;
    cursor: not-allowed;
    transform: translateY(-50%);
    box-shadow:
      0 6px 16px rgba(0, 0, 0, 0.16),
      0 1px 5px rgba(0, 0, 0, 0.12);
  }

  @media only screen and (max-width: 700px) {
    width: 3.8rem;
    height: 3.8rem;
    font-size: 1.8rem;
  }
`;

const PrevBtn = styled(NavBtn)`
  left: 1rem;
`;

const NextBtn = styled(NavBtn)`
  right: 1rem;
`;

const Carousel = ({ items = [], initialIndex = 0 }) => {
  const safeItems = useMemo(() => items ?? [], [items]);

  const [index, setIndex] = useState(() => {
    const max = Math.max(0, (items?.length ?? 0) - 1);
    return Math.max(0, Math.min(initialIndex, max));
  });

  const slideRefs = useRef([]);
  const [viewportHeight, setViewportHeight] = useState(null);

  useEffect(() => {
    setIndex((prev) => Math.max(0, Math.min(prev, safeItems.length - 1)));
  }, [safeItems.length]);

  const measureActive = useCallback(() => {
    const el = slideRefs.current[index];
    if (!el) return;

    const next = Math.ceil(el.scrollHeight);
    setViewportHeight((prev) => (prev === next ? prev : next));
  }, [index]);

  useEffect(() => {
    if (!safeItems.length) return;

    const el = slideRefs.current[index];
    if (!el) return;

    const raf = requestAnimationFrame(measureActive);

    const ro = new ResizeObserver(() => measureActive());
    ro.observe(el);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [index, safeItems.length, measureActive]);

  const canPrev = index > 0;
  const canNext = index < safeItems.length - 1;

  const goPrev = useCallback(() => {
    setIndex((i) => Math.max(0, i - 1));
  }, []);

  const goNext = useCallback(() => {
    setIndex((i) => Math.min(safeItems.length - 1, i + 1));
  }, [safeItems.length]);

  const goHome = useCallback(() => setIndex(0), []);
  const goEnd = useCallback(
    () => setIndex(Math.max(0, safeItems.length - 1)),
    [safeItems.length]
  );

  const onKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      goPrev();
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      goNext();
    }
    if (e.key === "Home") {
      e.preventDefault();
      goHome();
    }
    if (e.key === "End") {
      e.preventDefault();
      goEnd();
    }
  };

  if (!safeItems.length) return null;

  const active = safeItems[index] || {};

  return (
    <Wrapper>
      <Header>
        <Intro>
          <HeaderRow>
            <Title>{active.title || `Snippet ${index + 1}`}</Title>
            <Count>
              {index + 1} / {safeItems.length}
            </Count>
          </HeaderRow>
          {active.description ? <Description>{active.description}</Description> : null}
        </Intro>
      </Header>

      <Stage tabIndex={0} onKeyDown={onKeyDown} aria-label="Carousel" role="region">
        <PrevBtn type="button" onClick={goPrev} disabled={!canPrev} aria-label="Previous">
          <span>←</span>
        </PrevBtn>

        <Viewport $height={viewportHeight}>
          <Track $index={index}>
            {safeItems.map((item, idx) => (
              <Slide key={item.id ?? idx} ref={(el) => (slideRefs.current[idx] = el)}>
                <CodeFrame>
                  {item?.src ? (
                    <ImageFrame>
                      <img
                        src={item.src}
                        alt={item.alt || item.title || `Slide ${idx + 1}`}
                        loading="lazy"
                      />
                    </ImageFrame>
                  ) : (
                    <CodeBlockWithCopy code={item.code} />
                  )}
                </CodeFrame>
              </Slide>
            ))}
          </Track>
        </Viewport>

        <NextBtn type="button" onClick={goNext} disabled={!canNext} aria-label="Next">
          <span>→</span>
        </NextBtn>
      </Stage>
    </Wrapper>
  );
};

export default Carousel;
