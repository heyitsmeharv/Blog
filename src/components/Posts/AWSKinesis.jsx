import React, { useEffect } from "react";
import styled from "styled-components";

// helpers
import { Analytics } from "../../helpers/analytics";

// animations
import SlideInBottom from "../../animations/SlideInBottom";

// icons
import { AWSSVG, AWSKinesisSVG } from "../../resources/styles/icons";

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

// components
import BackButton from "../Button/BackButton";
import Table from "../Table/Table";

// images
import KinesisDataStreams from "../../resources/images/blog/AWSKinesis/kinesis_data_streams.jpeg";
import KinesisDataStreamsEncryption from "../../resources/images/blog/AWSKinesis/kinesis_data_streams_encryption.jpeg";
import KinesisFirehose from "../../resources/images/blog/AWSKinesis/kinesis_data_firehose.jpeg";
import KinesisDataOrdering from "../../resources/images/blog/AWSKinesis/kinesis_data_ordering.jpeg";
import SQSDataOrdering from "../../resources/images/blog/AWSSQS/sqs_data_ordering.jpeg";
import SQSDataOrderingGroupId from "../../resources/images/blog/AWSSQS/sqs_data_ordering_group_id.jpeg";

const PostContainer = styled(BasePostContainer)`
  animation: ${SlideInBottom} 0.5s forwards;
`;

const AWSKinesis = () => {
  useEffect(() => {
    Analytics.pageview({ slug: "aws-kinesis" });
  }, []);

  const columns = ["Feature", "Provisioned Mode", "On-Demand Mode"];
  const data = [
    {
      Feature: "Capacity Management",
      "Provisioned Mode": "Manual (based on shard count)",
      "On-Demand Mode": "Automatic (scales in response to traffic)",
    },
    {
      Feature: "Throughput",
      "Provisioned Mode": "Depends on the number of shards",
      "On-Demand Mode": "Up to 200 MB/s write and 400 MB/s read automatically",
    },
    {
      Feature: "Scalability",
      "Provisioned Mode": "Requires manual intervention",
      "On-Demand Mode": "Fully automatic, no manual intervention required",
    },
    {
      Feature: "Cost",
      "Provisioned Mode": "Based on the number of shards",
      "On-Demand Mode": "Based on the data throughput (pay for what you use)",
    },
    {
      Feature: "Best For",
      "Provisioned Mode": "Predictable traffic, cost control",
      "On-Demand Mode": "Unpredictable, variable traffic, ease of use",
    },
  ];

  const columns2 = ["Kinesis Data Streams", "Kinesis Data Firehose"];
  const data2 = [
    {
      "Kinesis Data Streams": "Streaming service for ingest at scale",
      "Kinesis Data Firehose":
        "Load streaming data into S3 / Redshift / OpenSearch / 3rd Party / custom HTTP",
    },
    {
      "Kinesis Data Streams": "Write custom code (producer / consumer)",
      "Kinesis Data Firehose": "Fully managed",
    },
    {
      "Kinesis Data Streams": "Real-time (~200ms)",
      "Kinesis Data Firehose": "Near real-time",
    },
    {
      "Kinesis Data Streams": "Manage scaling (shard splitting / merging)",
      "Kinesis Data Firehose": "Automatic scaling",
    },
    {
      "Kinesis Data Streams": "Data storage up to 365 days",
      "Kinesis Data Firehose": "No data storage",
    },
    {
      "Kinesis Data Streams": "Supports replay capacity",
      "Kinesis Data Firehose": "Doesn't support replay capacity",
    },
  ];

  const columns3 = ["Kinesis", "SNS", "SQS"];
  const data3 = [
    {
      Kinesis: "Standard: pull data 2MB per shard",
      SNS: "Push data to many subscribers",
      SQS: 'Consumer "pull data"',
    },
    {
      Kinesis: "Enhanced fan-out: push data 2MB per shard per consumer",
      SNS: "Up to 12,500,000 subscribers",
      SQS: "Data is deleted after being consumed",
    },
    {
      Kinesis: "Possibility of replay data",
      SNS: "Data is not persisted (lost if not delivered)",
      SQS: "Can have as many workers (consumers) as we want",
    },
    {
      Kinesis: "Meant for real-time big data, analytics and ETL",
      SNS: "Pub / Sub",
      SQS: "No need to provision throughput",
    },
    {
      Kinesis: "Ordering at the shard level",
      SNS: "Up to 100,000 topics",
      SQS: "Ordering guarantees only on FIFO queues",
    },
    {
      Kinesis: "Data expires after X days",
      SNS: "No need to provision throughput",
      SQS: "Individual message delay capability",
    },
    {
      Kinesis: "Provisioned mode or on-demand capacity mode",
      SNS: "Integrates with SQS for fan-out architecture pattern",
      SQS: "",
    },
    {
      Kinesis: "",
      SNS: "FIFO capability for SQS FIFO",
      SQS: "",
    },
  ];

  return (
    <PageWrapper>
      <PostTopBar>
        <BackButton to="/blog" />
      </PostTopBar>

      <PostContainer>
        <HeaderRow>
          <PageTitle>Amazon Kinesis</PageTitle>
          <IconWrapper>
            <HeaderIcon>
              <AWSSVG />
            </HeaderIcon>
            <HeaderIcon>
              <AWSKinesisSVG />
            </HeaderIcon>
          </IconWrapper>
        </HeaderRow>

        <Paragraph>In this post we'll be diving into Amazon Kinesis.</Paragraph>

        <TextList>
          <TextListItem>
            <TextLink href="#kinesis-overview">Kinesis Overview</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#kinesis-data-streams">
              Kinesis Data Streams
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#kinesis-data-firehose">
              Kinesis Data Firehose
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#kinesis-data-analytics">
              Kinesis Data Analytics
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#data-ordering-for-kinesis-vs-sqs-fifo">
              Data Ordering for Kinesis vs SQS FIFO
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#kinesis-vs-sqs-vs-sns">
              Kinesis vs SQS vs SNS
            </TextLink>
          </TextListItem>
        </TextList>

        <SectionHeading id="kinesis-overview">Kinesis Overview</SectionHeading>

        <Paragraph>
          Amazon Kinesis is designed to handle real-time data streaming and
          processing. It allows you to collect, process, and analyze large
          streams of data in real-time, making it ideal for use cases that
          require immediate insights or actions based on incoming data.
        </Paragraph>

        <SubSectionHeading>Kinesis Data Streams</SubSectionHeading>
        <TextList>
          <TextListItem>
            <Strong>Purpose</Strong>: Allows you to build real-time applications
            that can continuously capture and process gigabytes of data per
            second from hundreds of thousands of sources.
          </TextListItem>
          <TextListItem>
            <Strong>How It Works</Strong>: Data is ingested into shards, which
            are scalable units of capacity. Each shard can ingest up to 1 MB of
            data per second and emit up to 2 MB per second.
          </TextListItem>
          <TextListItem>
            <Strong>Use Cases</Strong>: Real-time dashboards, anomaly detection,
            log and event data streaming, etc.
          </TextListItem>
        </TextList>

        <SubSectionHeading>Kinesis Data Firehose</SubSectionHeading>
        <TextList>
          <TextListItem>
            <Strong>Purpose</Strong>: A fully managed service for loading
            real-time streaming data into destinations like Amazon S3, Amazon
            Redshift, Amazon OpenSearch Service, and third-party services.
          </TextListItem>
          <TextListItem>
            <Strong>How It Works</Strong>: Data can be transformed using AWS
            Lambda before being sent to the destination. It automatically scales
            to match your data throughput and provides near real-time delivery.
          </TextListItem>
          <TextListItem>
            <Strong>Use Cases</Strong>: Log and event data analytics,
            click-stream data, IoT data ingestion.
          </TextListItem>
        </TextList>

        <SubSectionHeading>Kinesis Data Analytics</SubSectionHeading>
        <TextList>
          <TextListItem>
            <Strong>Purpose</Strong>: Enables real-time analysis of streaming
            data using standard SQL queries, without requiring you to write
            custom code.
          </TextListItem>
          <TextListItem>
            <Strong>How It Works</Strong>: You can ingest data directly from
            Kinesis Data Streams or Firehose, run continuous SQL queries on the
            data, and output the results to other services or dashboards.
          </TextListItem>
          <TextListItem>
            <Strong>Use Cases</Strong>: Real-time analytics, monitoring,
            streaming ETL processes.
          </TextListItem>
        </TextList>

        <SubSectionHeading>Kinesis Video Streams</SubSectionHeading>
        <TextList>
          <TextListItem>
            <Strong>Purpose</Strong>: Enables you to securely stream video from
            connected devices to AWS for analytics, machine learning, and
            processing.
          </TextListItem>
          <TextListItem>
            <Strong>How It Works</Strong>: Designed to work with IoT devices,
            security cameras, drones, and other video-producing devices and
            integrates with AWS AI services.
          </TextListItem>
          <TextListItem>
            <Strong>Use Cases</Strong>: Video analytics, live video streaming,
            security and surveillance, IoT applications.
          </TextListItem>
        </TextList>

        <SectionHeading id="kinesis-data-streams">
          Kinesis Data Streams
        </SectionHeading>

        <PostImage
          src={KinesisDataStreams}
          alt="Kinesis Data Streams architecture"
        />

        <TextList>
          <TextListItem>
            <Strong>Shards</Strong>
          </TextListItem>
        </TextList>
        <IndentedTextList>
          <IndentedTextListItem>
            A Kinesis Data Stream is composed of shards, which are the basic
            units of capacity. Each shard can ingest up to 1 MB of data per
            second and support 2 MB of output (egress) per second.
          </IndentedTextListItem>
          <IndentedTextListItem>
            When creating a stream, you specify the number of shards, and you
            can adjust this number later to accommodate changes in your data
            throughput.
          </IndentedTextListItem>
        </IndentedTextList>

        <TextList>
          <TextListItem>
            <Strong>Producers</Strong>
          </TextListItem>
        </TextList>
        <IndentedTextList>
          <IndentedTextListItem>
            Producers are the sources that send data to Kinesis Data Streams.
            These could be applications, servers, or devices generating log
            files, event data, or any other streaming data.
          </IndentedTextListItem>
          <IndentedTextListItem>
            Data is ingested in the form of records, which are composed of a
            sequence number, partition key, and data blob (the actual data).
          </IndentedTextListItem>
        </IndentedTextList>

        <TextList>
          <TextListItem>
            <Strong>Consumers</Strong>
          </TextListItem>
        </TextList>
        <IndentedTextList>
          <IndentedTextListItem>
            Consumers are applications or services that process the data from
            the stream. They can be real-time analytics engines, data processing
            applications, or other services that require access to the streaming
            data.
          </IndentedTextListItem>
          <IndentedTextListItem>
            You can use different types of consumers, including:
          </IndentedTextListItem>
        </IndentedTextList>
        <IndentedTextList>
          <IndentedTextListItem>
            <Strong>Shared Consumers</Strong>: Multiple consumers can read from
            the same stream in parallel, each getting their own copy of the
            data.
          </IndentedTextListItem>
          <IndentedTextListItem>
            <Strong>Enhanced Fan-Out Consumers</Strong>: Each consumer receives
            its own dedicated throughput, reducing the potential for data
            processing lag.
          </IndentedTextListItem>
        </IndentedTextList>

        <TextList>
          <TextListItem>
            <Strong>Data Processing</Strong>
          </TextListItem>
        </TextList>
        <IndentedTextList>
          <IndentedTextListItem>
            Kinesis Data Streams integrates seamlessly with AWS Lambda, allowing
            you to create serverless applications that automatically respond to
            new data.
          </IndentedTextListItem>
          <IndentedTextListItem>
            Alternatively, you can process data with EC2 instances, EMR
            clusters, or other processing frameworks.
          </IndentedTextListItem>
        </IndentedTextList>

        <TextList>
          <TextListItem>
            <Strong>Capacity Modes</Strong>
          </TextListItem>
        </TextList>
        <IndentedTextList>
          <IndentedTextListItem>
            <Strong>Provisioned Mode</Strong>: You manually specify the number
            of shards that your stream uses. The total throughput of the stream
            is determined by the number of shards, with each shard providing a
            fixed amount of capacity.
          </IndentedTextListItem>
          <IndentedTextListItem>
            <Strong>On-Demand Mode</Strong>: Automatically scales the capacity
            of your stream in response to incoming data without the need for
            manual shard management.
          </IndentedTextListItem>
        </IndentedTextList>

        <SubSectionHeading>
          Comparison Between Provisioned and On-Demand Modes
        </SubSectionHeading>
        <Table columns={columns} data={data} />

        <SubSectionHeading>Kinesis Data Streams Security</SubSectionHeading>
        <PostImage
          src={KinesisDataStreamsEncryption}
          alt="Kinesis Data Streams encryption architecture"
        />

        <SectionHeading id="kinesis-data-firehose">
          Kinesis Data Firehose
        </SectionHeading>

        <PostImage
          src={KinesisFirehose}
          alt="Kinesis Data Firehose architecture"
        />

        <Paragraph>
          Amazon Kinesis Data Firehose is a fully managed service that makes it
          easy to reliably load and transform streaming data into data lakes,
          data stores, and analytics services. It is designed to handle
          real-time data streams, delivering them to destinations such as Amazon
          S3, Amazon Redshift, Amazon OpenSearch Service, and third-party
          services like Splunk.
        </Paragraph>

        <TextList>
          <TextListItem>
            <Strong>Real-Time Data Ingestion</Strong>: Continuously capture,
            transform, and load streaming data, typically within seconds.
          </TextListItem>
          <TextListItem>
            <Strong>Fully Managed Service</Strong>: Automatically scales to
            match throughput; no infrastructure to manage.
          </TextListItem>
          <TextListItem>
            <Strong>Data Transformation</Strong>: Integrates with AWS Lambda to
            transform or enrich data before delivery.
          </TextListItem>
          <TextListItem>
            <Strong>Data Buffering</Strong>: Buffers data using configurable
            size and time to balance throughput and latency.
          </TextListItem>
          <TextListItem>
            <Strong>Multiple Destinations</Strong>: Supports delivery to S3,
            Redshift, OpenSearch, and third-party services like Splunk.
          </TextListItem>
          <TextListItem>
            <Strong>Compression and Encryption</Strong>: Supports compression
            and encryption at rest using AWS KMS.
          </TextListItem>
          <TextListItem>
            <Strong>Error Handling and Retry</Strong>: Automatic retry and
            ability to route failed records to S3 for later analysis.
          </TextListItem>
        </TextList>

        <SubSectionHeading>Kinesis Data Streams vs Firehose</SubSectionHeading>
        <Table columns={columns2} data={data2} />

        <SectionHeading id="kinesis-data-analytics">
          Kinesis Data Analytics
        </SectionHeading>

        <Paragraph>
          Kinesis Data Analytics lets you run SQL or Apache Flink applications
          on streaming data from Kinesis Data Streams or Firehose. It is ideal
          for real-time dashboards, anomaly detection, monitoring, and streaming
          ETL without managing any underlying infrastructure.
        </Paragraph>

        <SectionHeading id="data-ordering-for-kinesis-vs-sqs-fifo">
          Data Ordering for Kinesis vs SQS FIFO
        </SectionHeading>

        <SubSectionHeading>Ordering Data into Kinesis</SubSectionHeading>
        <Paragraph>
          Imagine you have 100 trucks on the road sending their GPS position on
          a regular basis. By using a <Strong>partition key</Strong> (for
          example, <Strong>truck_id</Strong>) you can consume the data in order
          for each truck so that tracking their movement is accurate. The same
          key will always go to the same shard.
        </Paragraph>

        <PostImage
          src={KinesisDataOrdering}
          alt="Kinesis data ordering per shard"
        />

        <SubSectionHeading>Ordering Data into SQS FIFO</SubSectionHeading>
        <Paragraph>
          For SQS Standard, there is no ordering. For SQS FIFO, if you don't use
          a <Strong>Message Group ID</Strong>, messages are consumed in the
          order they are sent, with only one consumer.
        </Paragraph>

        <PostImage src={SQSDataOrdering} alt="SQS FIFO basic ordering" />

        <Paragraph>
          You can use a <Strong>Message Group ID</Strong> (similar to a
          partition key in Kinesis) to scale the number of consumers, but
          messages are grouped when they are related to each other.
        </Paragraph>

        <PostImage
          src={SQSDataOrderingGroupId}
          alt="SQS FIFO ordering with Message Group ID"
        />

        <SubSectionHeading>Kinesis vs SQS ordering</SubSectionHeading>
        <Paragraph>
          Let's assume there are 100 trucks, 5 Kinesis shards and 1 SQS FIFO
          queue.
        </Paragraph>

        <TextList>
          <TextListItem>
            <Strong>Kinesis Data Streams</Strong>
          </TextListItem>
        </TextList>
        <IndentedTextList>
          <IndentedTextListItem>
            On average you'll have 20 trucks per shard.
          </IndentedTextListItem>
          <IndentedTextListItem>
            Trucks will have their data ordered within each shard.
          </IndentedTextListItem>
          <IndentedTextListItem>
            The maximum amount of consumers in parallel you can have is 5 (one
            per shard, unless you use enhanced fan-out).
          </IndentedTextListItem>
          <IndentedTextListItem>
            Can receive up to 5 MB/s of data (1 MB/s per shard).
          </IndentedTextListItem>
        </IndentedTextList>

        <TextList>
          <TextListItem>
            <Strong>SQS FIFO</Strong>
          </TextListItem>
        </TextList>
        <IndentedTextList>
          <IndentedTextListItem>Only one SQS FIFO queue.</IndentedTextListItem>
          <IndentedTextListItem>
            You will have 100 Message Group IDs (one per truck).
          </IndentedTextListItem>
          <IndentedTextListItem>
            You can have up to 100 consumers (due to 100 message group IDs).
          </IndentedTextListItem>
          <IndentedTextListItem>
            You can have up to 300 messages per second (or 3000 if using
            batching).
          </IndentedTextListItem>
        </IndentedTextList>

        <SectionHeading id="kinesis-vs-sqs-vs-sns">
          Kinesis vs SQS vs SNS
        </SectionHeading>

        <Table columns={columns3} data={data3} />

        <SubSectionHeading id="references">References</SubSectionHeading>
        <TextList>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/streams/latest/dev/introduction.html"
              target="_blank"
              rel="noreferrer"
            >
              Amazon Kinesis Data Streams - Developer Guide
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/firehose/latest/dev/what-is-this-service.html"
              target="_blank"
              rel="noreferrer"
            >
              Amazon Kinesis Data Firehose - Developer Guide
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/kinesisanalytics/latest/dev/what-is.html"
              target="_blank"
              rel="noreferrer"
            >
              Amazon Kinesis Data Analytics - What is Kinesis Data Analytics?
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/kinesisvideostreams/latest/dg/what-is-kinesis-video.html"
              target="_blank"
              rel="noreferrer"
            >
              Amazon Kinesis Video Streams - Developer Guide
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/streams/latest/dev/key-concepts.html#partition-key"
              target="_blank"
              rel="noreferrer"
            >
              Kinesis Data Streams - Partition keys and ordering
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/FIFO-queues.html"
              target="_blank"
              rel="noreferrer"
            >
              Amazon SQS - FIFO queues and message group IDs
            </TextLink>
          </TextListItem>
        </TextList>
      </PostContainer>
    </PageWrapper>
  );
};

export default AWSKinesis;
