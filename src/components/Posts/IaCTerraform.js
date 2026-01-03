import React, { useEffect } from "react";
import styled from "styled-components";

// helpers
import { Analytics } from "../../helpers/analytics";

// animations
import SlideInBottom from "../../animations/SlideInBottom";

// components
import BackButton from "../Button/BackButton";
import { CodeBlockWithCopy } from "../Code/Code";

// layout
import {
  PageWrapper,
  PostTopBar,
  PostContainer as BasePostContainer,
  HeaderRow,
  IconWrapper,
  HeaderIcon,
} from '../BlogLayout/BlogLayout';

// typography
import {
  PageTitle,
  SectionHeading,
  SubSectionHeading,
  Paragraph,
  Strong,
  TextLink,
  TextList,
  TextListItem,
  InlineHighlight,
  IndentedTextList,
  IndentedTextListItem,
  TertiaryHeading,
} from "../Typography/Typography";

// icons
import { TerraformSVG } from '../../resources/styles/icons';

const AnimatedPostContainer = styled(BasePostContainer)`
  animation: ${SlideInBottom} 0.5s forwards;
`;

const IaCTerraform = () => {
  useEffect(() => {
    Analytics.event('blog_opened', { slug: 'infrastructure-as-code-with-terraform' });
  }, []);

  return (
    <PageWrapper>
      <PostTopBar>
        <BackButton />
      </PostTopBar>

      <AnimatedPostContainer>
        <HeaderRow>
          <PageTitle>Infrastructure as Code (IaC) with Terraform</PageTitle>
          <IconWrapper>
            <HeaderIcon>
              <TerraformSVG />
            </HeaderIcon>
          </IconWrapper>
        </HeaderRow>

        <Paragraph>
          In this post, we're going to build a Terraform template repo and work through the core workflow (init, plan, apply).
          We'll cover how to structure a project sensibly, and how to take the same setup from local development into CI and
          multiple environments.
        </Paragraph>

        <Paragraph>
          We'll start by organising the repo in a way that's easy to understand, then introduce Terraform concepts as they become relevant.
        </Paragraph>

        <Paragraph>
          Here is a link to the boilerplate that works locally and sets you up nicely for CI and multiple environments - <TextLink
            href="https://github.com/heyitsmeharv/template-terraform-boilerplate"
            target="_blank"
            rel="noreferrer"
          >
            template-terraform-boilerplate
          </TextLink>
        </Paragraph>

        <SectionHeading>What is Terraform?</SectionHeading>

        <Paragraph>
          Terraform is an <Strong>Infrastructure as Code</Strong> tool. It's how teams create repeatable environments,
          manage changes safely, and keep infrastructure consistent across accounts and regions.
        </Paragraph>

      </AnimatedPostContainer>
    </PageWrapper>
  );
}

export default IaCTerraform;
