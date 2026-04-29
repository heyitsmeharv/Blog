import React, { useEffect } from "react";
import styled from "styled-components";

// helpers
import { Analytics } from "../../helpers/analytics";

// animations
import SlideInBottom from "../../animations/SlideInBottom";

// components
import BackButton from "../Button/BackButton";
import Banner from "../Banner/Banner";

// layout
import {
  PageWrapper,
  PostTopBar,
  PostContainer as BasePostContainer,
} from "../BlogLayout/BlogLayout";

// typography
import {
  PageTitle,
  SectionHeading,
  TertiaryHeading,
  Paragraph,
  Strong,
  TextList,
  TextListItem,
  InlineHighlight,
  Strike,
} from "../Typography/Typography";

const PostContainer = styled(BasePostContainer)`
  animation: ${SlideInBottom} 0.5s forwards;
`;

const OutputUnderstanding = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    Analytics.pageview("/blog/when-output-outruns-understanding");
    Analytics.track("blog_page_viewed", {
      slug: "when-output-outruns-understanding",
    });
  }, []);

  return (
    <PageWrapper>
      <PostTopBar>
        <BackButton to="/blog" />
      </PostTopBar>

      <PostContainer>
        <PageTitle>When Output Outruns Understanding</PageTitle>

        <Paragraph>
          I think it's fair to say that 'AI' has been the latest significant
          breakthrough in human history, arguably more significant than the
          internet and even the industrial revolution. We are currently living
          in truely unprecedented times where the full extent of AI has yet to
          be realised or reasoned with. A scary prospect, especially if you
          question the motives and morals of the people in control of the
          technology; but that's a whole other subject I don't think I want to
          entertain.
        </Paragraph>

        <SectionHeading>The Beginning</SectionHeading>
        <Paragraph>
          I remember the first encounter I had with 'AI' very vividly. I was
          walking into work one day, and not from my bedroom to a section of my
          house I call an 'office' - but an actual office, back when it was
          considered normal to dress appropriately and fight traffic in the
          early hours of the morning.
        </Paragraph>
        <Paragraph>
          Not too long after I had made my first of many cups of coffee, getting
          ready for the morning standup, I was shown what was described by a
          colleague as the 'future'. He handed me his phone, and said not many
          people know about this 'chatgpt'. At first glance I was relatively
          impressed as he had shown it's ability to instruct on how to solve an
          issue he had been struggling with.
        </Paragraph>
        <Paragraph>
          Unbeknownst to me at the time, this was the beginning of what I would
          later come to understand as a fundamental shift in how I would
          approach my work as a software engineer.
        </Paragraph>

        <SectionHeading>The Struggle</SectionHeading>
        <Paragraph>
          Over my 10+ years of experience as a software engineer, the novelties
          of which I've enjoyed immensely over the years, are starting to
          dissipate. I have been able to keep up with the pace of change, which
          used to be limited to a new language, framework or new shiny tool
          which seemed to achieve the exact same thing, but just in a different
          way.
        </Paragraph>
        <Paragraph>
          AI however, 'hits' differently as before I was able to retain some
          levels of excitement of learning and building with new technologies,
          but now that dopamine hit feels like it's misfiring.
        </Paragraph>

        <Paragraph>
          I never thought I'd ever miss those late nights - leaving work well
          past my working hours, trying to solve a ridiculous bugs{" "}
          <Strike>my team</Strike> I had introduced, crunching for tight
          deadlines <Strike>our clients had demanded</Strike> we set ourselves.
        </Paragraph>
        <Paragraph>
          Although at the time it felt like a grind, I now look back at those
          times with a sense of nostalgia and longing for the feeling of
          accomplishment and satisfaction that came with solving those problems.
          I miss the struggle, the process, the learning, the growth.
        </Paragraph>

        <SectionHeading>Move Fast and Break Things</SectionHeading>
        <Paragraph>
          The very popular mantra of 'move fast and break things' has been a
          staple in the tech industry for a long time, and it seems to be more
          relevant than ever in the age of AI. The ability to quickly iterate
          and experiment with new ideas is crucial in this fast-paced
          environment, but it isn't without it's own problems.
        </Paragraph>

        <Paragraph>
          I wouldn't be the first person to admit that AI has absolutely
          accelerated my output - I can produce more in a day than I could have
          done in a week and that is a remarkable thing. Not only can 'AI'
          handle the more mundane and repetitive tasks, but it can also help me
          solve problems that I might have had to desperately search
          StackOverflow to see if any other sorry developer had already
          experienced.
        </Paragraph>

        <Paragraph>
          I suppose that's how many of us have accepted the usage of 'AI' as
          it's just a tool in which we use to find answers, which isn't too
          dissimilar to how we have been using search engines for years. Let's
          face it, no one can recall the majority of documentation pieces they
          have read and that's where 'AI' excels, it can recall, compile and
          apply the knowledge in a way that is more efficient than any human
          we've met.
        </Paragraph>

        <Paragraph>
          After what felt like a honeymoon phase of 'AI', I started to feel a
          sense of unease and discomfort with the speed at which I was able to
          produce output. I was left with a feeling of what happens when my
          output and creativity can outrun my understanding of the technology?
          At what point am I not engineering but just prompting? Am I building
          or just orchestrating the tools that are built by others?
        </Paragraph>

        <SectionHeading>Pandora's Box</SectionHeading>
        <Paragraph>
          <Strong>
            What if AI has let my output accelerate faster than my
            comprehension?
          </Strong>
        </Paragraph>
        <Paragraph>
          What does this actually mean? I have been thinking about this slightly
          uncomfortable sentence for a while now.
        </Paragraph>

        <Paragraph>
          What would normally happen when quoting for a new project, feature or
          task, required a combination of experience, research, design,
          development and testing.
        </Paragraph>

        <Paragraph>
          What happens when you 'outsource' that process to an 'AI' tool? On the
          surface, it seems like a massive win. Time and energy that would have
          been spent by potentially a team of engineers, can now be done by a
          series of prompts.
        </Paragraph>

        <Paragraph>
          Now what happens when you're quoting for something that you have
          little to no experience with? Is that still a massive win? Or has the
          use of 'AI' made it far too easy to "machinal bypass" the emotional
          and intellectual labour necessary for personal growth?
        </Paragraph>

        <Paragraph>
          This isn't to say that I have no idea what I am building. I can
          comfortably talk about the services, the broad architecture, the
          tradeoffs, and the reasons I made certain decisions. But there is a
          difference between understanding something well enough and
          understanding it well enough to explain it clearly under pressure.
        </Paragraph>

        <Paragraph>
          'AI' has made me more productive, but it has also made me prone to
          being lazy. Most recently I have found myself giving into the
          temptation to offload processes that once felt like a natural
          instinct. I can build faster than before. I can. I can reach for
          patterns I might not have been able to produce from a blank page. I
          can get unstuck quickly. All of that is useful. The uncomfortable
          question is whether I am becoming a better engineer or just a better
          prompt writer?
        </Paragraph>

        <SectionHeading>The Ferrari Problem</SectionHeading>

        <Paragraph>
          The easy advice is to say - 'it's how you use AI' or 'slow down and
          make sure you understand everything'. That is true, but it is also
          somewhat unrealistic. These tools are designed to be fast. They are
          designed to remove friction. They are designed to give you the next
          plausible step before you have fully sat with the current one.
        </Paragraph>

        <Paragraph>
          Telling myself to use 'AI' but not go too fast feels like driving a
          Ferrari and promising not to go over 20mph. Technically possible.
          Psychologically unlikely. The speed is the point. If I have access to
          a tool that can help me move faster, I am going to use it.
        </Paragraph>

        <Paragraph>
          So the answer cannot simply be 'use it less'. AI is here, and ignoring
          it would be its own kind of professional risk.
        </Paragraph>

        <SectionHeading>Closing Thought</SectionHeading>

        <Paragraph>
          I don't have a perfect answer to this problem, and I think I will need
          to be somewhat optimistic about trying to replicate the same struggle
          and learning process that I had before, but with the help of 'AI'
          rather than in spite of it.
        </Paragraph>

        <Paragraph>
          I do know that I want to be able to understand and explain the things
          I build, not just build them. I want to be able to talk about the
          tradeoffs, the alternatives, the reasons why I made certain decisions.
          I want to be able to understand the technology at a level where I can
          reason about it, not just use it as a tool to get to an end result.
        </Paragraph>

        <Paragraph>
          AI has made me faster, and sometimes that speed makes me suspicious of
          the tradeoffs. I am not sure of the long term implications of this
          shift, but maybe the answer is to make comprehension a visible part of
          the work - which is something I will endeavour to do when blogging.
        </Paragraph>
      </PostContainer>
    </PageWrapper>
  );
};

export default OutputUnderstanding;
