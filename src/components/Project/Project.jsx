import React from "react";
import styled from "styled-components";
import { motion } from "motion/react";

// icons
import { Github } from "@styled-icons/boxicons-logos/Github";
import { ExternalLink } from "@styled-icons/evaicons-solid/ExternalLink";

// data
import { tagColors } from "../../data/tagColors";

const Card = styled(motion.div)`
  background: ${({ theme }) => theme.surface || theme.secondary};
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  height: 100%;
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const Body = styled.div`
  padding: 1.6rem;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Name = styled.h3`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
  margin: 0 0 0.8rem;
`;

const Description = styled.p`
  font-size: 1.3rem;
  color: ${({ theme }) => theme.mutedText || theme.text};
  margin: 0 0 1.4rem;
  line-height: 1.6;
  flex: 1;
`;

const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-bottom: 1.6rem;
`;

const Tag = styled.span`
  font-size: 1.1rem;
  padding: 0.3rem 0.9rem;
  border-radius: 999px;
  background: ${({ $bg, theme }) => $bg || theme.buttonColour};
  color: ${({ $text, theme }) => $text || theme.buttonText};
  font-weight: 600;
`;

const LinkRow = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
`;

const StyledAnchor = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.text};
  text-decoration: none;
  font-size: 1.3rem;
  font-weight: 600;
  opacity: 0.85;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }
`;

const StyledGithub = styled(Github)`
  width: 20px;
  height: 20px;
`;

const StyledExternalLink = styled(ExternalLink)`
  width: 20px;
  height: 20px;
`;

const Project = ({ name, description, image, github, link, tags }) => {
  return (
    <Card
      whileHover={{ y: -6, boxShadow: "0 10px 28px rgba(0,0,0,0.22)" }}
      transition={{ duration: 0.2 }}
    >
      <ImageWrapper>
        <Image src={image} alt={name} />
      </ImageWrapper>
      <Body>
        <Name>{name}</Name>
        <Description>{description}</Description>
        <TagRow>
          {tags.map((tag) => (
            <Tag
              key={tag}
              $bg={tagColors[tag]?.bg}
              $text={tagColors[tag]?.text}
            >
              {tag}
            </Tag>
          ))}
        </TagRow>
        <LinkRow>
          <StyledAnchor
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${name} source code on GitHub`}
          >
            <StyledGithub />
            GitHub
          </StyledAnchor>
          {link && (
            <StyledAnchor
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${name} live demo`}
            >
              <StyledExternalLink />
              Live Demo
            </StyledAnchor>
          )}
        </LinkRow>
      </Body>
    </Card>
  );
};

export default Project;
