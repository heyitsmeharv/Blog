import React, { useEffect } from "react";
import styled from "styled-components";

// helpers
import { Analytics } from "../../helpers/analytics";

// animations
import SlideInBottom from "../../animations/SlideInBottom";

// layout
import {
  PageWrapper,
  PostTopBar,
  PostContainer as BasePostContainer,
} from "../BlogLayout/BlogLayout";

// typography
import { PageTitle, Paragraph } from "../Typography/Typography";

import BackButton from "../Button/BackButton";

const AnimatedPostContainer = styled(BasePostContainer)`
  animation: ${SlideInBottom} 0.5s forwards;
`;

const TheStart = () => {
  useEffect(() => {
    Analytics.event("blog_opened", { slug: "the-start" });
  }, []);

  return (
    <PageWrapper>
      <PostTopBar>
        <BackButton />
      </PostTopBar>
      <AnimatedPostContainer>
        <PageTitle>The Start</PageTitle>
        <Paragraph>
          For a long time I've wanted to write a blog about technologies
          I'm interested in. The purpose of this blog is just to document
          my personal journey learning cool tech, if only to cement my own
          understanding and potentially help people with similar interests.
          I'm hoping that now I have created a space for myself to blog,
          I'll be more inclined to write.
        </Paragraph>
      </AnimatedPostContainer>
    </PageWrapper>
  );
};

export default TheStart;