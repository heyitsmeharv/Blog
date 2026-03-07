import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { motion, AnimatePresence } from 'motion/react';

// components
import BlogPost from "../BlogPost/BlogPost";

// animations
import SlideInTop from "../../animations/SlideInTop";

const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  padding: 4rem 4rem 2rem 4rem;
  background: ${({ theme }) => theme.background};
  animation: ${SlideInTop} 0.5s forwards;
  text-align: center;
  @media only screen and (max-width: 585px) {
    flex-direction: column;
  }
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const PaginationButton = styled(motion.button)`
  font-family: 'Raleway', sans-serif;
  font-size: 1.5rem;
  font-weight: 800;
  background: none;
  outline: none;
  padding: 6px 0px;
  margin: 0 10px;
  width: 50px;
  height: 30px;
  text-align: center;
  color: ${({ theme }) => theme.text};
  text-decoration: ${props => props.isActive ? 'underline' : 'none'};
  transition: border-color 0.5s ease;
  border: 2px solid transparent;
  :hover {
    cursor: pointer;
    border-color:  ${({ theme }) => theme.text};
  }
  ${props => props.active && css`
    background: ${({ theme }) => theme.secondary};
    color: ${({ theme }) => theme.text};
    transition: background .5s;
  `};
`;

const Pagination = ({ currentPage, setCurrentPage, itemsPerPage, items }) => {
  const [displayItems, setDisplayItems] = useState([]);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = items.slice(startIndex, endIndex);
    setDisplayItems(currentItems);
  }, [currentPage, items, itemsPerPage]);

  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Container>
        {displayItems.map((p, i) => {
          return <BlogPost key={i} index={i} title={p.title} readingTime={p.readingTime} type={p.type} date={p.date} tags={p.tags} intro={p.intro} navigate={p.navigate} published={p.published} />
        })}
      </Container>
      <PaginationWrapper>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <PaginationButton
              key={page}
              onClick={() => changePage(page)}
              active={currentPage === page}
            >
              {page}
            </PaginationButton>
          )
        )}
      </PaginationWrapper>
    </>
  );
};

export default Pagination;