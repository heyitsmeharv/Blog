import React, { useEffect } from "react";
import styled from "styled-components";

// helpers
import { Analytics } from "../../helpers/analytics";

// animations
import SlideInBottom from "../../animations/SlideInBottom";

// components
import BackButton from "../Button/BackButton";
import Banner from "../Banner/Banner";
import { CodeBlockWithCopy } from "../Code/Code";
import Carousel from "../Carousel/Carousel";

// images
import dashboardPng from "../../resources/images/blog/Quiet-lyAnalytics/Dashboard.png";
import dashboardTwoPng from "../../resources/images/blog/Quiet-lyAnalytics/Dashboard2.png";

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
  AWSLambdaSVG,
} from "../../resources/styles/icons";

const terraformRepo = "https://github.com/heyitsmeharv/terraform-aws-quiet-ly";
const npmRepo = "https://github.com/heyitsmeharv/quiet-ly-npm";

const architecture = `[client] Browser + @quiet-ly/analytics SDK
  > POST /events (ingest)
  > GET /events (dashboard)
  [cdn] CloudFront Distribution
    (HTTPS redirect, IPv6, country header injection)
    [lambda] Lambda Function URL
      > PutItem -> DynamoDB
      > Query <- DynamoDB
      [db] DynamoDB
        (events table, pay-per-request)
      [observability] CloudWatch Logs`;

const terraformQuickStart = `module "analytics" {
  source  = "heyitsmeharv/quiet-ly/aws"
  version = "~> 0.1"

  table_name     = "my-portfolio-events"
  allowed_origin = "https://yourportfolio.com"
}

output "analytics_endpoint" {
  value = module.analytics.endpoint_url
}`;

const terraformApply = `terraform init
terraform apply
# Outputs: analytics_endpoint = "https://xxxx.cloudfront.net/"`;

const dynamoDesign = `# Every event is written with three keys for three access patterns:
PK:     APP#<appId>#<date>      # All events for an app on a given day
GSI1PK: TYPE#<type>#<date>      # Events filtered by type on a given day
GSI2PK: PATH#<path>#<date>      # Events filtered by page path on a given day`;

const lambdaIngest = `// POST / - called on every pageview() and track()
{
  appId:     "my-portfolio",     // required
  type:      "page_view",        // required
  timestamp: "2026-04-16T...",   // required, ISO 8601
  path:      "/blog/...",
  referrer:  "",
  sessionId: "sess_abc123",
  visitorId: "vis_def456",
  timezone:  "Europe/London",
  locale:    "en-GB",
  params:    {}
}`;

const lambdaQuery = `# GET / - called by the dashboard
GET <endpoint>?appId=my-portfolio&from=2026-04-01&to=2026-04-16

# Optionally filter by event type
GET <endpoint>?appId=my-portfolio&from=2026-04-01&to=2026-04-16&type=page_view

# Returns
{ "events": [ ... ] }`;

const npmInstall = `npm install @quiet-ly/analytics`;

const coreUsage = `import { Analytics } from '@quiet-ly/analytics'

const analytics = new Analytics({
  endpoint: 'https://xxxx.cloudfront.net',
  appId: 'my-portfolio',
})

// Track a page view (defaults to window.location.pathname)
analytics.pageview()

// Track a custom event with optional properties
analytics.track('contact_submitted', { form: 'contact' })

// Associate a user ID with subsequent events
analytics.identify('user-123')

// Clear session on sign-out
analytics.reset()`;

const reactProvider = `import { AnalyticsProvider, useAnalytics, usePageTracking } from '@quiet-ly/analytics/react'

// Wrap your app once at the root
<AnalyticsProvider config={{ endpoint, appId }}>
  <App />
</AnalyticsProvider>

// Inside a router shell - automatically tracks every route change
function RouterShell() {
  usePageTracking()

  const { track } = useAnalytics()

  return (
    <button onClick={() => track('theme_changed', { theme: 'dark' })}>
      Toggle theme
    </button>
  )
}`;

const analyticsClass = `export class Analytics {
  constructor(config) {
    this.config = config
    this.queue  = new Queue()
  }

  pageview(path) {
    const resolvedPath = path ?? window.location.pathname
    this.send('page_view', resolvedPath, {})
  }

  track(event, properties = {}) {
    const path = window.location.pathname
    this.send(event, path, properties)
  }

  identify(userId) {
    this.userId = userId
  }

  reset() {
    this.userId = undefined
    clearSession()
  }

  send(type, path, params) {
    const payload = {
      appId:     this.config.appId,
      type,
      path,
      referrer:  document.referrer,
      sessionId: getSessionId(),
      visitorId: getVisitorId(),
      timestamp: new Date().toISOString(),
      timezone:  Intl.DateTimeFormat().resolvedOptions().timeZone,
      locale:    navigator.language,
      params,
    }

    this.queue.enqueue({ payload, endpoint: this.config.endpoint })
  }
}`;

const dashboardUsage = `import { AnalyticsDashboard } from '@quiet-ly/analytics/dashboard'

<AnalyticsDashboard
  endpoint="https://xxxx.cloudfront.net"
  appId="my-portfolio"
  dateRange={30}
/>`;

const analyticsDecisions = [
  {
    title: "Two repos, two responsibilities",
    body: (
      <>
        The Terraform module owns the AWS backend and{" "}
        <InlineHighlight>@quiet-ly/analytics</InlineHighlight> owns the browser
        experience. Keeping those separate means the infrastructure can be used
        by any frontend, and the SDK only needs an endpoint URL rather than
        knowledge of how the backend was provisioned.
      </>
    ),
  },
  {
    title: "CloudFront plus Function URL instead of API Gateway",
    body: `API Gateway added cost and configuration that this project did not
need. Lambda Function URLs cover the simple ingest/query surface, while
CloudFront adds HTTPS edge routing and the country header that makes lightweight
location enrichment possible.`,
  },
  {
    title: "DynamoDB keys follow the dashboard reads",
    body: `The table is shaped around the actual questions the dashboard asks:
events by app and date, by type and date, and by path and date. That made the
single-table design much easier to justify than starting from abstract
entities like events, sessions, and visitors.`,
  },
  {
    title: "Cookie-free identity",
    body: (
      <>
        I used <InlineHighlight>localStorage</InlineHighlight> for a stable
        visitor ID and <InlineHighlight>sessionStorage</InlineHighlight> for a
        tab-scoped session ID. It is deliberately less invasive than cookie or
        fingerprint-based analytics, which fits the goal of a small portfolio
        analytics stack.
      </>
    ),
  },
  {
    title: "Aggregation stays in the dashboard for v1",
    body: `The Lambda returns raw event lists and the dashboard performs the
summary calculations client-side. That keeps the backend simple and cheap, but
it also creates the main scaling limit of the first version.`,
  },
];

const analyticsChallenges = [
  {
    title: "The dashboard forced the data model",
    body: `Designing the table became much easier once I stopped thinking in
entities and started listing the dashboard queries. The access patterns came
first; the keys followed from them.`,
  },
  {
    title: "Location data without an IP database",
    body: `CloudFront's viewer country header solved the location problem
without adding MaxMind, a paid geolocation API, or storing raw IP addresses in
the event payload.`,
  },
  {
    title: "Session tracking without cookies",
    body: `Avoiding cookies meant the SDK needed its own lightweight visitor
and session helpers, plus behaviour for reset, tab boundaries, and repeated
page views.`,
  },
];

const PostContainer = styled(BasePostContainer)`
  animation: ${SlideInBottom} 0.5s forwards;
`;

const QuietlyAnalytics = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    Analytics.pageview("/blog/building-your-own-analytics");
    Analytics.track("blog_page_viewed", {
      slug: "building-your-own-analytics",
    });
  }, []);

  return (
    <PageWrapper>
      <PostTopBar>
        <BackButton to="/blog" />
      </PostTopBar>

      <PostContainer>
        <HeaderRow>
          <PageTitle>Building Your Own Analytics Stack</PageTitle>
          <IconWrapper>
            <HeaderIcon>
              <TerraformSVG />
            </HeaderIcon>
            <HeaderIcon>
              <AWSSVG />
            </HeaderIcon>
            <HeaderIcon>
              <AWSLambdaSVG />
            </HeaderIcon>
          </IconWrapper>
        </HeaderRow>

        <Paragraph>
          I was using Google Analytics on this portfolio and it bothered me more
          than it should have. Not for any deep privacy reason, not that I was
          sending every visitor's data to Google, just because it feels a little
          clunky and I could never find an implementation I was happy with. That
          lead me to asking my self the question - how hard is it to build my
          own? So I built <Strong>quiet-ly</Strong> instead: a self-hosted
          analytics stack that lives entirely in my own AWS account and costs
          nothing to run at portfolio traffic levels.
        </Paragraph>

        <Paragraph>
          It's split across two repos: a Terraform module that provisions the
          AWS backend, and an npm package that provides the browser SDK, React
          bindings, and a dashboard component. No cookies. No third-party
          requests on page load.
        </Paragraph>

        <ProjectArchitecture
          archOutline={architecture}
          summary="At a high level, quiet-ly is a small event pipeline: browser SDK to CloudFront, CloudFront to Lambda, Lambda to DynamoDB, and the dashboard reading the same endpoint back for reporting."
          type="flow"
        >
          <Paragraph>
            There are two repos and they map cleanly onto two concerns:
          </Paragraph>

          <TextList>
            <TextListItem>
              <TextLink href={terraformRepo} target="_blank" rel="noreferrer">
                terraform-aws-quiet-ly
              </TextLink>{" "}
              - the AWS infrastructure. One Terraform module that provisions
              everything the backend needs: CloudFront, Lambda, DynamoDB, IAM,
              and CloudWatch.
            </TextListItem>
            <TextListItem>
              <TextLink href={npmRepo} target="_blank" rel="noreferrer">
                @quiet-ly/analytics
              </TextLink>{" "}
              - the browser SDK. An npm package with three entry points: the
              core SDK, React bindings, and a ready-made dashboard component.
            </TextListItem>
          </TextList>

          <Paragraph>
            The two repos are intentionally decoupled. The Terraform module
            doesn't care what framework your frontend uses. The SDK doesn't know
            anything about how the backend is provisioned - it just sends a POST
            to a URL you give it.
          </Paragraph>
        </ProjectArchitecture>

        <SectionHeading>The Infrastructure</SectionHeading>

        <SubSectionHeading>What gets provisioned</SubSectionHeading>

        <Paragraph>
          Running <InlineHighlight>terraform apply</InlineHighlight> creates
          five things in your AWS account:
        </Paragraph>

        <TextList>
          <TextListItem>
            <Strong>CloudFront distribution</Strong> - the public HTTPS entry
            point. It handles HTTPS redirect, IPv6, and most importantly,
            injects a{" "}
            <InlineHighlight>CloudFront-Viewer-Country</InlineHighlight> header
            on every request so the Lambda can record visitor location without
            any IP lookup.
          </TextListItem>
          <TextListItem>
            <Strong>Lambda Function URL</Strong> - the actual handler. Sits
            behind CloudFront and deals with two operations: ingesting events
            (POST) and querying them back (GET). No API Gateway - Lambda
            Function URLs give you a free HTTPS endpoint with built-in CORS.
          </TextListItem>
          <TextListItem>
            <Strong>DynamoDB table</Strong> - single-table design with two
            Global Secondary Indexes. Pay-per-request billing means you pay
            nothing when traffic is zero.
          </TextListItem>
          <TextListItem>
            <Strong>IAM role</Strong> - scoped to the minimum:
            <InlineHighlight>dynamodb:PutItem</InlineHighlight> and{" "}
            <InlineHighlight>dynamodb:Query</InlineHighlight> on the events
            table only.
          </TextListItem>
          <TextListItem>
            <Strong>CloudWatch log group</Strong> - Lambda logs with
            configurable retention. Defaults to 30 days.
          </TextListItem>
        </TextList>

        <Banner title="Why no API Gateway?" variant="info">
          <Paragraph>
            My first draft used API Gateway and it added cost and configuration
            for literally nothing. Lambda Function URLs give you a free HTTPS
            endpoint with built-in CORS. The only reason to add CloudFront on
            top is the country header injection - if I didn't want location data
            I'd just expose the Function URL directly.
          </Paragraph>
        </Banner>

        <SubSectionHeading>Quick start</SubSectionHeading>

        <Paragraph>
          Point the module at your origin and run apply. You get back an
          endpoint URL to hand to the SDK.
        </Paragraph>

        <CodeBlockWithCopy code={terraformQuickStart} />
        <CodeBlockWithCopy code={terraformApply} />

        <SubSectionHeading>DynamoDB design</SubSectionHeading>

        <Paragraph>
          The table uses a single-table design with three access patterns built
          in. Every event is written once but can be queried three ways: by app
          + date, by event type + date, or by page path + date.
        </Paragraph>

        <CodeBlockWithCopy code={dynamoDesign} />

        <Paragraph>
          The partition key always includes the date so queries are bounded to
          one day at a time. The dashboard fans out a query-per-date for the
          selected date range and merges the results client-side.
        </Paragraph>

        <Banner title="Single-table design" variant="info">
          <Paragraph>
            I originally had separate tables for events, sessions, and visitors.
            Joining them for the dashboard meant multiple round trips and
            awkward client-side merging. Collapsing everything into one table
            with GSIs fixed that - one query per date gets everything the
            dashboard needs.
          </Paragraph>
        </Banner>

        <SubSectionHeading>The Lambda handler</SubSectionHeading>

        <Paragraph>
          The handler has one job per HTTP method. A POST writes an event to
          DynamoDB. A GET queries events back. OPTIONS returns CORS headers and
          exits immediately.
        </Paragraph>

        <Paragraph>
          The handler is written as a factory function (
          <InlineHighlight>createHandler</InlineHighlight>) that accepts an
          optional DynamoDB client and country lookup function. This makes it
          unit-testable without mocking modules.
        </Paragraph>

        <SubSectionHeading>Country enrichment</SubSectionHeading>

        <Paragraph>
          This was the thing I was most pleased to discover. CloudFront
          automatically injects a{" "}
          <InlineHighlight>CloudFront-Viewer-Country</InlineHighlight> header on
          every request - a two-letter ISO country code based on the origin IP.
          The Lambda just reads it. No MaxMind database, no geolocation API, no
          extra cost.
        </Paragraph>

        <Paragraph>
          If you skip CloudFront (
          <InlineHighlight>enable_cloudfront = false</InlineHighlight>), the
          header isn't there and <InlineHighlight>country</InlineHighlight>{" "}
          stores as an empty string. The dashboard falls back to timezone for
          location display in that case.
        </Paragraph>

        <SectionHeading>The NPM Package</SectionHeading>

        <SubSectionHeading>Installation</SubSectionHeading>

        <CodeBlockWithCopy code={npmInstall} />

        <Paragraph>
          The package has three entry points:{" "}
          <InlineHighlight>@quiet-ly/analytics</InlineHighlight> for the core
          SDK, <InlineHighlight>@quiet-ly/analytics/react</InlineHighlight> for
          the React provider and hooks, and{" "}
          <InlineHighlight>@quiet-ly/analytics/dashboard</InlineHighlight> for
          the pre-built dashboard component.
        </Paragraph>

        <SubSectionHeading>Core SDK</SubSectionHeading>

        <Paragraph>
          The <InlineHighlight>Analytics</InlineHighlight> class is the main
          entry point. You initialise it once with your endpoint and app ID,
          then call methods on it wherever you need to track something.
        </Paragraph>

        <CodeBlockWithCopy code={coreUsage} />

        <Paragraph>
          Every call to <InlineHighlight>pageview()</InlineHighlight> or{" "}
          <InlineHighlight>track()</InlineHighlight> constructs a payload and
          hands it to an internal queue. The queue batches and retries sends so
          a slow network doesn't block the user's UI.
        </Paragraph>

        <CodeBlockWithCopy code={analyticsClass} />

        <Banner title="Visitor and session IDs without cookies" variant="info">
          <Paragraph>
            I didn't want to set cookies just to track sessions - that triggers
            consent banners and I wanted to avoid the whole thing. The SDK uses{" "}
            <InlineHighlight>localStorage</InlineHighlight> for a stable visitor
            ID and <InlineHighlight>sessionStorage</InlineHighlight> for a
            session ID that resets when the tab closes. It's not perfect
            fingerprinting but it's good enough for a portfolio dashboard, and
            it requires no consent prompt.
          </Paragraph>
        </Banner>

        <SubSectionHeading>React integration</SubSectionHeading>

        <Paragraph>
          The React entry point exports three things: an{" "}
          <InlineHighlight>AnalyticsProvider</InlineHighlight> that initialises
          the SDK once at the root, a{" "}
          <InlineHighlight>usePageTracking</InlineHighlight> hook that fires a
          pageview on every route change, and a{" "}
          <InlineHighlight>useAnalytics</InlineHighlight> hook that gives any
          component access to the SDK instance.
        </Paragraph>

        <CodeBlockWithCopy code={reactProvider} />

        <Paragraph>
          This portfolio uses the SDK slightly differently - it calls{" "}
          <InlineHighlight>Analytics.pageview()</InlineHighlight> and{" "}
          <InlineHighlight>Analytics.track()</InlineHighlight> directly in each
          blog post component so every post can attach a{" "}
          <InlineHighlight>slug</InlineHighlight> property to the event. That
          means the dashboard can break down views per post rather than just per
          path.
        </Paragraph>

        <SubSectionHeading>Dashboard component</SubSectionHeading>

        <Paragraph>
          The dashboard entry point exports a single{" "}
          <InlineHighlight>AnalyticsDashboard</InlineHighlight> component. Drop
          it in anywhere, point it at your endpoint and app ID, and it handles
          the rest.
        </Paragraph>

        <CodeBlockWithCopy code={dashboardUsage} />

        <Paragraph>The dashboard includes:</Paragraph>

        <TextList>
          <TextListItem>
            Page view and unique visitor summary cards
          </TextListItem>
          <TextListItem>Page view trend chart</TextListItem>
          <TextListItem>Top pages, referrers, and locations</TextListItem>
          <TextListItem>
            Recent events table with visitor-level filtering
          </TextListItem>
          <TextListItem>Preset and custom date range selectors</TextListItem>
        </TextList>

        <Carousel
          items={[
            {
              title: "Dashboard overview",
              description:
                "Summary cards for page views and unique visitors, a trend chart, and breakdowns by top pages, referrers, and locations.",
              src: dashboardPng,
            },
            {
              title: "Recent events",
              description:
                "The recent events table lets you filter down to a single visitor to see their full session path.",
              src: dashboardTwoPng,
            },
          ]}
        />

        <Paragraph>
          If the defaults don't fit your layout, the individual building blocks
          are also exported so you can compose your own dashboard from the same
          primitives.
        </Paragraph>

        <SectionHeading>How It All Fits Together</SectionHeading>

        <Paragraph>
          Walking through a single page view end to end helps make the moving
          parts concrete.
        </Paragraph>

        <TertiaryHeading>Step 1: The browser sends an event</TertiaryHeading>

        <Paragraph>
          When a user navigates to a page, the SDK constructs a payload from
          browser APIs - the current path, the referrer, the user's timezone and
          locale, and the session and visitor IDs - then POSTs it to your
          CloudFront endpoint.
        </Paragraph>

        <CodeBlockWithCopy code={lambdaIngest} />

        <TertiaryHeading>
          Step 2: CloudFront enriches the request
        </TertiaryHeading>

        <Paragraph>
          Before the request reaches Lambda, CloudFront injects{" "}
          <InlineHighlight>CloudFront-Viewer-Country</InlineHighlight> based on
          the request's origin IP. This is free and happens at the CDN layer -
          the Lambda doesn't need to do any geolocation work.
        </Paragraph>

        <TertiaryHeading>Step 3: Lambda writes to DynamoDB</TertiaryHeading>

        <Paragraph>
          The handler validates the three required fields (
          <InlineHighlight>appId</InlineHighlight>,{" "}
          <InlineHighlight>type</InlineHighlight>,{" "}
          <InlineHighlight>timestamp</InlineHighlight>), reads the country
          header, generates a unique event ID, and writes one item to DynamoDB
          with all three key patterns set.
        </Paragraph>

        <TertiaryHeading>Step 4: The dashboard queries it back</TertiaryHeading>

        <Paragraph>
          When the dashboard loads, it fires GET requests for each date in the
          selected range. The Lambda queries DynamoDB using the app + date
          partition key and returns the raw event list. The dashboard component
          handles all the aggregation and display logic client-side.
        </Paragraph>

        <CodeBlockWithCopy code={lambdaQuery} />

        <Banner title="Query endpoint is opt-out" variant="info">
          <Paragraph>
            The GET endpoint is enabled by default but can be disabled with{" "}
            <InlineHighlight>enable_query_endpoint = false</InlineHighlight> in
            the Terraform module. Useful if you only want ingest and plan to
            query DynamoDB directly.
          </Paragraph>
        </Banner>

        <EngineeringDecisions decisions={analyticsDecisions} />

        <ProjectChallenges challenges={analyticsChallenges} />

        <ProjectCritique>
          <Paragraph>
            The weakest part of v1 is the dashboard query approach. Fanning out
            one DynamoDB query per day works fine for 30 days but starts to feel
            clunky at longer ranges. A proper time-series index or aggregation
            layer would fix that, but it would also make the Lambda considerably
            more complicated for a portfolio project.
          </Paragraph>

          <Paragraph>
            The read endpoint is also intentionally simple. That is fine for a
            personal analytics stack where the endpoint is scoped to one app,
            but a shared or commercial version would need a stronger admin read
            boundary than "know the app ID and hit the query endpoint".
          </Paragraph>
        </ProjectCritique>

        <ProjectNextSteps>
          <Paragraph>
            The next version I would build would keep the lightweight ingest
            path, but add a better reporting layer for longer date ranges and
            more deliberate control over who can read analytics data.
          </Paragraph>

          <TextList>
            <TextListItem>
              <Strong>Daily rollups</Strong> - store pre-aggregated page view,
              visitor, referrer, and country summaries instead of calculating
              everything from raw events every time.
            </TextListItem>
            <TextListItem>
              <Strong>Signed dashboard reads</Strong> - keep public ingest
              simple while making admin reporting less dependent on obscurity.
            </TextListItem>
            <TextListItem>
              <Strong>Retention controls</Strong> - expose clearer defaults for
              raw event expiry and long-term summary storage.
            </TextListItem>
          </TextList>
        </ProjectNextSteps>

        <SectionHeading>Wrapping Up</SectionHeading>

        <Paragraph>
          Building this taught me more about DynamoDB access patterns than any
          tutorial I've read. There's something about designing for your own
          real data - knowing exactly what queries the dashboard needs - that
          makes the single-table tradeoffs click in a way they don't when you're
          following a contrived example.
        </Paragraph>

        <Paragraph>
          Both repos are open source if you want to use the stack or dig into
          the implementation.
        </Paragraph>

        <TextList>
          <TextListItem>
            <TextLink href={terraformRepo} target="_blank" rel="noreferrer">
              github.com/heyitsmeharv/terraform-aws-quiet-ly
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href={npmRepo} target="_blank" rel="noreferrer">
              github.com/heyitsmeharv/quiet-ly-npm
            </TextLink>
          </TextListItem>
        </TextList>
      </PostContainer>
    </PageWrapper>
  );
};

export default QuietlyAnalytics;
