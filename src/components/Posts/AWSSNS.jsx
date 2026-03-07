import React, { useEffect } from "react";
import styled from "styled-components";

// helpers
import { Analytics } from "../../helpers/analytics";

// animations
import SlideInBottom from "../../animations/SlideInBottom";

// icons
import { AWSSVG, AWSSNSSVG } from "../../resources/styles/icons";

// components
import BackButton from "../Button/BackButton";

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
  Strong,
  TextLink,
  TextList,
  TextListItem,
  IndentedTextList,
  IndentedTextListItem,
} from "../Typography/Typography";

// images
import SNSPubSub from "../../resources/images/blog/AWSSNS/sns_pub_sub.jpeg";
import SNSSubscribers from "../../resources/images/blog/AWSSNS/sns_subscribers.jpeg";
import SNSSQSFanOut from "../../resources/images/blog/AWSSNS/sns_sqs_fan_out.jpeg";
import SNSMessageFiltering from "../../resources/images/blog/AWSSNS/sns_message_filtering.jpeg";

const PostContainer = styled(BasePostContainer)`
  animation: ${SlideInBottom} 0.5s forwards;
`;

const AWSSNS = () => {
  useEffect(() => {
    Analytics.event("blog_opened", { slug: "aws-sns" });
  }, []);

  return (
    <PageWrapper>
      <PostTopBar>
        <BackButton to="/blog" />
      </PostTopBar>

      <PostContainer>
        <HeaderRow>
          <PageTitle>Amazon Simple Notification Service (SNS)</PageTitle>
          <IconWrapper>
            <HeaderIcon>
              <AWSSVG />
            </HeaderIcon>
            <HeaderIcon>
              <AWSSNSSVG />
            </HeaderIcon>
          </IconWrapper>
        </HeaderRow>

        <Paragraph>In this post I'll be tackling Amazon's Simple Notification Service (SNS).</Paragraph>

        <TextList>
          <TextListItem>
            <TextLink href="#sns-introduction">SNS Introduction</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#how-to-publish">How To Publish</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#security">Security</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#fan-out">SNS and SQS: Fan Out</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#message-filtering">Message Filtering</TextLink>
          </TextListItem>
        </TextList>

        <SectionHeading id="sns-introduction">
          Amazon Simple Notification Service
        </SectionHeading>

        <Paragraph>
          Amazon Simple Notification Service (Amazon SNS) is a fully managed messaging service provided by
          Amazon Web Services (AWS) designed to send messages to a large number of subscribers or other
          services. What if you wanted to send one message to many endpoints? Instead of having a direct
          integration with each endpoint/service, you can publish that message to a topic which then
          delivers the message to all subscribers.
        </Paragraph>

        <PostImage
          src={SNSPubSub}
          alt="SNS publish-subscribe pattern"
        />

        <Paragraph>
          The event producer only sends messages to one SNS topic and the event receivers (subscriptions)
          which is as many as we want will listen to the SNS topic notification and everything subscribed
          will get a message.
        </Paragraph>

        <SectionHeading id="how-to-publish">How To Publish</SectionHeading>

        <TextList>
          <TextListItem>
            <Strong>Publishing a Message</Strong>: An application component (publisher) sends a message to
            an SNS topic.
          </TextListItem>
          <TextListItem>
            <Strong>Message Propagation</Strong>: The SNS topic propagates the message to all subscribed
            endpoints, such as HTTP endpoints, email addresses, or SQS queues.
          </TextListItem>
          <TextListItem>
            <Strong>Message Delivery</Strong>: Each subscriber endpoint receives and processes the message
            according to its protocol.
          </TextListItem>
        </TextList>

        <PostImage
          src={SNSSubscribers}
          alt="SNS subscribers diagram"
        />

        <SectionHeading id="security">Security</SectionHeading>

        <TextList>
          <TextListItem>
            <Strong>Encryption:</Strong>
          </TextListItem>
        </TextList>
        <IndentedTextList>
          <IndentedTextListItem>
            Supports encryption at rest using AWS Key Management Service (KMS).
          </IndentedTextListItem>
          <IndentedTextListItem>
            Enables secure communication over HTTPS.
          </IndentedTextListItem>
          <IndentedTextListItem>
            Client-side encryption if the client wants to perform encryption/decryption itself.
          </IndentedTextListItem>
        </IndentedTextList>

        <TextList>
          <TextListItem>
            <Strong>Access Controls:</Strong>
          </TextListItem>
        </TextList>
        <IndentedTextList>
          <IndentedTextListItem>
            Provides fine-grained access control using AWS Identity and Access Management (IAM).
          </IndentedTextListItem>
        </IndentedTextList>

        <TextList>
          <TextListItem>
            <Strong>SNS Policies:</Strong>
          </TextListItem>
        </TextList>
        <IndentedTextList>
          <IndentedTextListItem>
            Useful for cross-account access to SNS topics.
          </IndentedTextListItem>
          <IndentedTextListItem>
            Useful for allowing other services (S3...) to write to an SNS Topic.
          </IndentedTextListItem>
        </IndentedTextList>

        <SectionHeading id="fan-out">SNS and SQS: Fan Out</SectionHeading>

        <Paragraph>
          The idea of this method is to push once to an SNS topic which could have as many SQS queues
          subscribed as you want. This is a fully decoupled approach which helps prevent data loss. The SQS
          queue will need it's access policy to allow for SNS to write to it. This also works for cross
          region delivery so you can have SQS queues from other regions.
        </Paragraph>

        <PostImage
          src={SNSSQSFanOut}
          alt="SNS and SQS fan-out pattern"
        />

        <SectionHeading id="message-filtering">Message Filtering</SectionHeading>

        <Paragraph>
          It's possible to setup message filtering to control the flow of message. Message filtering is
          defined via JSON policy, if a subscription doesn't have a filter policy it will automatically
          receive all messages.
        </Paragraph>

        <PostImage
          src={SNSMessageFiltering}
          alt="SNS message filtering diagram"
        />

        <SubSectionHeading id="references">References</SubSectionHeading>
        <TextList>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/sns/latest/dg/welcome.html"
              target="_blank"
              rel="noreferrer"
            >
              Amazon Simple Notification Service Developer Guide - What is Amazon SNS?
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/sns/latest/dg/sns-message-filtering.html"
              target="_blank"
              rel="noreferrer"
            >
              Amazon SNS - Message filtering
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/sns/latest/dg/sns-security.html"
              target="_blank"
              rel="noreferrer"
            >
              Amazon SNS - Security and access control
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/sns/latest/dg/sns-sqs-as-subscriber.html"
              target="_blank"
              rel="noreferrer"
            >
              Amazon SNS - Using Amazon SQS as an SNS subscriber (fan-out)
            </TextLink>
          </TextListItem>
        </TextList>
      </PostContainer>
    </PageWrapper>
  );
};

export default AWSSNS;
