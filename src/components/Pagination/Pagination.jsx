import React, { useContext, useState } from "react";
import styled, { css } from "styled-components";
import { motion, AnimatePresence } from "motion/react";

// components
import BlogPost from "../BlogPost/BlogPost";

import { LanguageContext } from "../../context/languageContext";
import { blogPageStatusText, goToPageText } from "../../helpers/i18nText";

const Container = styled(motion.div)`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  padding: 4rem 4rem 2rem 4rem;
  background: ${({ theme }) => theme.background};
  text-align: center;
  @media only screen and (max-width: 585px) {
    flex-direction: column;
  }
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 2rem 1rem 0px;
  padding: 0 1.6rem 2rem;
`;

const PaginationButton = styled(motion.button)`
  font-family: "Raleway", sans-serif;
  font-size: 1.5rem;
  font-weight: 800;
  line-height: 1;
  background: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.8rem 1.2rem;
  min-width: 4.4rem;
  min-height: 4rem;
  text-align: center;
  color: ${({ theme }) => theme.text};
  text-decoration: ${(props) => (props.$isActive ? "underline" : "none")};
  transition: border-color 0.5s ease;
  border: 2px solid transparent;
  border-radius: 999px;
  :hover {
    cursor: pointer;
    border-color: ${({ theme }) => theme.text};
  }
  ${(props) =>
    props.$active &&
    css`
      background: ${({ theme }) => theme.secondary};
      color: ${({ theme }) => theme.text};
      transition: background 0.5s;
    `};
`;

const PaginationNav = styled.nav`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const pageVariants = {
  enter: (dir) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
};

const Pagination = ({ currentPage, setCurrentPage, itemsPerPage, items }) => {
  const language = useContext(LanguageContext);
  const [direction, setDirection] = useState(1);

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayItems = items.slice(startIndex, endIndex);
  const pageKey = `${currentPage}-${items.map((item) => item.navigate).join("-")}`;

  const changePage = (pageNumber) => {
    setDirection(pageNumber > currentPage ? 1 : -1);
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <AnimatePresence custom={direction} mode="wait">
        <Container
          key={pageKey}
          aria-label={blogPageStatusText(
            language,
            currentPage,
            Math.max(totalPages, 1),
          )}
          custom={direction}
          variants={pageVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.25 }}
        >
          {displayItems.map((p, i) => {
            return (
              <BlogPost
                key={p.navigate}
                index={i}
                title={p.title}
                readingTime={p.readingTime}
                type={p.type}
                date={p.date}
                tags={p.tags}
                intro={p.intro}
                navigate={p.navigate}
                published={p.published}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.07 }}
              />
            );
          })}
        </Container>
      </AnimatePresence>
      {totalPages > 1 && (
        <PaginationNav
          aria-label={blogPageStatusText(language, currentPage, totalPages)}
        >
          <PaginationWrapper>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
                <PaginationButton
                  key={page}
                  type="button"
                  onClick={() => changePage(page)}
                  $active={currentPage === page}
                  $isActive={currentPage === page}
                  aria-current={currentPage === page ? "page" : undefined}
                  aria-label={goToPageText(language, page)}
                >
                  {page}
                </PaginationButton>
              ),
            )}
          </PaginationWrapper>
        </PaginationNav>
      )}
    </>
  );
};

export default Pagination;
