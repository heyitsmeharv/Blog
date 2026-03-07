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
  IndentedTextList,
  IndentedTextListItem,
} from "../Typography/Typography.jsx";

// icons
import {
  AWSSVG,
  AWSCloudWatchSVG,
  AWSCloudTrailSVG,
  AWSConfigSVG,
} from "../../resources/styles/icons.jsx";

// components
import BackButton from "../Button/BackButton.jsx";
import Table from "../Table/Table.jsx";
import { CodeBlockWithCopy } from "../Code/Code.jsx";

// images
import CloudWatchMetric from "../../resources/images/blog/AWSMonitoringAudit/aws_monitoring_audit_cw_metrics.jpeg";
import CloudWatchSubscriptions from "../../resources/images/blog/AWSMonitoringAudit/aws_monitoring_audit_cw_subscriptions.jpeg";
import CloudWatchCrossAccountSubscriptions from "../../resources/images/blog/AWSMonitoringAudit/aws_monitoring_audit_cw_cross_account_subscriptions.jpeg";
import CloudWatchCrossAccountAggregation from "../../resources/images/blog/AWSMonitoringAudit/aws_monitoring_audit_cw_cross_account_aggregation.jpeg";
import CloudWatchLogsAgentEC2 from "../../resources/images/blog/AWSMonitoringAudit/aws_monitoring_audit_cw_agent_ec2.jpeg";
import CloudWatchAlarmsTargets from "../../resources/images/blog/AWSMonitoringAudit/aws_monitoring_audit_cw_alarm_targets.jpeg";
import CloudWatchCompositeAlarms from "../../resources/images/blog/AWSMonitoringAudit/aws_monitoring_audit_cw_composite_alarms.jpeg";
import CloudWatchMetricFilterAlarm from "../../resources/images/blog/AWSMonitoringAudit/aws_monitoring_audit_cw_metric_filter_alarm.jpeg";
import CloudWatchContributorInsights from "../../resources/images/blog/AWSMonitoringAudit/aws_monitoring_audit_cw_contributor_insights.jpeg";
import EventBridgeSchedule from "../../resources/images/blog/AWSMonitoringAudit/aws_monitoring_audit_event_bridge_schedule.jpeg";
import EventBridgeRules from "../../resources/images/blog/AWSMonitoringAudit/aws_monitoring_audit_event_bridge_rules.jpeg";
import CloudTrailImg from "../../resources/images/blog/AWSMonitoringAudit/aws_monitoring_audit_cloud_trail.jpeg";
import CloudTrailEventBridge from "../../resources/images/blog/AWSMonitoringAudit/aws_monitoring_audit_cloud_trail_event_bridge.jpeg";
import CloudTrailEventBridge2 from "../../resources/images/blog/AWSMonitoringAudit/aws_monitoring_audit_cloud_trail_event_bridge2.jpeg";
import ConfigEventRulesRemediation from "../../resources/images/blog/AWSMonitoringAudit/aws_monitoring_audit_config_event_rules_remediation.jpeg";
import ConfigEventBridge from "../../resources/images/blog/AWSMonitoringAudit/aws_monitoring_audit_config_event_bridge.jpeg";
import ConfigEventBridge2 from "../../resources/images/blog/AWSMonitoringAudit/aws_monitoring_audit_config_event_bridge2.jpeg";

// codeblocks
import {
  cloudwatchlogsInsights,
  cloudwatchlogsAlarmStatus,
} from "../../helpers/codeblocks.js";

const PostContainer = styled(BasePostContainer)`
  animation: ${SlideInBottom} 0.5s forwards;
`;

const AWSMonitoringAudit = () => {
  useEffect(() => {
    Analytics.event("blog_opened", { slug: "aws-monitoring-auditing" });
  }, []);

  const cloudWatchFeaturesColumns = ["Feature", "Description"];
  const cloudWatchFeaturesData = [
    {
      Feature: "Metrics",
      Description:
        "Tracks CPU, memory, network utilisation, and custom metrics from your applications.",
    },
    {
      Feature: "Logs",
      Description:
        "Centralises log collection and analysis with search and filtering capabilities.",
    },
    {
      Feature: "Alarms",
      Description:
        "Notifies users or triggers actions based on metric thresholds.",
    },
    {
      Feature: "Dashboards",
      Description: "Custom visualisations for real-time monitoring.",
    },
    {
      Feature: "Custom Anomaly Detection",
      Description:
        "Automatically identifies metric patterns and deviations from normal behaviour.",
    },
    {
      Feature: "Synthetic Monitoring",
      Description:
        "Tests application endpoints proactively with canary scripts.",
    },
  ];

  return (
    <PageWrapper>
      <PostTopBar>
        <BackButton to="/blog" />
      </PostTopBar>

      <PostContainer>
        <HeaderRow>
          <PageTitle>Amazon Monitoring & Audit</PageTitle>
          <IconWrapper>
            <HeaderIcon>
              <AWSSVG />
            </HeaderIcon>
            <HeaderIcon>
              <AWSCloudWatchSVG />
            </HeaderIcon>
            <HeaderIcon>
              <AWSCloudTrailSVG />
            </HeaderIcon>
            <HeaderIcon>
              <AWSConfigSVG />
            </HeaderIcon>
          </IconWrapper>
        </HeaderRow>

        <Paragraph>
          In this post we'll be diving into{" "}
          <Strong>AWS monitoring and auditing services</Strong>, focusing on
          CloudWatch, EventBridge, CloudTrail and Config, and how they work
          together to give you operational visibility and governance.
        </Paragraph>

        <TextList>
          <TextListItem>
            <TextLink href="#aws-cloudwatch">CloudWatch</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#aws-eventbridge">EventBridge</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#aws-cloudtrail">CloudTrail</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#aws-config">Config</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#overview">
              CloudWatch vs CloudTrail vs Config
            </TextLink>
          </TextListItem>
        </TextList>

        <SectionHeading id="aws-cloudwatch">CloudWatch</SectionHeading>
        <Paragraph>
          <Strong>Amazon CloudWatch</Strong> is AWS's core monitoring and
          observability service. It collects metrics, aggregates logs, powers
          alarms and dashboards, and provides higher-level analytics such as
          anomaly detection and insights. It's the main place to monitor
          both your infrastructure and applications.
        </Paragraph>

        <SubSectionHeading>CloudWatch Features</SubSectionHeading>
        <Table columns={cloudWatchFeaturesColumns} data={cloudWatchFeaturesData} />

        <SubSectionHeading>CloudWatch Metrics</SubSectionHeading>
        <Paragraph>
          CloudWatch <Strong>metrics</Strong> are time-series datapoints about
          the performance or health of your resources and applications. Each
          metric is identified by a <Strong>namespace</Strong>,{" "}
          <Strong>metric name</Strong> and <Strong>dimensions</Strong>, and can
          be graphed, alarmed on, or streamed elsewhere.
        </Paragraph>
        <Paragraph>
          You can even <Strong>stream CloudWatch metrics</Strong> to custom
          destinations for near-real-time consumption:
        </Paragraph>
        <PostImage
          src={CloudWatchMetric}
          alt="CloudWatch metric streaming architecture"
        />

        <SubSectionHeading>CloudWatch Logs</SubSectionHeading>
        <Paragraph>
          <Strong>CloudWatch Logs</Strong> is a fully managed log storage and
          analysis service. It centralises logs from AWS services, applications
          and on-premises systems.
        </Paragraph>

        <TertiaryHeading>Core Components</TertiaryHeading>
        <TextList>
          <TextListItem>
            <Strong>Log groups</Strong>: logical groups of log streams that
            share retention, access policies and tags.
          </TextListItem>
          <TextListItem>
            <Strong>Log streams</Strong>: sequences of log events from a single
            source (e.g. one EC2 instance, one Lambda function).
          </TextListItem>
          <TextListItem>
            <Strong>Log events</Strong>: individual entries with timestamp and
            message.
          </TextListItem>
          <TextListItem>
            <Strong>Retention</Strong>: per-log-group retention from 1 day to
            indefinite.
          </TextListItem>
        </TextList>

        <Paragraph>
          Logs are encrypted by default; you can optionally use{" "}
          <Strong>KMS CMKs</Strong> for additional control. Log data can be
          shipped to:
        </Paragraph>
        <TextList>
          <TextListItem>
            S3 (exports - note it can take up to ~12 hours via{" "}
            <Strong>CreateExportTask</Strong>)
          </TextListItem>
          <TextListItem>Kinesis Data Streams</TextListItem>
          <TextListItem>Kinesis Data Firehose</TextListItem>
          <TextListItem>AWS Lambda</TextListItem>
          <TextListItem>OpenSearch / Elasticsearch</TextListItem>
        </TextList>

        <TertiaryHeading>CloudWatch Logs Insights</TertiaryHeading>
        <Paragraph>
          <Strong>CloudWatch Logs Insights</Strong> is an on-demand query engine
          for log data. It uses a purpose-built query language for filtering,
          aggregation and visualisation - great for troubleshooting, not for
          real-time processing.
        </Paragraph>
        <Paragraph>Example: finding errors in logs with Insights:</Paragraph>
        <CodeBlockWithCopy
          code={cloudwatchlogsInsights}
          language="sql"
        />

        <TertiaryHeading>CloudWatch Logs Subscriptions</TertiaryHeading>
        <Paragraph>
          If you need <Strong>real-time processing</Strong> of log events (for
          example security analytics or custom pipelines), use{" "}
          <Strong>subscription filters</Strong>. These let you push matching log
          events to:
        </Paragraph>
        <TextList>
          <TextListItem>Kinesis Data Streams</TextListItem>
          <TextListItem>Kinesis Data Firehose</TextListItem>
          <TextListItem>AWS Lambda</TextListItem>
        </TextList>
        <PostImage
          src={CloudWatchSubscriptions}
          alt="CloudWatch Logs subscription filters"
        />

        <TertiaryHeading>
          Multi-Account & Multi-Region Aggregation
        </TertiaryHeading>
        <Paragraph>
          CloudWatch Logs supports centralised aggregation. You can collect logs
          from multiple accounts and regions into a single destination (for
          example a central Kinesis Data Stream or log account).
        </Paragraph>
        <PostImage
          src={CloudWatchCrossAccountAggregation}
          alt="Cross-account CloudWatch Logs aggregation"
        />

        <TertiaryHeading>Cross-Account Subscriptions</TertiaryHeading>
        <Paragraph>
          For cross-account delivery, you create a{" "}
          <Strong>subscription destination</Strong> that represents (for
          example) a Kinesis stream in a recipient account, attach an access
          policy so the sender account can write to it, and use an IAM role in
          the recipient account to put records into the stream.
        </Paragraph>
        <PostImage
          src={CloudWatchCrossAccountSubscriptions}
          alt="CloudWatch Logs cross-account subscription flow"
        />

        <SubSectionHeading>
          CloudWatch Agent & Unified Agent (EC2 / On-Prem)
        </SubSectionHeading>
        <Paragraph>
          By default, EC2 instances do <Strong>not</Strong> send OS-level logs
          or detailed metrics to CloudWatch. To do that you install an{" "}
          <Strong>agent</Strong> on the instance (or on-prem host) and attach an
          IAM role that lets it publish logs/metrics.
        </Paragraph>
        <PostImage
          src={CloudWatchLogsAgentEC2}
          alt="CloudWatch Logs agent on EC2"
        />

        <TertiaryHeading>Agent Types</TertiaryHeading>
        <TextList>
          <TextListItem>
            <Strong>CloudWatch Logs Agent</Strong> - legacy agent; only sends
            logs to CloudWatch Logs.
          </TextListItem>
          <TextListItem>
            <Strong>CloudWatch Unified Agent</Strong> - newer; can send both
            logs and <Strong>additional system metrics</Strong> (CPU, memory,
            disk, netstat, processes, swap, etc.) and uses SSM Parameter Store
            for centralised config.
          </TextListItem>
        </TextList>

        <TertiaryHeading>Unified Agent - Example Metrics</TertiaryHeading>
        <TextList>
          <TextListItem>CPU (active, idle, system, user, steal, etc.)</TextListItem>
          <TextListItem>
            Disk metrics (free, used, total) and disk I/O (reads, writes, bytes,
            IOPS)
          </TextListItem>
          <TextListItem>
            RAM (free, used, total, cached, inactive)
          </TextListItem>
          <TextListItem>
            Netstat (number of TCP/UDP connections, packets, bytes)
          </TextListItem>
          <TextListItem>
            Processes (total, running, sleeping, blocked, dead)
          </TextListItem>
          <TextListItem>Swap (free, used, used %)</TextListItem>
        </TextList>

        <SubSectionHeading>CloudWatch Alarms</SubSectionHeading>
        <Paragraph>
          <Strong>CloudWatch Alarms</Strong> evaluate metrics over time and
          compare them to thresholds. Based on the result they transition
          between:
        </Paragraph>
        <TextList>
          <TextListItem>
            <Strong>OK</Strong> - metric within normal range
          </TextListItem>
          <TextListItem>
            <Strong>ALARM</Strong> - threshold breached
          </TextListItem>
          <TextListItem>
            <Strong>INSUFFICIENT_DATA</Strong> - not enough recent datapoints
          </TextListItem>
        </TextList>
        <Paragraph>
          The evaluation <Strong>period</Strong> controls the time window (e.g.
          60s, 5 minutes) used when evaluating the metric.
        </Paragraph>

        <TertiaryHeading>Alarm Targets</TertiaryHeading>
        <Paragraph>
          Alarms can trigger automated actions such as:
        </Paragraph>
        <TextList>
          <TextListItem>
            EC2: stop, terminate, reboot or recover instances.
          </TextListItem>
          <TextListItem>Auto Scaling: scale out / scale in.</TextListItem>
          <TextListItem>SNS: send notifications or fan out to other systems.</TextListItem>
        </TextList>
        <PostImage
          src={CloudWatchAlarmsTargets}
          alt="CloudWatch alarm target actions"
        />

        <TertiaryHeading>Composite Alarms</TertiaryHeading>
        <Paragraph>
          <Strong>Composite alarms</Strong> monitor the state of other alarms
          using <Strong>AND / OR</Strong> logic. They're ideal for
          reducing noise (for example only alerting when multiple related
          alarms are in ALARM).
        </Paragraph>
        <PostImage
          src={CloudWatchCompositeAlarms}
          alt="CloudWatch composite alarms"
        />

        <Paragraph>
          Alarms can also be driven from{" "}
          <Strong>CloudWatch Logs metric filters</Strong>, letting you alarm on
          patterns in log data:
        </Paragraph>
        <PostImage
          src={CloudWatchMetricFilterAlarm}
          alt="CloudWatch Logs metric filter to alarm"
        />

        <Paragraph>
          You can even test alarms via CLI by manually setting the alarm state:
        </Paragraph>
        <CodeBlockWithCopy
          code={cloudwatchlogsAlarmStatus}
          language="bash"
        />

        <SubSectionHeading>CloudWatch Insights & Operational Visibility</SubSectionHeading>

        <TertiaryHeading>Container Insights</TertiaryHeading>
        <Paragraph>
          <Strong>CloudWatch Container Insights</Strong> collects, aggregates
          and summarises metrics and logs from containers running on ECS, EKS,
          Kubernetes on EC2 and Fargate. For Kubernetes it uses a containerised
          version of the unified agent for discovery and collection.
        </Paragraph>

        <TertiaryHeading>Lambda Insights</TertiaryHeading>
        <Paragraph>
          <Strong>Lambda Insights</Strong> is a monitoring and troubleshooting
          add-on for Lambda. It collects system-level metrics (CPU time, memory,
          disk, network), cold-start metrics and worker shutdown info, and
          provides a dedicated CloudWatch dashboard. It's enabled via a
          Lambda layer.
        </Paragraph>

        <TertiaryHeading>Contributor Insights</TertiaryHeading>
        <Paragraph>
          <Strong>Contributor Insights</Strong> analyses logs and builds
          time-series showing the top-N contributors to a metric. For example,
          you can analyse VPC Flow Logs to find the top IPs generating traffic
          and identify noisy or malicious clients.
        </Paragraph>
        <PostImage
          src={CloudWatchContributorInsights}
          alt="CloudWatch Contributor Insights example"
        />

        <TertiaryHeading>Application Insights</TertiaryHeading>
        <Paragraph>
          <Strong>CloudWatch Application Insights</Strong> creates automated
          dashboards for applications running on EC2 or integrated services
          (RDS, ELB, ASG, Lambda, SQS, DynamoDB, ECS, EKS, API Gateway, etc.).
          It uses ML (via SageMaker under the hood) to highlight potential
          issues and publishes alerts via EventBridge and SSM OpsCenter.
        </Paragraph>

        <TertiaryHeading>Cheat-Sheet: Insights Features</TertiaryHeading>
        <TextList>
          <TextListItem>
            <Strong>Container Insights</Strong>: metrics/logs for ECS, EKS,
            Kubernetes on EC2 and Fargate.
          </TextListItem>
          <TextListItem>
            <Strong>Lambda Insights</Strong>: deep metrics for Lambda
            performance and cold starts.
          </TextListItem>
          <TextListItem>
            <Strong>Contributor Insights</Strong>: top-N contributors from
            CloudWatch Logs.
          </TextListItem>
          <TextListItem>
            <Strong>Application Insights</Strong>: automated dashboards and
            problem detection for applications and their dependencies.
          </TextListItem>
        </TextList>

        <SectionHeading id="aws-eventbridge">EventBridge</SectionHeading>
        <Paragraph>
          <Strong>Amazon EventBridge</Strong> is a serverless event bus that
          connects AWS services, SaaS apps and your own apps using{" "}
          <Strong>events</Strong>. It's a key building block for
          event-driven architectures.
        </Paragraph>
        <Paragraph>
          Common patterns include scheduled tasks (cron expressions triggering
          Lambda every hour) and reacting to security or governance events, such
          as sending a notification whenever the <Strong>root user</Strong>{" "}
          logs in.
        </Paragraph>
        <PostImage
          src={EventBridgeSchedule}
          alt="EventBridge schedule rule example"
        />

        <SubSectionHeading>EventBridge Rules & Targets</SubSectionHeading>
        <Paragraph>
          Rules match incoming events (pattern or schedule) and route them to
          targets such as Lambda, Step Functions, SNS, SQS, Kinesis, ECS tasks,
          Systems Manager and more.
        </Paragraph>
        <PostImage
          src={EventBridgeRules}
          alt="EventBridge sources and targets overview"
        />

        <SubSectionHeading>Schema Registry</SubSectionHeading>
        <Paragraph>
          EventBridge includes a <Strong>schema registry</Strong> that discovers
          and stores event schemas from your event buses. It can generate{" "}
          <Strong>code bindings</Strong> so your applications know the structure
          of events at compile time.
        </Paragraph>
        <Paragraph>
          You can have multiple event buses:
        </Paragraph>
        <TextList>
          <TextListItem>
            <Strong>Default event bus</Strong> - available in every account,
            receives many AWS service events.
          </TextListItem>
          <TextListItem>
            <Strong>Custom event buses</Strong> - for your own applications.
          </TextListItem>
          <TextListItem>
            <Strong>Partner event buses</Strong> - for SaaS integrations.
          </TextListItem>
        </TextList>

        <SectionHeading id="aws-cloudtrail">CloudTrail</SectionHeading>
        <Paragraph>
          <Strong>AWS CloudTrail</Strong> provides <Strong>API-level audit</Strong>{" "}
          logging. It records who did what, when, and from where in your AWS
          accounts, and delivers logs to S3 and optionally CloudWatch Logs.
        </Paragraph>
        <PostImage src={CloudTrailImg} alt="CloudTrail overview" />

        <SubSectionHeading>CloudTrail Events</SubSectionHeading>
        <TertiaryHeading>Management Events</TertiaryHeading>
        <Paragraph>
          Management events record operations that change the configuration of
          resources (e.g. creating an EC2 instance, modifying a security group).
          Trails log management events by default, and you can separate{" "}
          <Strong>read-only</Strong> vs <Strong>write-only</Strong> events.
        </Paragraph>

        <TertiaryHeading>Data Events</TertiaryHeading>
        <Paragraph>
          Data events record high-volume actions on specific resources, such as:
        </Paragraph>
        <TextList>
          <TextListItem>S3 object-level APIs (GetObject, PutObject, DeleteObject)</TextListItem>
          <TextListItem>Lambda function invocations</TextListItem>
        </TextList>
        <Paragraph>
          They're disabled by default due to volume and cost, and must be
          explicitly enabled per resource.
        </Paragraph>

        <SubSectionHeading>CloudTrail Insights</SubSectionHeading>
        <Paragraph>
          <Strong>CloudTrail Insights</Strong> analyses management events to
          detect unusual activity (for example spikes in API calls or abnormal
          error rates) and surfaces them as insight events.
        </Paragraph>

        <SubSectionHeading>Events Retention & Trails</SubSectionHeading>
        <Paragraph>
          CloudTrail keeps <Strong>90 days</Strong> of recent management events
          in the console for free. For long-term retention and analytics you
          create <Strong>trails</Strong> that deliver events to S3 (and
          optionally CloudWatch Logs), then query via Athena or other tools.
        </Paragraph>

        <SubSectionHeading>CloudTrail with EventBridge</SubSectionHeading>
        <Paragraph>
          CloudTrail events can be sent to EventBridge in near real time, so you
          can react automatically - for example triggering remediation when a
          non-compliant API call is made.
        </Paragraph>
        <PostImage
          src={CloudTrailEventBridge}
          alt="CloudTrail with EventBridge integration"
        />
        <PostImage
          src={CloudTrailEventBridge2}
          alt="CloudTrail and EventBridge rule example"
        />

        <SectionHeading id="aws-config">Config</SectionHeading>
        <Paragraph>
          <Strong>AWS Config</Strong> continuously records the configuration of
          your AWS resources and evaluates them against{" "}
          <Strong>compliance rules</Strong>. It's used for configuration
          audit, change tracking and policy enforcement.
        </Paragraph>

        <SubSectionHeading>Config Rules</SubSectionHeading>
        <Paragraph>
          <Strong>Config Rules</Strong> determine whether resources are{" "}
          <Strong>COMPLIANT</Strong> or <Strong>NON_COMPLIANT</Strong> with your
          policies. You can use over 75+ AWS managed rules or write custom rules
          backed by Lambda.
        </Paragraph>
        <Paragraph>
          Important: Config rules <Strong>do not</Strong> block actions; they
          detect and flag non-compliant resources.
        </Paragraph>

        <TertiaryHeading>Remediation</TertiaryHeading>
        <Paragraph>
          You can attach <Strong>remediation actions</Strong> (SSM Automation
          Documents) to rules so that when a resource is non-compliant,
          AWS Config attempts automatic remediation. You can configure retries
          if the resource remains non-compliant.
        </Paragraph>
        <PostImage
          src={ConfigEventRulesRemediation}
          alt="AWS Config rules and remediation"
        />

        <TertiaryHeading>Notifications & EventBridge</TertiaryHeading>
        <Paragraph>
          Non-compliance and configuration change events can be sent to{" "}
          <Strong>EventBridge</Strong>, which can then route to SNS, Lambda,
          OpsCenter, etc.
        </Paragraph>
        <PostImage
          src={ConfigEventBridge}
          alt="AWS Config with EventBridge notifications"
        />
        <Paragraph>
          You can also send <Strong>all</Strong> configuration changes - not
          just non-compliant ones - and filter downstream using SNS or
          EventBridge rules.
        </Paragraph>
        <PostImage
          src={ConfigEventBridge2}
          alt="AWS Config all-event delivery pattern"
        />

        <SectionHeading id="overview">
          CloudWatch vs CloudTrail vs Config
        </SectionHeading>

        <SubSectionHeading>High-Level Roles</SubSectionHeading>
        <IndentedTextList>
          <IndentedTextListItem>
            <Strong>CloudWatch</Strong>: performance monitoring, metrics, logs,
            dashboards, alarms and events.
          </IndentedTextListItem>
          <IndentedTextListItem>
            <Strong>CloudTrail</Strong>: API-level auditing - who did what, when
            and from where.
          </IndentedTextListItem>
          <IndentedTextListItem>
            <Strong>AWS Config</Strong>: configuration history, compliance
            evaluation and change timelines.
          </IndentedTextListItem>
        </IndentedTextList>

        <SubSectionHeading>Example: Elastic Load Balancer</SubSectionHeading>
        <Paragraph>How each service would apply to an ELB:</Paragraph>

        <TertiaryHeading>CloudWatch</TertiaryHeading>
        <TextList>
          <TextListItem>Monitor connection counts and latency metrics.</TextListItem>
          <TextListItem>Visualise 4xx/5xx error codes as percentages over time.</TextListItem>
          <TextListItem>
            Build dashboards to understand load balancer performance and health.
          </TextListItem>
        </TextList>

        <TertiaryHeading>Config</TertiaryHeading>
        <TextList>
          <TextListItem>
            Track security group rules associated with the load balancer.
          </TextListItem>
          <TextListItem>
            Track configuration changes (listeners, target groups, certificates).
          </TextListItem>
          <TextListItem>
            Ensure an <Strong>SSL/TLS certificate</Strong> is always attached for
            compliance.
          </TextListItem>
        </TextList>

        <TertiaryHeading>CloudTrail</TertiaryHeading>
        <TextList>
          <TextListItem>
            Record <Strong>who</Strong> created, modified or deleted the load
            balancer and when.
          </TextListItem>
          <TextListItem>
            Provide an audit trail for all API calls impacting the ELB.
          </TextListItem>
        </TextList>

        <SectionHeading id="references">References</SectionHeading>
        <TextList>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/WhatIsCloudWatch.html"
              target="_blank"
              rel="noreferrer"
            >
              Amazon CloudWatch - What Is CloudWatch?
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/eventbridge/latest/userguide/what-is-amazon-eventbridge.html"
              target="_blank"
              rel="noreferrer"
            >
              Amazon EventBridge - User Guide
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-user-guide.html"
              target="_blank"
              rel="noreferrer"
            >
              AWS CloudTrail - User Guide
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/config/latest/developerguide/WhatIsConfig.html"
              target="_blank"
              rel="noreferrer"
            >
              AWS Config - Developer Guide
            </TextLink>
          </TextListItem>
        </TextList>
      </PostContainer>
    </PageWrapper>
  );
};

export default AWSMonitoringAudit;
