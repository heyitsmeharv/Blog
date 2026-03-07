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
  TertiaryHeading,
  Paragraph,
  Strong,
  TextLink,
  TextList,
  TextListItem
} from "../Typography/Typography";

// icons
import {
  AWSSVG,
  AWSLambdaSVG,
  AWSAPIGatewaySVG,
  AWSStepFunctionsSVG,
} from "../../resources/styles/icons";

// images
import LambdaConcurrency from "../../resources/images/blog/AWSServerless/aws_serverless_lambda_concurrency.jpeg";
import LambdaThrottle from "../../resources/images/blog/AWSServerless/aws_serverless_lambda_throttle.jpeg";
import LambdaSnapShot from "../../resources/images/blog/AWSServerless/aws_serverless_lambda_snapshot.jpeg";
import APIGatewayExample from "../../resources/images/blog/AWSServerless/aws_serverless_api_gateway_example.jpeg";
import StepFunctionExample from "../../resources/images/blog/AWSServerless/aws_serverless_step_function_example.jpeg";

// components
import BackButton from "../Button/BackButton";
import Table from "../Table/Table";

const PostContainer = styled(BasePostContainer)`
  animation: ${SlideInBottom} 0.5s forwards;
`;

const AWSServerless = () => {

  useEffect(() => {
    Analytics.event('blog_opened', { slug: 'aws-serverless' });
  }, []);


  const columns = ["Execution", "Deployment"];
  const data = [
    {
      Execution: "Memory Allocation 128 MB - 10GB (1 MB Increments)",
      Deployment: "Lambda function deployment size (compressed .zip): 50 MB",
    },
    {
      Execution: "Maximum execution time: 900 seconds (15 minutes)",
      Deployment:
        "Size of uncompressed deployment (code + dependencies): 250 MB",
    },
    {
      Execution: "Environment variables (4 KB)",
      Deployment: "Can use the /tmp directory to load other files at startup",
    },
    {
      Execution: "Disk capacity in the function container (512 MB to 10 GB)",
      Deployment: "Environment variables (4 KB)",
    },
    {
      Execution: "Concurrency executions: 1000 (can be increased)",
      Deployment: "",
    },
  ];

  const columns2 = ["Cold Start", "Provisioned Concurrency"];
  const data2 = [
    {
      "Cold Start":
        "New instance: code is loaded and code outside the handler runs (init phase).",
      "Provisioned Concurrency":
        "Concurrency is allocated before the function is invoked (in advance).",
    },
    {
      "Cold Start":
        "If the init is large (code, dependencies, SDK), it can take noticeable time.",
      "Provisioned Concurrency":
        "Cold start never happens and all invocations have consistently low latency.",
    },
    {
      "Cold Start":
        "First request served by new instances has higher latency than subsequent ones.",
      "Provisioned Concurrency":
        "Application Auto Scaling can manage concurrency (schedule or target utilisation).",
    },
  ];

  const columns3 = ["Feature", "Lambda@Edge", "CloudFront Functions"];
  const data3 = [
    {
      Feature: "Runtime",
      "Lambda@Edge": "Multiple runtimes (Node.js, Python, etc.)",
      "CloudFront Functions": "JavaScript only",
    },
    {
      Feature: "Number of Requests",
      "Lambda@Edge": "Thousands of requests per second",
      "CloudFront Functions": "Millions of requests per second",
    },
    {
      Feature: "CloudFront Triggers",
      "Lambda@Edge":
        "Viewer request/response and origin request/response triggers",
      "CloudFront Functions": "Viewer request/response triggers",
    },
    {
      Feature: "Max Execution Time",
      "Lambda@Edge": "5-10 seconds",
      "CloudFront Functions": "< 1 ms",
    },
    {
      Feature: "Max Memory",
      "Lambda@Edge": "128 MB up to 10 GB",
      "CloudFront Functions": "2 MB",
    },
    {
      Feature: "Total Package Size",
      "Lambda@Edge": "1 MB - 50 MB",
      "CloudFront Functions": "10 KB",
    },
    {
      Feature: "Network/File System Access",
      "Lambda@Edge": "Yes",
      "CloudFront Functions": "No",
    },
    {
      Feature: "Access to Request Body",
      "Lambda@Edge": "Yes",
      "CloudFront Functions": "No",
    },
    {
      Feature: "Performance Profile",
      "Lambda@Edge":
        "Suitable for heavier logic, e.g. image processing, complex auth",
      "CloudFront Functions":
        "Perfect for ultra-fast, simple tasks like header/URL rewrites",
    },
  ];

  return (
    <PageWrapper>
      <PostTopBar>
        <BackButton to="/blog" />
      </PostTopBar>

      <PostContainer>
        <HeaderRow>
          <PageTitle>Amazon Serverless</PageTitle>
          <IconWrapper>
            <HeaderIcon>
              <AWSSVG />
            </HeaderIcon>
            <HeaderIcon>
              <AWSLambdaSVG />
            </HeaderIcon>
            <HeaderIcon>
              <AWSAPIGatewaySVG />
            </HeaderIcon>
            <HeaderIcon>
              <AWSStepFunctionsSVG />
            </HeaderIcon>
          </IconWrapper>
        </HeaderRow>

        <Paragraph>
          In this post we'll be diving into Amazon's serverless solutions including{" "}
          <Strong>AWS Lambda</Strong>,{" "}
          <Strong>Amazon API Gateway</Strong> and{" "}
          <Strong>AWS Step Functions</Strong>.
        </Paragraph>

        <TextList>
          <TextListItem>
            <TextLink href="#what-is-serverless">What Is Serverless?</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#aws-lambda">Lambda</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#aws-api-gateway">API Gateway</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#aws-step-functions">Step Functions</TextLink>
          </TextListItem>
        </TextList>

        <SectionHeading id="what-is-serverless">What Is Serverless?</SectionHeading>
        <Paragraph>
          Before we explore any AWS services that are classed as serverless, let's
          first outline what actually constitutes{" "}
          <Strong>“serverless”</Strong>. Serverless was a term that was
          pioneered by AWS Lambda but now includes anything that's fully managed:
          databases, messaging, storage, etc.
        </Paragraph>
        <Paragraph>
          <Strong>Serverless doesn't mean there are no servers</Strong>; it
          means you don't have to manage, provision, or even see them. It's a
          paradigm where you focus on code and configuration, and AWS handles
          capacity, scaling and patching for you.
        </Paragraph>

        <SectionHeading id="aws-lambda">Lambda</SectionHeading>
        <Paragraph>
          <Strong>AWS Lambda</Strong> is a serverless compute service that
          executes your code in response to events, while handling all compute
          resource management for you. It's essentially a virtual function that:
        </Paragraph>
        <TextList>
          <TextListItem>Runs on demand</TextListItem>
          <TextListItem>Is limited by a maximum execution time</TextListItem>
          <TextListItem>Scales automatically with traffic</TextListItem>
          <TextListItem>You pay per request and compute duration</TextListItem>
        </TextList>
        <Paragraph>Lambda supports several runtimes, including:</Paragraph>
        <TextList>
          <TextListItem>Node.js (JavaScript)</TextListItem>
          <TextListItem>Python</TextListItem>
          <TextListItem>Java</TextListItem>
          <TextListItem>C# (.NET Core) / PowerShell</TextListItem>
          <TextListItem>Ruby</TextListItem>
          <TextListItem>Custom runtimes (e.g. Rust, Go via the Custom Runtime API)</TextListItem>
        </TextList>

        <SubSectionHeading>Lambda Limitations (Execution & Deployment)</SubSectionHeading>
        <Table data={data} columns={columns} />

        <SubSectionHeading>Lambda Concurrency and Throttling</SubSectionHeading>
        <Paragraph>
          By default, an AWS account has a concurrency limit of{" "}
          <Strong>1,000 concurrent executions</Strong> (soft limit,
          can be increased). You can also configure{" "}
          <Strong>reserved concurrency</Strong> per function to
          guarantee capacity for critical workloads.
        </Paragraph>
        <PostImage src={LambdaConcurrency} alt="Lambda concurrency model" />
        <Paragraph>
          When invocations exceed the available concurrency, Lambda throttles:
        </Paragraph>
        <TextList>
          <TextListItem>
            <Strong>Synchronous</Strong>: caller receives a{" "}
            <Strong>429 (Throttle)</Strong> error.
          </TextListItem>
          <TextListItem>
            <Strong>Asynchronous</Strong>: Lambda automatically
            retries for up to 6 hours with exponential backoff, and failed events
            can end up in a DLQ or on a destination if configured.
          </TextListItem>
        </TextList>
        <PostImage src={LambdaThrottle} alt="Lambda throttling behaviour" />

        <SubSectionHeading>Cold Starts and Provisioned Concurrency</SubSectionHeading>
        <Paragraph>
          A <Strong>cold start</Strong> happens when Lambda needs to
          create a new execution environment to serve an invocation. This includes
          bootstrapping the runtime and running any init code outside the handler.
          Provisioned concurrency keeps a pool of warm environments ready so
          requests avoid cold-start latency.
        </Paragraph>
        <Table data={data2} columns={columns2} />

        <SubSectionHeading>Lambda SnapStart</SubSectionHeading>
        <Paragraph>
          <Strong>Lambda SnapStart</Strong> is designed to further
          reduce cold start latency by taking a snapshot of a fully initialised
          execution environment and reusing it to serve requests. This can yield
          up to a 10x improvement in cold start times for supported runtimes (for
          example Java), at no extra cost.
        </Paragraph>
        <PostImage src={LambdaSnapShot} alt="Lambda SnapStart" />

        <SubSectionHeading>Lambda@Edge and CloudFront Functions</SubSectionHeading>
        <Paragraph>
          <Strong>Lambda@Edge</Strong> is an extension of Lambda
          that runs your code in CloudFront edge locations. It's suitable for
          heavier, more flexible logic tightly integrated with CloudFront.
        </Paragraph>
        <TertiaryHeading>How Lambda@Edge Works</TertiaryHeading>
        <TextList>
          <TextListItem>
            You associate a Lambda function with a CloudFront event (viewer
            request/response or origin request/response).
          </TextListItem>
          <TextListItem>
            When a CloudFront request matches that event, the function runs at the
            nearest edge location.
          </TextListItem>
          <TextListItem>
            The function can modify the request/response, perform auth,
            rewrites/redirects or generate content.
          </TextListItem>
        </TextList>

        <SubSectionHeading>CloudFront Functions</SubSectionHeading>
        <Paragraph>
          <Strong>CloudFront Functions</Strong> are ultra-lightweight
          JavaScript functions that run at CloudFront edge locations with
          sub-millisecond latency, ideal for high-volume, simple logic like
          header manipulation and URL rewrites.
        </Paragraph>

        <SubSectionHeading>Lambda@Edge vs CloudFront Functions</SubSectionHeading>
        <Table data={data3} columns={columns3} />

        <SubSectionHeading>Which One to Choose?</SubSectionHeading>
        <TextList>
          <TextListItem>
            <Strong>Choose Lambda@Edge</Strong> when you need
            complex logic, access to the request body, or heavier processing.
          </TextListItem>
          <TextListItem>
            <Strong>Choose CloudFront Functions</Strong> when you
            need ultra-low latency and very high scale for simple edge logic.
          </TextListItem>
        </TextList>

        <SectionHeading id="aws-api-gateway">API Gateway</SectionHeading>
        <Paragraph>
          <Strong>Amazon API Gateway</Strong> is a fully managed service for
          creating, publishing, securing, monitoring and managing APIs at scale.
          It acts as a front door between your backend services (Lambda, ECS/EC2,
          HTTP services, DynamoDB, etc.) and your clients.
        </Paragraph>

        <TertiaryHeading>Integration Types</TertiaryHeading>
        <TextList>
          <TextListItem>
            <Strong>Lambda Function</Strong> - invoke a Lambda for
            serverless business logic.
          </TextListItem>
          <TextListItem>
            <Strong>HTTP Endpoint</Strong> - proxy to external
            HTTP/HTTPS backends.
          </TextListItem>
          <TextListItem>
            <Strong>AWS Service</Strong> - integrate directly with
            services like S3, DynamoDB or Step Functions.
          </TextListItem>
        </TextList>

        <TertiaryHeading>API Types</TertiaryHeading>
        <TextList>
          <TextListItem>
            <Strong>REST APIs</Strong> - full-featured API Gateway
            APIs (legacy but still widely used).
          </TextListItem>
          <TextListItem>
            <Strong>HTTP APIs</Strong> - lighter, cheaper, lower
            latency for most common API use cases.
          </TextListItem>
          <TextListItem>
            <Strong>WebSocket APIs</Strong> - stateful, real-time
            communication over WebSockets.
          </TextListItem>
        </TextList>

        <TertiaryHeading>Endpoint Types</TertiaryHeading>
        <TextList>
          <TextListItem>
            <Strong>Edge-Optimized</Strong> - fronted by CloudFront
            for global clients.
          </TextListItem>
          <TextListItem>
            <Strong>Regional</Strong> - intended for clients in the
            same region.
          </TextListItem>
          <TextListItem>
            <Strong>Private</Strong> - accessible only within a VPC
            via VPC endpoints.
          </TextListItem>
        </TextList>

        <SubSectionHeading>Serverless API Example</SubSectionHeading>
        <PostImage
          src={APIGatewayExample}
          alt="API Gateway serverless API example"
        />

        <SectionHeading id="aws-step-functions">Step Functions</SectionHeading>
        <Paragraph>
          <Strong>AWS Step Functions</Strong> is a serverless orchestration
          service that lets you model workflows as state machines. It coordinates
          multiple AWS services (Lambda, ECS, SQS, SNS, Glue, etc.) into reliable,
          auditable business processes.
        </Paragraph>
        <Paragraph>
          You define your workflow in Amazon States Language (JSON-based), with
          support for parallel execution, retries with backoff, error handling and
          human approval steps (via callbacks or integrations).
        </Paragraph>
        <PostImage
          src={StepFunctionExample}
          alt="AWS Step Functions example"
        />

        <SectionHeading id="references">References</SectionHeading>
        <TextList>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/lambda/latest/dg/welcome.html"
              target="_blank"
              rel="noreferrer"
            >
              AWS Lambda - Developer Guide
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/lambda/latest/dg/configuration-concurrency.html"
              target="_blank"
              rel="noreferrer"
            >
              AWS Lambda - Concurrency and scaling
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/lambda/latest/dg/snapstart.html"
              target="_blank"
              rel="noreferrer"
            >
              AWS Lambda SnapStart
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html"
              target="_blank"
              rel="noreferrer"
            >
              Amazon API Gateway - Developer Guide
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/step-functions/latest/dg/welcome.html"
              target="_blank"
              rel="noreferrer"
            >
              AWS Step Functions - Developer Guide
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/lambda-at-the-edge.html"
              target="_blank"
              rel="noreferrer"
            >
              Lambda@Edge - Developer Guide
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/cloudfront-functions.html"
              target="_blank"
              rel="noreferrer"
            >
              CloudFront Functions - Developer Guide
            </TextLink>
          </TextListItem>
        </TextList>
      </PostContainer>
    </PageWrapper>
  );
};

export default AWSServerless;
