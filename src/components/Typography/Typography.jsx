import styled from "styled-components";

export const PageTitle = styled.h1`
  font-size: clamp(3rem, 4.5vw, 4rem);
  font-weight: 800;
  line-height: 1.6;
  margin: 0 0 2rem;
  color: ${({ theme }) => theme.text};
  letter-spacing: 0.03em;

  position: relative;
  padding-bottom: 0.6rem;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100px;
    height: 4px;
    border-radius: 999px;
    background: ${({ theme }) => theme.secondary};
  }
`;

export const SectionHeading = styled.h2`
  font-size: clamp(2.2rem, 3.2vw, 2.8rem);
  font-weight: 700;
  line-height: 2.4;
  margin: 3rem 0 1.6rem;
  color: ${({ theme }) => theme.text};
  text-transform: uppercase;
  letter-spacing: 0.12em;

  padding-left: 2rem;
  border-left: 4px solid ${({ theme }) => theme.secondary};
`;

export const SubSectionHeading = styled.h3`
  font-size: clamp(1.9rem, 2.5vw, 2.3rem);
  font-weight: 600;
  line-height: 2.2;
  margin: 2.4rem 0 1.4rem;
  color: ${({ theme }) => theme.text};

  padding-bottom: 0.4rem;
  border-bottom: 1px solid currentColor;
  opacity: 0.95;
`;

export const Paragraph = styled.p`
  color: ${({ theme }) => theme.text};
  font-size: clamp(1.6rem, 1.8vw, 1.9rem);
  line-height: 3;  
  margin: 1.5rem 0; 
`;

export const InlineHighlight = styled.span`
  background: ${({ theme }) => theme.secondary};
  padding: 0 0.4rem;
  margin: 0 0.2rem;
  font-weight: 600;
  border-radius: 0.3rem;
  color: ${({ theme }) => theme.text};
`;

export const Strong = styled.strong`
  color: ${({ theme }) => theme.text};
  font-weight: 700;
`;

export const Italic = styled.p`
  color: ${({ theme }) => theme.text};
  font-style: italic;
`;

export const TextLink = styled.a`
  color: ${({ theme }) => theme.secondary};
  font-weight: bold;
  text-decoration: none;
  border-bottom: 2px solid ${({ theme }) => theme.secondary};
  padding-bottom: 0.05em;
  text-underline-offset: 0.15em;
  cursor: pointer;
  transition:
    border-bottom-width 0.5s ease,
    border-bottom-color 0.5s ease,
    opacity 0.5s ease;

  &:hover {
    border-bottom-color: ${({ theme }) => theme.text};
    opacity: 0.9;
  }
`;

export const TextList = styled.ul`
  padding-left: 1.6rem;
  margin: 1.2rem 0;
`;

export const TextListItem = styled.li`
  color: ${({ theme }) => theme.text};
  font-size: clamp(1.6rem, 1.8vw, 1.9rem);
  line-height: 3;
  margin: 0.2rem 0;
`;

export const IndentedTextList = styled.ul`
  padding-left: 6.2rem;
  margin: 1.2rem 0;
  list-style: disc;
`;

export const IndentedTextListItem = styled.li`
  color: ${({ theme }) => theme.text};
  font-size: clamp(1.6rem, 1.8vw, 1.9rem);
  line-height: 3;
  margin: 0.2rem 0;
`;

export const TertiaryHeading = styled.h3`
  margin: 2.4rem 0 1.2rem;
  font-size: 1.8rem;
  font-weight: 600;
  font-style: italic;
  color: ${({ theme }) => theme.text};
`;