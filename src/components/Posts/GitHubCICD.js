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

const helloWorkflow = `# This is a basic workflow to help you get started with Actions
name: Hello Actions

# Controls when the workflow will run
on:
  # Triggers the workflow on push or pull request events but only for the "main" branch
  push:
    branches:
      - main

# A workflow run is made up of one or more jobs that can run sequentially or in parallel
jobs:
  # This workflow contains a single job called "say-hello"
  say-hello:
    # The type of runner that the job will run on
    runs-on: ubuntu-latest
    
    # Steps represent a sequence of tasks that will be executed as part of the job
    steps:
      # Runs a single command using the runners shell
      - name: Print a greeting
        run: echo "Hello from GitHub Actions!"
      
      # Runs a set of commands using the runners shell
      - name: Run a multi-line script
        run: |
          echo Add other actions to build,
          echo test, and deploy your project.`;

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
  # Trigger when commits are pushed directly to these branches
  push:
    branches:
      - main
      - develop
    # Only run for PRs that touch the app source code or dependency manifest
    paths:
      - 'src/**'
      - 'package.json'
  # Trigger when a PR is opened/updated targeting the main branch
  pull_request:
    branches:
      - main
  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:
    inputs:
      environment:
        description: 'Which environment to deploy to?'
        required: true
        default: 'staging'`;

const envSecretsExample = `# Global environment variables available to all jobs (unless overridden)
env:
  # Sets the Node environment mode used by many tools/frameworks (e.g. React/Node)
  NODE_ENV: test
  # Handy example of a custom env var you might reuse across steps/jobs
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
          # Pulls the secret from GitHub repo/environment secrets and exposes it as an env var
          DATABASE_URL: \${{ secrets.DATABASE_URL }}
        run: |
          # Demonstration only - in real workflows, never echo secrets to logs
          echo "Connecting to: \${DATABASE_URL}"`;

const cachingExample = `# Cache npm's download cache to speed up installs across workflow runs
- uses: actions/setup-node@v4
  with:
    node-version: 20
    # Enables built-in npm caching (no separate actions/cache step needed)
    cache: npm`;

const oidcConfigureAws = `permissions:
  # Allows GitHub to mint an OIDC JWT for this workflow (required for AWS OIDC role assumption)
  id-token: write
  # Allows the workflow to read your repository contents (needed by actions/checkout)
  contents: read

steps:
  - name: Checkout repo
    uses: actions/checkout@v4

  - name: Configure AWS credentials
    uses: aws-actions/configure-aws-credentials@v4
    with:
      # The IAM role in your AWS account that trusts GitHub OIDC (this is what the workflow assumes)
      role-to-assume: arn:aws:iam::123456789012:role/GitHubOIDCRoleDevelop
      # The AWS region all subsequent AWS CLI / SDK commands will run against
      aws-region: eu-west-1`;

const reusableWorkflowCaller = `name: Reuse CI Pipeline

on:
  push:
    branches:
      - main

jobs:
  call-shared-ci:
    # Calls a reusable workflow defined in another repo (or the same repo)
    # Format: owner/repo/path/to/workflow.yml@ref (branch, tag, or SHA)
    uses: your-org/your-repo/.github/workflows/shared-node-ci.yml@main
    with:
      node-version: 20
    secrets:
      # Passes this repo's secret into the reusable workflow (must be defined under 'on: workflow_call: secrets:')
      DATABASE_URL: \${{ secrets.DATABASE_URL }}`;

const reusableWorkflowDefinition = `name: Shared Node CI

on:
  workflow_call:
    # Inputs the calling workflow can pass in via 'with:'
    inputs:
      node-version:
        required: true
        type: string
    # Secrets the calling workflow can pass in via 'secrets:'
    secrets:
      DATABASE_URL:
        required: false

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      # Checks out the repo contents so the runner can access your code
      - uses: actions/checkout@v4

      # Installs the requested Node version and enables built-in npm caching
      - uses: actions/setup-node@v4
        with:
          # Uses the version provided by the calling workflow
          node-version: \${{ inputs.node-version }}
          cache: 'npm'

      # Installs dependencies from package-lock.json (clean, reproducible installs)
      - name: Install deps
        run: npm ci

      # Runs your test suite and injects DATABASE_URL if it was provided by the caller
      - name: Run tests
        env:
          DATABASE_URL: \${{ secrets.DATABASE_URL }}
        run: npm test -- --watch=false`;

const repoStructure = `template-github-actions-cicd/
├─ site/
│  ├─ index.html
│  ├─ package.json
│  ├─ package-lock.json
│  ├─ vite.config.js
│  ├─ src/
│  │  ├─ main.js
│  │  └─ meta.js
│  └─ test/
│     └─ meta.test.js
└─ .github/
   └─ workflows/
      ├─ shared-node-ci.yml
      ├─ ci.yml
      └─ pages.yml`;

const sharedNodeCI = `# Shared Node CI (reusable)
# Purpose: standardise install → test → build so other workflows can call it.

name: Shared Node CI

on:
  workflow_call:
    # Inputs let the caller customise this workflow.
    inputs:
      node-version:
        required: true
        type: string
      working-directory:
        required: true
        type: string

jobs:
  ci:
    # Each job runs on a fresh runner (VM).
    runs-on: ubuntu-latest

    steps:
      # Pull the repo onto the runner.
      - name: Checkout repo
        uses: actions/checkout@v4

      # Install Node and enable npm caching (npm download cache).
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: \${{ inputs.node-version }}
          cache: npm
          cache-dependency-path: |
            \${{ inputs.working-directory }}/package-lock.json
            \${{ inputs.working-directory }}/**/package-lock.json

      # Install dependencies from package-lock.json (reproducible installs).
      - name: Install dependencies
        working-directory: \${{ inputs.working-directory }}
        run: npm ci

      # Run the test suite (CI gate).
      - name: Run tests
        working-directory: \${{ inputs.working-directory }}
        run: npm test

      # Build the project (produces build output).
      - name: Build
        working-directory: \${{ inputs.working-directory }}
        run: npm run build`;

const ciWorkflow = `# CI (repo entrypoint)
# Purpose: run CI on PRs and pushes by calling the shared workflow.

name: CI

on:
  # Run CI for pull requests targeting main.
  pull_request:
    branches: [ main ]

  # Run CI for pushes to main and develop.
  push:
    branches: [ main, develop ]

jobs:
  ci:
    # Call the reusable workflow in this repo.
    uses: ./.github/workflows/shared-node-ci.yml
    with:
      node-version: "20"
      working-directory: "site"`;

const pagesWorkflow = `# Deploy to GitHub Pages
# Purpose: build the site, package the build output as an artifact, then deploy to Pages.

name: Deploy to GitHub Pages

on:
  # Deploy automatically when main and develop changes.
  push:
    branches: [ main ]

  # Allow manual deploys (optionally deploy a specific ref).
  workflow_dispatch:
    inputs:
      ref:
        description: "Git ref to deploy (branch, tag, or SHA). Leave empty for default."
        required: false
        default: ""

# Least privilege permissions for this workflow.
permissions:
  contents: read   # Required for checkout.
  pages: write     # Required to publish to Pages.
  id-token: write  # Required by the Pages deploy action.
  actions: read    # Required for artifact handling in some setups.

# Prevent overlapping deploys.
concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    # Build job: install → test → build → upload artifact.
    runs-on: ubuntu-latest

    outputs:
      # Expose Pages base path in case other jobs need it.
      base_path: \${{ steps.configure-pages.outputs.base_path }}

    steps:
      # Pull the repo onto the runner.
      - name: Checkout repo
        uses: actions/checkout@v4
        with:
          # If workflow_dispatch input is set, deploy that ref; otherwise deploy the current ref.
          ref: \${{ inputs.ref || github.ref }}

      # Determine the correct base path for GitHub Pages project sites.
      - name: Configure Pages
        id: configure-pages
        uses: actions/configure-pages@v5

      # Install Node and enable npm caching (npm download cache).
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: npm
          cache-dependency-path: site/package-lock.json

      # Install dependencies from package-lock.json (reproducible installs).
      - name: Install dependencies
        working-directory: site
        run: npm ci

      # Run the test suite (CI gate).
      - name: Run tests
        working-directory: site
        run: npm test

      # Set build metadata for the frontend.
      - name: Set build metadata
        run: |
          echo "VITE_COMMIT_SHA=\${GITHUB_SHA}" >> "$GITHUB_ENV"
          echo "VITE_BUILD_TIME=$(date -u +'%Y-%m-%dT%H:%M:%SZ')" >> "$GITHUB_ENV"
          echo "VITE_REF_NAME=\${GITHUB_REF_NAME}" >> "$GITHUB_ENV"
          echo "VITE_REPO=\${GITHUB_REPOSITORY}" >> "$GITHUB_ENV"
          echo "VITE_ACTOR=\${GITHUB_ACTOR}" >> "$GITHUB_ENV"
          echo "VITE_EVENT_NAME=\${GITHUB_EVENT_NAME}" >> "$GITHUB_ENV"
          echo "VITE_WORKFLOW=\${GITHUB_WORKFLOW}" >> "$GITHUB_ENV"
          echo "VITE_RUN_NUMBER=\${GITHUB_RUN_NUMBER}" >> "$GITHUB_ENV"
          echo "VITE_RUN_ATTEMPT=\${GITHUB_RUN_ATTEMPT}" >> "$GITHUB_ENV"
          echo "VITE_SERVER_URL=\${GITHUB_SERVER_URL}" >> "$GITHUB_ENV"
          echo "VITE_RUN_URL=\${GITHUB_SERVER_URL}/\${GITHUB_REPOSITORY}/actions/runs/\${GITHUB_RUN_ID}" >> "$GITHUB_ENV"
          echo "VITE_CI_WORKFLOW_FILE=ci.yml" >> "$GITHUB_ENV"
          echo "VITE_PAGES_WORKFLOW_FILE=pages.yml" >> "$GITHUB_ENV"

      # Build the project and inject build metadata into the frontend.
      - name: Build
        working-directory: site
        env:
          # Use the correct base path for GitHub Pages project sites.
          BASE_PATH: \${{ steps.configure-pages.outputs.base_path }}
        run: npm run build

      # Package build output for the deploy job.
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: site/dist

  deploy:
    # Deploy job: publish the artifact to GitHub Pages.
    runs-on: ubuntu-latest
    needs: build

    # Tie the deployment to the github-pages environment (supports approvals/protection rules).
    environment:
      name: github-pages
      url: \${{ steps.deploy.outputs.page_url }}

    steps:
      # Deploy the uploaded artifact to GitHub Pages.
      - name: Deploy
        id: deploy
        uses: actions/deploy-pages@v4
;`;

const metaModule = `function safe(v) {
  return v && String(v).trim().length ? String(v) : "unknown";
}

export function repoParts(full) {
  const [owner, repo] = safe(full) === "unknown" ? ["unknown", "unknown"] : String(full).split("/");
  return { owner: owner || "unknown", repo: repo || "unknown" };
}

export function badgeUrl({ serverUrl, repoFull, workflowFile, branch }) {
  return \`\${serverUrl}/\${repoFull}/actions/workflows/\${workflowFile}/badge.svg?branch=\${encodeURIComponent(branch)}\`;
}

export function getMeta(env) {
  return {
    commit: safe(env.VITE_COMMIT_SHA),
    built: safe(env.VITE_BUILD_TIME),
    branch: safe(env.VITE_REF_NAME),
    repoFull: safe(env.VITE_REPO),

    actor: safe(env.VITE_ACTOR),
    event: safe(env.VITE_EVENT_NAME),
    workflow: safe(env.VITE_WORKFLOW),

    runUrl: safe(env.VITE_RUN_URL),
    runNumber: safe(env.VITE_RUN_NUMBER),
    runAttempt: safe(env.VITE_RUN_ATTEMPT),

    serverUrl: safe(env.VITE_SERVER_URL),
    ciWorkflowFile: safe(env.VITE_CI_WORKFLOW_FILE),
    pagesWorkflowFile: safe(env.VITE_PAGES_WORKFLOW_FILE),
  };
}`;

const metaTest = `import test from "node:test";
import assert from "node:assert/strict";
import { getMeta, repoParts, badgeUrl } from "../src/meta.js";

test("getMeta falls back to unknown", () => {
  const out = getMeta({});
  assert.equal(out.commit, "unknown");
  assert.equal(out.built, "unknown");
  assert.equal(out.branch, "unknown");
  assert.equal(out.repoFull, "unknown");
});

test("getMeta uses env values", () => {
  const out = getMeta({
    VITE_COMMIT_SHA: "abc123",
    VITE_BUILD_TIME: "2026-01-02T00:00:00Z",
    VITE_REF_NAME: "main",
    VITE_REPO: "heyitsmeharv/template-github-actions-cicd",
    VITE_SERVER_URL: "https://github.com",
    VITE_CI_WORKFLOW_FILE: "ci.yml",
  });

  assert.equal(out.commit, "abc123");
  assert.equal(out.built, "2026-01-02T00:00:00Z");
  assert.equal(out.branch, "main");
  assert.equal(out.repoFull, "heyitsmeharv/template-github-actions-cicd");
});

test("repoParts splits owner/repo", () => {
  const out = repoParts("a/b");
  assert.deepEqual(out, { owner: "a", repo: "b" });
});

test("badgeUrl builds a badge URL", () => {
  const url = badgeUrl({
    serverUrl: "https://github.com",
    repoFull: "a/b",
    workflowFile: "ci.yml",
    branch: "main",
  });

  assert.equal(
    url,
    "https://github.com/a/b/actions/workflows/ci.yml/badge.svg?branch=main"
  );
});`;

const dashboardMain = `import { getMeta, repoParts, badgeUrl } from "./meta.js";

function el(tag, attrs = {}, html = "") {
  const node = document.createElement(tag);
  Object.entries(attrs).forEach(([k, v]) => node.setAttribute(k, v));
  node.innerHTML = html;
  return node;
}

function safe(v) {
  return v && String(v).trim().length ? String(v) : "unknown";
}

async function latestRun({ owner, repo, workflowFile, branch }) {
  const url = \`https://api.github.com/repos/\${owner}/\${repo}/actions/workflows/\${workflowFile}/runs?per_page=1&branch=\${encodeURIComponent(branch)}\`;

  const res = await fetch(url, { headers: { Accept: "application/vnd.github+json" } });
  if (!res.ok) throw new Error(\`GitHub API \${res.status}\`);
  const data = await res.json();

  const run = data.workflow_runs?.[0];
  if (!run) return null;

  return {
    status: run.status,
    conclusion: run.conclusion,
    htmlUrl: run.html_url,
    updatedAt: run.updated_at,
  };
}

const meta = getMeta(import.meta.env);

const root = document.querySelector("#meta");
root.innerHTML = "";

root.appendChild(
  el(
    "div",
    {},
    \`
      <h3>Deployment metadata</h3>
      <ul>
        <li><b>Repo</b>: <code>\${meta.repoFull}</code></li>
        <li><b>Branch</b>: <code>\${meta.branch}</code></li>
        <li><b>Commit</b>: <code>\${meta.commit}</code></li>
        <li><b>Built</b>: <code>\${meta.built}</code></li>
        <li><b>Triggered by</b>: <code>\${meta.event}</code> (actor: <code>\${meta.actor}</code>)</li>
        <li><b>Workflow</b>: <code>\${meta.workflow}</code></li>
        <li><b>Run</b>: <a href="\${meta.runUrl}" target="_blank" rel="noreferrer">#\${meta.runNumber} (attempt \${meta.runAttempt})</a></li>
      </ul>
    \`
  )
);

const badges = el(
  "div",
  {},
  \`
    <h3>Live workflow status</h3>
    <p class="muted">Badges update automatically based on the latest workflow runs.</p>
    <div style="display:flex; gap:12px; flex-wrap:wrap; align-items:center;">
      <a href="\${meta.serverUrl}/\${meta.repoFull}/actions/workflows/\${meta.ciWorkflowFile}" target="_blank" rel="noreferrer">
        <img alt="CI status" src="\${badgeUrl({
          serverUrl: meta.serverUrl,
          repoFull: meta.repoFull,
          workflowFile: meta.ciWorkflowFile,
          branch: meta.branch,
        })}">
      </a>
      <a href="\${meta.serverUrl}/\${meta.repoFull}/actions/workflows/\${meta.pagesWorkflowFile}" target="_blank" rel="noreferrer">
        <img alt="Pages deploy status" src="\${badgeUrl({
          serverUrl: meta.serverUrl,
          repoFull: meta.repoFull,
          workflowFile: meta.pagesWorkflowFile,
          branch: "main",
        })}">
      </a>
    </div>
  \`
);
root.appendChild(badges);

const live = el("div", {}, \`<h3>Latest runs (live)</h3><p class="muted">Loading…</p>\`);
root.appendChild(live);

(async () => {
  const { owner, repo } = repoParts(meta.repoFull);

  try {
    const [ciRun, pagesRun] = await Promise.all([
      latestRun({ owner, repo, workflowFile: meta.ciWorkflowFile, branch: meta.branch }),
      latestRun({ owner, repo, workflowFile: meta.pagesWorkflowFile, branch: "main" }),
    ]);

    const renderRun = (title, run) => {
      if (!run) return \`<li><b>\${title}</b>: <span class="muted">No runs found</span></li>\`;
      const status = run.status === "completed" ? safe(run.conclusion) : safe(run.status);
      return \`
        <li>
          <b>\${title}</b>:
          <a href="\${run.htmlUrl}" target="_blank" rel="noreferrer">\${status}</a>
          <span class="muted">(updated: \${safe(run.updatedAt)})</span>
        </li>
      \`;
    };

    live.innerHTML = \`
      <ul>
        \${renderRun("CI", ciRun)}
        \${renderRun("Pages deploy", pagesRun)}
      </ul>
      <p class="muted">
        If this repo is private, the GitHub API section may not load without authentication.
        The badges still work reliably for a “live” view.
      </p>
    \`;
  } catch (e) {
    live.innerHTML = \`
      <p class="muted">
        Live run details unavailable (\${safe(e.message)}). This is normal for private repos or API rate limits.
        Badges above still show live status.
      </p>
    \`;
  }
})();`;

const pagesSettings = `1) Repo Settings → Pages
2) Build and deployment → Source: GitHub Actions
3) (Optional) Settings → Environments → github-pages
   - Add protection rules (e.g. require reviewers)
   - Restrict deployment branches to main`;

const pitfalls = `- If you deploy from develop, GitHub can reject the deployment if your environment protection rules only allow main.
- If caching says "paths not resolved", check your cache-dependency-path points to a real lockfile path.
- If your UI shows "unknown", check your workflow exports the same VITE_* keys your frontend reads.
- If your repo is private, the GitHub API section may fail without auth. Badges still work reliably.`;


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
          Store them in <Strong>Settings → Secrets and variables → Actions</Strong>{' '}
          and reference them via <InlineHighlight>secrets.MY_SECRET</InlineHighlight>.
        </Paragraph>

        <Paragraph>
          For production-ready pipelines, you can also use <Strong>GitHub Environments</Strong>{" "}
          (like <InlineHighlight>staging</InlineHighlight> and{' '}
          <InlineHighlight>production</InlineHighlight>) to add extra protection and approvals.
        </Paragraph>

        <SectionHeading>Making Workflows Fast with Caching</SectionHeading>

        <Paragraph>
          The simplest (and most reliable) option for Node projects is to let{" "}
          <InlineHighlight>actions/setup-node</InlineHighlight> handle caching for you. This caches npm's
          package download cache rather than <InlineHighlight>node_modules</InlineHighlight>, which tends to
          be more stable across runs and avoids weird platform-specific issues.
        </Paragraph>

        <Paragraph>
          Here's the recommended setup:
        </Paragraph>

        <CodeBlockWithCopy code={cachingExample} />

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

        <SectionHeading>Deploy a Live GitHub Actions Dashboard to GitHub Pages</SectionHeading>

        <Paragraph>
          We've covered the building blocks: Now we'll turn that knowledge into a real template repo
          that ships a website to a real URL - without leaving GitHub.
        </Paragraph>

        <Paragraph>
          Here is a link to the template repo if you'd rather look at the source:
          {" "}
          <TextLink
            href="https://github.com/heyitsmeharv/template-github-actions-cicd"
            target="_blank"
            rel="noreferrer"
          >
            template-github-actions-cicd
          </TextLink>
        </Paragraph>

        <SubSectionHeading>What we're building</SubSectionHeading>
        <Paragraph>
          The goal is a tiny site that acts like a <Strong>live pipeline dashboard</Strong>. It will show:
        </Paragraph>
        <TextList>
          <TextListItem>
            The exact commit and build time currently deployed to Pages.
          </TextListItem>
          <TextListItem>
            Links back to the workflow run that deployed the site.
          </TextListItem>
          <TextListItem>
            Live status indicators using workflow badges (and optionally live run details via the GitHub API).
          </TextListItem>
        </TextList>
        <Paragraph>
          This is a great "end of post" template because it demonstrates real CI/CD behaviour - tests + build + deploy -
          using GitHub Actions only. No AWS, no Terraform, no external services. Just workflows.
        </Paragraph>

        <SubSectionHeading>Template structure</SubSectionHeading>
        <Paragraph>
          Here's the minimal repo layout. You'll notice we separate the{" "}
          <InlineHighlight>workflows</InlineHighlight> from the{" "}
          <InlineHighlight>site</InlineHighlight>.
        </Paragraph>
        <CodeBlockWithCopy code={repoStructure} />

        <SubSectionHeading>Enable GitHub Pages for Actions deployments</SubSectionHeading>
        <Paragraph>
          GitHub Pages needs one repo setting changed. If you skip this, your deploy workflow will run, but the site won't publish.
        </Paragraph>
        <CodeBlockWithCopy code={pagesSettings} />
        <Paragraph>
          Once you've deployed, your site will appear at your Pages URL. For a project repo, it typically looks like{" "}
          <InlineHighlight>https://&lt;username&gt;.github.io/&lt;repo&gt;/</InlineHighlight>.
        </Paragraph>

        <SubSectionHeading>Reusable workflows: keep CI consistent across repos</SubSectionHeading>
        <Paragraph>
          Most pipelines repeat the same steps: checkout, setup Node, install deps, run tests, build. Reusable workflows let you define
          that once and call it from anywhere - your "template repo" becomes something you can reuse for future posts (Terraform, Docker, ECS, etc.).
        </Paragraph>
        <CodeBlockWithCopy code={sharedNodeCI} />

        <SubSectionHeading>CI entrypoint: PR gate + branch confidence</SubSectionHeading>
        <Paragraph>
          The CI workflow is intentionally boring. That's the point. It's a predictable, repeatable gate that runs on pull requests and pushes.
        </Paragraph>
        <CodeBlockWithCopy code={ciWorkflow} />
        <Paragraph>
          When this is in place, you stop relying on “it works on my machine”. Your PRs prove they're healthy.
        </Paragraph>

        <SubSectionHeading>Deploy to Pages: build → artifact → deploy</SubSectionHeading>
        <Paragraph>
          This is the part that makes it feel real. The Pages workflow runs on <InlineHighlight>push to main</InlineHighlight>,
          builds your site, uploads the build output as an artifact, and then deploys that artifact to GitHub Pages.
        </Paragraph>
        <Paragraph>
          Notice how we also inject metadata into the build via environment variables. This is the trick that makes the dashboard useful:
          the deployed site can tell you exactly what version is live.
        </Paragraph>
        <CodeBlockWithCopy code={pagesWorkflow} />

        <SubSectionHeading>Do it properly: separate metadata logic from rendering</SubSectionHeading>
        <Paragraph>
          The fastest way to end up with a fragile demo is to stuff everything into one file. Instead, we'll do this cleanly:
        </Paragraph>
        <TextList>
          <TextListItem>
            <InlineHighlight>meta.js</InlineHighlight> contains pure functions (easy to test).
          </TextListItem>
          <TextListItem>
            <InlineHighlight>main.js</InlineHighlight> renders the UI using those helpers.
          </TextListItem>
          <TextListItem>
            <InlineHighlight>meta.test.js</InlineHighlight> tests the metadata module, not the DOM.
          </TextListItem>
        </TextList>

        <SubSectionHeading>site/src/meta.js</SubSectionHeading>
        <Paragraph>
          <Strong>One job:</Strong> take Vite env vars and return a safe, consistent metadata object for the UI.
        </Paragraph>
        <CodeBlockWithCopy code={metaModule} />

        <SubSectionHeading>site/test/meta.test.js</SubSectionHeading>
        <Paragraph>
          A few quick tests prove that we handle missing values cleanly and generate the right badge URLs.
        </Paragraph>
        <CodeBlockWithCopy code={metaTest} />

        <SubSectionHeading>site/src/main.js</SubSectionHeading>
        <Paragraph>
          Now the dashboard can focus on rendering. It shows static deployment metadata, live workflow badges, and optionally the latest run results.
        </Paragraph>
        <CodeBlockWithCopy code={dashboardMain} />

        <SubSectionHeading>Common pitfalls</SubSectionHeading>
        <Paragraph>
          These are the issues most people hit when building this template for the first time.
        </Paragraph>
        <CodeBlockWithCopy code={pitfalls} />
      </AnimatedPostContainer>
    </PageWrapper>
  );
};

export default GitHubCICD;
