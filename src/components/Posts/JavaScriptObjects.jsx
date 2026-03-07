import React, { useEffect } from "react";
import styled from "styled-components";

// helpers
import { Analytics } from "../../helpers/analytics";

// animations
import SlideInBottom from "../../animations/SlideInBottom";

// icons
import { JavascriptSVG } from "../../resources/styles/icons";

// components
import BackButton from "../Button/BackButton";
import ObjectExplorer from "../ObjectExplorer/ObjectExplorer";
import { CodeBlockWithCopy } from "../Code/Code";

// layout
import {
  PageWrapper,
  PostTopBar,
  PostContainer as BasePostContainer,
  HeaderRow,
  IconWrapper,
  HeaderIcon,
  PostImage,
} from "../BlogLayout/BlogLayout";

// typography
import {
  PageTitle,
  SectionHeading,
  SubSectionHeading,
  Paragraph,
  InlineHighlight,
  Strong,
  TextLink,
  TextList,
  TextListItem,
} from "../Typography/Typography";

// codeblocks
import {
  objects,
  objectNotations,
  objectNotationsTwo,
} from "../../helpers/codeblocks";

// images
import JavaScriptObject from "../../resources/images/blog/JavaScriptObject.png";

const AnimatedPostContainer = styled(BasePostContainer)`
  animation: ${SlideInBottom} 0.5s forwards;
`;

const JavaScriptObjects = () => {
  useEffect(() => {
    Analytics.event("blog_opened", { slug: "javascript-objects" });
  }, []);

  return (
    <PageWrapper>
      <PostTopBar>
        <BackButton />
      </PostTopBar>

      <AnimatedPostContainer>
        <HeaderRow>
          <PageTitle>JavaScript Objects</PageTitle>
          <IconWrapper>
            <HeaderIcon>
              <JavascriptSVG />
            </HeaderIcon>
          </IconWrapper>
        </HeaderRow>

        <Paragraph>
          After writing a blog post about arrays, which you can find here 👉{" "}
          <TextLink href="/blog/javascript-arrays">JavaScript Arrays</TextLink>.
          Naturally it feels like the next post needs to be about JavaScript
          objects.
        </Paragraph>

        <Paragraph>
          Similar to my last post, I'll be keeping to the same format; that
          being explaining what objects are and how we can use them. Simple
          enough? Let's get it - oh yeah, you can skip this if you're
          comfortable with JavaScript and you just want to look through the{" "}
          <TextLink href="#use-case">use cases</TextLink>.
        </Paragraph>

        <SectionHeading>What is an Object?</SectionHeading>

        <Paragraph>
          In JavaScript, objects are pretty much anything{" "}
          <Strong>non-primitive</Strong>. By using the{" "}
          <InlineHighlight>typeof</InlineHighlight> operator, we can see for
          ourselves what is classed as an{" "}
          <Strong>"object"</Strong>. This includes arrays,
          dates, regexes and even functions:
        </Paragraph>

        <CodeBlockWithCopy code={objects} />

        <Paragraph>
          When I mentioned objects being "non primitive" values, I'm referring
          to the difference between primitive and non-primitive types. If you're
          not clear on that distinction,{" "}
          <TextLink
            href="https://developer.mozilla.org/en-US/docs/Glossary/Primitive"
            target="_blank"
            rel="noreferrer"
          >
            MDN has a good overview
          </TextLink>
          .
        </Paragraph>

        <Paragraph>
          What does that actually mean? It means that they are{" "}
          <Strong>mutable</Strong> (we can change them). Before looking at how
          we can access an object's properties, let's take a quick look at what
          an object is made of.
        </Paragraph>

        <SubSectionHeading>The Anatomy Of An Object</SubSectionHeading>

        <PostImage
          src={JavaScriptObject}
          alt="JavaScript object example with properties and key-value pairs"
        />

        <Paragraph>
          Here is a declaration of an object which I've named{" "}
          <Strong>person</Strong>. This object has three
          properties and you'll notice that each property is a{" "}
          <Strong>kvp (key-value pair)</Strong>. The left side is the{" "}
          <Strong>key</Strong> and the right side is the{" "}
          <Strong>value</Strong>.
        </Paragraph>

        <SectionHeading>Object Manipulation</SectionHeading>

        <Paragraph>
          I mentioned that we can change objects, but before we do, I'll show
          you how we can access them using the{" "}
          <InlineHighlight>.</InlineHighlight> (dot) and{" "}
          <InlineHighlight>[ ]</InlineHighlight> (bracket) notations.
        </Paragraph>

        <CodeBlockWithCopy code={objectNotations} />

        <Paragraph>
          Once we know how to access properties, we can begin to manipulate the
          data stored in an object - adding new properties, updating existing
          ones or even deleting them:
        </Paragraph>

        <CodeBlockWithCopy code={objectNotationsTwo} />

        <SectionHeading id="use-case">Use Cases</SectionHeading>

        <Paragraph>I have an object, I would like to...</Paragraph>

        <ObjectExplorer />

        <SectionHeading>References</SectionHeading>

        <TextList>
          <TextListItem>
            <TextLink
              href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object"
              target="_blank"
              rel="noreferrer"
            >
              MDN - Object
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof"
              target="_blank"
              rel="noreferrer"
            >
              MDN - typeof operator
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures"
              target="_blank"
              rel="noreferrer"
            >
              MDN - JavaScript data types and data structures
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://justjavascript.com/"
              target="_blank"
              rel="noreferrer"
            >
              Just JavaScript - Dan Abramov
            </TextLink>
          </TextListItem>
        </TextList>
      </AnimatedPostContainer>
    </PageWrapper>
  );
};

export default JavaScriptObjects;