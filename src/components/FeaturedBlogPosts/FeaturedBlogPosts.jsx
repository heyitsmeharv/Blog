import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { motion } from "motion/react";

import SlideInBottom from "../../animations/SlideInBottom";
import { latestPostsText, viewAllPostsText } from "../../helpers/text";
import { posts } from "../../data/posts";

const FEATURED_COUNT = 3;

const TYPE_COLORS = {
  Practical: { bg: "#dbeafe", text: "#1e40af" },
  Study: { bg: "#fef3c7", text: "#92400e" },
  Theory: { bg: "#ede9fe", text: "#5b21b6" },
};

const normalizeHex = (value) => {
  if (!value || typeof value !== "string" || !value.startsWith("#")) {
    return null;
  }

  const hex = value.slice(1);

  if (hex.length === 3) {
    return hex
      .split("")
      .map((char) => `${char}${char}`)
      .join("");
  }

  if (hex.length === 6) {
    return hex;
  }

  return null;
};

const getTagTextColor = (background) => {
  const hex = normalizeHex(background);

  if (!hex) {
    return "#1a1a1a";
  }

  const r = Number.parseInt(hex.slice(0, 2), 16);
  const g = Number.parseInt(hex.slice(2, 4), 16);
  const b = Number.parseInt(hex.slice(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  return luminance > 0.62 ? "#111827" : "#ffffff";
};

const getTagFallback = (name = "") =>
  name
    .split(/[\s/&-]+/)
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const Container = styled.section`
  width: 100%;
  padding: 6rem 0;
  background: ${({ theme }) => theme.secondary}18;
  animation: ${SlideInBottom} 0.5s forwards;

  @media only screen and (max-width: 900px) {
    padding: 5rem 0;
  }

  @media only screen and (max-width: 600px) {
    padding: 4rem 0;
  }
`;

const Inner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 clamp(1.5rem, 5vw, 5rem);
`;

const Header = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 0.8rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Title = styled.h2`
  font-size: 3rem;
  font-weight: 700;
`;

const ViewAll = styled(NavLink)`
  font-size: 1.4rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  text-decoration: none;
  opacity: 0.65;
  transition: opacity 0.15s;

  &:hover {
    opacity: 1;
    text-decoration: underline;
    text-underline-offset: 3px;
  }
`;

const Separator = styled.div`
  width: 4rem;
  height: 3px;
  background: ${({ theme }) => theme.text};
  margin-bottom: 3rem;
  border-radius: 2px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.4rem;

  @media only screen and (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media only screen and (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled(motion.div)`
  background: ${({ theme }) => theme.primary};
  border: 1px solid ${({ theme }) => theme.secondary}50;
  border-radius: 12px;
  padding: 2.4rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  height: 100%;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;

  &:hover {
    border-color: ${({ theme }) => theme.secondary};
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  }
`;

const CardTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

const TypeBadge = styled.span`
  display: inline-block;
  padding: 0.3rem 1rem;
  border-radius: 999px;
  font-size: 1.2rem;
  font-weight: 700;
  background: ${({ $bg }) => $bg || "#e5e7eb"};
  color: ${({ $color }) => $color || "#374151"};
`;

const DateText = styled.span`
  font-size: 1.3rem;
  color: ${({ theme }) => theme.mutedText || theme.secondary};
`;

const PostTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 700;
  line-height: 1.35;
  color: ${({ theme }) => theme.text};
  flex: 1;
`;

const ReadingTime = styled.span`
  font-size: 1.3rem;
  color: ${({ theme }) => theme.mutedText || theme.secondary};
  font-style: italic;
`;

const Intro = styled.p`
  font-size: 1.4rem;
  line-height: 1.65;
  color: ${({ theme }) => theme.text};
  opacity: 0.75;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const TagsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  align-items: center;
`;

const TagPill = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.45rem 1rem 0.45rem 0.55rem;
  border-radius: 999px;
  font-size: 1.2rem;
  font-weight: 700;
  background: ${({ $bg }) => $bg || "#e5e7eb"};
  color: ${({ $color }) => $color || "#1a1a1a"};
  box-shadow: inset 0 0 0 1px rgba(17, 24, 39, 0.08);
`;

const TagIconWrap = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  flex-shrink: 0;
  background: ${({ $dark }) =>
    $dark ? "rgba(255, 255, 255, 0.92)" : "rgba(255, 255, 255, 0.45)"};
  border: 1px solid
    ${({ $dark }) =>
      $dark ? "rgba(255, 255, 255, 0.22)" : "rgba(17, 24, 39, 0.08)"};

  svg {
    width: 14px !important;
    height: 14px !important;
    flex-shrink: 0;
    margin: 0 !important;
    display: block;
  }

  svg svg {
    width: 100% !important;
    height: 100% !important;
    margin: 0 !important;
  }
`;

const TagFallback = styled.span`
  font-size: 0.95rem;
  font-weight: 800;
  line-height: 1;
  letter-spacing: 0.04em;
`;

const ReadMore = styled(NavLink)`
  font-size: 1.4rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  text-decoration: none;
  margin-top: auto;
  opacity: 0.7;
  transition: opacity 0.15s;

  &:hover {
    opacity: 1;
    text-decoration: underline;
    text-underline-offset: 3px;
  }
`;

const FeaturedBlogPosts = ({ language }) => {
  const featured = posts.filter((p) => p.published).slice(0, FEATURED_COUNT);

  return (
    <Container id="blog">
      <Inner>
        <Header>
          <Title>{latestPostsText(language)}</Title>
          <ViewAll to="/blog">{viewAllPostsText(language)} →</ViewAll>
        </Header>
        <Separator />
        <Grid>
          {featured.map((post, i) => {
            const typeStyle = TYPE_COLORS[post.type] || {};
            return (
              <motion.div
                key={post.navigate}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.08 }}
                style={{ display: "flex" }}
              >
                <Card>
                  <CardTop>
                    <TypeBadge $bg={typeStyle.bg} $color={typeStyle.text}>
                      {post.type}
                    </TypeBadge>
                    <DateText>{post.date}</DateText>
                  </CardTop>
                  <PostTitle>{post.title}</PostTitle>
                  {post.tags?.length > 0 && (
                    <TagsRow>
                      {post.tags.map((tag) => {
                        const textColor = getTagTextColor(tag.background);
                        const isDark = textColor === "#ffffff";

                        return (
                          <TagPill
                            key={tag.name}
                            $bg={tag.background}
                            $color={textColor}
                          >
                            <TagIconWrap $dark={isDark} aria-hidden="true">
                              {tag.icon || (
                                <TagFallback>
                                  {getTagFallback(tag.name)}
                                </TagFallback>
                              )}
                            </TagIconWrap>
                            {tag.name}
                          </TagPill>
                        );
                      })}
                    </TagsRow>
                  )}
                  <ReadingTime>{post.readingTime}</ReadingTime>
                  <Intro>{post.intro}</Intro>
                  <ReadMore to={`/blog/${post.navigate}`}>Read post →</ReadMore>
                </Card>
              </motion.div>
            );
          })}
        </Grid>
      </Inner>
    </Container>
  );
};

export default FeaturedBlogPosts;
