import React, { useState } from "react";
import styled, { css, keyframes } from "styled-components";

// icons
import { Github } from "@styled-icons/boxicons-logos/Github";
import { ExternalLink } from "@styled-icons/evaicons-solid/ExternalLink";

const createBox = keyframes`
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
`;

const StyledGithub = styled(Github)`
  width: 50px;
  height: 50px;
  margin: 0 25px;
`;

const StyledExternalLink = styled(ExternalLink)`
  width: 50px;
  height: 50px;
  margin: 0 25px;
`;

const Flex = styled.div`
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  width: 100%;
  position: relative;
  display: inline-block;
   
  @media only screen and (min-width: 585px) {
    width: 50%;
    animation: ${createBox} .25s;
    transition: 0.25s;
    -webkit-transition: 0.25s;
  }
`;

const Image = styled.img`
  width: 100%;
  display: block;
  ${props => props.hovered && css`
    opacity: 0.8;
  `}
`;

const LinkContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`;

const StyledAnchor = styled.a`
  color: ${({ theme }) => theme.text};
`;

const StyledName = styled.span`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.text};
  @media only screen and (max-width: 585px) {
    font-size: 2rem;
  }
`;

const Project = ({ name, link, image, github, hide }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Container hovered={hovered} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <Image hovered={hovered} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} src={image} />
      {hovered &&
        <LinkContainer onMouseEnter={() => setHovered(true)}>
          <Flex>
            <StyledAnchor
              target="_blank"
              href={github}
            >
              <StyledGithub onMouseEnter={() => setHovered(true)} />
            </StyledAnchor>
            {!hide &&
              <StyledAnchor
                target="_blank"
                href={link}
              >
                <StyledExternalLink onMouseEnter={() => setHovered(true)} />
              </StyledAnchor>
            }
          </Flex>
          <StyledName>{name}</StyledName>
        </LinkContainer>
      }
    </Container>
  );
}

export default Project;