import React, { useEffect } from 'react';
import styled from 'styled-components';

// helpers
import { Analytics } from '../../helpers/analytics';

// animations
import SlideInBottom from '../../animations/SlideInBottom';

// components
import BackButton from '../Button/BackButton';
import { CodeBlockWithCopy } from '../Code/Code';

// layout
import {
  PageWrapper,
  PostTopBar,
  PostContainer as BasePostContainer,
  HeaderRow,
  IconWrapper,
  HeaderIcon,
} from '../BlogLayout/BlogLayout';

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
  IndentedTextList,
  IndentedTextListItem,
  TertiaryHeading,
} from "../Typography/Typography";

// icons
import { DevOpsSVG, GitHubSVG } from '../../resources/styles/icons';

const AnimatedPostContainer = styled(BasePostContainer)`
  animation: ${SlideInBottom} 0.5s forwards;
`;

const helloWorkflow = `name: Hello Actions

on:
  push:
    branches:
      - main

jobs:
  say-hello:
    runs-on: ubuntu-latest
    steps:
      - name: Print a greeting
        run: echo "Hello from GitHub Actions!"`;

const basicNodeCiWorkflow = `name: Node CI

on:
  pull_request:
    branches: [ main ]
  push:
    branches: [ main, develop ]

jobs:
  test:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [18, 20]

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Use Node.js
        uses: actions/setup-node@v4
        with:
          node-version: \${{ matrix.node-version }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test -- --watch=false`;

const workflowTriggers = `on:
  push:
    branches:
      - main
      - develop
    paths:
      - 'src/**'
      - 'package.json'
  pull_request:
    branches:
      - main
  workflow_dispatch:
    inputs:
      environment:
        description: 'Which environment to deploy to?'
        required: true
        default: 'staging'`;

const envSecretsExample = `env:
  NODE_ENV: test
  APP_NAME: my-awesome-app

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Print env vars
        run: |
          echo "Node env is: \${NODE_ENV}"
          echo "App name is: \${APP_NAME}"

      - name: Use a secret
        env:
          DATABASE_URL: \${{ secrets.DATABASE_URL }}
        run: |
          echo "Connecting to: \${DATABASE_URL}" # In real workflows, never echo secrets!`;

const cachingExample = `- name: Cache node_modules
  uses: actions/cache@v4
  with:
    path: |
      **/node_modules
    key: \${{ runner.os }}-node-\${{ hashFiles('**/package-lock.json') }}
    restore-keys: |
      \${{ runner.os }}-node-`;

const oidcConfigureAws = `permissions:
  id-token: write
  contents: read

steps:
  - name: Checkout repo
    uses: actions/checkout@v4

  - name: Configure AWS credentials
    uses: aws-actions/configure-aws-credentials@v4
    with:
      role-to-assume: arn:aws:iam::123456789012:role/GitHubOIDCRoleDevelop
      aws-region: eu-west-1`;

const buildPushEcr = `env:
  AWS_REGION: eu-west-1
  ECR_ACCOUNT_ID: 123456789012
  ECR_REPOSITORY: myapp-backend
  IMAGE_TAG: \${{ github.sha }}

steps:
  - name: Login to Amazon ECR
    uses: aws-actions/amazon-ecr-login@v2

  - name: Build Docker image
    run: |
      docker build -t \${ECR_ACCOUNT_ID}.dkr.ecr.\${AWS_REGION}.amazonaws.com/\${ECR_REPOSITORY}:\${IMAGE_TAG} .

  - name: Push Docker image
    run: |
      docker push \${ECR_ACCOUNT_ID}.dkr.ecr.\${AWS_REGION}.amazonaws.com/\${ECR_REPOSITORY}:\${IMAGE_TAG}`;

const terraformDeploy = `- name: Setup Terraform
  uses: hashicorp/setup-terraform@v3
  with:
    terraform_version: 1.9.0

- name: Terraform Init
  working-directory: ./infra
  run: terraform init -input=false

- name: Terraform Apply
  working-directory: ./infra
  env:
    TF_VAR_backend_image: \${{ env.ECR_ACCOUNT_ID }}.dkr.ecr.\${{ env.AWS_REGION }}.amazonaws.com/\${{ env.ECR_REPOSITORY }}:\${{ env.IMAGE_TAG }}
  run: terraform apply -auto-approve -input=false`;

const reusableWorkflowCaller = `name: Reuse CI Pipeline

on:
  push:
    branches:
      - main

jobs:
  call-shared-ci:
    uses: your-org/your-repo/.github/workflows/shared-node-ci.yml@main
    with:
      node-version: 20
    secrets:
      DATABASE_URL: \${{ secrets.DATABASE_URL }}`;

const reusableWorkflowDefinition = `name: Shared Node CI

on:
  workflow_call:
    inputs:
      node-version:
        required: true
        type: string
    secrets:
      DATABASE_URL:
        required: false

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: \${{ inputs.node-version }}
          cache: 'npm'

      - name: Install deps
        run: npm ci

      - name: Run tests
        env:
          DATABASE_URL: \${{ secrets.DATABASE_URL }}
        run: npm test -- --watch=false`;


const GitHubCICD = () => {
  useEffect(() => {
    Analytics.event('blog_opened', { slug: 'github-actions-ci-cd-course-structure' });
  }, []);

  return (
    <PageWrapper>
      <PostTopBar>
        <BackButton />
      </PostTopBar>

      <AnimatedPostContainer>
        <HeaderRow>
          <PageTitle>GitHub CI/CD</PageTitle>
          <IconWrapper>
            <HeaderIcon>
              <DevOpsSVG />
            </HeaderIcon>
            <HeaderIcon>
              <GitHubSVG />
            </HeaderIcon>
          </IconWrapper>
        </HeaderRow>

        <Paragraph>
          GitHub Actions has quietly become one of the most powerful tools in a modern
          developer's toolkit. It's where your tests run, your Docker images build,
          your infrastructure deploys, and your app quietly rolls out to production while
          you're making coffee.
        </Paragraph>

        <Paragraph>
          In this post, I'm going to lay out a learning path for GitHub Actions. By the
          end, you'll understand <Strong>how</Strong> workflows work, <Strong>when</Strong>{' '}
          to use them, and <Strong>how</Strong> to go from a simple 'hello world' to
          a full CI/CD pipeline that builds, tests, and deploys a real-world app.
        </Paragraph>

        <SectionHeading>Why CI/CD and Why GitHub Actions?</SectionHeading>

        <Paragraph>
          Before writing YAML, it's worth answering a simple question:{' '}
          <Strong>why bother?</Strong> CI/CD exists so you can:
        </Paragraph>

        <TextList>
          <TextListItem>Run tests on every change, not just on your machine.</TextListItem>
          <TextListItem>Catch bugs before they hit production.</TextListItem>
          <TextListItem>Build and ship your app on every merge without manual steps.</TextListItem>
          <TextListItem>Standardise how your team delivers software.</TextListItem>
        </TextList>

        <Paragraph>
          GitHub Actions lives <Strong>next to your code</Strong>. That means:
          workflows are versioned, reviewed, and changed with pull requests just like everything
          else. No separate CI server to maintain, no extra UI to learn - it's all in your repo.
        </Paragraph>

        <SectionHeading>Your First Workflow: Hello GitHub Actions</SectionHeading>

        <Paragraph>
          Let's start small. Every course has that first 'hello world' section.
          For GitHub Actions, it's a workflow that prints a message on every push to{' '}
          <InlineHighlight>main</InlineHighlight>.
        </Paragraph>

        <Paragraph>
          Create a file called{' '}
          <InlineHighlight>.github/workflows/hello-actions.yml</InlineHighlight>:
        </Paragraph>

        <CodeBlockWithCopy code={helloWorkflow} />

        <Paragraph>
          Push this to GitHub, open the <Strong>Actions</Strong> tab, and you'll see your
          workflow run. Under the hood you've already used three core ideas:
        </Paragraph>

        <TextList>
          <TextListItem>
            <Strong>Triggers</Strong> (the <InlineHighlight>on</InlineHighlight> block)
          </TextListItem>
          <TextListItem>
            <Strong>Jobs</Strong> (in this case, <InlineHighlight>say-hello</InlineHighlight>)
          </TextListItem>
          <TextListItem>
            <Strong>Steps</Strong> (each task inside a job)
          </TextListItem>
        </TextList>

        <SectionHeading>Anatomy of a Workflow File</SectionHeading>

        <Paragraph>
          A workflow file is just YAML, but it follows a specific shape. The key sections are:
        </Paragraph>

        <TextList>
          <TextListItem>
            <InlineHighlight>name</InlineHighlight> - how it appears in the Actions UI.
          </TextListItem>
          <TextListItem>
            <InlineHighlight>on</InlineHighlight> - when it runs.
          </TextListItem>
          <TextListItem>
            <InlineHighlight>jobs</InlineHighlight> - what actually happens.
          </TextListItem>
        </TextList>

        <Paragraph>
          Think of <Strong>jobs</Strong> as independent machines in the cloud. Each one gets its
          own runner (like a fresh VM) and executes steps in order. Steps can be raw shell
          commands (<InlineHighlight>run</InlineHighlight>) or prebuilt actions (
          <InlineHighlight>uses</InlineHighlight>).
        </Paragraph>

        <SectionHeading>Triggers: When Should Your Pipelines Run?</SectionHeading>

        <Paragraph>
          Triggers determine <Strong>when</Strong> workflows run. This is where GitHub Actions
          starts to feel really powerful - you can wire workflows into your exact development
          flow.
        </Paragraph>

        <Paragraph>
          Some of the most common triggers you'll use:
        </Paragraph>

        <TextList>
          <TextListItem>
            <InlineHighlight>push</InlineHighlight> - on every push (optionally filtered by
            branches or paths).
          </TextListItem>
          <TextListItem>
            <InlineHighlight>pull_request</InlineHighlight> - on PR open/update.
          </TextListItem>
          <TextListItem>
            <InlineHighlight>workflow_dispatch</InlineHighlight> - manual 'Run workflow'
            button with optional inputs.
          </TextListItem>
          <TextListItem>
            <InlineHighlight>schedule</InlineHighlight> - cron-based, like nightly jobs.
          </TextListItem>
        </TextList>

        <Paragraph>Here's a more realistic trigger setup:</Paragraph>

        <CodeBlockWithCopy code={workflowTriggers} />

        <Paragraph>
          This lets you do things like 'only run tests when the app code changes' or
          'allow manual deployments with an environment dropdown'.
        </Paragraph>

        <SectionHeading>Building a Real Node.js CI Pipeline</SectionHeading>

        <Paragraph>
          Now we turn this into something useful: a <Strong>Node.js CI pipeline</Strong> that
          runs on both pushes and pull requests.
        </Paragraph>

        <Paragraph>
          A typical Node CI workflow might clone your repo, set up a Node version, install
          dependencies, and run tests. Here's a solid starting point:
        </Paragraph>

        <CodeBlockWithCopy code={basicNodeCiWorkflow} />

        <Paragraph>
          A few things to notice:
        </Paragraph>

        <TextList>
          <TextListItem>
            <Strong>Matrix builds</Strong> run the same job on Node 18 and 20.
          </TextListItem>
          <TextListItem>
            <InlineHighlight>actions/checkout</InlineHighlight> pulls your code into the runner.
          </TextListItem>
          <TextListItem>
            <InlineHighlight>actions/setup-node</InlineHighlight> handles Node versioning and
            caching.
          </TextListItem>
          <TextListItem>
            <InlineHighlight>npm ci</InlineHighlight> gives you reproducible installs.
          </TextListItem>
        </TextList>

        <Paragraph>
          In a real project, this becomes your 'gatekeeper' - PRs must pass this
          workflow before being merged.
        </Paragraph>

        <SectionHeading>Environments, Variables & Secrets</SectionHeading>

        <Paragraph>
          Most apps need configuration: API URLs, feature flags, database connections, and so on.
          In GitHub Actions, you manage this with a combination of{' '}
          <Strong>env vars</Strong>, <Strong>secrets</Strong>, and <Strong>environments</Strong>.
        </Paragraph>

        <Paragraph>
          A simple example using env vars and a secret might look like this:
        </Paragraph>

        <CodeBlockWithCopy code={envSecretsExample} />

        <Paragraph>
          The golden rule: <Strong>never hard-code secrets</Strong> in workflows or source code.
          Store them in <InlineHighlight>Settings → Secrets and variables → Actions</InlineHighlight>{' '}
          and reference them via <InlineHighlight>secrets.MY_SECRET</InlineHighlight>.
        </Paragraph>

        <Paragraph>
          For production-ready pipelines, you can also use <Strong>GitHub Environments</Strong>{" "}
          (like <InlineHighlight>staging</InlineHighlight> and{' '}
          <InlineHighlight>production</InlineHighlight>) to add extra protection and approvals.
        </Paragraph>

        <SectionHeading>Making Workflows Fast with Caching</SectionHeading>

        <Paragraph>
          Slow CI kills developer flow. Fortunately, GitHub Actions has built-in caching so you
          don't have to reinstall everything on every run.
        </Paragraph>

        <Paragraph>
          Here's a basic cache setup for <InlineHighlight>node_modules</InlineHighlight>:
        </Paragraph>

        <CodeBlockWithCopy code={cachingExample} />

        <Paragraph>
          The idea is simple: use a key (like your{' '}
          <InlineHighlight>package-lock.json</InlineHighlight> hash) to cache dependencies and
          restore them when possible. This can shave minutes off each run on bigger projects.
        </Paragraph>

        <SectionHeading>Secure Deployments with OIDC & AWS</SectionHeading>

        <Paragraph>
          Historically, CI pipelines deployed to AWS using long-lived{' '}
          <InlineHighlight>AWS_ACCESS_KEY_ID</InlineHighlight> /
          <InlineHighlight>AWS_SECRET_ACCESS_KEY</InlineHighlight> secrets. Modern pipelines use{' '}
          <Strong>OIDC</Strong> instead - no static keys, short-lived credentials.
        </Paragraph>

        <Paragraph>
          With GitHub Actions, this is as simple as:
        </Paragraph>

        <CodeBlockWithCopy code={oidcConfigureAws} />

        <Paragraph>
          Behind the scenes, GitHub issues an OIDC token, AWS verifies it and issues temporary
          credentials for the role you specify. This is both <Strong>more secure</Strong> and
          <Strong>easier to manage</Strong> than rotating static keys.
        </Paragraph>

        <SectionHeading>From Build to Ship: Docker, ECR & ECS</SectionHeading>

        <Paragraph>
          Now we connect CI to CD. A very common pattern is:
        </Paragraph>

        <ol>
          <TextListItem>Build a Docker image for your app.</TextListItem>
          <TextListItem>Push it to Amazon ECR.</TextListItem>
          <TextListItem>Update an ECS service (often via Terraform).</TextListItem>
        </ol>

        <Paragraph>
          Here's a stripped-down build & push step for a backend service:
        </Paragraph>

        <CodeBlockWithCopy code={buildPushEcr} />

        <Paragraph>
          Once your image is in ECR, you can plug it into ECS (or any other runtime). If you're
          using Terraform, you can pass the image URI in as a variable from the workflow:
        </Paragraph>

        <CodeBlockWithCopy code={terraformDeploy} />

        <Paragraph>
          This gives you a clean, repeatable deployment flow: every commit gets its own image
          tag (usually the <InlineHighlight>GITHUB_SHA</InlineHighlight>), and Terraform updates
          your infrastructure to use that new image.
        </Paragraph>

        <SectionHeading>Reusable Workflows: DRY for Your CI/CD</SectionHeading>

        <Paragraph>
          As your project grows, you'll notice the same workflow patterns repeated across
          repos: install Node, run tests, lint, maybe build a Docker image. Reusable workflows
          let you keep these in <Strong>one place</Strong> and call them from multiple repos.
        </Paragraph>

        <Paragraph>
          First, you define a reusable workflow in{' '}
          <InlineHighlight>.github/workflows/shared-node-ci.yml</InlineHighlight>:
        </Paragraph>

        <CodeBlockWithCopy code={reusableWorkflowDefinition} />

        <Paragraph>
          Then you call it from another workflow like this:
        </Paragraph>

        <CodeBlockWithCopy code={reusableWorkflowCaller} />

        <Paragraph>
          This is the GitHub Actions equivalent of extracting a helper function into a shared
          module. It's a huge win for teams maintaining lots of services.
        </Paragraph>

        <SectionHeading>Environments, Approvals & Safe Releases</SectionHeading>

        <Paragraph>
          Production deployments deserve guardrails. GitHub Environments let you set up:
        </Paragraph>

        <TextList>
          <TextListItem>Required reviewers before deploying.</TextListItem>
          <TextListItem>Per-environment secrets (e.g. prod vs staging).</TextListItem>
          <TextListItem>Custom URLs that show in the Actions UI.</TextListItem>
        </TextList>

        <Paragraph>
          A typical pattern is automatic deploys to{' '}
          <InlineHighlight>staging</InlineHighlight> and manual, approved deploys to{' '}
          <InlineHighlight>production</InlineHighlight>. Your workflow stays the same - only the
          environment and configuration change.
        </Paragraph>

        <SectionHeading>Capstone Pipeline - Push to Production</SectionHeading>

        <Paragraph>
          To finish the 'course', imagine a full pipeline for a real-world app:
        </Paragraph>

        <Paragraph>
          <Strong>App:</Strong> React frontend + Node/Express backend <br />
          <Strong>Registry:</Strong> ECR <br />
          <Strong>Runtime:</Strong> ECS Fargate <br />
          <Strong>Infra:</Strong> Terraform <br />
          <Strong>CI/CD:</Strong> GitHub Actions with OIDC
        </Paragraph>

        <Paragraph>
          The flow looks like this:
        </Paragraph>

        <TextList>
          <TextListItem>You push a commit to <InlineHighlight>main</InlineHighlight>.</TextListItem>
          <TextListItem>CI workflow runs tests and linting.</TextListItem>
          <TextListItem>
            If that passes, a deploy workflow:
            <TextList>
              <TextListItem>Assumes an AWS role via OIDC.</TextListItem>
              <TextListItem>Builds Docker images for frontend and backend.</TextListItem>
              <TextListItem>Pushes them to ECR, tagged with the commit SHA.</TextListItem>
              <TextListItem>Runs <InlineHighlight>terraform apply</InlineHighlight> to roll out the change.</TextListItem>
            </TextList>
          </TextListItem>
          <TextListItem>
            ECS performs a rolling update, replacing old tasks with new ones with zero (or minimal)
            downtime.
          </TextListItem>
        </TextList>

        <Paragraph>
          At that point you've achieved the ideal we started with:{' '}
          <Strong>push code → run tests → ship to production</Strong>, with GitHub Actions quietly
          doing all the heavy lifting in the background.
        </Paragraph>

        <Paragraph>
          If you're building your own course or internal docs, you can treat each section of
          this post as a module: start with 'hello world' workflows, graduate to proper
          CI, and finish with secure, automated deployments to the cloud.
        </Paragraph>

      </AnimatedPostContainer>
    </PageWrapper>
  );
};

export default GitHubCICD;
