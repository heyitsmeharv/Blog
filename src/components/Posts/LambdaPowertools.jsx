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

// layout
import {
  PageWrapper,
  PostTopBar,
  PostContainer as BasePostContainer,
  HeaderRow,
  IconWrapper,
  HeaderIcon,
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
  InlineHighlight,
} from "../Typography/Typography";

// icons
import {
  AWSSVG,
  AWSLambdaSVG,
  TypeScriptSVG,
} from "../../resources/styles/icons";

const installSnippet = `npm install @aws-lambda-powertools/logger \\
            @aws-lambda-powertools/tracer \\
            @aws-lambda-powertools/metrics \\
            @middy/core`;

const loggerInit = `import { Logger } from '@aws-lambda-powertools/logger';

const logger = new Logger({
  serviceName: 'order-service',
  logLevel: 'INFO',
  persistentLogAttributes: {
    environment: process.env.ENVIRONMENT ?? 'dev',
    version: process.env.AWS_LAMBDA_FUNCTION_VERSION,
  },
});`;

const logLevels = `logger.debug('Checking cache before hitting DynamoDB'); // dev only
logger.info('Order received', { orderId });             // normal flow
logger.warn('Retry attempt 2 of 3', { attempt: 2 });   // worth noting
logger.error('Payment gateway timed out', { error });   // something broke`;

const appendKeys = `// adds orderId to every log line for the rest of this invocation
logger.appendKeys({ orderId: event.pathParameters?.id });

logger.info('Validating order');   // { ..., orderId: "abc" }
logger.info('Charging card');      // { ..., orderId: "abc" }
logger.info('Sending receipt');    // { ..., orderId: "abc" }`;

const logOutput = `{
  "level": "INFO",
  "message": "Order received",
  "service": "order-service",
  "cold_start": true,
  "function_arn": "arn:aws:lambda:eu-west-1:123456789:function:order-service",
  "function_memory_size": "256",
  "function_request_id": "c7a8f1b2-4e3d-11ec-81d3-0242ac130003",
  "environment": "production",
  "version": "42",
  "orderId": "order-456",
  "timestamp": "2026-04-28T12:00:00.000Z",
  "xray_trace_id": "1-5759e988-bd862e3fe1be46a994272793"
}`;

const tracerInit = `import { Tracer } from '@aws-lambda-powertools/tracer';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

const tracer = new Tracer({ serviceName: 'order-service' });

// Wrap any AWS SDK client so every call appears as a subsegment in X-Ray
const ddb = tracer.captureAWSv3Client(new DynamoDBClient({}));`;

const tracerCapture = `// Wrap any async function in its own named subsegment
const fetchOrder = tracer.captureAsyncFunction(
  'fetchOrder',
  async (orderId: string) => {
    return ddb.send(new GetItemCommand({ ... }));
  }
);

// In the handler:
const order = await fetchOrder(orderId);`;

const tracerAnnotation = `// Annotations are indexed - you can filter traces by them in the X-Ray console
tracer.putAnnotation('orderId', orderId);
tracer.putAnnotation('customerId', order.customerId);

// Metadata is attached to the trace but NOT searchable.
// Good for payloads you want when debugging a specific trace.
tracer.putMetadata('orderPayload', event.body);
tracer.putMetadata('ddbResponse', rawItem);`;

const metricsInit = `import { Metrics, MetricUnit } from '@aws-lambda-powertools/metrics';

const metrics = new Metrics({
  namespace: 'OrderService',   // the CloudWatch namespace
  serviceName: 'order-service',
  defaultDimensions: {
    environment: process.env.ENVIRONMENT ?? 'dev',
  },
});`;

const metricsUsage = `// Count-based metrics
metrics.addMetric('OrderReceived', MetricUnit.Count, 1);
metrics.addMetric('OrderFailed', MetricUnit.Count, 1);

// Duration / size metrics
metrics.addMetric('ProcessingTimeMs', MetricUnit.Milliseconds, duration);
metrics.addMetric('PayloadSizeBytes', MetricUnit.Bytes, payloadSize);

// Business metrics (use None for custom units like currency amounts)
metrics.addMetric('OrderValueGBP', MetricUnit.None, orderTotal);`;

const emfOutput = `// What Powertools writes to stdout when metrics are flushed:
{
  "_aws": {
    "Timestamp": 1714305600000,
    "CloudWatchMetrics": [
      {
        "Namespace": "OrderService",
        "Dimensions": [["service", "environment"]],
        "Metrics": [
          { "Name": "OrderReceived", "Unit": "Count" },
          { "Name": "ProcessingTimeMs", "Unit": "Milliseconds" }
        ]
      }
    ]
  },
  "service": "order-service",
  "environment": "production",
  "OrderReceived": 1,
  "ProcessingTimeMs": 142
}`;

const paramsSnippet = `import { SSMProvider } from '@aws-lambda-powertools/parameters/ssm';
import { SecretsProvider } from '@aws-lambda-powertools/parameters/secrets';

const ssm = new SSMProvider();
const secrets = new SecretsProvider();

// Fetches from SSM Parameter Store, cached for 5 seconds by default
const dbHost = await ssm.get('/prod/db/host');

// Decrypt a SecureString parameter
const dbPassword = await ssm.get('/prod/db/password', { decrypt: true });

// Fetch and parse a JSON secret from Secrets Manager
const apiKeys = await secrets.get<{ key: string }>('prod/api-keys', {
  transform: 'json',
});`;

const idempotencySnippet = `import { makeIdempotent } from '@aws-lambda-powertools/idempotency';
import { DynamoDBPersistenceLayer } from '@aws-lambda-powertools/idempotency/dynamodb';

const persistence = new DynamoDBPersistenceLayer({ tableName: 'IdempotencyTable' });

// If the same event arrives twice (e.g. Lambda retry), the second call
// returns the cached response without running the handler again.
export const handler = makeIdempotent(lambdaHandler, {
  persistenceStore: persistence,
});`;

const middyBasic = `import middy from '@middy/core';

// 1. Write your handler as a plain async function
const lambdaHandler = async (event: APIGatewayProxyEvent) => {
  return { statusCode: 200, body: 'ok' };
};

// 2. Wrap it with middy and attach middleware
export const handler = middy(lambdaHandler)
  .use(middlewareA())
  .use(middlewareB())
  .use(middlewareC());`;

const middyOrder = `// Middleware added in order A → B → C

// BEFORE chain runs top-to-bottom:
// A.before → B.before → C.before → [handler runs] → C.after → B.after → A.after

// ON ERROR chain runs top-to-bottom:
// A.onError → B.onError → C.onError

// Practical consequence: put injectLambdaContext FIRST so the logger
// has context before any other middleware logs anything.`;

const middyCustom = `import type { MiddlewareObj } from '@middy/core';
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

const requestTimer = (): MiddlewareObj<APIGatewayProxyEvent, APIGatewayProxyResult> => {
  let start: number;

  return {
    before: async () => {
      start = Date.now();
    },
    after: async () => {
      metrics.addMetric('RequestDurationMs', MetricUnit.Milliseconds, Date.now() - start);
    },
    onError: async (request) => {
      metrics.addMetric('RequestDurationMs', MetricUnit.Milliseconds, Date.now() - start);
      throw request.error; // re-throw so the error still propagates
    },
  };
};`;

const middyEcosystem = `// Parse and validate a JSON body automatically
import httpJsonBodyParser from '@middy/http-json-body-parser';

// Turn uncaught errors into consistent JSON error responses
import httpErrorHandler from '@middy/http-error-handler';

// Fetch SSM params and inject them before the handler runs
import ssm from '@middy/ssm';

export const handler = middy(lambdaHandler)
  .use(injectLambdaContext(logger, { clearState: true }))
  .use(httpJsonBodyParser())
  .use(ssm({ fetchData: { dbPassword: '/prod/db/password' } }))
  .use(httpErrorHandler())
  .use(logMetrics(metrics));`;

const wiredHandler = `import { injectLambdaContext } from '@aws-lambda-powertools/logger/middleware';
import { captureLambdaHandler } from '@aws-lambda-powertools/tracer/middleware';
import { logMetrics } from '@aws-lambda-powertools/metrics/middleware';
import middy from '@middy/core';
import type { APIGatewayProxyEvent } from 'aws-lambda';

// ---- instantiate outside the handler (shared across warm invocations) ----

const logger = new Logger({ serviceName: 'order-service' });
const tracer = new Tracer({ serviceName: 'order-service' });
const metrics = new Metrics({ namespace: 'OrderService', serviceName: 'order-service' });
const ddb = tracer.captureAWSv3Client(new DynamoDBClient({}));

// ---- the handler contains only business logic ----

const lambdaHandler = async (event: APIGatewayProxyEvent) => {
  const orderId = event.pathParameters?.id;
  logger.appendKeys({ orderId });
  tracer.putAnnotation('orderId', orderId);

  logger.info('Processing order');
  metrics.addMetric('OrderReceived', MetricUnit.Count, 1);

  const order = await ddb.send(new GetItemCommand({ ... }));

  metrics.addMetric('OrderValueGBP', MetricUnit.None, order.total);
  logger.info('Order processed successfully');

  return { statusCode: 200, body: JSON.stringify(order) };
};

// ---- middleware chain handles all the cross-cutting concerns ----

export const handler = middy(lambdaHandler)
  .use(injectLambdaContext(logger, { clearState: true }))
  .use(captureLambdaHandler(tracer, { captureResponse: false }))
  .use(logMetrics(metrics, { captureColdStartMetric: true }));`;

const clearStateGotcha = `// WITHOUT clearState: true
// Warm invocation 1:
logger.appendKeys({ orderId: 'order-111' });
// Warm invocation 2 (same container, no clearState):
logger.info('New order'); // ← still logs orderId: 'order-111' from last time!

// WITH clearState: true (via injectLambdaContext)
// The middleware clears appendKeys state after each invocation.
// Warm invocation 2:
logger.info('New order'); // ← clean, no stale keys`;

const PostContainer = styled(BasePostContainer)`
  animation: ${SlideInBottom} 0.5s forwards;
`;

const LambdaPowertools = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    Analytics.pageview("/blog/lambda-powertools");
    Analytics.track("blog_page_viewed", { slug: "lambda-powertools" });
  }, []);

  return (
    <PageWrapper>
      <PostTopBar>
        <BackButton to="/blog" />
      </PostTopBar>

      <PostContainer>
        <HeaderRow>
          <PageTitle>Lambda Powertools & Middy</PageTitle>
          <IconWrapper>
            <HeaderIcon>
              <AWSSVG />
            </HeaderIcon>
            <HeaderIcon>
              <AWSLambdaSVG />
            </HeaderIcon>
            <HeaderIcon>
              <TypeScriptSVG />
            </HeaderIcon>
          </IconWrapper>
        </HeaderRow>

        <Paragraph>
          Lambda functions are easy to get wrong in production. Without a
          consistent approach to logging, tracing, and metrics, you end up with
          a dozen functions all handling observability differently - some
          logging plain strings, some not capturing cold starts, none emitting
          structured metrics you can actually query. Every function becomes its
          own slightly different snowflake.{" "}
          <TextLink
            href="https://docs.aws.amazon.com/powertools/typescript/latest/"
            target="_blank"
            rel="noreferrer"
          >
            AWS Lambda Powertools for TypeScript
          </TextLink>{" "}
          is an open-source library maintained by AWS that gives you a
          production-ready observability baseline. Paired with{" "}
          <TextLink
            href="https://middy.js.org/"
            target="_blank"
            rel="noreferrer"
          >
            Middy
          </TextLink>
          , a middleware engine for Lambda, the setup becomes clean enough that
          your handler functions contain only business logic. This post walks
          through both in detail.
        </Paragraph>

        <SectionHeading>The Observability Problem in Lambda</SectionHeading>

        <Paragraph>
          Before diving into Powertools, it's worth understanding why
          observability is trickier in Lambda than in a traditional server.
          Lambda functions are short-lived, stateless, and run in isolated
          execution environments. A single function might have hundreds of
          concurrent instances running at any given moment, each independently
          handling a request. When something goes wrong, you need to be able to
          answer questions like: which invocation failed, what was the request
          ID, was it a cold start, how long did the downstream call take, and
          how many times has this error happened in the last five minutes?
        </Paragraph>

        <Paragraph>
          Without structure, answering those questions means trawling through
          walls of unformatted log strings and guessing which metric to look at.
          The three pillars of observability each solve one of these problems:
        </Paragraph>

        <TextList>
          <TextListItem>
            <Strong>Logs</Strong> tell you what happened in a specific
            invocation. Structured JSON logs let you query them.
          </TextListItem>
          <TextListItem>
            <Strong>Traces</Strong> show you the full path of a request across
            services - Lambda, DynamoDB, an external API - and how long each
            step took.
          </TextListItem>
          <TextListItem>
            <Strong>Metrics</Strong> give you aggregate data over time - error
            rates, invocation counts, p99 duration - that you can alarm on
            before a customer notices something is wrong.
          </TextListItem>
        </TextList>

        <Paragraph>
          Powertools provides a utility for each one. They're independent, so
          you can adopt them incrementally, but they work best together.
        </Paragraph>

        <SectionHeading>Logger</SectionHeading>

        <SubSectionHeading>Why structured logging matters</SubSectionHeading>

        <Paragraph>
          A plain{" "}
          <InlineHighlight>console.log('Order processed')</InlineHighlight>{" "}
          produces an unstructured string. That's fine when you're reading logs
          manually in development, but in production you're querying across
          thousands of log lines from dozens of concurrent invocations. You need
          to be able to ask CloudWatch Logs Insights: "show me all log lines
          from cold start invocations in the last hour where the order value was
          above £500". That query requires the data to be in a consistent,
          machine-readable format - which is what structured JSON logging gives
          you.
        </Paragraph>

        <SubSectionHeading>Initialisation</SubSectionHeading>

        <Paragraph>
          You initialise the Logger once, outside the handler, with a service
          name and optional configuration:
        </Paragraph>

        <CodeBlockWithCopy code={loggerInit} />

        <Paragraph>
          <InlineHighlight>persistentLogAttributes</InlineHighlight> are fields
          that appear on every log line for the entire lifetime of the Lambda
          execution environment - including across warm invocations. Use them
          for things that never change per-invocation: the deployed environment,
          the function version, a feature flag value read at startup. Don't put
          request-specific data here; use{" "}
          <InlineHighlight>appendKeys</InlineHighlight> for that instead.
        </Paragraph>

        <SubSectionHeading>Log levels</SubSectionHeading>

        <Paragraph>
          The Logger exposes four log levels. The configured{" "}
          <InlineHighlight>logLevel</InlineHighlight> acts as a threshold - any
          log below that level is silently dropped. Set it to{" "}
          <InlineHighlight>DEBUG</InlineHighlight> locally and{" "}
          <InlineHighlight>INFO</InlineHighlight> (or higher) in production to
          avoid flooding CloudWatch with noise.
        </Paragraph>

        <CodeBlockWithCopy code={logLevels} />

        <SubSectionHeading>appendKeys</SubSectionHeading>

        <Paragraph>
          <InlineHighlight>appendKeys</InlineHighlight> adds fields to every
          subsequent log line within the current invocation. This is how you
          attach a request ID or order ID once at the top of the handler and
          have it appear automatically on all subsequent log entries, without
          passing it around manually:
        </Paragraph>

        <CodeBlockWithCopy code={appendKeys} />

        <SubSectionHeading>What a log line looks like</SubSectionHeading>

        <Paragraph>
          With the logger wired up via Middy (covered later), every log line
          gets the Lambda context injected automatically. A fully-populated log
          entry looks like:
        </Paragraph>

        <CodeBlockWithCopy code={logOutput} />

        <Paragraph>
          Notice <InlineHighlight>cold_start</InlineHighlight>,{" "}
          <InlineHighlight>function_arn</InlineHighlight>,{" "}
          <InlineHighlight>function_request_id</InlineHighlight>, and{" "}
          <InlineHighlight>xray_trace_id</InlineHighlight> - these are all
          injected automatically when the Middy middleware runs. You get
          cross-referencing between logs and traces for free, which means you
          can go from a log line to the corresponding X-Ray trace in one click
          in the AWS console.
        </Paragraph>

        <SectionHeading>Tracer</SectionHeading>

        <SubSectionHeading>X-Ray primer</SubSectionHeading>

        <Paragraph>
          AWS X-Ray is a distributed tracing service. It records the path of a
          request as it moves through your system - from the API Gateway to
          Lambda to DynamoDB to an external HTTP call - and visualises it as a
          trace timeline you can inspect in the console. Each step in the
          timeline is a <Strong>segment</Strong> (one service) made up of{" "}
          <Strong>subsegments</Strong> (operations within that service). When
          you look at a trace in X-Ray you can see at a glance exactly where
          time was spent and where errors occurred.
        </Paragraph>

        <Paragraph>
          Lambda automatically creates a segment for the function invocation.
          What Powertools adds is the ability to create subsegments within that
          - so you can see not just "Lambda took 300ms" but "DynamoDB GetItem
          took 12ms, the payment API took 280ms, and the receipt email took
          8ms".
        </Paragraph>

        <SubSectionHeading>Instrumenting AWS SDK clients</SubSectionHeading>

        <Paragraph>
          To get subsegments for AWS SDK calls, wrap any client with{" "}
          <InlineHighlight>tracer.captureAWSv3Client()</InlineHighlight>. This
          patches the client so every operation it performs automatically
          appears in the X-Ray trace:
        </Paragraph>

        <CodeBlockWithCopy code={tracerInit} />

        <Paragraph>
          Wrap the client at initialisation time (outside the handler), not
          inside it. Wrapping it inside the handler would create a new patched
          client on every invocation, which is wasteful.
        </Paragraph>

        <SubSectionHeading>Capturing your own functions</SubSectionHeading>

        <Paragraph>
          For your own async functions - calling a third-party API, running a
          complex calculation - you can wrap them to create named subsegments:
        </Paragraph>

        <CodeBlockWithCopy code={tracerCapture} />

        <Paragraph>
          This gives you visibility into how long your own code takes, not just
          the AWS SDK calls.
        </Paragraph>

        <SubSectionHeading>Annotations vs Metadata</SubSectionHeading>

        <Paragraph>
          Tracer lets you attach two kinds of extra data to a trace:
        </Paragraph>

        <CodeBlockWithCopy code={tracerAnnotation} />

        <TextList>
          <TextListItem>
            <Strong>Annotations</Strong> are indexed by X-Ray and searchable.
            You can filter the X-Ray console to show only traces where{" "}
            <InlineHighlight>orderId = "order-456"</InlineHighlight>. Keep them
            short and high-cardinality: order IDs, customer IDs, status codes.
          </TextListItem>
          <TextListItem>
            <Strong>Metadata</Strong> is attached to the trace but not indexed -
            you can see it when you open a specific trace, but you can't search
            across traces using it. Good for full payloads, raw DynamoDB
            responses, or anything verbose that you want for debugging a
            specific incident but wouldn't query in bulk.
          </TextListItem>
        </TextList>

        <SectionHeading>Metrics</SectionHeading>

        <SubSectionHeading>What EMF is and why it matters</SubSectionHeading>

        <Paragraph>
          The traditional way to emit a CloudWatch metric is to call the
          CloudWatch SDK:{" "}
          <InlineHighlight>cloudwatch.putMetricData(...)</InlineHighlight>. The
          problem is that every <InlineHighlight>putMetricData</InlineHighlight>{" "}
          call is an API request: it adds latency to your Lambda function, it
          costs money per request, and it fails if the CloudWatch endpoint is
          temporarily unavailable.
        </Paragraph>

        <Paragraph>
          <Strong>Embedded Metrics Format</Strong> (EMF) takes a different
          approach. Instead of calling the CloudWatch API, you write a
          specially-structured JSON object to stdout. CloudWatch Logs
          automatically detects the EMF schema in your log output and converts
          it into real metric data - no API call, no extra latency, no separate
          cost per metric. You get the same queryable, alarmable CloudWatch
          metrics, delivered through the log stream that Lambda already writes
          to.
        </Paragraph>

        <SubSectionHeading>Namespaces and dimensions</SubSectionHeading>

        <Paragraph>
          CloudWatch organises metrics into <Strong>namespaces</Strong> (a
          logical grouping, like a service name) and <Strong>dimensions</Strong>{" "}
          (key-value pairs that let you slice the data, like environment or
          region). You define these once at initialisation:
        </Paragraph>

        <CodeBlockWithCopy code={metricsInit} />

        <Paragraph>
          Every metric you record within this instance will be filed under the{" "}
          <InlineHighlight>OrderService</InlineHighlight> namespace and tagged
          with the <InlineHighlight>environment</InlineHighlight> dimension. You
          can then filter CloudWatch graphs by environment - production vs
          staging - without creating separate metric names.
        </Paragraph>

        <SubSectionHeading>Recording metrics</SubSectionHeading>

        <Paragraph>
          Call <InlineHighlight>addMetric</InlineHighlight> anywhere inside the
          handler. The second argument is the unit - CloudWatch needs this to
          understand how to aggregate the values:
        </Paragraph>

        <CodeBlockWithCopy code={metricsUsage} />

        <SubSectionHeading>What gets written to stdout</SubSectionHeading>

        <Paragraph>
          When the Middy middleware flushes the metrics buffer at the end of the
          invocation, it writes a JSON object like this to stdout:
        </Paragraph>

        <CodeBlockWithCopy code={emfOutput} />

        <Paragraph>
          CloudWatch Logs picks up the <InlineHighlight>_aws</InlineHighlight>{" "}
          key, recognises the EMF schema, and converts the metric values into
          CloudWatch data points. The rest of the object becomes a regular log
          line. This means you get both a structured log record and proper
          metric data from a single stdout write.
        </Paragraph>

        <Banner title="Metrics must be flushed" variant="warning">
          <Paragraph>
            EMF metrics are buffered in memory during the invocation. They only
            become CloudWatch data points when the buffer is written to stdout
            at the end of execution. If you call{" "}
            <InlineHighlight>addMetric</InlineHighlight> but never flush, the
            metrics for that invocation are silently dropped - no error, no
            warning. The Middy <InlineHighlight>logMetrics</InlineHighlight>{" "}
            middleware handles the flush automatically, including on error
            paths. If you're not using Middy, you must call{" "}
            <InlineHighlight>metrics.publishStoredMetrics()</InlineHighlight>{" "}
            manually at the end of every code path.
          </Paragraph>
        </Banner>

        <SectionHeading>Beyond the Core Three</SectionHeading>

        <Paragraph>
          Powertools ships more than just Logger, Tracer, and Metrics. Two
          others are worth knowing about even if you don't reach for them
          immediately.
        </Paragraph>

        <SubSectionHeading>Parameters</SubSectionHeading>

        <Paragraph>
          The Parameters utility provides a unified interface for fetching
          configuration from SSM Parameter Store and Secrets Manager, with
          built-in caching. Without it, fetching a parameter on every invocation
          means an SSM API call on every invocation - which adds latency and
          costs money. The Parameters utility caches results in memory for a
          configurable TTL (five seconds by default), so repeated calls within
          the same execution environment hit the cache, not the API.
        </Paragraph>

        <CodeBlockWithCopy code={paramsSnippet} />

        <SubSectionHeading>Idempotency</SubSectionHeading>

        <Paragraph>
          Lambda retries failed invocations automatically in some trigger
          configurations (SQS, SNS, EventBridge). If your handler processes a
          payment or sends an email, a retry can cause double-charges or
          duplicate messages. The Idempotency utility wraps your handler and
          uses a DynamoDB table to track which events have already been
          processed. If the same event arrives again, it returns the cached
          response without running the handler a second time.
        </Paragraph>

        <CodeBlockWithCopy code={idempotencySnippet} />

        <SectionHeading>What is Middy?</SectionHeading>

        <SubSectionHeading>The problem it solves</SubSectionHeading>

        <Paragraph>
          A typical Lambda handler without any structure starts clean but
          accumulates boilerplate quickly. You need to inject the Lambda context
          into the logger before any logging happens. You need to flush metrics
          after the handler returns, but also if it throws. You might need to
          parse the JSON body from the event before you can use it. You might
          want a try/catch around the whole thing to return consistent error
          responses. None of this is business logic, but it ends up inside the
          handler anyway, and it gets copy-pasted into every function.
        </Paragraph>

        <Paragraph>
          Middy solves this with the <Strong>middleware pattern</Strong>. You
          write your handler as a plain async function containing only business
          logic, then attach middleware that runs around it:
        </Paragraph>

        <CodeBlockWithCopy code={middyBasic} />

        <SubSectionHeading>How the middleware chain executes</SubSectionHeading>

        <Paragraph>
          Each middleware can define up to three hooks:{" "}
          <InlineHighlight>before</InlineHighlight>,{" "}
          <InlineHighlight>after</InlineHighlight>, and{" "}
          <InlineHighlight>onError</InlineHighlight>. The execution order
          matters and trips people up the first time:
        </Paragraph>

        <CodeBlockWithCopy code={middyOrder} />

        <Paragraph>
          The <InlineHighlight>before</InlineHighlight> hooks run in the order
          you added the middleware. The <InlineHighlight>after</InlineHighlight>{" "}
          hooks run in <Strong>reverse</Strong> order - last in, first out. This
          mirrors how call stacks work and means each middleware can "wrap" the
          handler: the outer middleware runs first on the way in and last on the
          way out. The practical implication is that you should add{" "}
          <InlineHighlight>injectLambdaContext</InlineHighlight> first, so the
          logger has Lambda context before any other middleware logs anything.
        </Paragraph>

        <SubSectionHeading>Writing your own middleware</SubSectionHeading>

        <Paragraph>
          A middleware is just an object with optional{" "}
          <InlineHighlight>before</InlineHighlight>,{" "}
          <InlineHighlight>after</InlineHighlight>, and{" "}
          <InlineHighlight>onError</InlineHighlight> functions. Here's a simple
          timing middleware that records how long the handler takes as a
          Powertools metric:
        </Paragraph>

        <CodeBlockWithCopy code={middyCustom} />

        <Paragraph>
          The important detail in the <InlineHighlight>onError</InlineHighlight>{" "}
          hook is the <InlineHighlight>throw request.error</InlineHighlight> at
          the end. If an <InlineHighlight>onError</InlineHighlight> hook doesn't
          re-throw, Middy treats the error as handled and the remaining{" "}
          <InlineHighlight>onError</InlineHighlight> hooks in the chain won't
          run. Always re-throw unless you deliberately want to swallow the error
          and return a response.
        </Paragraph>

        <SubSectionHeading>The Middy ecosystem</SubSectionHeading>

        <Paragraph>
          Middy ships a set of official middleware packages for common Lambda
          patterns. You can mix them freely with the Powertools middleware:
        </Paragraph>

        <CodeBlockWithCopy code={middyEcosystem} />

        <SectionHeading>Why They Pair</SectionHeading>

        <Paragraph>
          Powertools ships official Middy middleware for each of its three core
          utilities. This is why the two libraries are almost always used
          together - Middy is the mechanism that makes Powertools
          zero-boilerplate in practice. Without Middy, you'd need to manually
          call <InlineHighlight>logger.addContext(context)</InlineHighlight> at
          the top of every handler, wrap the entire handler in a tracer
          subsegment, and call{" "}
          <InlineHighlight>metrics.publishStoredMetrics()</InlineHighlight> at
          the end of every code path including error paths.
        </Paragraph>

        <TextList>
          <TextListItem>
            <InlineHighlight>injectLambdaContext(logger)</InlineHighlight> -
            runs in the <Strong>before</Strong> hook. Injects the Lambda context
            (request ID, function ARN, cold start flag) into the logger so every
            subsequent log line carries it automatically.
          </TextListItem>
          <TextListItem>
            <InlineHighlight>captureLambdaHandler(tracer)</InlineHighlight> -
            wraps the entire handler in an X-Ray subsegment. Captures the
            response as metadata (disable with{" "}
            <InlineHighlight>captureResponse: false</InlineHighlight> for large
            or sensitive payloads). Closes the segment cleanly on both success
            and error paths.
          </TextListItem>
          <TextListItem>
            <InlineHighlight>logMetrics(metrics)</InlineHighlight> - flushes the
            metrics buffer via both <Strong>after</Strong> and{" "}
            <Strong>onError</Strong> hooks, so metrics are never silently
            dropped. Pass{" "}
            <InlineHighlight>captureColdStartMetric: true</InlineHighlight> to
            automatically emit a <InlineHighlight>ColdStart</InlineHighlight>{" "}
            metric for every cold invocation - useful for tracking cold start
            frequency in CloudWatch.
          </TextListItem>
        </TextList>

        <SectionHeading>Putting It Together</SectionHeading>

        <Paragraph>Install the packages:</Paragraph>

        <CodeBlockWithCopy code={installSnippet} />

        <Paragraph>
          Then write the handler. All three Powertools instances are created
          outside the handler function - Lambda reuses the execution environment
          across warm invocations, so code outside the handler runs only once on
          cold start. This is intentional: it means Powertools is initialised
          once, the instrumented DynamoDB client is shared, and warm invocations
          skip the initialisation overhead entirely.
        </Paragraph>

        <CodeBlockWithCopy code={wiredHandler} />

        <Paragraph>
          The <InlineHighlight>lambdaHandler</InlineHighlight> function contains
          only business logic. Context injection, tracing, and metric flushing
          all live in the middleware chain. Adding a new utility means adding
          one <InlineHighlight>.use()</InlineHighlight> call.
        </Paragraph>

        <SectionHeading>Gotchas</SectionHeading>

        <SubSectionHeading>
          Warm container state leaking between invocations
        </SubSectionHeading>

        <Paragraph>
          Because Lambda reuses execution environments, any state you set during
          one invocation persists into the next one on the same container. This
          trips people up with <InlineHighlight>appendKeys</InlineHighlight>: if
          you add an
          <InlineHighlight>orderId</InlineHighlight> key at the start of a
          handler and don't clean it up, the next invocation on the same
          container will still have it in its log context:
        </Paragraph>

        <CodeBlockWithCopy code={clearStateGotcha} />

        <Paragraph>
          The <InlineHighlight>clearState: true</InlineHighlight> option on{" "}
          <InlineHighlight>injectLambdaContext</InlineHighlight> resets all keys
          added with <InlineHighlight>appendKeys</InlineHighlight> after each
          invocation. Always pass it.{" "}
          <InlineHighlight>persistentLogAttributes</InlineHighlight> (set at
          construction time) are intentionally not cleared - that's the
          distinction between the two APIs.
        </Paragraph>

        <SubSectionHeading>
          Tracer requires active X-Ray tracing
        </SubSectionHeading>

        <Paragraph>
          The Tracer utility only works if X-Ray active tracing is enabled on
          the Lambda function. If it isn't, the tracer falls back to a no-op
          mode - no errors, no crashes, just no traces. If you're not seeing
          traces in X-Ray, the first thing to check is whether active tracing is
          turned on in the function configuration or the IaC that deploys it.
        </Paragraph>

        <SubSectionHeading>
          captureResponse and large payloads
        </SubSectionHeading>

        <Paragraph>
          By default, <InlineHighlight>captureLambdaHandler</InlineHighlight>{" "}
          attaches the handler's return value as metadata on the trace. For most
          handlers this is fine, but if your function returns large payloads -
          say, a DynamoDB scan result or a base64-encoded file - this inflates
          the trace size and can hit X-Ray's segment size limit. Pass{" "}
          <InlineHighlight>captureResponse: false</InlineHighlight> to disable
          it, which is shown in the wired handler example above.
        </Paragraph>

        <SectionHeading>Wrapping Up</SectionHeading>

        <Paragraph>
          Powertools solves the consistency problem: every function logs the
          same structured fields, emits traces to the same X-Ray service map,
          and pushes metrics to the same CloudWatch namespace. Middy solves the
          boilerplate problem: every cross-cutting concern - context injection,
          flushing, error handling - lives in one place rather than being
          copy-pasted into every handler. Together they let you write Lambda
          functions where the handler body is almost entirely business logic,
          and your observability setup is something you configure once and
          inherit everywhere.
        </Paragraph>

        <TextList>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/powertools/typescript/latest/"
              target="_blank"
              rel="noreferrer"
            >
              docs.aws.amazon.com/powertools/typescript/latest
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://middy.js.org/"
              target="_blank"
              rel="noreferrer"
            >
              middy.js.org
            </TextLink>
          </TextListItem>
        </TextList>
      </PostContainer>
    </PageWrapper>
  );
};

export default LambdaPowertools;
