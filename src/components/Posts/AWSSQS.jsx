import React, { useEffect } from "react";
import styled from "styled-components";

// helpers
import { Analytics } from "../../helpers/analytics";

// animations
import SlideInBottom from "../../animations/SlideInBottom";

// icons
import { AWSSVG, AWSSQSSVG } from "../../resources/styles/icons";

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
} from "../Typography/Typography";

// components
import BackButton from "../Button/BackButton";

// images
import SQSCommunicationPatterns from "../../resources/images/blog/AWSSQS/sqs_communication_patterns.jpeg";
import SQSQueueExample from "../../resources/images/blog/AWSSQS/sqs_queue_example.jpeg";
import SQSWithASG from "../../resources/images/blog/AWSSQS/sqs_with_asg.jpeg";
import SQSDecoupleExample from "../../resources/images/blog/AWSSQS/sqs_decouple_example.jpeg";
import SQSFIFOExample from "../../resources/images/blog/AWSSQS/sqs_fifo_example.jpeg";

const PostContainer = styled(BasePostContainer)`
  animation: ${SlideInBottom} 0.5s forwards;
`;

const AWSSQS = () => {
  useEffect(() => {
    Analytics.event("blog_opened", { slug: "aws-sqs" });
  }, []);

  return (
    <PageWrapper>
      <PostTopBar>
        <BackButton to="/blog" />
      </PostTopBar>

      <PostContainer>
        <HeaderRow>
          <PageTitle>Amazon Simple Queue Service (SQS)</PageTitle>
          <IconWrapper>
            <HeaderIcon>
              <AWSSVG />
            </HeaderIcon>
            <HeaderIcon>
              <AWSSQSSVG />
            </HeaderIcon>
          </IconWrapper>
        </HeaderRow>

        <Paragraph>In this post I'll be tackling Amazon's Simple Queue Service (SQS).</Paragraph>

        <TextList>
          <TextListItem>
            <TextLink href="#sqs-introduction">SQS Introduction</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#what-is-a-queue">What's a Queue?</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#sqs-security">Security</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#standard-queue">Standard Queue</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#fifo-queue">FIFO Queue</TextLink>
          </TextListItem>
        </TextList>

        <SectionHeading id="sqs-introduction">
          Amazon Simple Queue Service
        </SectionHeading>

        <Paragraph>
          Amazon Simple Queue Service (Amazon SQS) is a fully managed message queuing service provided by
          Amazon Web Services (AWS). It enables the decoupling and scaling of microservices, distributed
          systems, and serverless applications. When we start deploying multiple applications, they will
          inevitably need to communicate with one another. There are two patterns of communication.
        </Paragraph>

        <TextList>
          <TextListItem>Synchronous communications (application to application).</TextListItem>
          <TextListItem>
            Asynchronous/Event based communications (application to queue to application).
          </TextListItem>
        </TextList>

        <PostImage
          src={SQSCommunicationPatterns}
          alt="Diagram showing synchronous and asynchronous SQS communication patterns"
        />

        <SectionHeading id="what-is-a-queue">What's a Queue?</SectionHeading>

        <Paragraph>
          An SQS queue acts as a buffer between producers (anything that sends messages to a queue) and
          consumers (anything that polls messages from a queue).
        </Paragraph>

        <PostImage
          src={SQSQueueExample}
          alt="Example diagram of SQS queue between producers and consumers"
        />

        <SubSectionHeading>Producers</SubSectionHeading>
        <Paragraph>
          Producers sends messages to the queue via the SendMessage API. Once the message is sent it is
          persists in the queue until the consumer deletes it or it hits the retention limit.
        </Paragraph>

        <SubSectionHeading>Consumers</SubSectionHeading>
        <Paragraph>
          Consumers are instances that could be EC2 or AWS Lambda or any server. This instance polls for
          SQS messages that can receive up to 10 messages at a time. Once the message has been processed
          (whatever custom code runs on the server) the consumer will then delete the message using the
          DeleteMessage API.
        </Paragraph>

        <SubSectionHeading>Message Visibility Timeout</SubSectionHeading>
        <Paragraph>
          After a message is polled by a consumer; it becomes invisible to other consumers. By default,
          the 'message visibility timeout' is 30 seconds which means the message has 30 seconds
          to be processed. If the message is not processed within the visibility timeout, it will be
          processed twice. If the message is in the middle of being processed by a consumer but hasn't
          finished before the timeout, it's possible for the consumer to call the ChangeMessageVisibility
          API to get more time. It's possible to change the timeout but keep in mind that if it's
          too high (hours) the consumer can crash and re-processing will take time. Alternatively if it's
          too low (seconds), the chances of duplicate messages will be higher.
        </Paragraph>

        <SubSectionHeading>Long Polling</SubSectionHeading>
        <Paragraph>
          When a consumer requests messages from the queue, it can optionally 'wait' for messages
          to arrive if there are none in the queue - this is called Long Polling. Long Polling decreases the
          number of API calls made to SQS while increasing the efficiency and latency of an application. The
          wait time can be anywhere between 1-20 seconds.
        </Paragraph>

        <SectionHeading id="sqs-security">Security</SectionHeading>

        <TextList>
          <TextListItem>
            <Strong>Encryption:</Strong>
          </TextListItem>
        </TextList>
        <TextList>
          <TextListItem>
            Supports encryption at rest using AWS Key Management Service (KMS).
          </TextListItem>
          <TextListItem>
            Enables secure communication over HTTPS.
          </TextListItem>
          <TextListItem>
            Client-side encryption if the client wants to perform encryption/decryption itself.
          </TextListItem>
        </TextList>

        <TextList>
          <TextListItem>
            <Strong>Access Controls:</Strong>
          </TextListItem>
        </TextList>
        <TextList>
          <TextListItem>
            Provides fine-grained access control using AWS Identity and Access Management (IAM).
          </TextListItem>
        </TextList>

        <TextList>
          <TextListItem>
            <Strong>SQS Policies:</Strong>
          </TextListItem>
        </TextList>
        <TextList>
          <TextListItem>
            Useful for cross-account access to SQS queues.
          </TextListItem>
          <TextListItem>
            Useful for allowing other services (SNS, S3...) to write to an SQS queue.
          </TextListItem>
        </TextList>

        <SectionHeading id="standard-queue">Standard Queue</SectionHeading>

        <Paragraph>
          This is the default option which supports nearly unlimited number of API calls per second. The
          important things to note for this queue are:
        </Paragraph>

        <SubSectionHeading>Attributes</SubSectionHeading>
        <TextList>
          <TextListItem>
            Default retention of messages: A message can stay in a queue for 4 days by default and a
            maximum of 14 days.
          </TextListItem>
          <TextListItem>Can have duplicate messages (at least once delivery).</TextListItem>
          <TextListItem>Can have out of order messages (best effort ordering).</TextListItem>
          <TextListItem>Low latency: Under 10ms on publishing and receiving a message.</TextListItem>
          <TextListItem>Limitation of 256kb per message sent.</TextListItem>
        </TextList>

        <SubSectionHeading>SQS with Auto Scaling Groups (ASG)</SubSectionHeading>
        <Paragraph>
          Consumers will be running on instances inside an auto scaling group which will be polling messages
          from the queue. There is a metric we can use to scale up the instances if there is a spike in
          messages. This metric (ApproximateNumberOfMessages) can be tied to a cloudwatch alarm, which when
          is breached can trigger the auto scaling group to ramp up capacity.
        </Paragraph>

        <PostImage
          src={SQSWithASG}
          alt="Diagram of SQS used with Auto Scaling Group"
        />

        <SubSectionHeading>SQS To Decouple Between Application Tiers</SubSectionHeading>
        <Paragraph>
          Here is an example of having a separate instance process a message. This is a common architecture
          pattern to prevent any bottleneck to the front-end application. In this example the front-end
          application can send a message to a queue and the second tier can poll the message and insert it
          into an S3 bucket.
        </Paragraph>

        <PostImage
          src={SQSDecoupleExample}
          alt="Diagram of SQS used to decouple application tiers"
        />

        <SectionHeading id="fifo-queue">FIFO Queue</SectionHeading>

        <Paragraph>
          FIFO - First In First Out. This means that it prioritises sending messages in the order of which
          the queue receives those messages.
        </Paragraph>

        <PostImage
          src={SQSFIFOExample}
          alt="Diagram showing FIFO SQS queue behavior"
        />

        <Paragraph>
          This type of queue is limited to 300 msg/s without batching, 3000 msg/s with batching. It does
          however remove duplicate messages from being sent.
        </Paragraph>

        <SubSectionHeading id="references">References</SubSectionHeading>
        <TextList>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html"
              target="_blank"
              rel="noreferrer"
            >
              Amazon SQS Developer Guide - What is Amazon SQS?
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-visibility-timeout.html"
              target="_blank"
              rel="noreferrer"
            >
              Amazon SQS - Visibility timeout
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-server-side-encryption.html"
              target="_blank"
              rel="noreferrer"
            >
              Amazon SQS - Security and encryption
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/FIFO-queues.html"
              target="_blank"
              rel="noreferrer"
            >
              Amazon SQS - FIFO queues
            </TextLink>
          </TextListItem>
        </TextList>
      </PostContainer>
    </PageWrapper>
  );
};

export default AWSSQS;
