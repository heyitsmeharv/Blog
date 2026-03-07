import React, { useState, useEffect } from "react";
import styled from "styled-components";

// helpers
import { Analytics } from "../../helpers/analytics";

// animations
import SlideInBottom from "../../animations/SlideInBottom";

// icons
import { ChevronBackCircle } from '@styled-icons/ionicons-solid/ChevronBackCircle';
import { JavascriptSVG, ReactjsSVG } from '../../resources/styles/icons';

// components
import { StyledNavButton, StyledNavLink, CopyButton } from '../Button/Button';

// codeblocks
import { createReactAppCommand, mapGeneration, roomHelper } from "../../helpers/codeblocks";

const Wrapper = styled.div`
  padding: 1rem 25%;
  line-height: 6.5rem;
  
  @media only screen and (max-width: 1000px) {
    line-height: 5rem;
    padding: 0;
  }

  @media only screen and (min-width: 1001px) and (max-width: 1800px) {
    line-height: 6.5rem;
    padding: 1rem 20%;
  }
`;

const Container = styled.div`
  padding: 4rem;
  background: ${({ theme }) => theme.background};
  animation: ${SlideInBottom} 0.5s forwards;
`;

const Flex = styled.div`
  display: flex;
  align-items: baseline;
`;

const IconWrapper = styled.div`
  display: flex;
  margin-left: auto;
`;

const CodeBlock = styled.pre`
  font-family: 'Calibri';
  font-size: 2rem;
  background: #292929;
  color: ${({ theme }) => theme.buttonText};
  word-wrap: break-word;
  padding: 1rem 2rem 1rem;
  border-radius: 2rem;
  overflow-x: auto;
  line-height: 3.5rem;
`;

const Title = styled.h1`
  font-size: 4rem;
  font-weight: bold;
`;

const SubTitle = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  font-style: italic;
`;

const SubTitleSmall = styled.h1`
  font-size: 2rem;
  font-weight: bold;
`;

const Text = styled.span`
  color: ${({ theme }) => theme.text};
  font-size: 2rem;
`;

const BoldText = styled.b`
  color: ${({ theme }) => theme.text};
  font-size: 2rem;
  font-weight: bold;
`;

const StyledCodeSpan = styled.code`
  background-color: #f1f1f1;
  color: crimson;
  padding: 0 5px;
  margin: 0 5px;
`;

const StyledListItem = styled.li`
  color: ${({ theme }) => theme.text};
  margin-left: 5%;
`;

const StyledAnchor = styled.a`
  color: ${({ theme }) => theme.text};
`;

const StyledBackIcon = styled(ChevronBackCircle)`
  color: ${({ theme }) => theme.secondary};
  width: 4rem;
`;

const Icon = styled.div`
  width: 50px;
  height: 50px;
  margin-left: auto;
  margin-right: 25px;

  @media only screen and (max-width: 1000px) {
    width: 36px;
    height: 36px;
  }
`;

const Spacer = styled.br``

const ReactAdventureGame = () => {

  useEffect(() => {
    Analytics.event('blog_opened', { slug: 'react-adventure-game' });
  }, []);

  const [isCopied, setIsCopied] = useState([
    { value: false },
    { value: false },
    { value: false },
    { value: false },
    { value: false },
  ]);

  const handleCopy = (code, key) => {
    const isCopiedDefault = [
      { value: false },
      { value: false },
      { value: false },
      { value: false },
      { value: false },
    ];
    navigator.clipboard.writeText(code);

    const newIsCopied = [...isCopied];
    newIsCopied[key].value = true;
    setIsCopied(newIsCopied);

    setTimeout(() => setIsCopied(isCopiedDefault), 1500);
  };

  return (
    <Wrapper>
      <StyledNavButton>
        <StyledNavLink
          exact to={`/blog`}>
          <StyledBackIcon />
        </StyledNavLink>
      </StyledNavButton>
      <Container>
        <Flex>
          <Title>React.js Text Based Adventure Game</Title>
          <IconWrapper>
            <Icon><ReactjsSVG /></Icon>
            <Icon><JavascriptSVG /></Icon>
          </IconWrapper>
        </Flex>
        <Spacer />
        <Text>
          I've been contemplating on whether or not to do a separate blog post to explain what the React.js framework is but I want to move away from my last posts and get stuck in with building something!
          If you're completely new to React I would recommend having a gander at their  <StyledAnchor href="https://react.dev/" target="_blank">documentation</StyledAnchor> which is pretty good.
          <Spacer />
          If you would rather just go look at the code for yourself then feel free. You can find it here - <StyledAnchor href="https://github.com/heyitsmeharv/react-text-based-adventure" target="_blank">source</StyledAnchor>
          <Spacer />
          I don't plan on going through this line by line but what I will do is cover the core features of this project which I'll break down into sections:
          <StyledAnchor href="#map-generation"><StyledListItem>Map Generation</StyledListItem></StyledAnchor>
          <StyledAnchor href="#character"><StyledListItem>Character</StyledListItem></StyledAnchor>
          <StyledAnchor href="#loot"><StyledListItem>Loot</StyledListItem></StyledAnchor>
          <StyledAnchor href="#combat"><StyledListItem>Combat</StyledListItem></StyledAnchor>
          <StyledAnchor href="#findings"><StyledListItem>Findings</StyledListItem></StyledAnchor>
          <Spacer />
          <SubTitle id='map-generation'>Map Generation</SubTitle>
          So, let's talk map generation. I had a couple of choices, I could have gone for a file import option, where I could parse a text file which letters and symbols to represent certain features such as items and enemies etc.
          Seeing as thought this text based adventure is linear, I've opted to predefine the potential map with 'room objects' where I can randomise the order each run through.
          <Spacer />
          <SubTitleSmall>helpers/rooms.js</SubTitleSmall>
          I've defined my list of rooms in a helper file, each room is an object which will store all the attributes required for the room such as
          <StyledCodeSpan>name</StyledCodeSpan>
          <StyledCodeSpan>description</StyledCodeSpan>
          <StyledCodeSpan>items</StyledCodeSpan>
          <StyledCodeSpan>enemies</StyledCodeSpan>
          <StyledCodeSpan>locked</StyledCodeSpan>
          <StyledCodeSpan>explored</StyledCodeSpan>.
          <CodeBlock>
            <CopyButton onClick={() => handleCopy(roomHelper, 0)}>
              {isCopied[0].value === true ? 'Copied!' : 'Copy'}
            </CopyButton>
            {roomHelper}
          </CodeBlock>
          <Spacer />
          <SubTitleSmall>helpers/setup.js</SubTitleSmall>
          This will get run at the beginning of the game which will handle all of the fun for us.
          <CodeBlock>
            <CopyButton onClick={() => handleCopy(mapGeneration, 1)}>
              {isCopied[1].value === true ? 'Copied!' : 'Copy'}
            </CopyButton>
            {mapGeneration}
          </CodeBlock>
          I think there is a cleaner way of handling the setup but for now it serves it's inteded purpose; that being the following:
          <StyledListItem>Clearing the state of the previous run</StyledListItem>
          <StyledListItem>Randomise the room order</StyledListItem>
          <StyledListItem>Randomly add enemies and items in the rooms</StyledListItem>
          <StyledListItem>Check to see no duplicate rooms, items and enemies aren't added</StyledListItem>
          <StyledListItem>Add in the final room at the end</StyledListItem>
          <Spacer />
          <SubTitle id='character'>Character</SubTitle>
          <CopyButton onClick={() => handleCopy(createReactAppCommand, 2)}>
            {isCopied[2].value === true ? 'Copied!' : 'Copy'}
          </CopyButton>
          {/* <CodeBlock>{createReactAppCommand}</CodeBlock> */}
          <Spacer />
          <SubTitle id='loot'>Loot</SubTitle>
          <CopyButton onClick={() => handleCopy(createReactAppCommand, 3)}>
            {isCopied[3].value === true ? 'Copied!' : 'Copy'}
          </CopyButton>
          {/* <CodeBlock>{createReactAppCommand}</CodeBlock> */}
          <Spacer />
          <SubTitle id='combat'>Combat</SubTitle>
          <CopyButton onClick={() => handleCopy(createReactAppCommand, 4)}>
            {isCopied[4].value === true ? 'Copied!' : 'Copy'}
          </CopyButton>
          {/* <CodeBlock>{createReactAppCommand}</CodeBlock> */}
          <Spacer />
          <SubTitle id='findings'>Findings</SubTitle>
          Overall I would say this has been a fun experience, but there are definitely some learning curves from a blogging perspective - most noticeably a lack of planning! It was very naive of me to think I could 'code as I go' without really
          putting too much thought into what this project exactly entails. I knew I had a basic idea of what I wanted to include in this project but I did not have a clear 'mvp', and without a plan on what you're going to deliver
          you can find yourself in a situation where your project starts to grow arms and legs as well as wasting time re-writing code. That being said, I'm a big fan of 'doing' and a lot of the time I use that as an excuse to go explore and find creative inspiration and I would say
          that this project may of had a little bit too much of that 😂
          <Spacer />
          I wouldn't say that this is a finished project as I do plan to revisit this and expand on what's currently there as well as adding a couple of more features. However it is at a place where I'm comfortable with leaving it for the time being - largely
          because I want to move onto other things.
          <Spacer />
        </Text>
      </Container>
    </Wrapper>
  );
}

export default ReactAdventureGame;