import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "motion/react";

// helpers
import { Analytics } from "../helpers/analytics";
import {
  allText,
  filterProjectsByTagText,
  nextProjectPageText,
  previousProjectPageText,
  projectsPageStatusText,
} from "../helpers/i18nText";

// data
import { projects } from "../data/projects";
import { tagColors } from "../data/tagColors";

// context
import { LanguageContext } from "../context/languageContext";

// components
import Project from "../components/Project/Project";

// animations
import SlideInBottom from "../animations/SlideInBottom";

const PER_PAGE = 4;

const Container = styled.div`
  padding: 4rem 2rem;
  background: ${({ theme }) => theme.primary};
  animation: ${SlideInBottom} 0.5s forwards;
`;

const PageHeading = styled.h1`
  max-width: 1200px;
  margin: 0 auto 2.4rem;
  font-size: clamp(3rem, 4vw, 4rem);
`;

const FilterBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.8rem;
  margin-bottom: 3.2rem;
`;

const FilterButton = styled.button`
  padding: 0.6rem 1.6rem;
  border-radius: 999px;
  border: 2px solid ${({ $color, theme }) => $color || theme.buttonColour};
  background: ${({ $active, $color, theme }) =>
    $active ? $color || theme.buttonColour : "transparent"};
  color: ${({ $active, $textColor, theme }) =>
    $active ? $textColor || theme.buttonText : theme.text};
  font-size: 1.3rem;
  font-family: inherit;
  font-weight: 600;
  cursor: pointer;
  transition:
    background 0.2s,
    color 0.2s;

  &:hover {
    background: ${({ $color, theme }) => $color || theme.buttonColour};
    color: ${({ $textColor, theme }) => $textColor || theme.buttonText};
  }
`;

const CarouselWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const ArrowButton = styled.button`
  flex-shrink: 0;
  width: 4.4rem;
  height: 4.4rem;
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.buttonColour};
  background: transparent;
  color: ${({ theme }) => theme.text};
  font-size: 0;
  line-height: 1;
  cursor: pointer;
  transition:
    background 0.2s,
    color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.buttonColour};
    color: ${({ theme }) => theme.buttonText};
  }

  &:disabled {
    opacity: 0.2;
    cursor: default;
  }

  &::after {
    content: attr(data-symbol);
    font-size: 2.4rem;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2.4rem;
  flex: 1;

  @media only screen and (max-width: 585px) {
    grid-template-columns: 1fr;
  }
`;

const pageVariants = {
  enter: (dir) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
};

export default function Projects() {
  const language = useContext(LanguageContext);
  const [activeFilter, setActiveFilter] = useState("All");
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    Analytics.event("projects", { slug: "projects-selection" });
  }, []);

  const allTags = ["All", ...new Set(projects.flatMap((p) => p.tags))];

  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.tags.includes(activeFilter));

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const pageItems = filtered.slice(page * PER_PAGE, (page + 1) * PER_PAGE);

  const handleFilter = (tag) => {
    setActiveFilter(tag);
    setPage(0);
  };

  const goNext = () => {
    setDirection(1);
    setPage((p) => p + 1);
  };

  const goPrev = () => {
    setDirection(-1);
    setPage((p) => p - 1);
  };

  return (
    <Container>
      <FilterBar role="toolbar" aria-label={filterProjectsByTagText(language)}>
        {allTags.map((tag) => (
          <FilterButton
            key={tag}
            type="button"
            $active={activeFilter === tag}
            $color={tagColors[tag]?.bg}
            $textColor={tagColors[tag]?.text}
            onClick={() => handleFilter(tag)}
            aria-pressed={activeFilter === tag}
          >
            {tag === "All" ? allText(language) : tag}
          </FilterButton>
        ))}
      </FilterBar>
      <CarouselWrapper aria-live="polite">
        <ArrowButton
          data-symbol="<"
          type="button"
          onClick={goPrev}
          disabled={page === 0}
          aria-label={previousProjectPageText(language)}
        >
          ‹
        </ArrowButton>
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={`${activeFilter}-${page}`}
            aria-label={projectsPageStatusText(
              language,
              page + 1,
              Math.max(totalPages, 1),
            )}
            custom={direction}
            variants={pageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25 }}
            style={{ flex: 1 }}
          >
            <Grid>
              {pageItems.map((p, i) => (
                <motion.div
                  key={p.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.07 }}
                >
                  <Project
                    name={p.name}
                    description={p.description}
                    image={p.image}
                    github={p.github}
                    link={p.link}
                    tags={p.tags}
                  />
                </motion.div>
              ))}
            </Grid>
          </motion.div>
        </AnimatePresence>
        <ArrowButton
          data-symbol=">"
          type="button"
          onClick={goNext}
          disabled={page >= totalPages - 1}
          aria-label={nextProjectPageText(language)}
        >
          ›
        </ArrowButton>
      </CarouselWrapper>
    </Container>
  );
}
