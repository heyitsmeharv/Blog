import React, { useEffect } from "react";
import styled from "styled-components";

import { Analytics } from "../../helpers/analytics";

// animations
import SlideInBottom from "../../animations/SlideInBottom";

// icons
import { AWSSVG, AWSRDSSVG } from "../../resources/styles/icons";

// components
import BackButton from "../Button/BackButton";
import Table from "../Table/Table";

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

// images
import AutoScaling from "../../resources/images/blog/AWSDatabases/db_auto_scaling.jpeg";
import ReadReplicas from "../../resources/images/blog/AWSDatabases/db_read_replica.jpeg";
import MultiAZ from "../../resources/images/blog/AWSDatabases/db_multi_az.jpeg";
import MultiAZBackground from "../../resources/images/blog/AWSDatabases/db_multi_az_background.jpeg";
import HighAvailability from "../../resources/images/blog/AWSDatabases/db_high_availability.jpeg";
import Proxy from "../../resources/images/blog/AWSDatabases/db_proxy.jpeg";
import AuroraCluster from "../../resources/images/blog/AWSDatabases/db_aurora_cluster.jpeg";
import AuroraCustomEndpoint from "../../resources/images/blog/AWSDatabases/db_aurora_custom_endpoint.jpeg";
import AuroraServerless from "../../resources/images/blog/AWSDatabases/db_aurora_serverless.jpeg";
import AuroraGlobal from "../../resources/images/blog/AWSDatabases/db_aurora_global.jpeg";
import AuroraMachineLearning from "../../resources/images/blog/AWSDatabases/db_aurora_ml.jpeg";
import ElastiCache from "../../resources/images/blog/AWSDatabases/db_elasticache.jpeg";
import ElastiCacheSecurity from "../../resources/images/blog/AWSDatabases/db_elasticache_security.jpeg";
import NeptuneStreams from "../../resources/images/blog/AWSDatabases/db_neptune_streams.jpeg";
import DynamoDBDAX from "../../resources/images/blog/AWSDatabases/db_dynamodb_dax.jpeg";
import DynamoDBDAXvsElastiCache from "../../resources/images/blog/AWSDatabases/db_dynamodb_dax_vs_elasticache.jpeg";
import DynamoDBStreams from "../../resources/images/blog/AWSDatabases/db_dynamodb_streams.jpeg";
import DynamoDBGlobalTables from "../../resources/images/blog/AWSDatabases/db_dynamodb_global_tables.jpeg";
import DynamoDBTTL from "../../resources/images/blog/AWSDatabases/db_dynamodb_ttl.jpeg";
import RDSInvokeLambda from "../../resources/images/blog/AWSDatabases/db_rds_lambda_invoke.jpeg";
import RDSEventNotifications from "../../resources/images/blog/AWSDatabases/db_rds_event_notification.jpeg";

const AnimatedPostContainer = styled(BasePostContainer)`
  animation: ${SlideInBottom} 0.5s forwards;
`;

const columns = ["Redis", "Memcached"];
const data = [
  {
    Redis: "Multi AZ with Auto-Failover",
    Memcached: "Multi-node for partitioning of data (sharding)",
  },
  {
    Redis: "Read Replicas to scale reads and have high availability",
    Memcached: "No high availability (replication)",
  },
  {
    Redis: "Data durability using AOF persistence",
    Memcached: "Non persistent",
  },
  {
    Redis: "Backup and restore features",
    Memcached: "No backups or restore",
  },
  {
    Redis: "Supports Sets and Sorted sets",
    Memcached: "Multi-threaded architecture",
  },
];

const columns2 = ["DynamoDB", "Kinesis Data Streams"];
const data2 = [
  {
    DynamoDB: "24 hours retention",
    "Kinesis Data Streams": "1 year retention",
  },
  {
    DynamoDB: "Limited number of consumers",
    "Kinesis Data Streams": "High number of consumers",
  },
  {
    DynamoDB:
      "Process using AWS Lambda Triggers or DynamoDB Stream Kinesis adaptor",
    "Kinesis Data Streams":
      "Process using AWS Lambda, Kinesis Data Analytics, Kinesis Data Firehose, AWS Glue Streaming ETL...",
  },
];

const AWSDatabases = () => {
  useEffect(() => {
    Analytics.pageview({ slug: "aws-databases" });
  }, []);

  return (
    <PageWrapper>
      <PostTopBar>
        <BackButton />
      </PostTopBar>

      <AnimatedPostContainer>
        <HeaderRow>
          <PageTitle>AWS Databases</PageTitle>
          <IconWrapper>
            <HeaderIcon>
              <AWSSVG />
            </HeaderIcon>
            <HeaderIcon>
              <AWSRDSSVG />
            </HeaderIcon>
          </IconWrapper>
        </HeaderRow>

        <Paragraph>
          I'll be briefly covering databases which AWS provide as well as the
          key features that each service offer. I've also listed{" "}
          <TextLink href="#skip">ports at the end</TextLink> to be familiar
          with.
        </Paragraph>

        <TextList>
          <TextListItem>
            <TextLink href="#database-types">Database Types</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#rds">Amazon RDS</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#aurora">Amazon Aurora</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#elasticache">Amazon ElastiCache</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#dynamodb">Amazon DynamoDB</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#s3">Amazon S3</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#documentdb">DocumentDB</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#neptune">Amazon Neptune</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#keyspaces">Amazon Keyspaces</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#qldb">
              Amazon QLDB (Quantum Ledger Database)
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#timestream">Amazon Timestream</TextLink>
          </TextListItem>
        </TextList>

        <SectionHeading id="database-types">Database Types</SectionHeading>

        <TextList>
          <TextListItem>
            <Strong>Relational database management system (SQL / OLTP)</Strong>:
            RDS, Aurora - great for joins
          </TextListItem>
          <TextListItem>
            <Strong>NoSQL database - no joins, no SQL</Strong>: DynamoDB
            (~JSON), ElastiCache (key / value pairs), Neptune (graphs),
            DocumentDB (for MongoDB), Keyspaces (for Apache Cassandra)
          </TextListItem>
          <TextListItem>
            <Strong>Object Store</Strong>: S3 (for big objects) / Glacier (for
            backups / archives)
          </TextListItem>
          <TextListItem>
            <Strong>Data Warehouse</Strong>: (SQL Analytics / BI): Redshift
            (OLAP), Athena, EMR
          </TextListItem>
          <TextListItem>
            <Strong>Search</Strong>: OpenSearch (JSON) - free text, unstructured
            searches
          </TextListItem>
          <TextListItem>
            <Strong>Graphs</Strong>: Amazon Neptune - displays relationships
            between data
          </TextListItem>
          <TextListItem>
            <Strong>Ledger</Strong>: Amazon Quantum Ledger Database
          </TextListItem>
          <TextListItem>
            <Strong>Time series</Strong>: Amazon Timestream
          </TextListItem>
        </TextList>

        <SectionHeading id="rds">
          Amazon Relational Database Service (RDS)
        </SectionHeading>

        <Paragraph>
          This service allows you to create a database in the cloud. You can
          choose from the following:
        </Paragraph>

        <TextList>
          <TextListItem>Microsoft SQL Server</TextListItem>
          <TextListItem>MySQL</TextListItem>
          <TextListItem>PostgreSQL</TextListItem>
          <TextListItem>MariaDB</TextListItem>
          <TextListItem>Oracle</TextListItem>
        </TextList>

        <Paragraph>
          This service is managed by AWS which means you won't be able to SSH
          into the instance but you do benefit from a list of services:
        </Paragraph>

        <TextList>
          <TextListItem>Automated provisioning, OS patching</TextListItem>
          <TextListItem>
            Continuous backups and point in time restore
          </TextListItem>
          <TextListItem>Monitoring dashboards</TextListItem>
          <TextListItem>
            Read replicas for improved read performance
          </TextListItem>
          <TextListItem>Multi AZ setup for disaster recovery</TextListItem>
          <TextListItem>Maintenance windows for upgrades</TextListItem>
          <TextListItem>Scaling capability</TextListItem>
          <TextListItem>Storage backed by EBS</TextListItem>
        </TextList>

        <Paragraph>
          If you would like the option to have access to your RDS instance then
          there is 'RDS Custom' which allows you access to the underlying
          database and OS so you can configure and install patches yourself if
          that's a use case you require.
        </Paragraph>

        <SubSectionHeading>Auto Scaling Storage</SubSectionHeading>

        <Paragraph>
          This feature helps increase the storage on an RDS instance when it's
          running out of free space and it will do it automatically. You do have
          to set the 'Maximum Storage Threshold'. This feature can help with
          unpredictable workloads and supports all RDS database instances.
        </Paragraph>

        <PostImage src={AutoScaling} alt="RDS auto scaling storage" />

        <SubSectionHeading>Read Replicas</SubSectionHeading>

        <Paragraph>
          RDS allows up to 15 read replicas within the same availability zone,
          across multiple availability zones or even cross region. It's also
          possible to take a replica read instance and make it the main RDS
          instance. The replication is <Strong>ASYNC</Strong>, meaning that the
          data will eventually be consistent. You can only query (SELECT) data
          from a read replica not do any manipulations such as INSERT, UPDATE,
          or DELETE queries.
        </Paragraph>

        <PostImage src={ReadReplicas} alt="RDS read replicas" />

        <Paragraph>
          It's important to note that there is a network cost for transferring
          data into another availability zone; the only use-case where that
          doesn't apply is if it's within the same region and your transferring
          to a read replica instance.
        </Paragraph>

        <SubSectionHeading>RDS Multi AZ</SubSectionHeading>

        <Paragraph>
          Multi AZ is mainly used for disaster recovery. The application will
          read/write to the main RDS instance via one DNS name, and that
          instance will be making a <Strong>SYNC</Strong> replication, meaning a
          real time exchange of information to a standby instance in another
          availability zone. That means every change that the application is
          sending to the main instance, the main instance will have to update
          the standby instance. If there is a problem with the main instance
          then there will be an automatic failover to the standby instance. This
          failover could happen due to network issues or instance/storage
          failure, if any of these events occur the standby instance would be
          promoted to the main instance. It's possible to setup read replicas
          for Multi AZ.
        </Paragraph>

        <PostImage src={MultiAZ} alt="RDS Multi AZ" />

        <Paragraph>
          There isn't any downtime for this process to happen, nor you need to
          modify your application as RDS handles this process in the background
          when configured. Here is a brief explanation of what happens.
        </Paragraph>

        <PostImage src={MultiAZBackground} alt="RDS Multi AZ background" />

        <SubSectionHeading>RDS Backups</SubSectionHeading>

        <Paragraph>
          RDS has the ability to backup instances either automatically or
          manually. You can do a full backup of the database daily with the
          ability to restore to any point in time from oldest to five minutes
          ago. Transaction logs are backed up by RDS every five minutes. There
          is a retention period up to 35 days for automatic backups but can last
          as long as you want if backed up manually.{" "}
          <Strong>Automated backups can be disabled.</Strong> Do note that a
          stopped RDS instance still costs money as you're still paying for the
          existing storage. If you plan on stopping it for a long period of
          time, you should snapshot and restore instead.
        </Paragraph>

        <SubSectionHeading>RDS Restore</SubSectionHeading>

        <Paragraph>
          RDS has the ability to restore an instance by creating a backup of the
          existing database which is stored in S3, that is then used on a new
          RDS instance running MySQL.
        </Paragraph>

        <SubSectionHeading>RDS Proxy</SubSectionHeading>

        <Paragraph>
          This allows apps to pool and share database connections already
          established. Instead of having individual applications connect to the
          RDS instance, they will instead connect to the proxy which will pool
          the connections together into less connections to the RDS instance.
          You would want to do this to improve the database efficiency by
          reducing the strain on the RDS resources such as CPU and RAM. This
          feature auto-scales and is multi-AZ so you won't need to manage
          capacity which in turn reduces the failover time by up to 66%. This
          feature enforces IAM authentication, so users can only connect to the
          RDS instance using the correct credentials, and it's never publicly
          available as it can only be accessed from a VPC. This supports RDS
          (MySQL, PostgreSQL, MariaDB, MSSQL Server) and Aurora (MySQL and
          PostgreSQL).
        </Paragraph>

        <PostImage src={Proxy} alt="RDS Proxy" />

        <SubSectionHeading>Invoking Lambda from RDS & Aurora</SubSectionHeading>

        <TextList>
          <TextListItem>
            Invoke Lambda functions from within your DB instance
          </TextListItem>
          <TextListItem>
            Allows you to process data events from within a database
          </TextListItem>
          <TextListItem>
            Supported for RDS for PostgreSQL and Aurora MySQL
          </TextListItem>
          <TextListItem>
            Must allow outbound traffic to your lambda function from within your
            DB instance (Public, NAT GW, VPC Endpoints)
          </TextListItem>
          <TextListItem>
            DB instance must have the required permissions to invoke the lambda
            function (Lambda Resource-based Policy & IAM Policy)
          </TextListItem>
        </TextList>

        <PostImage src={RDSInvokeLambda} alt="RDS invoking Lambda" />

        <SubSectionHeading>RDS Event Notifications</SubSectionHeading>

        <TextList>
          <TextListItem>
            Notifications that tells information about the DB instance itself
            (created, stopped, started)
          </TextListItem>
          <TextListItem>
            You don't have any information about the data itself
          </TextListItem>
          <TextListItem>
            Subscribe to following event categories: DB instance, DB snapshot,
            DB Parameter Group, DB Security Group, RDS Proxy, Custom Engine
            Version
          </TextListItem>
          <TextListItem>Near real-time events (up to 5 minutes)</TextListItem>
          <TextListItem>
            Send notifications to SNS or subscribe to events using EventBridge
          </TextListItem>
        </TextList>

        <PostImage
          src={RDSEventNotifications}
          alt="RDS event notifications example"
        />

        <SubSectionHeading>RDS Summary</SubSectionHeading>

        <TextList>
          <TextListItem>
            Managed PostgreSQL / MySQL / Oracle / SQL Server / DB2 / MariaDB /
            Custom
          </TextListItem>
          <TextListItem>
            Provisioned RDS instance Size and EBS Volume Type & Size
          </TextListItem>
          <TextListItem>Auto-scaling capability for Storage</TextListItem>
          <TextListItem>Support for Read Replicas and Multi AZ</TextListItem>
          <TextListItem>
            Security through IAM, Security Groups, KMS, SSL in transit
          </TextListItem>
          <TextListItem>
            Automated Backup with Point in time restore feature (up to 35 days)
          </TextListItem>
          <TextListItem>
            Manual DB Snapshot for longer-term recovery
          </TextListItem>
          <TextListItem>
            Managed and Scheduled maintenance (with downtime)
          </TextListItem>
          <TextListItem>
            Support for IAM Authentication, integration with Secrets Manager
          </TextListItem>
          <TextListItem>
            RDS Custom for access to and customize the underlying instance
            (Oracle & SQL Server)
          </TextListItem>
        </TextList>

        <Paragraph>
          <Strong>Use case</Strong>: Store relational datasets (RDBMS / OLTP),
          perform SQL queries, transactions
        </Paragraph>

        <SectionHeading id="aurora">Amazon Aurora</SectionHeading>

        <Paragraph>
          Aurora is a cloud optimized database which has significant performance
          improvements over RDS. It has a capacity of up to 128 TB (terabytes)
          and grows in increments of 10 GB (gigabytes). Aurora can have up to 15
          replicas and it's failover is instantaneous (30 seconds) but it all
          comes at a cost as it's roughly 20% more than an RDS instance.
        </Paragraph>

        <SubSectionHeading>Features of Aurora</SubSectionHeading>

        <TextList>
          <TextListItem>Automatic fail-over</TextListItem>
          <TextListItem>Backup and Recovery</TextListItem>
          <TextListItem>Isolation and Security</TextListItem>
          <TextListItem>Industry Compliance</TextListItem>
          <TextListItem>Push-button Scaling</TextListItem>
          <TextListItem>Automated Patching with Zero Downtime</TextListItem>
          <TextListItem>Advanced Monitoring</TextListItem>
          <TextListItem>
            Backtrack: restore data at any point in time without using backups
          </TextListItem>
        </TextList>

        <Paragraph>
          Aurora has high availability and reading scaling as it copies the data
          across three availability zones with six copies and the storage is
          striped across 100's of volumes every time you write to the database.
        </Paragraph>

        <PostImage
          src={HighAvailability}
          alt="Aurora high availability architecture"
        />

        <SubSectionHeading>Aurora DB Cluster</SubSectionHeading>

        <Paragraph>
          Below shows how you would interact with an Aurora instance and how the
          clusters work. You will be given two endpoints, read and write, the
          write endpoint will always connect to the main instance which is the
          only instance to write to the storage, whereas the read endpoint
          connects to the read replicas.
        </Paragraph>

        <PostImage src={AuroraCluster} alt="Aurora DB cluster" />

        <SubSectionHeading>Aurora Custom Endpoints</SubSectionHeading>

        <Paragraph>
          If you wish to run analytics on the database without effecting
          performance you can define a subset of Aurora instances to point
          towards a custom endpoint.
        </Paragraph>

        <PostImage
          src={AuroraCustomEndpoint}
          alt="Aurora custom endpoints example"
        />

        <SubSectionHeading>Aurora Serverless</SubSectionHeading>

        <Paragraph>
          Aurora Serverless is an automated database which auto scales based on
          usage. This could be good for infrequent, intermittent or
          unpredictable workloads.
        </Paragraph>

        <PostImage src={AuroraServerless} alt="Aurora Serverless" />

        <SubSectionHeading>Aurora Global</SubSectionHeading>

        <Paragraph>
          Global Aurora has cross region read replicas which is good for
          disaster recovery. It takes less than a second to replicate data into
          another region.
        </Paragraph>

        <PostImage src={AuroraGlobal} alt="Aurora Global" />

        <SubSectionHeading>Aurora Machine Learning</SubSectionHeading>

        <Paragraph>
          You can integrate Aurora with machine learning services (AWS Sagemaker
          and AWS Comprehend) to make predictions with your applications via
          SQL. Good use cases for this would be to check for fraud detection and
          product recommendations.
        </Paragraph>

        <PostImage
          src={AuroraMachineLearning}
          alt="Aurora machine learning integration"
        />

        <SubSectionHeading>Aurora Backups</SubSectionHeading>

        <Paragraph>
          Aurora has the ability to backup instances either automatically or
          manually. You can do a full backup of the database daily with the
          ability to restore to any point in time. There is a retention period
          up to 35 days for automatic backups but can last as long as you want
          if backed up manually.{" "}
          <Strong>Automated backups can't be disabled.</Strong>
        </Paragraph>

        <SubSectionHeading>Aurora Restore</SubSectionHeading>

        <Paragraph>
          Aurora has the ability to restore an instance by creating a backup of
          the existing database using Percona XtraBackup which is stored in S3,
          that is then used on a new Aurora cluster running MySQL.
        </Paragraph>

        <SubSectionHeading>Aurora Cloning</SubSectionHeading>

        <Paragraph>
          Another feature of Aurora is that you can clone an existing database
          cluster from an existing one. This is faster than snapshot & restore
          and uses copy-on-write protocol. This feature is useful for creating a
          staging environment from a production database without impacting the
          live service.
        </Paragraph>

        <SubSectionHeading>RDS & Aurora Security</SubSectionHeading>

        <Paragraph>Both RDS and Aurora have:</Paragraph>

        <TextList>
          <TextListItem>
            At-rest encryption: Main and replica encryptions use AWS KMS which
            must be defined at launch time otherwise the main instance and read
            replicas can't be encrypted.
          </TextListItem>
          <TextListItem>
            In-flight encryption: TLS-ready by default, user the AWS TLS root
            certificates client-side.
          </TextListItem>
          <TextListItem>
            IAM Authentication: IAM roles to connect to your database instead of
            username/password.
          </TextListItem>
          <TextListItem>
            Security Groups: Control network access to your RDS/Aurora database.
          </TextListItem>
          <TextListItem>No SSH available: Except on RDS Custom.</TextListItem>
          <TextListItem>
            Audit Logs: Can be enabled and sent to CloudWatch Logs for longer
            retention.
          </TextListItem>
        </TextList>

        <SubSectionHeading>Aurora Summary</SubSectionHeading>

        <TextList>
          <TextListItem>
            Compatible API for PostgreSQL / MySQL, separation of storage and
            compute
          </TextListItem>
          <TextListItem>
            Storage: data is stored in 6 replicas across 3 AZ - highly
            available, self-healing, auto-scaling
          </TextListItem>
          <TextListItem>
            Compute: Cluster of DB Instance across multiple AZ, auto-scaling of
            Read Replicas
          </TextListItem>
          <TextListItem>
            Cluster: Custom endpoints for writer and reader DB instances
          </TextListItem>
          <TextListItem>
            Same security / monitoring / maintenance features as RDS
          </TextListItem>
          <TextListItem>Backup & restore options:</TextListItem>
        </TextList>

        <IndentedTextList>
          <IndentedTextListItem>
            <Strong>Aurora Serverless</Strong>: for unpredictable / intermittent
            workloads, no capacity planning
          </IndentedTextListItem>
          <IndentedTextListItem>
            <Strong>Aurora Global</Strong>: up to 16 DB Read Instances in each
            region, less than 1 second storage replication
          </IndentedTextListItem>
          <IndentedTextListItem>
            <Strong>Aurora Machine Learning</Strong>: performance ML using
            SageMaker & Comprehend on Aurora
          </IndentedTextListItem>
          <IndentedTextListItem>
            <Strong>Aurora Database Cloning</Strong>: new cluster from existing
            one, faster than restoring a snapshot
          </IndentedTextListItem>
        </IndentedTextList>

        <Paragraph>
          <Strong>Use case</Strong>: same as RDS, but with less maintenance /
          more flexibility / more performance / more features
        </Paragraph>

        <SectionHeading id="elasticache">Elasticache</SectionHeading>

        <Paragraph>
          ElastiCache is an in memory database which helps high performance and
          low latency (Redis or Memcached). This also helps makes applications
          stateless and reduces the load off of database for read intensive
          workloads. Like RDS and Aurora, AWS takes care of the OS
          maintenance/patching, optimisations, setup, configuration, monitoring,
          failure recovery and backups. Using ElastiCache does involve a lot of
          application code changes.
        </Paragraph>

        <PostImage src={ElastiCache} alt="ElastiCache overview" />

        <SubSectionHeading>Redis vs Memcached</SubSectionHeading>

        <Table columns={columns} data={data} />

        <SubSectionHeading>Cache Security</SubSectionHeading>

        <Paragraph>
          Elasticache supports IAM Authentication for Redis - the IAM policies
          are only used for AWS API-level security.
        </Paragraph>

        <PostImage
          src={ElastiCacheSecurity}
          alt="ElastiCache security overview"
        />

        <SubSectionHeading>ElastiCache Summary</SubSectionHeading>

        <TextList>
          <TextListItem>
            Managed Redis / Memcached (similar offering as RDS, but for caches)
          </TextListItem>
          <TextListItem>
            In-memory data store, sub-millisecond latency
          </TextListItem>
          <TextListItem>
            Select an ElastiCache instance type (e.g. cache.m6g.large)
          </TextListItem>
          <TextListItem>
            Support for Clustering (Redis) and Multi AZ, Read Replicas
            (sharding)
          </TextListItem>
          <TextListItem>
            Security through IAM, Security Groups, KMS, Redis Auth
          </TextListItem>
          <TextListItem>
            Backup / Snapshot / Point in time restore feature
          </TextListItem>
          <TextListItem>Managed and Scheduled maintenance</TextListItem>
          <TextListItem>
            Requires some application code changes to be leveraged
          </TextListItem>
        </TextList>

        <Paragraph>
          <Strong>Use case</Strong>: Key/Value store, Frequent reads, less
          writes, cache results for DB queries, store session data for websites,
          cannot use SQL
        </Paragraph>

        <SectionHeading id="dynamodb">Amazon DynamoDB</SectionHeading>

        <Paragraph>
          Amazon DynamoDB is a fully managed NoSQL database service. It is
          designed to offer fast, consistent, and scalable performance for
          applications that require low-latency data access, even as they scale
          to handle millions of requests per second.
        </Paragraph>

        <TextList>
          <TextListItem>DynamoDB is made of Tables</TextListItem>
          <TextListItem>
            Each table has a Primary Key (must be decided at creation time)
          </TextListItem>
          <TextListItem>
            Each table can have an infinite number of items (rows)
          </TextListItem>
          <TextListItem>
            Each item has attributes (can be added over time - can be null)
          </TextListItem>
          <TextListItem>Maximum size of an item is 400KB</TextListItem>
          <TextListItem>Data types supported are:</TextListItem>
        </TextList>

        <IndentedTextList>
          <IndentedTextListItem>
            <Strong>Scalar Types</Strong>- Strings, Numbers, Binary, Null
          </IndentedTextListItem>
          <IndentedTextListItem>
            <Strong>Document Types</Strong>- List, Map
          </IndentedTextListItem>
          <IndentedTextListItem>
            <Strong>Set Types</Strong>- String Set, Number Set, Binary Set
          </IndentedTextListItem>
        </IndentedTextList>

        <SubSectionHeading>Read/Write Capacity Modes</SubSectionHeading>

        <TextList>
          <TextListItem>
            Control how you manage your table's capacity (read/write throughput)
          </TextListItem>
        </TextList>

        <TextList>
          <TextListItem>
            <Strong>Provisioned Mode (default)</Strong>
          </TextListItem>
        </TextList>

        <IndentedTextList>
          <IndentedTextListItem>
            You specify the number of reads/writes per second
          </IndentedTextListItem>
          <IndentedTextListItem>
            You need to plan capacity beforehand
          </IndentedTextListItem>
          <IndentedTextListItem>
            Pay for provisioned Read Capacity Units (RCU) & Write Capacity Units
            (WCU)
          </IndentedTextListItem>
          <IndentedTextListItem>
            Possibility to add auto-scaling mode for RCU & WCU
          </IndentedTextListItem>
        </IndentedTextList>

        <TextList>
          <TextListItem>
            <Strong>On-Demand Mode</Strong>
          </TextListItem>
        </TextList>

        <IndentedTextList>
          <IndentedTextListItem>
            Read/Writes automatically scale up/down with your workloads
          </IndentedTextListItem>
          <IndentedTextListItem>
            No capacity planning needed
          </IndentedTextListItem>
          <IndentedTextListItem>
            Pay for what you use, more expensive ($$$)
          </IndentedTextListItem>
          <IndentedTextListItem>
            Great for unpredictable workloads, steep sudden spikes
          </IndentedTextListItem>
        </IndentedTextList>

        <SubSectionHeading>DynamoDB Advanced Features</SubSectionHeading>

        <TertiaryHeading>DynamoDB Accelerator (DAX)</TertiaryHeading>

        <TextList>
          <TextListItem>
            Fully-managed, Highly Available, Seamless in-memory cache for
            DynamoDB
          </TextListItem>
          <TextListItem>Help solve read congestion by caching</TextListItem>
          <TextListItem>Microseconds latency for cached data</TextListItem>
          <TextListItem>
            Doesn't require application logic modification (compatible with
            existing DynamoDB APIs)
          </TextListItem>
          <TextListItem>5 minutes TTL for cache (default)</TextListItem>
        </TextList>

        <PostImage src={DynamoDBDAX} alt="DynamoDB DAX" />

        <TertiaryHeading>
          DynamoDB Accelerator (DAX) vs ElastiCache
        </TertiaryHeading>

        <PostImage
          src={DynamoDBDAXvsElastiCache}
          alt="DAX vs ElastiCache comparison"
        />

        <TertiaryHeading>Stream Processing</TertiaryHeading>

        <TextList>
          <TextListItem>
            Ordered stream of item-level modifications (create/update/delete) in
            a table
          </TextListItem>
          <TextListItem>Use cases:</TextListItem>
        </TextList>

        <IndentedTextList>
          <IndentedTextListItem>
            React to changes in real-time (welcome email to users)
          </IndentedTextListItem>
          <IndentedTextListItem>Real-time usage analytics</IndentedTextListItem>
          <IndentedTextListItem>
            Insert into derivative tables
          </IndentedTextListItem>
          <IndentedTextListItem>
            Implement cross-region replication
          </IndentedTextListItem>
          <IndentedTextListItem>
            Invoke AWS Lambda on changes to your DynamoDB table
          </IndentedTextListItem>
        </IndentedTextList>

        <Table columns={columns2} data={data2} />

        <TertiaryHeading>DynamoDB Streams</TertiaryHeading>

        <PostImage src={DynamoDBStreams} alt="DynamoDB Streams" />

        <TertiaryHeading>DynamoDB Global Tables</TertiaryHeading>

        <PostImage
          src={DynamoDBGlobalTables}
          alt="DynamoDB Global Tables diagram"
        />

        <TextList>
          <TextListItem>
            Make a DynamoDB table accessible with low latency in
            multiple-regions
          </TextListItem>
          <TextListItem>Active-Active replication</TextListItem>
          <TextListItem>
            Applications can read and write to the table in any region
          </TextListItem>
          <TextListItem>
            Must enable DynamoDB Streams as a pre-requisite
          </TextListItem>
        </TextList>

        <TertiaryHeading>DynamoDB - Time To Live (TTL)</TertiaryHeading>

        <Paragraph>
          Automatically delete items after an expiry timestamp.
        </Paragraph>

        <PostImage src={DynamoDBTTL} alt="DynamoDB TTL" />

        <TextList>
          <TextListItem>
            Use cases: reduce stored data by keeping only current items, adhere
            to regulatory obligations, web session handling
          </TextListItem>
        </TextList>

        <TertiaryHeading>
          DynamoDB - Backups for disaster recovery
        </TertiaryHeading>

        <TextList>
          <TextListItem>
            Continuous backups using point-in-time recovery (PITR)
          </TextListItem>
        </TextList>

        <IndentedTextList>
          <IndentedTextListItem>
            Optionally enabled for the last 35 days
          </IndentedTextListItem>
          <IndentedTextListItem>
            Point-in-time recovery to any time within the backup window
          </IndentedTextListItem>
          <IndentedTextListItem>
            The recovery process creates a new table
          </IndentedTextListItem>
        </IndentedTextList>

        <TextList>
          <TextListItem>On-demand backups</TextListItem>
        </TextList>

        <IndentedTextList>
          <IndentedTextListItem>
            Full backups for long-term retention, until explicitely deleted
          </IndentedTextListItem>
          <IndentedTextListItem>
            Doesn't affect performance or latency
          </IndentedTextListItem>
          <IndentedTextListItem>
            Can be configured and managed in AWS Backup (enabled cross-region
            copy)
          </IndentedTextListItem>
        </IndentedTextList>

        <SubSectionHeading>
          DynamoDB - Integration with Amazon S3
        </SubSectionHeading>

        <TextList>
          <TextListItem>
            <Strong>Export to S3 (must enable PITR)</Strong>
          </TextListItem>
        </TextList>

        <IndentedTextList>
          <IndentedTextListItem>
            Works for any point in time in the last 35 days
          </IndentedTextListItem>
          <IndentedTextListItem>
            Doesn't affect the read capacity of your table
          </IndentedTextListItem>
          <IndentedTextListItem>
            Perform data analysis on top of DynamoDB
          </IndentedTextListItem>
          <IndentedTextListItem>
            Retain snapshots for auditing
          </IndentedTextListItem>
          <IndentedTextListItem>
            ETL on top of S3 data before importing back into DynamoDB
          </IndentedTextListItem>
          <IndentedTextListItem>
            Export in DynamoDB JSON or ION format (data serialization language
            by amazon)
          </IndentedTextListItem>
        </IndentedTextList>

        <TextList>
          <TextListItem>
            <Strong>Import from S3</Strong>
          </TextListItem>
        </TextList>

        <IndentedTextList>
          <IndentedTextListItem>
            Import CSV, DynamoDB JSON, or ION format
          </IndentedTextListItem>
          <IndentedTextListItem>
            Doesn't consume any write capacity
          </IndentedTextListItem>
          <IndentedTextListItem>Creates a new table</IndentedTextListItem>
          <IndentedTextListItem>
            Import errors are logged in CloudWatch Logs
          </IndentedTextListItem>
        </IndentedTextList>

        <SubSectionHeading>DynamoDB Summary</SubSectionHeading>

        <TextList>
          <TextListItem>
            AWS propriety technology, managed serverless NoSQL database,
            millisecond latency
          </TextListItem>
          <TextListItem>
            Capacity modes: provisioned capacity with optional auto-scaling or
            on-demand capacity
          </TextListItem>
          <TextListItem>
            Can replace ElastiCache as a key/value store (storing session data
            for example, using TTL feature)
          </TextListItem>
          <TextListItem>
            Highly Available, Multi AZ by default, Read and Writes are
            decoupled, transaction capability
          </TextListItem>
          <TextListItem>
            DAX cluster for read cache, microsecond read latency
          </TextListItem>
          <TextListItem>
            Security, authentication and authorization is done through IAM
          </TextListItem>
          <TextListItem>
            Event Processing: DynamoDB Streams to integrate with AWS Lambda, or
            Kinesis Data Streams
          </TextListItem>
          <TextListItem>Global Table feature: active-active setup</TextListItem>
          <TextListItem>
            Automated backups up to 35 days with PITR (point-in-time-recovery -
            restore to new table), or on-demand backups
          </TextListItem>
          <TextListItem>
            Export to S3 without using RCU within the PITR window, import from
            S3 without using WCU
          </TextListItem>
          <TextListItem>Great for rapidly evolve schemas</TextListItem>
        </TextList>

        <Paragraph>
          <Strong>Use case</Strong>: Serverless applications (small documents
          100s KB), distributed serverless cache
        </Paragraph>

        <SectionHeading id="s3">Amazon S3</SectionHeading>

        <TextList>
          <TextListItem>S3 is a key / value store for objects</TextListItem>
          <TextListItem>
            Great for bigger objects, not so great for many small objects
          </TextListItem>
          <TextListItem>
            Serverless, scales infinitely, max object size is 5TB, versioning
            capability
          </TextListItem>
          <TextListItem>
            Tiers: S3 Standard, S3 Infrequent Access, S3 Intelligent, S3 Glacier
            + lifecycle policy
          </TextListItem>
          <TextListItem>
            Features: Versioning, Encryption, Replication, MFA-Delete, Access
            Logs
          </TextListItem>
          <TextListItem>
            Security: IAM, Bucket Policies, ACL, Access Points, Object Lambda,
            CORS, Object/Vault Lock
          </TextListItem>
          <TextListItem>
            Encryption: SSE-S3, SSE-KMS, SSE-C, client-side, TLS in transit,
            default encryption
          </TextListItem>
          <TextListItem>
            Batch operations on objects using S3 Batch, listing files using S3
            Inventory
          </TextListItem>
          <TextListItem>
            Performance: Multi-part upload, S3 Transfer Accelerator, S3 Select
          </TextListItem>
          <TextListItem>
            Automation: S3 Event Notifications (SNS, SQS, Lambda, EventBridge)
          </TextListItem>
        </TextList>

        <Paragraph>
          <Strong>Use case</Strong>: static files, key / value store for big
          files, website hosting
        </Paragraph>

        <SectionHeading id="documentdb">DocumentDB</SectionHeading>

        <TextList>
          <TextListItem>
            Aurora is an "AWS-implementation" of PostgreSQL / MySQL
          </TextListItem>
          <TextListItem>
            <Strong>
              DocumentDB is the same for MongoDB (which is a NoSQL database)
            </Strong>
          </TextListItem>
          <TextListItem>
            MongoDB is used to store, query and index JSON data
          </TextListItem>
          <TextListItem>Similar "deployment concepts" as Aurora</TextListItem>
          <TextListItem>
            Fully managed, highly available with replication across 3 AZ
          </TextListItem>
          <TextListItem>
            DocumentDB storage automatically grows in increments of 10GB
          </TextListItem>
          <TextListItem>
            Automatically scales to workloads with millions of requests per
            seconds
          </TextListItem>
        </TextList>

        <SectionHeading id="neptune">Amazon Neptune</SectionHeading>

        <Paragraph>
          Amazon Neptune is a fully managed graph database service. It is
          designed to work with highly connected datasets, enabling you to
          efficiently store and navigate complex relationships within your data.
        </Paragraph>

        <TextList>
          <TextListItem>Fully managed graph database</TextListItem>
          <TextListItem>
            Highly available across 3 AZ, with up to 15 read replicas
          </TextListItem>
          <TextListItem>
            Build and run applications working with highly connected datasets -
            optimized for these complex and hard queries
          </TextListItem>
          <TextListItem>
            Can store up to billions of relations and query the graph with
            milliseconds latency
          </TextListItem>
          <TextListItem>
            Great for knowledge graphs (Wikipedia), fraud detection,
            recommendation engines, social networking
          </TextListItem>
        </TextList>

        <SubSectionHeading>Streams</SubSectionHeading>

        <TextList>
          <TextListItem>
            Real-time ordered sequence of every change to your graph data
          </TextListItem>
          <TextListItem>
            Changes are available immediately after writing
          </TextListItem>
          <TextListItem>No duplicates, strict order</TextListItem>
          <TextListItem>
            Streams data is accessible in an HTTP REST API
          </TextListItem>
          <TextListItem>Use cases:</TextListItem>
        </TextList>

        <IndentedTextList>
          <IndentedTextListItem>
            Send notifications when certain changes are made
          </IndentedTextListItem>
          <IndentedTextListItem>
            Maintain your graph data synchronized in another data store (e.g.
            S3, OpenSearch, ElastiCache)
          </IndentedTextListItem>
          <IndentedTextListItem>
            Replicate data across regions in Neptune
          </IndentedTextListItem>
        </IndentedTextList>

        <PostImage src={NeptuneStreams} alt="Neptune streams" />

        <SectionHeading id="keyspaces">
          Amazon Keyspaces (for Apache Cassandra)
        </SectionHeading>

        <TextList>
          <TextListItem>
            Apache Cassandra is an open source NoSQL distributed database
          </TextListItem>
          <TextListItem>
            A managed Apache Cassandra-compatible database service
          </TextListItem>
          <TextListItem>
            Serverless, Scalable, highly available, fully managed by AWS
          </TextListItem>
          <TextListItem>
            Automatically scale tables up/down based on the applications traffic
          </TextListItem>
          <TextListItem>
            Tables are replicated 3 times across multiple AZ
          </TextListItem>
          <TextListItem>Using the Cassandra Query Language (CQL)</TextListItem>
          <TextListItem>
            Single-digit millisecond latency at any scale, 1000s of requests per
            second
          </TextListItem>
          <TextListItem>
            Capacity: On-demand mode or provisioned mode with auto-scaling
          </TextListItem>
          <TextListItem>
            Encryption, backup, Point-In-Time Recovery (PITR) up to 35 days
          </TextListItem>
        </TextList>

        <Paragraph>
          <Strong>Use case</Strong>: store IoT (internet of things) devices
          info, time-series data
        </Paragraph>

        <SectionHeading id="qldb">
          Amazon QLDB (Quantum Ledger Database)
        </SectionHeading>

        <TextList>
          <TextListItem>
            A ledger is a book recording financial transactions
          </TextListItem>
          <TextListItem>
            Fully Managed, Serverless, Highly Available, Replication across 3 AZ
          </TextListItem>
          <TextListItem>
            Used to review history of all the changes made to your application
            data over time
          </TextListItem>
          <TextListItem>
            Immutable system: no entry can be removed or modified,
            cryptographically verifiable
          </TextListItem>
          <TextListItem>
            2-3 times better performance than common ledger blockchain
            frameworks, manipulate data using SQL
          </TextListItem>
          <TextListItem>
            Difference with Amazon Managed Blockchain: no decentralization
            component, in accordance with financial regulation rules
          </TextListItem>
        </TextList>

        <SectionHeading id="timestream">Amazon Timestream</SectionHeading>

        <TextList>
          <TextListItem>
            Fully managed, fast, scalable, serverless time series database
          </TextListItem>
          <TextListItem>
            A graph containing points with a time included
          </TextListItem>
          <TextListItem>
            Automatically scales up / down to adjust capacity
          </TextListItem>
          <TextListItem>
            Store and analyze trillions of events per day
          </TextListItem>
          <TextListItem>
            1000s times faster & 1/10th the cost of relational database
          </TextListItem>
          <TextListItem>
            Scheduled queries, multi-measure records, SQL compatibility
          </TextListItem>
          <TextListItem>
            Data storage tiering: recent data kept in memory and historical data
            kept in a cost-optimized storage
          </TextListItem>
          <TextListItem>
            Built-in time series analytics functions (helps you identify
            patterns in your data in near real-time)
          </TextListItem>
          <TextListItem>Encryption in transit and at rest</TextListItem>
        </TextList>

        <Paragraph>
          <Strong>Use case</Strong>: IoT (internet of things) applications,
          operational applications, real-time analytics
        </Paragraph>

        <SectionHeading id="skip">List of Ports</SectionHeading>

        <TextList>
          <TextListItem>FTP: 21</TextListItem>
          <TextListItem>SSH: 22</TextListItem>
          <TextListItem>SFTP: 22</TextListItem>
          <TextListItem>HTTP: 80</TextListItem>
          <TextListItem>HTTPS: 443</TextListItem>
          <TextListItem>PostgreSQL: 5432</TextListItem>
          <TextListItem>MySQL: 3306</TextListItem>
          <TextListItem>Maria DB: 3306</TextListItem>
          <TextListItem>Oracle RDS: 1521</TextListItem>
          <TextListItem>MSSQL Server: 1433</TextListItem>
          <TextListItem>Aurora (PostgerSQL): 5432</TextListItem>
          <TextListItem>Aurora (MySQL): 3306</TextListItem>
        </TextList>

        <SectionHeading id="references">References</SectionHeading>
        <TextList>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/rds/"
              target="_blank"
              rel="noreferrer"
            >
              Amazon RDS & Aurora documentation
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/dynamodb/"
              target="_blank"
              rel="noreferrer"
            >
              Amazon DynamoDB documentation
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/elasticache/"
              target="_blank"
              rel="noreferrer"
            >
              Amazon ElastiCache documentation
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/s3/"
              target="_blank"
              rel="noreferrer"
            >
              Amazon S3 documentation
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/documentdb/"
              target="_blank"
              rel="noreferrer"
            >
              Amazon DocumentDB documentation
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/neptune/"
              target="_blank"
              rel="noreferrer"
            >
              Amazon Neptune documentation
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/keyspaces/"
              target="_blank"
              rel="noreferrer"
            >
              Amazon Keyspaces documentation
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/qldb/"
              target="_blank"
              rel="noreferrer"
            >
              Amazon QLDB documentation
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/timestream/"
              target="_blank"
              rel="noreferrer"
            >
              Amazon Timestream documentation
            </TextLink>
          </TextListItem>
        </TextList>
      </AnimatedPostContainer>
    </PageWrapper>
  );
};

export default AWSDatabases;
