import React, { useContext } from "react";
import styled, { css } from "styled-components";
import { motion } from "motion/react";

import { StyledNavLink } from "../Button/Button";
import { Journal } from "@styled-icons/bootstrap/Journal";
import { LanguageContext } from "../../context/languageContext";
import {
  comingSoonText,
  notPublishedText,
  postTypeText,
  readMoreText,
  readingTimeText,
  tagsForItemText,
} from "../../helpers/i18nText";

const Container = styled(motion.article)`
  background: ${({ theme }) => theme.surface || theme.secondary};
  position: relative;
  width: 30%;
  margin: 25px 0;
  transition: border-color 0.25s ease;
  border: 2px solid transparent;
  display: flex;
  flex-direction: column;

  ${({ $disabled }) =>
    $disabled &&
    css`
      opacity: 0.6;
      border: none;
    `}

  &:hover {
    border-color: ${({ theme }) => theme.text};
  }

  @media only screen and (min-width: 500px) and (max-width: 1000px) {
    width: 100%;
    margin: 20px 0;
  }

  @media only screen and (max-width: 500px) {
    width: 100%;
    margin: 20px 0;
  }
`;

const Flex = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
  flex-flow: wrap;
  gap: 0.8rem;
`;

const TopBarText = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 20px 0;
  color: ${({ theme }) => theme.text};
  gap: 1rem;
`;

const BottomBarText = styled.div`
  width: max-content;
  margin: 0 auto 30px;
`;

const StyledTopBarText = styled.span`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.mutedText || theme.secondary};
`;

const StyledTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  margin: 1.2rem 2rem 0;
`;

const ReadingTime = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  font-style: italic;
  margin: 1rem 2rem 0;
  color: ${({ theme }) => theme.mutedText || theme.secondary};
`;

const ComingSoonBanner = styled.div`
  text-align: center;
  position: absolute;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
  border: 2px solid ${({ theme }) => theme.text};
  rotate: -20deg;
  width: 100%;
  top: 50%;
  font-size: 3.5rem;
`;

const StyledIcon = styled.div`
  svg {
    max-width: 36px;
    max-height: 36px;
  }
`;

const StyledIntro = styled.p`
  margin: 2rem;
  font-size: 2rem;
  flex: 1;
`;

const StyledBorderLink = styled(StyledNavLink)`
  padding: 0.6rem 1.4rem;
  font-size: 1.5rem;
  border: 2px solid ${({ theme }) => theme.primary};
  transition:
    background 0.25s ease,
    border-color 0.25s ease;

  &:hover {
    background: ${({ theme }) => theme.primary};
    border-color: ${({ theme }) => theme.text};
  }
`;

const StyledJournal = styled(Journal)`
  width: 36px;
  height: 36px;
  fill: ${({ theme }) => theme.text};
`;

const BlogPost = ({
  title,
  readingTime,
  type,
  date,
  tags,
  intro,
  navigate,
  published,
  ...motionProps
}) => {
  const language = useContext(LanguageContext);

  return (
    <Container
      $disabled={!published}
      aria-labelledby={`blog-post-${navigate}`}
      {...motionProps}
    >
      {!published && (
        <ComingSoonBanner>{notPublishedText(language)}</ComingSoonBanner>
      )}
      <TopBarText>
        <StyledTopBarText>{postTypeText(language, type)}</StyledTopBarText>
        <StyledTopBarText>{date}</StyledTopBarText>
      </TopBarText>
      <StyledTitle id={`blog-post-${navigate}`}>{title}</StyledTitle>
      <ReadingTime>{readingTimeText(language, readingTime)}</ReadingTime>
      <Flex aria-label={tagsForItemText(language, title)}>
        {tags?.map((tag, index) =>
          tag.name === "Misc" ? (
            <StyledJournal
              key={index}
              role="img"
              aria-label={tag.name}
              title={tag.name}
            />
          ) : (
            <StyledIcon
              key={index}
              role="img"
              aria-label={tag.name}
              title={tag.name}
            >
              {tag.icon}
            </StyledIcon>
          ),
        )}
      </Flex>
      <StyledIntro>{intro}</StyledIntro>
      <BottomBarText>
        {published ? (
          <StyledBorderLink exact to={`/blog/${navigate}`}>
            {readMoreText(language)}
          </StyledBorderLink>
        ) : (
          <StyledTopBarText as="span">
            {comingSoonText(language)}
          </StyledTopBarText>
        )}
      </BottomBarText>
    </Container>
  );
};

export default BlogPost;
