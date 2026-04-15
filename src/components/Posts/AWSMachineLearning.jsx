import React, { useEffect } from "react";
import styled from "styled-components";

// helpers
import { Analytics } from "../../helpers/analytics.js";

// animations
import SlideInBottom from "../../animations/SlideInBottom.js";

// layout
import {
  PageWrapper,
  PostTopBar,
  PostContainer as BasePostContainer,
  HeaderRow,
  IconWrapper,
  HeaderIcon,
  PostImage,
} from "../BlogLayout/BlogLayout.jsx";

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
  TextListItem,
} from "../Typography/Typography.jsx";

// icons
import {
  AWSSVG,
  AWSRegoknitionSVG,
  AWSPollySVG,
  AWSLexSVG,
  AWSComprehendSVG,
  AWSSageMakerSVG,
} from "../../resources/styles/icons.jsx";

// images
import Rekognition from "../../resources/images/blog/AWSMachineLearning/aws_machine_learning_rekognition.jpeg";
import LexConnectExample from "../../resources/images/blog/AWSMachineLearning/aws_machine_learning_lex_connect.jpeg";
import SageMakerExample from "../../resources/images/blog/AWSMachineLearning/aws_machine_learning_sagemaker.jpeg";
import ForcastExample from "../../resources/images/blog/AWSMachineLearning/aws_machine_learning_forecast.jpeg";
import KendraExample from "../../resources/images/blog/AWSMachineLearning/aws_machine_learning_kendra.jpeg";
import PersonalizeExample from "../../resources/images/blog/AWSMachineLearning/aws_machine_learning_personalize.jpeg";

// codeblocks
import { SSMLExample } from "../../helpers/codeblocks.js";

// components
import BackButton from "../Button/BackButton.jsx";
import Table from "../Table/Table.jsx";
import { CodeBlockWithCopy } from "../Code/Code.jsx";

const PostContainer = styled(BasePostContainer)`
  animation: ${SlideInBottom} 0.5s forwards;
`;

const AWSMachineLearning = () => {
  useEffect(() => {
    Analytics.pageview({ slug: "aws-machine-learning" });
  }, []);

  const comprehendColumns = ["Capability", "Description"];
  const comprehendData = [
    {
      Capability: "Language Detection",
      Description:
        "Identifies the dominant language in text (e.g., English, French, Spanish).",
    },
    {
      Capability: "Sentiment Analysis",
      Description:
        "Determines if text sentiment is positive, negative, neutral, or mixed.",
    },
    {
      Capability: "Entity Recognition",
      Description:
        "Detects entities like names, dates, locations, organizations and more.",
    },
    {
      Capability: "Keyphrase Extraction",
      Description: "Extracts phrases that represent key ideas in the text.",
    },
    {
      Capability: "Custom Classification",
      Description:
        "Allows you to create models for categorizing text based on your business needs.",
    },
    {
      Capability: "PII Detection",
      Description:
        "Identifies sensitive data like government IDs, phone numbers or email addresses.",
    },
  ];

  return (
    <PageWrapper>
      <PostTopBar>
        <BackButton to="/blog" />
      </PostTopBar>

      <PostContainer>
        <HeaderRow>
          <PageTitle>Amazon Machine Learning</PageTitle>
          <IconWrapper>
            <HeaderIcon>
              <AWSSVG />
            </HeaderIcon>
            <HeaderIcon>
              <AWSRegoknitionSVG />
            </HeaderIcon>
            <HeaderIcon>
              <AWSPollySVG />
            </HeaderIcon>
            <HeaderIcon>
              <AWSLexSVG />
            </HeaderIcon>
            <HeaderIcon>
              <AWSComprehendSVG />
            </HeaderIcon>
            <HeaderIcon>
              <AWSSageMakerSVG />
            </HeaderIcon>
          </IconWrapper>
        </HeaderRow>

        <Paragraph>
          In this post we'll be diving into{" "}
          <Strong>Amazon's machine learning services</Strong>, focusing on
          managed APIs for computer vision, speech, natural language and
          recommendation, plus the core ML platform for custom models.
        </Paragraph>

        <TextList>
          <TextListItem>
            <TextLink href="#aws-rekognition">Rekognition</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#aws-transcribe">Transcribe</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#aws-polly">Polly</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#aws-translate">Translate</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#aws-lex-and-connect">Lex & Connect</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#aws-comprehend">Comprehend</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#aws-sagemaker">SageMaker</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#aws-forecast">Forecast</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#aws-kendra">Kendra</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#aws-personalize">Personalize</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#aws-textract">Textract</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#machine-learning-summary">
              Machine Learning Summary
            </TextLink>
          </TextListItem>
        </TextList>

        <SectionHeading id="aws-rekognition">Rekognition</SectionHeading>
        <Paragraph>
          <Strong>Amazon Rekognition</Strong> is a cloud-based image and video
          analysis service that makes it easy to add computer vision
          capabilities to your applications. It exposes simple APIs that can
          analyse images or videos stored in S3 or passed directly.
        </Paragraph>

        <TertiaryHeading>How Does It Work?</TertiaryHeading>
        <TextList>
          <TextListItem>
            <Strong>Image / video input</Strong>: upload media to S3 or send it
            directly in an API call.
          </TextListItem>
          <TextListItem>
            <Strong>API calls</Strong>: call operations like{" "}
            <Strong>DetectLabels</Strong>, <Strong>RecognizeCelebrities</Strong>
            , <Strong>DetectFaces</Strong>, <Strong>DetectText</Strong>, etc.
          </TextListItem>
          <TextListItem>
            <Strong>Analysis</Strong>: Rekognition returns JSON with detected
            objects, bounding boxes, confidence scores and more.
          </TextListItem>
          <TextListItem>
            <Strong>Custom Labels</Strong>: train your own model on
            domain-specific images to detect custom objects.
          </TextListItem>
        </TextList>

        <TertiaryHeading>What Can It Detect?</TertiaryHeading>
        <Paragraph>
          Rekognition supports detection of <Strong>objects</Strong>,{" "}
          <Strong>people</Strong>, <Strong>text</Strong>,{" "}
          <Strong>scenes</Strong>, <Strong>faces</Strong> in images and videos.
          It can perform <Strong>facial analysis</Strong> and face search for
          user verification and identification use cases.
        </Paragraph>

        <TertiaryHeading>Content Moderation</TertiaryHeading>
        <Paragraph>
          Rekognition can flag potentially inappropriate or offensive content in
          images and videos. You can control this using a{" "}
          <Strong>minimum confidence threshold</Strong>, and then route flagged
          content to a manual review workflow using{" "}
          <Strong>Amazon Augmented AI (A2I)</Strong>.
        </Paragraph>

        <PostImage src={Rekognition} alt="Amazon Rekognition overview" />

        <SectionHeading id="aws-transcribe">Transcribe</SectionHeading>
        <Paragraph>
          <Strong>Amazon Transcribe</Strong> is an automatic speech recognition
          (ASR) service that converts audio and video into text. It’s useful for
          captions, call analytics, searchable audio archives and more.
        </Paragraph>

        <TertiaryHeading>How Does It Work?</TertiaryHeading>
        <TextList>
          <TextListItem>
            Provide audio from S3 or stream audio in real time.
          </TextListItem>
          <TextListItem>
            Start a <Strong>transcription job</Strong> via console, CLI or SDK.
          </TextListItem>
          <TextListItem>
            Transcribe runs ML models to convert speech to text.
          </TextListItem>
          <TextListItem>
            Output is returned in JSON with timestamps, speaker labels and
            confidence scores.
          </TextListItem>
        </TextList>

        <SectionHeading id="aws-polly">Polly</SectionHeading>
        <Paragraph>
          <Strong>Amazon Polly</Strong> is a text-to-speech (TTS) service that
          turns text into natural-sounding speech in multiple languages and
          voices. It’s ideal for voice-enabled apps, IVR systems, news readers
          and accessibility.
        </Paragraph>

        <SubSectionHeading>Lexicons & SSML</SubSectionHeading>
        <Paragraph>
          Polly supports <Strong>lexicons</Strong> to customise pronunciation
          for domain-specific terms (e.g. saying &quot;AWS&quot; as &quot;Amazon
          Web Services&quot;), and{" "}
          <Strong>SSML (Speech Synthesis Markup Language)</Strong> for fine
          control over pitch, rate, volume, pauses and emphasis.
        </Paragraph>

        <CodeBlockWithCopy code={SSMLExample} language="xml" />

        <SectionHeading id="aws-translate">Translate</SectionHeading>
        <Paragraph>
          <Strong>Amazon Translate</Strong> is a neural machine translation
          service for translating text between many languages in real time or
          batch mode. It’s used for localisation, multilingual apps and
          cross-language communication.
        </Paragraph>

        <TertiaryHeading>How Does It Work?</TertiaryHeading>
        <TextList>
          <TextListItem>Provide text via API, CLI or console.</TextListItem>
          <TextListItem>
            Specify source and target languages (or let the service auto-detect
            the source).
          </TextListItem>
          <TextListItem>
            Translate uses neural MT models to produce the translated output.
          </TextListItem>
          <TextListItem>
            The service returns translated text while preserving basic
            formatting.
          </TextListItem>
        </TextList>

        <SectionHeading id="aws-lex-and-connect">Lex & Connect</SectionHeading>
        <Paragraph>
          <Strong>Amazon Lex</Strong> is a fully managed service for building
          conversational interfaces using voice and text. It provides{" "}
          <Strong>automatic speech recognition (ASR)</Strong> and{" "}
          <Strong>natural language understanding (NLU)</Strong> to build
          chatbots and virtual assistants.
        </Paragraph>
        <Paragraph>
          Lex is often integrated with <Strong>Amazon Connect</Strong>, a
          cloud-based contact centre service. Connect lets you set up virtual
          call centres quickly and use Lex bots to automate parts of the caller
          experience.
        </Paragraph>

        <PostImage
          src={LexConnectExample}
          alt="Amazon Lex with Amazon Connect example"
        />

        <SectionHeading id="aws-comprehend">Comprehend</SectionHeading>
        <Paragraph>
          <Strong>Amazon Comprehend</Strong> is a natural language processing
          (NLP) service that extracts insights from unstructured text using
          machine learning. It supports sentiment, entities, key phrases, topics
          and more.
        </Paragraph>

        <SubSectionHeading>Comprehend Capabilities</SubSectionHeading>
        <Table data={comprehendData} columns={comprehendColumns} />

        <SubSectionHeading>How Does It Work?</SubSectionHeading>
        <TextList>
          <TextListItem>Provide text via console, CLI or SDK.</TextListItem>
          <TextListItem>
            Choose tasks like sentiment analysis, entity detection or custom
            classification.
          </TextListItem>
          <TextListItem>
            Comprehend uses pre-trained or custom models to analyse the text.
          </TextListItem>
          <TextListItem>
            Results are returned as JSON with scores and extracted insights.
          </TextListItem>
        </TextList>

        <SectionHeading id="aws-sagemaker">SageMaker</SectionHeading>
        <Paragraph>
          <Strong>Amazon SageMaker</Strong> is the core ML platform on AWS,
          providing tools for <Strong>building</Strong>,{" "}
          <Strong>training</Strong> and <Strong>deploying</Strong> machine
          learning models at scale. It streamlines everything from data
          preparation to model hosting.
        </Paragraph>
        <PostImage src={SageMakerExample} alt="Amazon SageMaker overview" />

        <SectionHeading id="aws-forecast">Forecast</SectionHeading>
        <Paragraph>
          <Strong>Amazon Forecast</Strong> is a fully managed, ML-based service
          for generating highly accurate <Strong>time-series forecasts</Strong>.
          It’s used for demand planning, inventory, workforce capacity and more.
        </Paragraph>
        <PostImage src={ForcastExample} alt="Amazon Forecast example" />

        <SectionHeading id="aws-kendra">Kendra</SectionHeading>
        <Paragraph>
          <Strong>Amazon Kendra</Strong> is an intelligent enterprise search
          service. It indexes structured and unstructured data across multiple
          repositories and uses ML to return highly relevant answers to natural
          language queries.
        </Paragraph>
        <PostImage src={KendraExample} alt="Amazon Kendra overview" />

        <SectionHeading id="aws-personalize">Personalize</SectionHeading>
        <Paragraph>
          <Strong>Amazon Personalize</Strong> is a recommendation service that
          uses ML to deliver real-time, personalised product or content
          recommendations, without you having to build your own recommendation
          engine.
        </Paragraph>
        <PostImage src={PersonalizeExample} alt="Amazon Personalize overview" />

        <SectionHeading id="aws-textract">Textract</SectionHeading>
        <Paragraph>
          <Strong>Amazon Textract</Strong> is a managed service that extracts
          text, handwriting and structured data (forms and tables) from
          documents such as PDFs and images. It goes beyond basic OCR by
          understanding document layout and relationships.
        </Paragraph>

        <SubSectionHeading>How Does It Work?</SubSectionHeading>
        <TextList>
          <TextListItem>
            Upload documents (images, PDFs, scanned forms) via console or API.
          </TextListItem>
          <TextListItem>
            Textract analyses the document to detect text, key-value pairs and
            tables.
          </TextListItem>
          <TextListItem>
            Output is returned as structured JSON, ready for downstream
            processing.
          </TextListItem>
          <TextListItem>
            You can integrate the output with search, analytics or workflow
            automation.
          </TextListItem>
        </TextList>

        <SectionHeading id="machine-learning-summary">
          Machine Learning Summary
        </SectionHeading>
        <TextList>
          <TextListItem>
            <Strong>Rekognition</Strong>: face detection, labelling, content
            moderation, celebrity recognition.
          </TextListItem>
          <TextListItem>
            <Strong>Transcribe</Strong>: audio and video to text.
          </TextListItem>
          <TextListItem>
            <Strong>Polly</Strong>: text to natural speech.
          </TextListItem>
          <TextListItem>
            <Strong>Translate</Strong>: neural text translation.
          </TextListItem>
          <TextListItem>
            <Strong>Lex</Strong>: conversational chatbots.
          </TextListItem>
          <TextListItem>
            <Strong>Connect</Strong>: cloud contact centre, often using Lex.
          </TextListItem>
          <TextListItem>
            <Strong>Comprehend</Strong>: NLP insights from text.
          </TextListItem>
          <TextListItem>
            <Strong>SageMaker</Strong>: end-to-end ML platform for custom
            models.
          </TextListItem>
          <TextListItem>
            <Strong>Forecast</Strong>: ML-based time-series forecasting.
          </TextListItem>
          <TextListItem>
            <Strong>Kendra</Strong>: ML-powered enterprise search.
          </TextListItem>
          <TextListItem>
            <Strong>Personalize</Strong>: real-time personalised
            recommendations.
          </TextListItem>
          <TextListItem>
            <Strong>Textract</Strong>: document text and structure extraction.
          </TextListItem>
        </TextList>

        <SectionHeading id="references">References</SectionHeading>
        <TextList>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/rekognition/latest/dg/what-is.html"
              target="_blank"
              rel="noreferrer"
            >
              Amazon Rekognition - Developer Guide
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/transcribe/latest/dg/what-is-transcribe.html"
              target="_blank"
              rel="noreferrer"
            >
              Amazon Transcribe - Developer Guide
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/polly/latest/dg/what-is.html"
              target="_blank"
              rel="noreferrer"
            >
              Amazon Polly - Developer Guide
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/translate/latest/dg/what-is.html"
              target="_blank"
              rel="noreferrer"
            >
              Amazon Translate - Developer Guide
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/lexv2/latest/dg/what-is.html"
              target="_blank"
              rel="noreferrer"
            >
              Amazon Lex - Developer Guide
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/connect/latest/adminguide/what-is-amazon-connect.html"
              target="_blank"
              rel="noreferrer"
            >
              Amazon Connect - Admin Guide
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/comprehend/latest/dg/what-is.html"
              target="_blank"
              rel="noreferrer"
            >
              Amazon Comprehend - Developer Guide
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/sagemaker/latest/dg/whatis.html"
              target="_blank"
              rel="noreferrer"
            >
              Amazon SageMaker - Developer Guide
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/forecast/latest/dg/what-is-forecast.html"
              target="_blank"
              rel="noreferrer"
            >
              Amazon Forecast - Developer Guide
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/kendra/latest/dg/what-is-kendra.html"
              target="_blank"
              rel="noreferrer"
            >
              Amazon Kendra - Developer Guide
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/personalize/latest/dg/what-is-personalize.html"
              target="_blank"
              rel="noreferrer"
            >
              Amazon Personalize - Developer Guide
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/textract/latest/dg/what-is.html"
              target="_blank"
              rel="noreferrer"
            >
              Amazon Textract - Developer Guide
            </TextLink>
          </TextListItem>
        </TextList>
      </PostContainer>
    </PageWrapper>
  );
};

export default AWSMachineLearning;
