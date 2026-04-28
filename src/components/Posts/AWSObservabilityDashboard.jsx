import React, { useEffect } from "react";
import styled from "styled-components";
import { renderArchitexter } from "architexter";

// helpers
import { Analytics } from "../../helpers/analytics";

// animations
import SlideInBottom from "../../animations/SlideInBottom";

// components
import BackButton from "../Button/BackButton";
import Banner from "../Banner/Banner";
import { CodeBlockWithCopy } from "../Code/Code";
import Carousel from "../Carousel/Carousel";

// layout
import {
  PageWrapper,
  PostTopBar,
  PostContainer as BasePostContainer,
  HeaderRow,
  IconWrapper,
  HeaderIcon,
} from "../BlogLayout/BlogLayout";
import {
  ProjectArchitecture,
  EngineeringDecisions,
  ProjectChallenges,
  ProjectCritique,
  ProjectNextSteps,
} from "../BlogLayout/ProjectExplanation";

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
  InlineHighlight,
} from "../Typography/Typography";

// icons
import {
  TerraformSVG,
  AWSSVG,
  AWSCloudWatchSVG,
} from "../../resources/styles/icons";

// images
import demoOverviewPng from "../../resources/images/blog/AWSObservabilityDashboard/demo-overview.png";
import demoSignalsPng from "../../resources/images/blog/AWSObservabilityDashboard/demo-signals.png";

const repoUrl = "https://github.com/heyitsmeharv/aws-observability-dashboard";

const dataFlow = `[internet] Internet
  [alb] Application Load Balancer
    > metrics -> CloudWatch (AWS/ApplicationELB)
    [ecs] ECS Service (EC2 or Fargate)
      > container metrics -> CloudWatch (ECS/ContainerInsights)
      > structured logs -> CloudWatch Logs -> Logs Insights
  [canary] CloudWatch Synthetics Canaries
    > metrics -> CloudWatch (CloudWatchSynthetics)
[observability] CloudWatch
  [alarm] CloudWatch Alarms
  [dashboard] CloudWatch Dashboard`;

const quickStart = `module "observability" {
  source = "github.com/heyitsmeharv/aws-observability-dashboard//infra/modules/adapters/platform_service"

  service = {
    name        = "my-app"
    environment = "production"
    region      = "eu-west-2"
    kind        = "ecs_fargate_alb"

    ingress = {
      alb_arn          = var.alb_arn
      target_group_arn = var.target_group_arn
      public_base_url  = "https://my-app.example.com"
      api_health_url   = "https://my-app.example.com/health"
    }

    log_group_names = ["/ecs/my-app/production"]

    ecs = {
      cluster_arn        = var.ecs_cluster_arn
      service_arn        = var.ecs_service_arn
      app_container_name = "api"
    }
  }

  dashboard = {
    owner       = "platform-team"
    runbook_url = "https://internal.example/runbooks/my-app"
  }

  alerts = {
    sns_topic_arn = aws_sns_topic.platform_alerts.arn
  }
}`;

const withCanaries = `  # Optional: outside-in synthetic monitoring
  canaries = {
    enabled               = true
    artifacts_bucket_name = aws_s3_bucket.canary_artifacts.bucket
  }

  # Optional: Application Signals drilldowns
  tracing = {
    enabled = true
    mode    = "managed"
  }`;

const structuredLog = `{
  "timestamp": "2026-04-16T10:00:00.000Z",
  "level": "info",
  "message": "request completed",
  "route": "/api/items",
  "method": "GET",
  "statusCode": 200,
  "durationMs": 45,
  "requestId": "abc123",
  "sourceIp": "203.0.113.1"
}`;

const nodeLogger = `function log(level, message, fields = {}) {
  console.log(JSON.stringify({
    timestamp: new Date().toISOString(),
    level,
    message,
    ...fields,
  }));
}

// In a request handler:
log("info", "request completed", {
  route: req.path,
  method: req.method,
  statusCode: res.statusCode,
  durationMs: Date.now() - start,
  requestId: req.headers["x-request-id"],
  sourceIp: req.ip,
});`;

const moduleStructure = `infra/modules
  [module] core_alarms
    (CloudWatch metric alarms)
  [module] core_canaries
    (CloudWatch Synthetics canaries + IAM)
  [module] core_dashboards
    (Single composed CloudWatch dashboard)
  [module] core_logs_insights
    (10 saved Logs Insights query definitions)
  adapters
    [adapter] platform_service
      (Recommended public adapter)
    [adapter] ecs_ec2_alb
      (ECS-on-EC2 wrapper)
    [adapter] ecs_fargate_alb
      (Fargate wrapper)`;

const demoBackendEndpoints = `GET /health             - always 200 (used by ALB health checks and canaries)
GET /api/ok            - fast 200, normal traffic
GET /api/slow?ms=3000  - artificial delay, triggers P99 latency alarm
GET /api/fail          - intentional 500, triggers 5xx alarm
GET /api/dependency    - flaky downstream with configurable fail rate
GET /api/items         - clean read endpoint with structured logging
GET /api/metrics       - rolling 60s window used by the React UI`;

const observabilityDecisions = [
  {
    title: "ARN-first adoption",
    body: `The module accepts existing ECS, ALB, target group, and log group
ARNs instead of trying to own the workload. That makes it safer to introduce
to a running service because Terraform only creates CloudWatch resources; it
doesn't risk replacing the service it is meant to observe.`,
  },
  {
    title: "Native CloudWatch over a separate platform",
    body: `I deliberately kept the first version inside CloudWatch rather than
adding another observability tool to deploy and maintain. The tradeoff is that
the dashboard is AWS-specific, but the adoption path is much lighter for teams
already running ECS and ALB.`,
  },
  {
    title: "Composable core modules",
    body: `The core modules each own one concern: alarms, dashboards, canaries,
and saved Logs Insights queries. The adapters compose those building blocks
for a particular workload shape, so the public interface can stay simple
without making every internal module know about ECS service inputs.`,
  },
  {
    title: "Instrumentation is explicit",
    body: `The module can wire CloudWatch resources together, but it cannot
invent useful application signals. Structured logs, route names, duration
fields, and trace data still have to come from the service. Keeping that
boundary explicit makes the module honest about what it does and does not
solve.`,
  },
];

const observabilityChallenges = [
  {
    title: "Logs had to become queryable",
    body: `Unstructured log lines made the saved Logs Insights queries almost
worthless. Moving the demo backend to structured JSON turned logging from text
search into something the dashboard could understand.`,
  },
  {
    title: "Different signals mature at different speeds",
    body: `ALB and ECS metrics are available immediately, canaries need
configuration, and tracing needs application instrumentation. The module had
to support useful Level 1 observability without pretending Level 2 tracing is
automatic.`,
  },
  {
    title: "The demo needed to prove real failure paths",
    body: `A static example would not prove much. The React and Node demo had
to generate slow requests, 5xx responses, and flaky dependencies on demand so
I could check that alarms, dashboards, and saved queries all reacted as
expected.`,
  },
];

const PostContainer = styled(BasePostContainer)`
  animation: ${SlideInBottom} 0.5s forwards;
`;

const AWSObservabilityDashboard = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    Analytics.pageview("/blog/aws-observability-dashboard");
    Analytics.track("blog_page_viewed", {
      slug: "aws-observability-dashboard",
    });
  }, []);

  return (
    <PageWrapper>
      <PostTopBar>
        <BackButton to="/blog" />
      </PostTopBar>

      <PostContainer>
        <HeaderRow>
          <PageTitle>AWS Observability Dashboard</PageTitle>
          <IconWrapper>
            <HeaderIcon>
              <TerraformSVG />
            </HeaderIcon>
            <HeaderIcon>
              <AWSSVG />
            </HeaderIcon>
            <HeaderIcon>
              <AWSCloudWatchSVG />
            </HeaderIcon>
          </IconWrapper>
        </HeaderRow>

        <Paragraph>
          Every time I've onboarded a service at work without existing
          observability I've had to rebuild the same thing: a CloudWatch
          dashboard, a handful of alarms, a set of Logs Insights queries. It
          takes a day, it looks slightly different every time, and the next
          person to own the service has to reverse-engineer what the alarms
          actually mean.{" "}
          <TextLink href={repoUrl} target="_blank" rel="noreferrer">
            aws-observability-dashboard
          </TextLink>{" "}
          is my attempt to package that into something reusable.
        </Paragraph>

        <Paragraph>
          The idea is simple: pass in your ECS service ARN, ALB ARN, and log
          groups, and get back a consistent observability package - dashboards,
          alarms, Logs Insights queries, optional canaries. Everything lives
          natively in CloudWatch. No extra service to deploy or maintain.
        </Paragraph>

        <SectionHeading>What Gets Created</SectionHeading>

        <Paragraph>
          A single <InlineHighlight>terraform apply</InlineHighlight> produces
          four things:
        </Paragraph>

        <TextList>
          <TextListItem>
            <Strong>1 CloudWatch dashboard</Strong> - a composed view with
            overview, service detail, operations, and log analysis sections all
            in a single pane.
          </TextListItem>
          <TextListItem>
            <Strong>7+ CloudWatch alarms</Strong> - covering ALB front-door
            errors and latency, ECS service health, and optional canary
            failures.
          </TextListItem>
          <TextListItem>
            <Strong>10 Logs Insights saved queries</Strong> - error analysis,
            P99 latency by route, top failing routes, noisy callers, and
            deploy-window helpers.
          </TextListItem>
          <TextListItem>
            <Strong>CloudWatch Synthetics canaries</Strong> (optional) -
            outside-in endpoint monitoring with active tracing support.
          </TextListItem>
        </TextList>

        <ProjectArchitecture
          archOutline={dataFlow}
          summary="The package observes signals that already exist in CloudWatch. It does not instrument your application by itself; it reads from the metrics and logs your AWS infrastructure already produces."
        >
          <Paragraph>
            The only thing you supply is the signal - structured JSON logs to
            CloudWatch Logs, and the standard CloudWatch metrics that ECS and
            ALB emit by default. The module wires those signals into the
            dashboard and alarm definitions for you.
          </Paragraph>
        </ProjectArchitecture>

        <SectionHeading>Module Structure</SectionHeading>

        <Paragraph>
          The repo is split into core modules and adapters. The core modules are
          the building blocks - each one owns one concern. The adapters compose
          them into a single call that makes sense for a specific workload
          pattern.
        </Paragraph>

        <CodeBlockWithCopy
          compact
          code={renderArchitexter(moduleStructure, "tree")}
        />

        <Paragraph>
          For most use cases you'll only interact with{" "}
          <InlineHighlight>platform_service</InlineHighlight>, the recommended
          public adapter. It takes the full set of inputs - service ARNs, log
          groups, alert routing, canary config - and handles the wiring
          internally.
        </Paragraph>

        <Banner title="Why ARN-first?" variant="info">
          <Paragraph>
            I wanted the module to be safe to add to an existing stack without
            touching anything that's already running. If it took ownership of
            the ECS service or ALB it'd be too risky to adopt - one bad plan
            could recreate a running service. Passing ARNs means the module only
            ever creates new CloudWatch resources, never modifies what's already
            there.
          </Paragraph>
        </Banner>

        <SectionHeading>Quick Start</SectionHeading>

        <SubSectionHeading>
          Level 1 - infrastructure observability
        </SubSectionHeading>

        <Paragraph>
          The minimum useful configuration is just your service identity, the
          ALB and ECS ARNs, your log groups, and an SNS topic for alarm
          notifications.
        </Paragraph>

        <CodeBlockWithCopy code={quickStart} />

        <Paragraph>
          This creates everything immediately. No application changes required
          at this level - just the ARNs of resources that already exist.
        </Paragraph>

        <SubSectionHeading>Level 2 - canaries and tracing</SubSectionHeading>

        <Paragraph>
          Add the <InlineHighlight>canaries</InlineHighlight> block for
          outside-in synthetic monitoring and the{" "}
          <InlineHighlight>tracing</InlineHighlight> block for Application
          Signals drilldowns. Both are optional and independent of each other.
        </Paragraph>

        <CodeBlockWithCopy code={withCanaries} />

        <Banner
          title="Application Signals requires app instrumentation"
          variant="warning"
        >
          <Paragraph>
            Level 2 tracing requires your application to run the CloudWatch
            agent as a sidecar and instrument with ADOT. The module exposes
            trace drilldown links in the dashboard, but it cannot generate trace
            data for an application that doesn't emit any.
          </Paragraph>
        </Banner>

        <SectionHeading>Structured Logging</SectionHeading>

        <Paragraph>
          This is the one thing the module can't do for you. When I first wired
          the Logs Insights queries against a service that was using
          unstructured log lines, all ten queries returned nothing useful.
          Structured JSON is the price of admission - but it's a low bar and{" "}
          <InlineHighlight>console.log(JSON.stringify(...))</InlineHighlight> is
          genuinely all it takes.
        </Paragraph>

        <CodeBlockWithCopy code={structuredLog} />

        <Paragraph>
          The demo backend uses a tiny helper that wraps{" "}
          <InlineHighlight>console.log</InlineHighlight> with JSON formatting.
          This is all that's needed to unlock all 10 saved queries.
        </Paragraph>

        <CodeBlockWithCopy code={nodeLogger} />

        <TextList>
          <TextListItem>
            <InlineHighlight>level</InlineHighlight> - used by error analysis
            queries
          </TextListItem>
          <TextListItem>
            <InlineHighlight>statusCode</InlineHighlight> - used by error rate
            and top failing routes
          </TextListItem>
          <TextListItem>
            <InlineHighlight>route</InlineHighlight> - used by all route-level
            breakdowns
          </TextListItem>
          <TextListItem>
            <InlineHighlight>durationMs</InlineHighlight> - used by P99 latency
            queries
          </TextListItem>
          <TextListItem>
            <InlineHighlight>sourceIp</InlineHighlight> - used by the noisy
            callers query
          </TextListItem>
        </TextList>

        <SectionHeading>The Demo App</SectionHeading>

        <Paragraph>
          The repo includes a complete demo stack under{" "}
          <InlineHighlight>examples/react-node-demo</InlineHighlight>. It's a
          realistic ECS target - React frontend, Node/Express backend, ALB -
          with the observability module wired against it. Its purpose is to
          prove the module works end to end and to give you a way to generate
          observable signals on demand.
        </Paragraph>

        <SubSectionHeading>The backend API</SubSectionHeading>

        <Paragraph>
          The backend is intentionally designed to generate observable signals.
          Every endpoint is there to trigger a specific alarm or log query, not
          to be a useful API.
        </Paragraph>

        <CodeBlockWithCopy code={demoBackendEndpoints} />

        <Paragraph>
          Hitting <InlineHighlight>/api/fail</InlineHighlight> a handful of
          times will trigger the 5xx alarm. Hitting{" "}
          <InlineHighlight>/api/slow?ms=5000</InlineHighlight> repeatedly pushes
          the P99 latency alarm. The{" "}
          <InlineHighlight>/api/dependency</InlineHighlight> endpoint simulates
          a flaky downstream and shows up in the Application Signals service map
          when tracing is enabled.
        </Paragraph>

        <SubSectionHeading>The React UI</SubSectionHeading>

        <Paragraph>
          I built the React UI because "open CloudWatch and wait for data" is a
          terrible way to validate a module during development. You need to be
          able to fire specific request patterns on demand and immediately see
          whether the right alarms trigger. The UI makes that fast - hit "Run
          burst", watch the error rate spike, confirm the 5xx alarm flips. It's
          a testing harness as much as a demo.
        </Paragraph>

        <Carousel
          items={[
            {
              title: "Demo UI overview",
              description:
                "Live stat cards, a traffic-path architecture diagram with animated request packets, and the package surface showing what the module created in CloudWatch. The Alarms node turns red when an alarm is in ALARM state.",
              src: demoOverviewPng,
            },
            {
              title: "Endpoints and signals",
              description:
                "Six endpoint cards to fire individual requests, a burst button for 10 concurrent calls, sparkline charts for requests/error rate/latency over the last 5 minutes, and a per-route breakdown of the last 60 seconds.",
              src: demoSignalsPng,
            },
          ]}
        />

        <Paragraph>
          The architecture diagram animates request packets along the path from
          browser through CloudFront and ALB to the ECS service (and optionally
          to a downstream dependency). The packet turns red when the response is
          a 5xx. The Alarms node changes colour to reflect the current alarm
          state.
        </Paragraph>

        <Banner title="Running locally" variant="info">
          <Paragraph>
            The demo frontend and backend can run locally without any AWS
            infrastructure. The backend is a plain Node/Express server and the
            frontend is a Vite app that proxies{" "}
            <InlineHighlight>/api</InlineHighlight> to{" "}
            <InlineHighlight>localhost:4000</InlineHighlight>. Just{" "}
            <InlineHighlight>npm install</InlineHighlight> in each directory and
            start both.
          </Paragraph>
        </Banner>

        <SectionHeading>Deploying the Full Stack</SectionHeading>

        <TertiaryHeading>Step 1 - Bootstrap remote state</TertiaryHeading>

        <Paragraph>
          The repo includes a bootstrap script that creates the S3 state bucket
          and DynamoDB lock table once per environment.
        </Paragraph>

        <TertiaryHeading>Step 2 - Deploy infrastructure</TertiaryHeading>

        <Paragraph>
          Running <InlineHighlight>terraform apply</InlineHighlight> from{" "}
          <InlineHighlight>examples/react-node-demo/infra</InlineHighlight>{" "}
          creates the VPC, ECS cluster, ALB, ECR repositories, and the full
          observability package in one go.
        </Paragraph>

        <TertiaryHeading>Step 3 - Push container images</TertiaryHeading>

        <Paragraph>
          Build the frontend and backend Docker images and push them to ECR.
          Force a new ECS deployment and wait for the services to stabilise.
          Once they're healthy, the CloudWatch metrics start flowing
          immediately.
        </Paragraph>

        <TertiaryHeading>Step 4 - Inspect the dashboard</TertiaryHeading>

        <Paragraph>
          Open the CloudWatch console and navigate to Dashboards. The module
          creates a single composed dashboard named after your service and
          environment. You'll see ALB front-door charts, ECS health, the alarm
          strip, and the latest structured error entries from your log groups -
          all in one view.
        </Paragraph>

        <TertiaryHeading>Step 5 - Run Logs Insights queries</TertiaryHeading>

        <Paragraph>
          Under CloudWatch Logs → Logs Insights, your saved queries appear under
          a prefix matching your service and environment. Run{" "}
          <InlineHighlight>errors/latest-errors</InlineHighlight> to see
          structured error entries,{" "}
          <InlineHighlight>latency/p99-by-route</InlineHighlight> to compare
          route latencies, or{" "}
          <InlineHighlight>errors/top-failing-routes</InlineHighlight> to
          identify problem endpoints.
        </Paragraph>

        <EngineeringDecisions decisions={observabilityDecisions} />

        <ProjectChallenges challenges={observabilityChallenges} />

        <ProjectCritique>
          <Paragraph>
            v1 only handles ECS behind an ALB - EC2 and Fargate both work, but
            Lambda and API Gateway adapters aren't there yet. I drew the line
            there deliberately because I wanted to ship something complete
            rather than something half-finished across five compute types.
          </Paragraph>

          <Paragraph>
            The Application Signals setup is also more involved than I'd like.
            You have to run a CloudWatch agent sidecar and instrument with ADOT,
            and AWS's Node ESM support is still limited enough that the demo
            backend uses CommonJS. That's an AWS constraint, not a module one,
            but it's worth knowing going in.
          </Paragraph>
        </ProjectCritique>

        <ProjectNextSteps>
          <Paragraph>
            The next useful version would extend the adapter model rather than
            just adding more dashboard widgets. Lambda and API Gateway support,
            cross-account observability through CloudWatch OAM, anomaly
            detection alarms, and daemon-mode OTEL collectors would all make the
            module useful across more real AWS environments.
          </Paragraph>

          <TextList>
            <TextListItem>
              <Strong>Lambda and API Gateway adapters</Strong> - support
              serverless workloads with the same dashboard and alarm language.
            </TextListItem>
            <TextListItem>
              <Strong>Cross-account observability</Strong> - make CloudWatch OAM
              an explicit path instead of keeping it out of scope.
            </TextListItem>
            <TextListItem>
              <Strong>Anomaly detection alarms</Strong> - move beyond static
              thresholds for workloads with uneven traffic.
            </TextListItem>
            <TextListItem>
              <Strong>Collector deployment modes</Strong> - support daemon-mode
              OTEL collectors as well as the current sidecar pattern.
            </TextListItem>
          </TextList>
        </ProjectNextSteps>

        <SectionHeading>Wrapping Up</SectionHeading>

        <Paragraph>
          I hope this is genuinely useful day-to-day. Having a consistent alarm
          set that I can attach to any new ECS service in under five minutes is
          the kind of thing that makes the time investment worth it.
        </Paragraph>

        <Paragraph>Full source on GitHub:</Paragraph>

        <TextList>
          <TextListItem>
            <TextLink href={repoUrl} target="_blank" rel="noreferrer">
              github.com/heyitsmeharv/aws-observability-dashboard
            </TextLink>
          </TextListItem>
        </TextList>
      </PostContainer>
    </PageWrapper>
  );
};

export default AWSObservabilityDashboard;
