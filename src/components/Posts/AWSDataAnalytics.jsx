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
  TextListItem,
  IndentedTextList,
  IndentedTextListItem,
} from "../Typography/Typography";

// icons
import {
  AWSSVG,
  AWSAthenaSVG,
  AWSRedshiftSVG,
  AWSOpenSearchSVG,
  AWSEMRSVG,
  AWSQuickSightSVG,
  AWSGlueSVG,
  AWSLakeFormationSVG,
} from "../../resources/styles/icons";

// images
import FederatedQueries from "../../resources/images/blog/AWSDataAnalytics/data_analytics_federated_queries.jpeg";
import RedshiftCluster from "../../resources/images/blog/AWSDataAnalytics/data_analytics_redshift_cluster.jpeg";
import RedshiftSnapshot from "../../resources/images/blog/AWSDataAnalytics/data_analytics_redshift_snapshot.jpeg";
import RedshiftSpectrum from "../../resources/images/blog/AWSDataAnalytics/data_analytics_redshift_spectrum.jpeg";
import OpenSearchDynamoDB from "../../resources/images/blog/AWSDataAnalytics/data_analytics_opensearch_dynamodb.jpeg";
import OpenSearchCloudWatch from "../../resources/images/blog/AWSDataAnalytics/data_analytics_opensearch_cloudwatch.jpeg";
import OpenSearchKinesis from "../../resources/images/blog/AWSDataAnalytics/data_analytics_opensearch_kinesis.jpeg";
import QuickSightDashboard from "../../resources/images/blog/AWSDataAnalytics/aws_data_analytics_quicksight_dashboard.png";
import QuickSightDataSources from "../../resources/images/blog/AWSDataAnalytics/aws_data_analytics_quicksight_data_sources.jpeg";
import Glue from "../../resources/images/blog/AWSDataAnalytics/data_analytics_glue.jpeg";
import LakeFormation from "../../resources/images/blog/AWSDataAnalytics/aws_data_analytics_lake_formation.jpeg";

// codeblocks
import { partitionsInAthena, columnarFormat } from "../../helpers/codeblocks";

// components
import BackButton from "../Button/BackButton";
import { CodeBlockWithCopy } from "../Code/Code";

const PostContainer = styled(BasePostContainer)`
  animation: ${SlideInBottom} 0.5s forwards;
`;

const AWSDataAnalytics = () => {
  useEffect(() => {
    Analytics.event("blog_opened", { slug: "aws-data-analytics" });
  }, []);

  return (
    <PageWrapper>
      <PostTopBar>
        <BackButton to="/blog" />
      </PostTopBar>

      <PostContainer>
        <HeaderRow>
          <PageTitle>Amazon Data and Analytics</PageTitle>
          <IconWrapper>
            <HeaderIcon>
              <AWSSVG />
            </HeaderIcon>
            <HeaderIcon>
              <AWSAthenaSVG />
            </HeaderIcon>
            <HeaderIcon>
              <AWSRedshiftSVG />
            </HeaderIcon>
            <HeaderIcon>
              <AWSOpenSearchSVG />
            </HeaderIcon>
            <HeaderIcon>
              <AWSEMRSVG />
            </HeaderIcon>
            <HeaderIcon>
              <AWSQuickSightSVG />
            </HeaderIcon>
            <HeaderIcon>
              <AWSGlueSVG />
            </HeaderIcon>
            <HeaderIcon>
              <AWSLakeFormationSVG />
            </HeaderIcon>
          </IconWrapper>
        </HeaderRow>

        <Paragraph>
          In this post we'll be diving into Amazon's services for{" "}
          <Strong>Data Analytics</Strong>, including{" "}
          <Strong>Athena</Strong>, <Strong>Redshift</Strong>,{" "}
          <Strong>OpenSearch</Strong>, <Strong>EMR</Strong>,{" "}
          <Strong>QuickSight</Strong>, <Strong>Glue</Strong> and{" "}
          <Strong>Lake Formation</Strong>.
        </Paragraph>

        <TextList>
          <TextListItem>
            <TextLink href="#aws-athena">Athena</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#aws-redshift">Redshift</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#aws-opensearch">OpenSearch</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#aws-emr">EMR (Elastic MapReduce)</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#aws-quicksight">QuickSight</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#aws-glue">Glue</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#aws-lake-formation">Lake Formation</TextLink>
          </TextListItem>
        </TextList>

        <SectionHeading id="aws-athena">Athena</SectionHeading>
        <Paragraph>
          <Strong>AWS Athena</Strong> is a serverless interactive query
          service that allows you to analyze data directly in{" "}
          <Strong>Amazon S3</Strong> using standard SQL. It is designed for
          simplicity and cost-efficiency, making it a popular choice for data
          analytics.
        </Paragraph>
        <Paragraph>
          Athena supports multiple formats including{" "}
          <Strong>CSV, JSON, ORC, Avro</Strong> and{" "}
          <Strong>Parquet</Strong>, and is commonly used with{" "}
          <Strong>Amazon QuickSight</Strong> for reporting and dashboards.
        </Paragraph>

        <SubSectionHeading>Partitioning in AWS Athena</SubSectionHeading>
        <Paragraph>
          <Strong>Partitioning</Strong> is a method of dividing a dataset
          into smaller, more manageable pieces based on one or more columns.
          Each partition is stored as a separate folder in Amazon S3. When
          queries are executed, Athena scans only the relevant partitions
          instead of the entire dataset, significantly improving performance
          and reducing costs.
        </Paragraph>

        <SubSectionHeading>How Partitioning Works</SubSectionHeading>
        <TextList>
          <TextListItem>
            <Strong>Folder-based structure</Strong>: data is often
            organised in S3 folders based on partition key(s), for example:
          </TextListItem>
        </TextList>

        <CodeBlockWithCopy
          code={`s3://my-bucket/sales/year=2024/month=01/\ns3://my-bucket/sales/year=2024/month=02/`}
        />

        <TextList>
          <TextListItem>
            <Strong>Defining partitions in Athena</Strong>: use{" "}
            <Strong>PARTITIONED BY</Strong> when creating a table:
          </TextListItem>
        </TextList>

        <CodeBlockWithCopy code={partitionsInAthena} />

        <TextList>
          <TextListItem>
            <Strong>Adding partitions</Strong>: after data is added to
            S3, partitions must be registered with the table, for example:
          </TextListItem>
        </TextList>

        <CodeBlockWithCopy
          code={`ALTER TABLE sales ADD PARTITION (year='2023', month='01') LOCATION 's3://my-bucket/sales/year=2023/month=01/';`}
        />

        <SubSectionHeading>Benefits of Partitioning</SubSectionHeading>
        <TextList>
          <TextListItem>
            <Strong>Improved query performance</Strong>: queries that
            filter on partition keys (e.g.{" "}
            <Strong>WHERE year = '2023' AND month = '01'</Strong>) only scan the
            relevant folders.
          </TextListItem>
          <TextListItem>
            <Strong>Reduced query costs</Strong>: Athena pricing is based
            on data scanned; partitioning reduces the scanned volume and
            therefore reduces cost.
          </TextListItem>
        </TextList>

        <SubSectionHeading>Optimisation in AWS Athena</SubSectionHeading>
        <Paragraph>
          Optimisation involves structuring your data and queries to make the
          best use of Athena’s capabilities. Key strategies include:
        </Paragraph>

        <TertiaryHeading>Use Columnar File Formats</TertiaryHeading>
        <Paragraph>
          File formats like <Strong>Parquet</Strong> and{" "}
          <Strong>ORC</Strong> store data in a columnar layout. Athena can
          read only the columns required by the query, and take advantage of
          built-in compression and predicate pushdown.
        </Paragraph>

        <CodeBlockWithCopy code={columnarFormat} />

        <TertiaryHeading>Use Glue Data Catalog for Schema Management</TertiaryHeading>
        <TextList>
          <TextListItem>
            Leverage <Strong>AWS Glue</Strong> as the central metadata
            catalog for your Athena tables.
          </TextListItem>
          <TextListItem>
            Use Glue crawlers or ETL jobs to discover schemas and convert raw
            data to Parquet/ORC.
          </TextListItem>
        </TextList>

        <TertiaryHeading>Compress Your Data</TertiaryHeading>
        <TextList>
          <TextListItem>
            Use compression (Gzip, Snappy, etc.) to reduce storage and scan
            size.
          </TextListItem>
          <TextListItem>
            Columnar formats such as Parquet and ORC natively support
            compression.
          </TextListItem>
        </TextList>

        <TertiaryHeading>Use Partition Pruning</TertiaryHeading>
        <TextList>
          <TextListItem>
            Always filter on partition keys in <Strong>WHERE</Strong>{" "}
            clauses.
          </TextListItem>
          <TextListItem>
            Use <Strong>LIMIT</Strong> when exploring data.
          </TextListItem>
          <TextListItem>
            Join smaller datasets first in complex queries.
          </TextListItem>
        </TextList>

        <TertiaryHeading>Optimise Data Layout</TertiaryHeading>
        <TextList>
          <TextListItem>
            Avoid <Strong>very small files</Strong> as they increase
            overhead during query planning and execution.
          </TextListItem>
          <TextListItem>
            Aim for file sizes in the{" "}
            <Strong>128 MB - 1 GB</Strong> range.
          </TextListItem>
        </TextList>

        <SubSectionHeading>Federated Query</SubSectionHeading>
        <Paragraph>
          <Strong>Federated queries</Strong> in Athena allow you to query
          data across multiple data sources, not just Amazon S3. You can use
          Athena as a single interface to analyze data stored in relational
          databases, NoSQL stores and custom data sources, alongside data in S3.
        </Paragraph>

        <PostImage src={FederatedQueries} alt="Athena federated queries" />

        <SubSectionHeading>How Federated Queries Work</SubSectionHeading>
        <TextList>
          <TextListItem>
            <Strong>Connectors</Strong>: Athena uses data source
            connectors (running as Lambda functions) to interact with external
            systems.
          </TextListItem>
          <TextListItem>
            <Strong>SQL interface</Strong>: you write SQL queries in
            Athena as normal; behind the scenes, Athena invokes connectors to
            fetch and process data from the external sources.
          </TextListItem>
        </TextList>

        <SubSectionHeading>Benefits of Federated Queries</SubSectionHeading>
        <TextList>
          <TextListItem>
            <Strong>Unified analytics</Strong>: analyze data across
            disparate systems without copying everything into S3 first.
          </TextListItem>
          <TextListItem>
            <Strong>Simplified data access</Strong>: a single SQL
            interface for multiple data sources.
          </TextListItem>
        </TextList>

        <SubSectionHeading>Limitations</SubSectionHeading>
        <TextList>
          <TextListItem>
            Higher latency compared to querying data stored directly in S3.
          </TextListItem>
          <TextListItem>
            Not all SQL functions or operations are supported equally across
            all connectors.
          </TextListItem>
          <TextListItem>
            Permissions on the underlying data sources must be managed
            carefully.
          </TextListItem>
        </TextList>

        <SectionHeading id="aws-redshift">Redshift</SectionHeading>
        <Paragraph>
          <Strong>Amazon Redshift</Strong> is a fully managed,
          petabyte-scale cloud data warehouse. It’s designed to make it simple
          and cost-effective to analyze large volumes of data using standard
          SQL and existing BI tools.
        </Paragraph>
        <TextList>
          <TextListItem>
            Uses <Strong>columnar storage</Strong>,{" "}
            <Strong>data compression</Strong> and{" "}
            <Strong>zone maps</Strong> to minimise I/O.
          </TextListItem>
          <TextListItem>
            Leverages a <Strong>Massively Parallel Processing (MPP)</Strong>{" "}
            architecture to split workloads across multiple nodes.
          </TextListItem>
          <TextListItem>
            Supports optimisations like <Strong>materialized views</Strong>{" "}
            and <Strong>result caching</Strong> for faster performance.
          </TextListItem>
        </TextList>

        <SubSectionHeading>Scalability</SubSectionHeading>
        <TextList>
          <TextListItem>
            <Strong>Provisioned</Strong>: scale clusters vertically (change
            node types) or horizontally (add/remove nodes).
          </TextListItem>
          <TextListItem>
            <Strong>Serverless</Strong>: resources are provisioned
            automatically based on workload; great for unpredictable or spiky
            usage.
          </TextListItem>
        </TextList>

        <SubSectionHeading>Redshift Cluster Architecture</SubSectionHeading>
        <Paragraph>
          A Redshift cluster consists of a{" "}
          <Strong>leader node</Strong> and one or more{" "}
          <Strong>compute nodes</Strong>. The leader node coordinates query
          execution and manages metadata, while compute nodes perform the heavy
          lifting and return intermediate results to the leader.
        </Paragraph>
        <PostImage src={RedshiftCluster} alt="Redshift cluster architecture" />

        <SubSectionHeading>Snapshots and Disaster Recovery</SubSectionHeading>
        <Paragraph>
          <Strong>Snapshots</Strong> are backups of your Redshift cluster
          stored in S3. They can be:
        </Paragraph>
        <TextList>
          <TextListItem>
            <Strong>Automated snapshots</Strong>: created automatically
            according to a retention period (default 1 day, up to 35 days).
          </TextListItem>
          <TextListItem>
            <Strong>Manual snapshots</Strong>: created explicitly and
            retained until deleted.
          </TextListItem>
        </TextList>
        <Paragraph>
          Snapshots are <Strong>incremental</Strong> (only changes since the
          last snapshot are stored) and can be copied to other regions for
          disaster recovery.
        </Paragraph>
        <PostImage src={RedshiftSnapshot} alt="Redshift snapshot model" />

        <SubSectionHeading>Redshift Spectrum</SubSectionHeading>
        <Paragraph>
          <Strong>Redshift Spectrum</Strong> allows you to run SQL queries
          directly against exabytes of data in S3 without loading it into
          Redshift tables. Queries are initiated by the Redshift cluster but
          executed by a fleet of Spectrum nodes that read from S3.
        </Paragraph>
        <PostImage src={RedshiftSpectrum} alt="Redshift Spectrum" />

        <SectionHeading id="aws-opensearch">OpenSearch</SectionHeading>
        <Paragraph>
          <Strong>AWS OpenSearch Service</Strong> (formerly Amazon
          Elasticsearch Service) is a fully managed service for deploying and
          operating OpenSearch clusters. It’s ideal for search, log analytics
          and observability use cases.
        </Paragraph>
        <Paragraph>Here are some common patterns combining OpenSearch with other AWS services:</Paragraph>

        <SubSectionHeading>DynamoDB + OpenSearch Pattern</SubSectionHeading>
        <Paragraph>
          Use DynamoDB as your system of record, and OpenSearch as your search
          engine. For example:
        </Paragraph>
        <TextList>
          <TextListItem>
            Application writes items to <Strong>DynamoDB</Strong>.
          </TextListItem>
          <TextListItem>
            A stream / Lambda pipeline indexes those items in{" "}
            <Strong>OpenSearch</Strong> for rich search (full-text, partial
            matching).
          </TextListItem>
          <TextListItem>
            The application first queries OpenSearch to find relevant IDs, then
            fetches the full item from DynamoDB.
          </TextListItem>
        </TextList>
        <PostImage
          src={OpenSearchDynamoDB}
          alt="OpenSearch and DynamoDB design pattern"
        />

        <SubSectionHeading>CloudWatch Logs + OpenSearch Pattern</SubSectionHeading>
        <Paragraph>
          A common pattern for log analytics is to ship CloudWatch Logs to
          OpenSearch:
        </Paragraph>
        <TextList>
          <TextListItem>
            CloudWatch Logs use a <Strong>subscription filter</Strong> to send
            data in near real time.
          </TextListItem>
          <TextListItem>
            An AWS-managed <Strong>Lambda</Strong> or{" "}
            <Strong>Kinesis Data Firehose</Strong> stream transforms and ships
            the data to OpenSearch.
          </TextListItem>
        </TextList>
        <PostImage
          src={OpenSearchCloudWatch}
          alt="OpenSearch and CloudWatch Logs pattern"
        />

        <SubSectionHeading>Kinesis + OpenSearch Pattern</SubSectionHeading>
        <Paragraph>
          To send streaming data into OpenSearch, you can:
        </Paragraph>
        <TextList>
          <TextListItem>
            Use <Strong>Kinesis Data Firehose</Strong> for near real-time
            delivery, with optional Lambda transformations, or
          </TextListItem>
          <TextListItem>
            Use <Strong>Kinesis Data Streams</Strong> with a Lambda
            consumer that writes directly to OpenSearch.
          </TextListItem>
        </TextList>
        <PostImage
          src={OpenSearchKinesis}
          alt="OpenSearch with Kinesis design pattern"
        />

        <SectionHeading id="aws-emr">EMR (Elastic MapReduce)</SectionHeading>
        <Paragraph>
          <Strong>Amazon EMR</Strong> is a managed big data platform used
          to process large amounts of data using distributed frameworks like{" "}
          <Strong>Apache Hadoop</Strong>, <Strong>Apache Spark</Strong>,
          and more. It runs clusters of EC2 instances and simplifies
          provisioning, scaling and tuning.
        </Paragraph>

        <SubSectionHeading>Node Types in EMR</SubSectionHeading>
        <TextList>
          <TextListItem>
            <Strong>Master node</Strong>: manages the cluster, coordinates
            tasks and monitors health.
          </TextListItem>
          <TextListItem>
            <Strong>Core nodes</Strong>: run tasks and store data in{" "}
            <Strong>HDFS</Strong>.
          </TextListItem>
          <TextListItem>
            <Strong>Task nodes</Strong>: run tasks only, no persistent HDFS
            storage.
          </TextListItem>
        </TextList>

        <SubSectionHeading>Purchasing Options & Best Practices</SubSectionHeading>
        <IndentedTextList>
          <IndentedTextListItem>
            <Strong>Master node</Strong>: use On-Demand or Reserved Instances
            for stability (critical to cluster health).
          </IndentedTextListItem>
          <IndentedTextListItem>
            <Strong>Core nodes</Strong>: typically Reserved Instances for
            predictable, persistent workloads (Spot is possible with a
            fault-tolerant design).
          </IndentedTextListItem>
          <IndentedTextListItem>
            <Strong>Task nodes</Strong>: Spot Instances are ideal to reduce
            cost for transient compute.
          </IndentedTextListItem>
        </IndentedTextList>

        <SectionHeading id="aws-quicksight">QuickSight</SectionHeading>
        <Paragraph>
          <Strong>Amazon QuickSight</Strong> is a cloud-scale business
          intelligence (BI) service. It connects to many data sources, allows
          you to build interactive dashboards, and is fully managed with
          enterprise features like security, global availability and built-in
          redundancy.
        </Paragraph>

        <SubSectionHeading>QuickSight Integrations</SubSectionHeading>
        <PostImage
          src={QuickSightDataSources}
          alt="QuickSight data sources and integrations"
        />

        <SubSectionHeading>Dashboards & Analysis</SubSectionHeading>
        <Paragraph>
          QuickSight uses <Strong>users</Strong> (standard) and{" "}
          <Strong>groups</Strong> (enterprise) for access control. Data is
          often imported into the in-memory <Strong>SPICE</Strong> engine for
          very fast visual exploration. Dashboards are read-only views that you
          can share with users and groups.
        </Paragraph>
        <PostImage
          src={QuickSightDashboard}
          alt="QuickSight dashboard example"
        />

        <SectionHeading id="aws-glue">Glue</SectionHeading>
        <Paragraph>
          <Strong>AWS Glue</Strong> is a serverless data integration
          service used to discover, prepare, move and integrate data from
          multiple sources for analytics, ML and application development. It
          provides:
        </Paragraph>
        <TextList>
          <TextListItem>Central metadata via the Glue Data Catalog</TextListItem>
          <TextListItem>Visual and code-based ETL jobs</TextListItem>
          <TextListItem>Job scheduling and workflow orchestration</TextListItem>
        </TextList>
        <PostImage src={Glue} alt="AWS Glue overview" />

        <SectionHeading id="aws-lake-formation">Lake Formation</SectionHeading>
        <Paragraph>
          <Strong>AWS Lake Formation</Strong> is a managed service that
          simplifies building and securing <Strong>data lakes</Strong> on AWS.
          A data lake is a centralized repository for structured and
          unstructured data at any scale.
        </Paragraph>
        <Paragraph>
          Lake Formation helps automate data ingestion, cataloging, security
          enforcement and fine-grained access control across analytics services
          like Athena, Redshift and EMR.
        </Paragraph>
        <PostImage src={LakeFormation} alt="AWS Lake Formation overview" />

        <SectionHeading id="references">References</SectionHeading>
        <TextList>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/athena/latest/ug/what-is.html"
              target="_blank"
              rel="noreferrer"
            >
              AWS Athena - User Guide
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/redshift/latest/dg/c_redshift.html"
              target="_blank"
              rel="noreferrer"
            >
              Amazon Redshift - Database Developer Guide
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/opensearch-service/latest/developerguide/what-is.html"
              target="_blank"
              rel="noreferrer"
            >
              Amazon OpenSearch Service - Developer Guide
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/emr/latest/ManagementGuide/emr-what-is-emr.html"
              target="_blank"
              rel="noreferrer"
            >
              Amazon EMR - Management Guide
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/quicksight/index.html"
              target="_blank"
              rel="noreferrer"
            >
              Amazon QuickSight - Documentation
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/glue/latest/dg/what-is-glue.html"
              target="_blank"
              rel="noreferrer"
            >
              AWS Glue - Developer Guide
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/lake-formation/latest/dg/what-is-lake-formation.html"
              target="_blank"
              rel="noreferrer"
            >
              AWS Lake Formation - Developer Guide
            </TextLink>
          </TextListItem>
        </TextList>
      </PostContainer>
    </PageWrapper>
  );
};

export default AWSDataAnalytics;
